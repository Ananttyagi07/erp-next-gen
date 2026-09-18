"""
Template management models (SMS & Email)
"""
from django.db import models
from apps.core.models import TimeStampedModel, CollegeIsolatedModel, SoftDeleteModel


class SMSTemplate(TimeStampedModel, CollegeIsolatedModel, SoftDeleteModel):
    """SMS Template with dynamic tags"""
    TEMPLATE_TYPES = [
        ('general', 'General'),
        ('admission', 'Admission'),
        ('fee', 'Fee'),
        ('attendance', 'Attendance'),
        ('exam', 'Exam'),
        ('holiday', 'Holiday'),
    ]

    name = models.CharField(max_length=255)
    template_type = models.CharField(max_length=20, choices=TEMPLATE_TYPES, default='general')
    content = models.TextField(help_text="Use tags: {name}, {email}, {phone}, {school}, {class}, {section}, {roll}, {subject}")
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'sms_templates'

    def __str__(self):
        return self.name


class EmailTemplate(TimeStampedModel, CollegeIsolatedModel, SoftDeleteModel):
    """Email Template with dynamic tags"""
    TEMPLATE_TYPES = [
        ('general', 'General'),
        ('admission', 'Admission'),
        ('fee', 'Fee'),
        ('attendance', 'Attendance'),
        ('exam', 'Exam'),
        ('holiday', 'Holiday'),
    ]

    name = models.CharField(max_length=255)
    template_type = models.CharField(max_length=20, choices=TEMPLATE_TYPES, default='general')
    subject = models.CharField(max_length=255)
    content = models.TextField(help_text="Use tags: {name}, {email}, {phone}, {school}, {class}, {section}, {roll}, {subject}")
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'email_templates'

    def __str__(self):
        return self.name
