"""
Serializers for admin settings
"""
from rest_framework import serializers
from .models import (
    GeneralSetting, SchoolPaymentSetting, SMSSetting, EmailSetting,
    AcademicYear, ActivityLog, Feedback, OpeningHour, Language, LanguageLabel
)


class GeneralSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralSetting
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class SchoolPaymentSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolPaymentSetting
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class SMSSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSSetting
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class EmailSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSetting
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class ActivityLogSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = ActivityLog
        fields = ['id', 'user', 'user_name', 'user_email', 'action_type', 'module',
                  'action_description', 'object_id', 'object_name', 'ip_address', 'user_agent', 'created_at']
        read_only_fields = ['created_at']


class FeedbackListSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.get_full_name', read_only=True)

    class Meta:
        model = Feedback
        fields = ['id', 'user', 'user_name', 'feedback_type', 'title', 'status',
                  'priority', 'assigned_to', 'assigned_to_name', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class FeedbackDetailSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.get_full_name', read_only=True)

    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class OpeningHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHour
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class LanguageLabelSerializer(serializers.ModelSerializer):
    """Serializer for language labels/translations"""
    language_name = serializers.CharField(source='language.name', read_only=True)
    language_code = serializers.CharField(source='language.code', read_only=True)

    class Meta:
        model = LanguageLabel
        fields = ['id', 'language', 'language_name', 'language_code', 'label_key', 'label_value', 'description', 'is_system', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'is_system']


class LanguageDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for Language with labels"""
    labels = LanguageLabelSerializer(many=True, read_only=True)
    label_count = serializers.SerializerMethodField()

    class Meta:
        model = Language
        fields = ['id', 'code', 'name', 'base_language', 'is_default', 'is_active', 'is_custom', 'rtl_support', 'description', 'labels', 'label_count', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def get_label_count(self, obj):
        return obj.labels.filter(is_deleted=False).count()


class LanguageListSerializer(serializers.ModelSerializer):
    """Simple serializer for Language listing"""
    label_count = serializers.SerializerMethodField()
    is_in_use = serializers.SerializerMethodField()

    class Meta:
        model = Language
        fields = ['id', 'code', 'name', 'is_default', 'is_active', 'is_custom', 'rtl_support', 'label_count', 'is_in_use', 'created_at']
        read_only_fields = ['created_at']

    def get_label_count(self, obj):
        return obj.labels.filter(is_deleted=False).count()

    def get_is_in_use(self, obj):
        """Check if language is being used by any college or general setting"""
        try:
            from .models import GeneralSetting
            from apps.colleges.models import College

            in_general_settings = GeneralSetting.objects.filter(language_id=obj.id).exists()
            in_colleges = College.objects.filter(language_id=obj.id).exists()

            return in_general_settings or in_colleges
        except Exception as e:
            # If import fails, just return False to avoid breaking the serializer
            return False


class LanguageSerializer(serializers.ModelSerializer):
    """Basic serializer for Language CRUD operations"""
    class Meta:
        model = Language
        fields = ['id', 'code', 'name', 'base_language', 'is_default', 'is_active', 'is_custom', 'rtl_support', 'description', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
