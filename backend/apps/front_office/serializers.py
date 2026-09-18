"""Front Office serializers"""
from rest_framework import serializers
from .models import VisitorPurpose, Visitor, VisitorInfo, CallLog, PostalDispatch, PostalReceive


# ==================== Visitor Purpose ====================
class VisitorPurposeSerializer(serializers.ModelSerializer):
    """Serializer for Visitor Purpose"""
    class Meta:
        model = VisitorPurpose
        fields = ['id', 'purpose', 'description', 'created_at', 'updated_at']


# ==================== Visitor Info ====================
class VisitorListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for visitor list"""
    purpose_name = serializers.CharField(source='purpose.purpose', read_only=True)
    meet_staff_name = serializers.CharField(source='meet_staff_id.get_full_name', read_only=True, allow_null=True)
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = Visitor
        fields = ['id', 'name', 'phone', 'purpose_name', 'meet_staff_name', 'meet_user_type', 'check_in_date', 'check_in_time', 'check_out_date', 'check_out_time', 'college_name']


class VisitorDetailSerializer(serializers.ModelSerializer):
    """Full serializer for visitor details"""
    purpose_name = serializers.CharField(source='purpose.purpose', read_only=True)
    purpose_id = serializers.IntegerField(source='purpose.id', read_only=True)
    meet_staff_name = serializers.CharField(source='meet_staff_id.get_full_name', read_only=True, allow_null=True)
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = Visitor
        fields = '__all__'


# Backward compatibility
class VisitorInfoSerializer(VisitorDetailSerializer):
    """Backward compatibility alias"""
    class Meta:
        model = VisitorInfo
        fields = '__all__'


# ==================== Call Log ====================
class CallLogListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for call log list"""
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = CallLog
        fields = ['id', 'call_type', 'name', 'phone', 'call_date', 'call_duration', 'follow_up', 'college_name']


class CallLogDetailSerializer(serializers.ModelSerializer):
    """Full serializer for call log details"""
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = CallLog
        fields = '__all__'


# ==================== Postal Dispatch ====================
class PostalDispatchListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for postal dispatch list"""
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = PostalDispatch
        fields = ['id', 'to_title', 'reference_number', 'dispatch_date', 'college_name']


class PostalDispatchDetailSerializer(serializers.ModelSerializer):
    """Full serializer for postal dispatch details"""
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = PostalDispatch
        fields = '__all__'


# ==================== Postal Receive ====================
class PostalReceiveListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for postal receive list"""
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = PostalReceive
        fields = ['id', 'from_title', 'reference_number', 'receive_date', 'receiver_type', 'college_name']


class PostalReceiveDetailSerializer(serializers.ModelSerializer):
    """Full serializer for postal receive details"""
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = PostalReceive
        fields = '__all__'
