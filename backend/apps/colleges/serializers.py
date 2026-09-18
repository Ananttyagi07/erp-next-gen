"""
College serializers
"""
from rest_framework import serializers
from .models import College


class CollegeListSerializer(serializers.ModelSerializer):
    """Serializer for listing colleges"""
    class Meta:
        model = College
        fields = ['id', 'name', 'code', 'email', 'phone', 'address', 'admin_logo', 'is_active']


class CollegeCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating colleges"""
    class Meta:
        model = College
        fields = [
            # Basic Information
            'school_url', 'code', 'name', 'address', 'phone', 'registration_date', 'email', 'fax', 'footer',
            # Settings Information
            'currency', 'currency_symbol', 'enable_frontend', 'exam_final_result', 'language', 'theme',
            'online_admission', 'enable_rtl', 'zoom_api_key', 'zoom_secret', 'google_map',
            # Social Information
            'facebook_url', 'twitter_url', 'linkedin_url', 'youtube_url', 'instagram_url', 'pinterest_url',
            # Images
            'frontend_logo', 'admin_logo', 'website', 'established_date', 'principal', 'is_active'
        ]

    def validate_code(self, value):
        """Validate college code uniqueness"""
        if self.instance:
            if College.objects.filter(code=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("College code must be unique")
        else:
            if College.objects.filter(code=value).exists():
                raise serializers.ValidationError("College code must be unique")
        return value

    def validate_school_url(self, value):
        """Validate school URL uniqueness"""
        if self.instance:
            if College.objects.filter(school_url=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("School URL must be unique")
        else:
            if College.objects.filter(school_url=value).exists():
                raise serializers.ValidationError("School URL must be unique")
        return value


class CollegeDetailSerializer(serializers.ModelSerializer):
    """Serializer for detailed college view"""
    class Meta:
        model = College
        fields = [
            'id', 'school_url', 'code', 'name', 'address', 'phone', 'registration_date', 'email', 'fax', 'footer',
            'currency', 'currency_symbol', 'enable_frontend', 'exam_final_result', 'language', 'theme',
            'online_admission', 'enable_rtl', 'zoom_api_key', 'zoom_secret', 'google_map',
            'facebook_url', 'twitter_url', 'linkedin_url', 'youtube_url', 'instagram_url', 'pinterest_url',
            'frontend_logo', 'admin_logo', 'website', 'established_date', 'principal', 'is_active', 'created_at', 'updated_at'
        ]
