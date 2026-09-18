"""
College management views
"""
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import College
from .serializers import CollegeListSerializer, CollegeCreateSerializer, CollegeDetailSerializer


class CollegeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for College
    Provides CRUD operations for College
    """
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['name', 'code']
    ordering_fields = '__all__'
    ordering = ['name']

    def get_queryset(self):
        """Filter by college for multi-tenancy"""
        queryset = College.objects.all()
        return queryset

    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return CollegeListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return CollegeCreateSerializer
        return CollegeDetailSerializer

    def perform_destroy(self, instance):
        """Mark college as inactive instead of deleting"""
        instance.is_active = False
        instance.save()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
