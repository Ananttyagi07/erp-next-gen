"""
College models for multi-college support within a university
"""
from django.db import models
from apps.core.models import TimeStampedModel


class College(TimeStampedModel):
    """
    Model representing a college/branch within the university
    Each university can have multiple colleges
    Mapped to existing database schema (no soft delete columns)
    """
    # Basic Information
    school_url = models.SlugField(max_length=255, unique=True, null=True, blank=True, help_text="School URL (no spaces, capitals, or special chars)")
    code = models.CharField(max_length=50, unique=True, db_index=True)
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    registration_date = models.DateField(null=True, blank=True)
    email = models.EmailField(blank=True, null=True)
    fax = models.CharField(max_length=20, blank=True, null=True)
    footer = models.TextField(blank=True, null=True)

    # Settings Information
    currency = models.CharField(max_length=10, default='USD', blank=True)
    currency_symbol = models.CharField(max_length=5, default='$', blank=True, null=True)
    enable_frontend = models.BooleanField(default=True)
    exam_final_result = models.CharField(
        max_length=100,
        default='Average of All Exam',
        choices=[
            ('Average of All Exam', 'Average of All Exam'),
            ('Highest Exam', 'Highest Exam'),
            ('Lowest Exam', 'Lowest Exam'),
            ('Percentage', 'Percentage'),
        ]
    )
    language = models.ForeignKey(
        'admin_settings.Language',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='colleges',
        help_text="College-specific language setting"
    )
    theme = models.CharField(max_length=50, default='light', blank=True)
    online_admission = models.BooleanField(default=False)
    enable_rtl = models.BooleanField(default=False)
    zoom_api_key = models.CharField(max_length=500, blank=True, null=True)
    zoom_secret = models.CharField(max_length=500, blank=True, null=True)
    google_map = models.TextField(blank=True, null=True, help_text="Google Map embed code")

    # Social Information
    facebook_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    pinterest_url = models.URLField(blank=True, null=True)

    # Images/Logos
    frontend_logo = models.ImageField(upload_to='school_logos/frontend/', blank=True, null=True, help_text="Max-W: 150px, Max-H: 90px")
    admin_logo = models.ImageField(upload_to='school_logos/admin/', blank=True, null=True, help_text="Max-W: 100px, Max-H: 110px")

    # Legacy fields
    website = models.URLField(blank=True, null=True)
    established_date = models.DateField(null=True, blank=True)

    # Principal/Head of College (will be set after User model is created)
    principal = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='principal_id',
        related_name='college_principal_of'
    )

    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        db_table = 'colleges'
        ordering = ['name']
        verbose_name = 'College'
        verbose_name_plural = 'Colleges'

    def __str__(self):
        return f"{self.name} ({self.code})"


class Department(TimeStampedModel):
    """
    Academic department within a college
    Mapped to existing database schema (no soft delete columns)
    """
    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        related_name='departments'
    )
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    # Head of Department
    head = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='head_id',
        related_name='department_head_of'
    )

    class Meta:
        db_table = 'departments'
        ordering = ['college', 'name']
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'
        indexes = [
            models.Index(fields=['college']),
        ]

    def __str__(self):
        return f"{self.college.code} - {self.name}" if self.college else self.name
