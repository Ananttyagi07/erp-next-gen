"""Front Office views"""
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import VisitorPurpose, Visitor, VisitorInfo, CallLog, PostalDispatch, PostalReceive
from .serializers import (
    VisitorPurposeSerializer, VisitorListSerializer, VisitorDetailSerializer,
    VisitorInfoSerializer, CallLogListSerializer, CallLogDetailSerializer,
    PostalDispatchListSerializer, PostalDispatchDetailSerializer,
    PostalReceiveListSerializer, PostalReceiveDetailSerializer
)


class VisitorPurposeViewSet(viewsets.ModelViewSet):
    """ViewSet for Visitor Purpose management"""
    permission_classes = [IsAuthenticated]
    queryset = VisitorPurpose.objects.select_related('college').all()
    serializer_class = VisitorPurposeSerializer

    def get_queryset(self):
        """Filter by college_id if provided"""
        queryset = super().get_queryset()
        college_id = self.request.query_params.get('college_id')
        if college_id:
            queryset = queryset.filter(college_id=college_id)
        return queryset


class VisitorViewSet(viewsets.ModelViewSet):
    """ViewSet for Visitor management"""
    permission_classes = [IsAuthenticated]
    queryset = Visitor.objects.select_related('purpose', 'meet_staff_id', 'college').all()

    def get_queryset(self):
        """Filter by college_id if provided"""
        queryset = super().get_queryset()
        college_id = self.request.query_params.get('college_id')
        if college_id:
            queryset = queryset.filter(college_id=college_id)
        return queryset

    def get_serializer_class(self):
        """Use different serializers for list vs detail"""
        if self.action == 'list':
            return VisitorListSerializer
        return VisitorDetailSerializer


class VisitorInfoViewSet(VisitorViewSet):
    """Backward compatibility alias for VisitorViewSet"""
    queryset = VisitorInfo.objects.select_related('purpose', 'meet_staff_id', 'college').all()

    def get_serializer_class(self):
        """Use different serializers for list vs detail"""
        if self.action == 'list':
            return VisitorListSerializer
        return VisitorInfoSerializer


class CallLogViewSet(viewsets.ModelViewSet):
    """ViewSet for Call Log management"""
    permission_classes = [IsAuthenticated]
    queryset = CallLog.objects.select_related('college').all()

    def get_queryset(self):
        """Filter by college_id if provided"""
        queryset = super().get_queryset()
        college_id = self.request.query_params.get('college_id')
        if college_id:
            queryset = queryset.filter(college_id=college_id)
        return queryset

    def get_serializer_class(self):
        """Use different serializers for list vs detail"""
        if self.action == 'list':
            return CallLogListSerializer
        return CallLogDetailSerializer


class PostalDispatchViewSet(viewsets.ModelViewSet):
    """ViewSet for Postal Dispatch management"""
    permission_classes = [IsAuthenticated]
    queryset = PostalDispatch.objects.select_related('college').all()

    def get_queryset(self):
        """Filter by college_id if provided"""
        queryset = super().get_queryset()
        college_id = self.request.query_params.get('college_id')
        if college_id:
            queryset = queryset.filter(college_id=college_id)
        return queryset

    def get_serializer_class(self):
        """Use different serializers for list vs detail"""
        if self.action == 'list':
            return PostalDispatchListSerializer
        return PostalDispatchDetailSerializer


class PostalReceiveViewSet(viewsets.ModelViewSet):
    """ViewSet for Postal Receive management"""
    permission_classes = [IsAuthenticated]
    queryset = PostalReceive.objects.select_related('college').all()

    def get_queryset(self):
        """Filter by college_id if provided"""
        queryset = super().get_queryset()
        college_id = self.request.query_params.get('college_id')
        if college_id:
            queryset = queryset.filter(college_id=college_id)
        return queryset

    def get_serializer_class(self):
        """Use different serializers for list vs detail"""
        if self.action == 'list':
            return PostalReceiveListSerializer
        return PostalReceiveDetailSerializer
