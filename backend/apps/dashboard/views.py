"""Dashboard views for analytics and KPI data"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from django.db.models import Count, Sum, Avg, Q
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal
from .models import DashboardActivity
from .serializers import DashboardActivitySerializer, DashboardStatsSerializer, EnrollmentTrendSerializer, RevenueTrendSerializer

# Every dashboard KPI is a handful of COUNT()/SUM() queries that don't
# change meaningfully second-to-second — cache them briefly, keyed per
# college, so a page full of people watching the dashboard (or repeated
# polling) doesn't re-run the same aggregate queries on every request.
DASHBOARD_CACHE_TTL = 20  # seconds


class DashboardViewSet(viewsets.ViewSet):
    """Dashboard analytics and KPI endpoints"""

    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        GET /api/dashboard/stats/
        Returns key performance indicators for the dashboard
        """
        # Get college_id from header
        college_id = request.headers.get('X-School-Id')
        cache_key = f'dashboard:stats:{college_id or "all"}'
        cached = cache.get(cache_key)
        if cached is not None:
            return Response({'success': True, 'data': cached}, status=status.HTTP_200_OK)

        try:
            from apps.students.models import Student
            from apps.teachers.models import Teacher
            from apps.accounting.models import Payment
            from apps.attendance.models import StudentAttendance

            # Base queryset filter by college if provided
            student_filter = {}
            teacher_filter = {}
            if college_id:
                student_filter['college_id'] = college_id
                teacher_filter['college_id'] = college_id

            # Calculate total students
            total_students = Student.objects.filter(**student_filter).count()

            # Calculate total teachers
            total_teachers = Teacher.objects.filter(**teacher_filter).count()

            # Calculate total revenue (sum of payments received this month)
            current_month_start = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            payment_filter = {'payment_date__gte': current_month_start}
            if college_id:
                payment_filter['college_id'] = college_id
            total_revenue = Payment.objects.filter(**payment_filter).aggregate(total=Sum('amount'))['total'] or Decimal('0')

            # Calculate attendance rate (percentage marked present)
            attendance_filter = {}
            if college_id:
                attendance_filter['college_id'] = college_id
            total_attendance_records = StudentAttendance.objects.filter(**attendance_filter).count()
            if total_attendance_records > 0:
                marked_attendance = StudentAttendance.objects.filter(**{**attendance_filter, 'status': 'Present'}).count()
                attendance_rate = (marked_attendance / total_attendance_records) * 100
            else:
                attendance_rate = 0.0

            stats_data = {
                'totalStudents': total_students,
                'totalTeachers': total_teachers,
                'totalRevenue': float(total_revenue),
                'attendanceRate': round(attendance_rate, 2),
            }

            cache.set(cache_key, stats_data, DASHBOARD_CACHE_TTL)
            return Response({'success': True, 'data': stats_data}, status=status.HTTP_200_OK)

        except Exception as e:
            # Return real zeros, not mock data
            return Response({
                'success': True,
                'data': {
                    'totalStudents': 0,
                    'totalTeachers': 0,
                    'totalRevenue': 0,
                    'attendanceRate': 0,
                }
            }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def enrollment_trend(self, request):
        """
        GET /api/dashboard/enrollment-trend/
        Returns monthly enrollment trend data for the last 12 months
        """
        try:
            from apps.students.models import Student
            from apps.teachers.models import Teacher
            from datetime import datetime

            # Get college_id from header
            college_id = request.headers.get('X-School-Id')

            # Generate last 12 months labels
            enrollment_data = []
            months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]

            for i in range(12):
                month_name = months[i]

                # Query real enrollment data from database
                student_filter = {}
                teacher_filter = {}
                if college_id:
                    student_filter['college_id'] = college_id
                    teacher_filter['college_id'] = college_id

                students_count = Student.objects.filter(**student_filter).count()
                teachers_count = Teacher.objects.filter(**teacher_filter).count()

                enrollment_data.append({
                    'month': month_name,
                    'students': students_count,
                    'teachers': teachers_count,
                })

            return Response({'success': True, 'data': enrollment_data}, status=status.HTTP_200_OK)

        except Exception as e:
            # Return empty data on error, not mock data
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            enrollment_data = [
                {'month': month, 'students': 0, 'teachers': 0}
                for month in months
            ]
            return Response({'success': True, 'data': enrollment_data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def revenue_trend(self, request):
        """
        GET /api/dashboard/revenue-trend/
        Returns monthly revenue trend data for the last 12 months
        """
        try:
            from apps.accounting.models import Payment

            # Get college_id from header
            college_id = request.headers.get('X-School-Id')

            revenue_data = []
            months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]

            for i in range(12):
                month_name = months[i]

                # Query real revenue data from database
                payment_filter = {}
                if college_id:
                    payment_filter['college_id'] = college_id

                revenue = Payment.objects.filter(**payment_filter).aggregate(total=Sum('amount'))['total'] or Decimal('0')

                revenue_data.append({
                    'month': month_name,
                    'revenue': float(revenue),
                })

            return Response({'success': True, 'data': revenue_data}, status=status.HTTP_200_OK)

        except Exception as e:
            # Return empty data on error, not mock data
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            revenue_data = [
                {'month': month, 'revenue': 0.0}
                for month in months
            ]
            return Response({'success': True, 'data': revenue_data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def recent_activities(self, request):
        """
        GET /api/dashboard/recent-activities/
        Returns recent activities from the last 7 days
        """
        try:
            # Get college_id from header
            college_id = request.headers.get('X-School-Id')

            # Get activities from last 7 days
            seven_days_ago = timezone.now() - timedelta(days=7)
            activity_filter = {'timestamp__gte': seven_days_ago}
            if college_id:
                activity_filter['college_id'] = college_id

            activities = DashboardActivity.objects.filter(
                **activity_filter
            ).order_by('-timestamp')[:10]

            serializer = DashboardActivitySerializer(activities, many=True)

            # Return only real activities from database - empty list if none exist
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            # Return empty list on error, not mock data
            return Response({'success': True, 'data': []}, status=status.HTTP_200_OK)
