"""Serializers for dashboard endpoints"""
from rest_framework import serializers
from .models import DashboardActivity


class DashboardActivitySerializer(serializers.ModelSerializer):
    """Serializer for dashboard activities"""

    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    activity_type_display = serializers.CharField(source='get_activity_type_display', read_only=True)

    class Meta:
        model = DashboardActivity
        fields = ['id', 'activity_type', 'activity_type_display', 'description', 'timestamp', 'user_name']


class DashboardStatsSerializer(serializers.Serializer):
    """Serializer for dashboard statistics"""

    total_students = serializers.IntegerField()
    total_teachers = serializers.IntegerField()
    total_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    attendance_rate = serializers.FloatField()


class EnrollmentTrendSerializer(serializers.Serializer):
    """Serializer for enrollment trend data"""

    month = serializers.CharField()
    students = serializers.IntegerField()
    teachers = serializers.IntegerField()


class RevenueTrendSerializer(serializers.Serializer):
    """Serializer for revenue trend data"""

    month = serializers.CharField()
    revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
