"""
Admin Settings models for system configuration
"""
from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel, SoftDeleteModel


class GeneralSetting(TimeStampedModel, SoftDeleteModel):
    """General system settings"""
    # Brand Information
    brand_name = models.CharField(max_length=255, blank=True, help_text="Brand/Organization name")
    brand_title = models.CharField(max_length=255, blank=True, help_text="Brand title (Required)")
    brand_logo = models.ImageField(upload_to='brand/', blank=True, null=True, help_text="Logo dimensions: Max-W: 100px, Max-H: 110px")
    favicon_icon = models.ImageField(upload_to='brand/', blank=True, null=True, help_text="Favicon dimensions: Max-W: 20px, Max-H: 20px")
    brand_footer = models.TextField(blank=True, help_text="Footer text/copyright information")

    # School Information
    school_name = models.CharField(max_length=255, blank=True)
    school_code = models.CharField(max_length=50, unique=True, blank=True)
    school_address = models.TextField(blank=True)
    school_phone = models.CharField(max_length=20, blank=True)
    school_email = models.EmailField(blank=True)
    school_website = models.URLField(blank=True)
    school_logo = models.ImageField(upload_to='school_settings/', blank=True, null=True)
    principal_name = models.CharField(max_length=255, blank=True)
    principal_email = models.EmailField(blank=True)

    # System Configuration
    academic_year_start = models.DateField(null=True, blank=True, help_text="Start of academic year")
    academic_year_end = models.DateField(null=True, blank=True, help_text="End of academic year")
    timezone = models.CharField(max_length=50, default='UTC')
    language = models.ForeignKey(
        'admin_settings.Language',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='general_settings',
        help_text="Default system language"
    )
    currency = models.CharField(max_length=10, default='USD')
    currency_symbol = models.CharField(max_length=5, default='$', help_text="Currency symbol (e.g., $, €, £)")

    # Additional Settings
    enable_rtl = models.BooleanField(default=False, help_text="Enable Right-to-Left language support")
    enable_frontend = models.BooleanField(default=True, help_text="Enable public frontend")
    theme = models.CharField(max_length=50, default='light', choices=[
        ('light', 'Light'),
        ('dark', 'Dark'),
        ('auto', 'Auto'),
    ])
    date_format = models.CharField(max_length=20, default='DD/MM/YYYY', choices=[
        ('DD/MM/YYYY', 'DD/MM/YYYY'),
        ('MM/DD/YYYY', 'MM/DD/YYYY'),
        ('YYYY-MM-DD', 'YYYY-MM-DD'),
    ])
    google_analytics = models.CharField(max_length=255, blank=True, help_text="Google Analytics tracking ID")

    class Meta:
        db_table = 'admin_general_settings'
        verbose_name_plural = 'General Settings'

    def __str__(self):
        return f"General Settings - {self.brand_title or self.school_name}"


class SchoolPaymentSetting(TimeStampedModel, SoftDeleteModel):
    """Payment configuration for school"""
    payment_gateway = models.CharField(max_length=50, choices=[
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('razorpay', 'Razorpay'),
        ('bank_transfer', 'Bank Transfer'),
    ])
    gateway_api_key = models.CharField(max_length=500)
    gateway_secret_key = models.CharField(max_length=500)
    merchant_account = models.CharField(max_length=255, blank=True)
    payment_terms = models.CharField(max_length=50, choices=[
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('half_yearly', 'Half Yearly'),
        ('annual', 'Annual'),
    ])
    late_fee_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    late_fee_days = models.IntegerField(default=5, help_text="Days after due date to apply late fee")
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'admin_school_payment_settings'
        verbose_name_plural = 'School Payment Settings'

    def __str__(self):
        return f"Payment Settings - {self.payment_gateway}"


class SMSSetting(TimeStampedModel, SoftDeleteModel):
    """SMS configuration for notifications"""
    provider = models.CharField(max_length=50, choices=[
        ('twilio', 'Twilio'),
        ('aws_sns', 'AWS SNS'),
        ('nexmo', 'Nexmo'),
        ('local', 'Local Provider'),
    ])
    api_key = models.CharField(max_length=500)
    api_secret = models.CharField(max_length=500, blank=True)
    sender_id = models.CharField(max_length=20)
    is_active = models.BooleanField(default=False)
    send_to_parents = models.BooleanField(default=False, help_text="Send SMS to parents")
    send_to_students = models.BooleanField(default=False, help_text="Send SMS to students")
    send_to_staff = models.BooleanField(default=False, help_text="Send SMS to staff")
    monthly_sms_limit = models.IntegerField(default=1000)
    sms_sent_count = models.IntegerField(default=0)

    class Meta:
        db_table = 'admin_sms_settings'
        verbose_name_plural = 'SMS Settings'

    def __str__(self):
        return f"SMS Settings - {self.provider}"


class EmailSetting(TimeStampedModel, SoftDeleteModel):
    """Email configuration for notifications - supports multiple configs per school"""
    from apps.colleges.models import College

    # School/College relation
    school = models.ForeignKey(College, on_delete=models.CASCADE, related_name='email_settings', null=True, blank=True)

    # Email protocol
    email_protocol = models.CharField(max_length=50, choices=[
        ('smtp', 'SMTP'),
        ('sendgrid', 'SendGrid'),
        ('mailgun', 'Mailgun'),
        ('aws_ses', 'AWS SES'),
    ], default='smtp')

    # Email type
    email_type = models.CharField(max_length=50, blank=True, choices=[
        ('notification', 'Notification'),
        ('confirmation', 'Confirmation'),
        ('transactional', 'Transactional'),
        ('marketing', 'Marketing'),
    ])

    # SMTP Configuration
    smtp_host = models.CharField(max_length=255, blank=True)
    smtp_port = models.IntegerField(blank=True, null=True)
    smtp_username = models.CharField(max_length=255, blank=True)
    smtp_password = models.CharField(max_length=500, blank=True)
    smtp_security = models.CharField(max_length=50, blank=True, choices=[
        ('tls', 'TLS'),
        ('ssl', 'SSL'),
        ('none', 'None'),
    ])
    smtp_timeout = models.IntegerField(default=5, help_text="SMTP Timeout in seconds (5-10)")

    # From information
    from_email = models.EmailField()
    from_name = models.CharField(max_length=255)

    # Character set
    charset = models.CharField(max_length=50, default='UTF-8', choices=[
        ('UTF-8', 'UTF-8'),
        ('ISO-8859-1', 'ISO-8859-1'),
        ('ASCII', 'ASCII'),
        ('UTF-16', 'UTF-16'),
    ])

    # Priority
    priority = models.CharField(max_length=20, default='normal', choices=[
        ('low', 'Low'),
        ('normal', 'Normal'),
        ('high', 'High'),
    ])

    # Status
    is_active = models.BooleanField(default=False)
    send_to_parents = models.BooleanField(default=False)
    send_to_students = models.BooleanField(default=False)
    send_to_staff = models.BooleanField(default=False)

    class Meta:
        db_table = 'admin_email_settings'
        verbose_name_plural = 'Email Settings'
        ordering = ['-created_at']
        unique_together = ('school', 'email_protocol', 'email_type')

    def __str__(self):
        school_name = self.school.name if self.school else 'No School'
        return f"Email Settings - {school_name} - {self.email_protocol}"


class AcademicYear(TimeStampedModel, SoftDeleteModel):
    """Academic year configuration - supports multiple schools"""
    from apps.colleges.models import College

    # School/College relation
    school = models.ForeignKey(College, on_delete=models.CASCADE, related_name='academic_years', null=True, blank=True)

    # Academic year information
    year = models.CharField(max_length=20, help_text="e.g., 2023-2024")
    start_date = models.DateField()
    end_date = models.DateField()

    # Status
    is_active = models.BooleanField(default=False, help_text="Currently running academic year")
    is_running = models.BooleanField(default=False, help_text="Is this the current running session")

    # Additional info
    note = models.TextField(blank=True, help_text="Additional notes or remarks")

    class Meta:
        db_table = 'admin_academic_years'
        verbose_name_plural = 'Academic Years'
        ordering = ['-created_at']
        unique_together = ('school', 'year')

    def __str__(self):
        school_name = self.school.name if self.school else 'No School'
        return f"{school_name} - {self.year}"


class ActivityLog(TimeStampedModel):
    """Activity log for system actions"""
    ACTION_TYPES = [
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('export', 'Export'),
        ('import', 'Import'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    action_type = models.CharField(max_length=20, choices=ACTION_TYPES)
    module = models.CharField(max_length=100, help_text="e.g., 'Students', 'Finance'")
    action_description = models.TextField()
    object_id = models.IntegerField(null=True, blank=True, help_text="ID of the affected object")
    object_name = models.CharField(max_length=255, blank=True, help_text="Name/title of affected object")
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    class Meta:
        db_table = 'admin_activity_logs'
        verbose_name_plural = 'Activity Logs'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['action_type', '-created_at']),
        ]

    def __str__(self):
        return f"{self.action_type.upper()} - {self.module} - {self.created_at}"


class Feedback(TimeStampedModel, SoftDeleteModel):
    """Feedback from users"""
    FEEDBACK_TYPES = [
        ('bug', 'Bug Report'),
        ('feature', 'Feature Request'),
        ('improvement', 'Improvement Suggestion'),
        ('complaint', 'Complaint'),
        ('praise', 'Praise'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPES)
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=10, choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], default='medium')
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_feedback')
    resolution_notes = models.TextField(blank=True)

    class Meta:
        db_table = 'admin_feedback'
        verbose_name_plural = 'Feedback'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', '-created_at']),
            models.Index(fields=['user', '-created_at']),
        ]

    def __str__(self):
        return f"{self.title} - {self.status}"


class OpeningHour(TimeStampedModel, SoftDeleteModel):
    """School opening and closing hours"""
    DAYS = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    ]

    day = models.CharField(max_length=20, choices=DAYS, unique=True)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    is_holiday = models.BooleanField(default=False)
    remarks = models.TextField(blank=True)

    class Meta:
        db_table = 'admin_opening_hours'
        verbose_name_plural = 'Opening Hours'
        ordering = ['day']

    def __str__(self):
        status = "Holiday" if self.is_holiday else f"{self.opening_time.strftime('%H:%M')} - {self.closing_time.strftime('%H:%M')}"
        return f"{self.get_day_display()} - {status}"


class Language(TimeStampedModel, SoftDeleteModel):
    """Language configuration - supports predefined and custom languages"""
    code = models.CharField(
        max_length=20,
        unique=True,
        help_text="Language code (e.g., 'en', 'hi', 'ur'). No spaces, capitals, or special characters."
    )
    name = models.CharField(max_length=100, help_text="Language display name (e.g., 'English', 'Hindi')")
    base_language = models.CharField(
        max_length=20,
        default='en',
        help_text="Base language for fallback translations"
    )
    is_default = models.BooleanField(default=False, help_text="Is this a predefined default language?")
    is_active = models.BooleanField(default=True, help_text="Can this language be used?")
    is_custom = models.BooleanField(default=False, help_text="Was this language created by user?")
    rtl_support = models.BooleanField(
        default=False,
        help_text="Enable Right-to-Left support for this language (e.g., Arabic, Urdu, Hebrew)"
    )
    description = models.TextField(blank=True, help_text="Language description/notes")

    class Meta:
        db_table = 'admin_languages'
        verbose_name_plural = 'Languages'
        ordering = ['-is_default', 'name']
        unique_together = ('code',)

    def __str__(self):
        return f"{self.name} ({self.code})"


class LanguageLabel(TimeStampedModel, SoftDeleteModel):
    """Translation labels for each language - supports database-driven translations"""
    language = models.ForeignKey(
        Language,
        on_delete=models.CASCADE,
        related_name='labels',
        help_text="Language for this label"
    )
    label_key = models.CharField(
        max_length=255,
        help_text="Unique identifier for label (e.g., 'btn_submit', 'msg_welcome', 'err_invalid_email')"
    )
    label_value = models.TextField(help_text="Translated text for this label")
    description = models.TextField(blank=True, help_text="Description of what this label is used for")
    is_system = models.BooleanField(
        default=False,
        help_text="Is this a system label? (Cannot be deleted)"
    )

    class Meta:
        db_table = 'admin_language_labels'
        verbose_name_plural = 'Language Labels'
        ordering = ['label_key']
        unique_together = ('language', 'label_key')
        indexes = [
            models.Index(fields=['language', 'label_key']),
            models.Index(fields=['label_key']),
        ]

    def __str__(self):
        return f"{self.language.code}: {self.label_key} = {self.label_value[:50]}"
