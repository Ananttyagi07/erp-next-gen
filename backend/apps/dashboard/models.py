"""Dashboard models for activity logging and analytics"""
from django.db import models
from django.conf import settings


class DashboardActivity(models.Model):
    """Log of dashboard activities for the Recent Activities widget"""

    ACTIVITY_TYPES = [
        ('student_registration', 'Student Registration'),
        ('teacher_registration', 'Teacher Registration'),
        ('payment_received', 'Payment Received'),
        ('attendance_marked', 'Attendance Marked'),
        ('course_created', 'Course Created'),
        ('exam_scheduled', 'Exam Scheduled'),
        ('leave_approved', 'Leave Approved'),
        ('salary_processed', 'Salary Processed'),
        ('result_published', 'Result Published'),
        ('other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES, default='other')
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    related_object_type = models.CharField(max_length=50, null=True, blank=True)
    related_object_id = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['-timestamp']),
            models.Index(fields=['activity_type', '-timestamp']),
        ]

    def __str__(self):
        return f"{self.activity_type} - {self.description[:50]}"
