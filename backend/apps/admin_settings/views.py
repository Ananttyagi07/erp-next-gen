"""
Views for admin settings management
"""
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.paginator import Paginator
from django.db import models
from .models import (
    GeneralSetting, SchoolPaymentSetting, SMSSetting, EmailSetting,
    AcademicYear, ActivityLog, Feedback, OpeningHour, Language, LanguageLabel
)
from .serializers import (
    GeneralSettingSerializer, SchoolPaymentSettingSerializer, SMSSettingSerializer,
    EmailSettingSerializer, AcademicYearSerializer, ActivityLogSerializer,
    FeedbackListSerializer, FeedbackDetailSerializer, OpeningHourSerializer,
    LanguageSerializer, LanguageListSerializer, LanguageDetailSerializer, LanguageLabelSerializer
)


class GeneralSettingView(APIView):
    """Get or update general school settings"""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            setting = GeneralSetting.objects.first()
            if not setting:
                # Create default settings if none exist
                setting = GeneralSetting.objects.create(
                    brand_title='ERP System',
                    brand_name='Organization Name',
                    currency='USD',
                    currency_symbol='$',
                    timezone='UTC',
                    language='en',
                    theme='light',
                    date_format='DD/MM/YYYY',
                    enable_rtl=False,
                    enable_frontend=True
                )

            serializer = GeneralSettingSerializer(setting)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            setting = GeneralSetting.objects.first()
            if setting:
                serializer = GeneralSettingSerializer(setting, data=request.data, partial=True)
            else:
                serializer = GeneralSettingSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Settings updated successfully',
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class SchoolPaymentSettingView(APIView):
    """Get or update payment settings"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            setting = SchoolPaymentSetting.objects.first()
            if not setting:
                return Response({
                    'success': False,
                    'message': 'No payment settings found'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = SchoolPaymentSettingSerializer(setting)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            setting = SchoolPaymentSetting.objects.first()
            if setting:
                serializer = SchoolPaymentSettingSerializer(setting, data=request.data, partial=True)
            else:
                serializer = SchoolPaymentSettingSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Payment settings updated successfully',
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class SMSSettingView(APIView):
    """Get or update SMS settings"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            setting = SMSSetting.objects.first()
            if not setting:
                return Response({
                    'success': False,
                    'message': 'No SMS settings found'
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = SMSSettingSerializer(setting)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            setting = SMSSetting.objects.first()
            if setting:
                serializer = SMSSettingSerializer(setting, data=request.data, partial=True)
            else:
                serializer = SMSSettingSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'SMS settings updated successfully',
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class EmailSettingViewSet(ModelViewSet):
    """Manage email settings with full CRUD support"""
    queryset = EmailSetting.objects.all()
    serializer_class = EmailSettingSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())

            # Filter by school if provided
            school_id = request.query_params.get('school_id')
            if school_id:
                queryset = queryset.filter(school_id=school_id)

            # Search functionality
            search_term = request.query_params.get('search')
            if search_term:
                queryset = queryset.filter(
                    models.Q(from_name__icontains=search_term) |
                    models.Q(from_email__icontains=search_term) |
                    models.Q(smtp_host__icontains=search_term)
                )

            # Pagination
            page = int(request.query_params.get('page', 1))
            page_size = int(request.query_params.get('page_size', 15))

            paginator = Paginator(queryset, page_size)
            paginated_queryset = paginator.get_page(page)

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response({
                'success': True,
                'data': serializer.data,
                'pagination': {
                    'page': page,
                    'page_size': page_size,
                    'total': paginator.count,
                    'pages': paginator.num_pages
                }
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Email setting created successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Email setting updated successfully',
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()  # Soft delete
            return Response({
                'success': True,
                'message': 'Email setting deleted successfully'
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class AcademicYearViewSet(ModelViewSet):
    """Manage academic years with full CRUD support"""
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())

            # Filter by school if provided
            school_id = request.query_params.get('school_id')
            if school_id:
                queryset = queryset.filter(school_id=school_id)

            # Search functionality
            search_term = request.query_params.get('search')
            if search_term:
                queryset = queryset.filter(
                    models.Q(year__icontains=search_term) |
                    models.Q(note__icontains=search_term)
                )

            # Pagination
            page = int(request.query_params.get('page', 1))
            page_size = int(request.query_params.get('page_size', 15))

            paginator = Paginator(queryset, page_size)
            paginated_queryset = paginator.get_page(page)

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response({
                'success': True,
                'data': serializer.data,
                'pagination': {
                    'page': page,
                    'page_size': page_size,
                    'total': paginator.count,
                    'pages': paginator.num_pages
                }
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Academic year created successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Academic year updated successfully',
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()  # Soft delete
            return Response({
                'success': True,
                'message': 'Academic year deleted successfully'
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class ActivityLogViewSet(ModelViewSet):
    """View activity logs"""
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'head', 'options']

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            page = int(request.query_params.get('page', 1))
            page_size = int(request.query_params.get('page_size', 20))

            paginator = Paginator(queryset, page_size)
            paginated_queryset = paginator.get_page(page)

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response({
                'success': True,
                'data': serializer.data,
                'pagination': {
                    'page': page,
                    'page_size': page_size,
                    'total': paginator.count,
                    'pages': paginator.num_pages
                }
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class FeedbackViewSet(ModelViewSet):
    """Manage user feedback"""
    queryset = Feedback.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return FeedbackDetailSerializer
        return FeedbackListSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            status_filter = request.query_params.get('status')
            if status_filter:
                queryset = queryset.filter(status=status_filter)

            page = int(request.query_params.get('page', 1))
            page_size = int(request.query_params.get('page_size', 10))

            paginator = Paginator(queryset, page_size)
            paginated_queryset = paginator.get_page(page)

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response({
                'success': True,
                'data': serializer.data,
                'pagination': {
                    'page': page,
                    'page_size': page_size,
                    'total': paginator.count,
                    'pages': paginator.num_pages
                }
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class OpeningHourViewSet(ModelViewSet):
    """Manage school opening hours"""
    queryset = OpeningHour.objects.all()
    serializer_class = OpeningHourSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class LanguageViewSet(ModelViewSet):
    """Manage system languages"""
    queryset = Language.objects.all()
    permission_classes = [IsAuthenticated]
    filter_fields = ['is_active', 'is_default', 'is_custom']
    search_fields = ['name', 'code']
    ordering_fields = ['name', 'code', 'is_default']
    ordering = ['-is_default', 'name']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LanguageDetailSerializer
        elif self.action == 'list':
            return LanguageListSerializer
        return LanguageSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())

            # Filter by is_active
            is_active = request.query_params.get('is_active')
            if is_active is not None:
                queryset = queryset.filter(is_active=is_active.lower() == 'true')

            # Filter by is_default
            is_default = request.query_params.get('is_default')
            if is_default is not None:
                queryset = queryset.filter(is_default=is_default.lower() == 'true')

            # Filter by is_custom
            is_custom = request.query_params.get('is_custom')
            if is_custom is not None:
                queryset = queryset.filter(is_custom=is_custom.lower() == 'true')

            # Search
            search = request.query_params.get('search')
            if search:
                queryset = queryset.filter(
                    models.Q(name__icontains=search) |
                    models.Q(code__icontains=search)
                )

            page = int(request.query_params.get('page', 1))
            page_size = int(request.query_params.get('page_size', 20))

            paginator = Paginator(queryset, page_size)
            paginated_queryset = paginator.get_page(page)

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response({
                'success': True,
                'data': serializer.data,
                'pagination': {
                    'page': page,
                    'page_size': page_size,
                    'total': paginator.count,
                    'pages': paginator.num_pages
                }
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Language created successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'success': False,
                'message': 'Invalid data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Language updated successfully',
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'message': 'Invalid data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            # Check if language is in use
            from colleges.models import College
            if instance.colleges.exists() or instance.general_settings.exists():
                return Response({
                    'success': False,
                    'message': 'Cannot delete language that is in use'
                }, status=status.HTTP_400_BAD_REQUEST)

            instance.delete()
            return Response({
                'success': True,
                'message': 'Language deleted successfully'
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class LanguageLabelViewSet(ModelViewSet):
    """Manage language labels/translations"""
    queryset = LanguageLabel.objects.all()
    serializer_class = LanguageLabelSerializer
    permission_classes = [IsAuthenticated]
    filter_fields = ['language', 'is_system']
    search_fields = ['label_key', 'label_value']
    ordering_fields = ['label_key', 'created_at']
    ordering = ['label_key']

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())

            # Filter by language_id
            language_id = request.query_params.get('language_id')
            if language_id:
                queryset = queryset.filter(language_id=language_id)

            # Filter by is_system
            is_system = request.query_params.get('is_system')
            if is_system is not None:
                queryset = queryset.filter(is_system=is_system.lower() == 'true')

            # Search
            search = request.query_params.get('search')
            if search:
                queryset = queryset.filter(
                    models.Q(label_key__icontains=search) |
                    models.Q(label_value__icontains=search)
                )

            page = int(request.query_params.get('page', 1))
            page_size = int(request.query_params.get('page_size', 20))

            paginator = Paginator(queryset, page_size)
            paginated_queryset = paginator.get_page(page)

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response({
                'success': True,
                'data': serializer.data,
                'pagination': {
                    'page': page,
                    'page_size': page_size,
                    'total': paginator.count,
                    'pages': paginator.num_pages
                }
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Label created successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'success': False,
                'message': 'Invalid data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            # Prevent updating system labels
            if instance.is_system:
                return Response({
                    'success': False,
                    'message': 'Cannot update system labels'
                }, status=status.HTTP_400_BAD_REQUEST)

            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Label updated successfully',
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'message': 'Invalid data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            # Prevent deleting system labels
            if instance.is_system:
                return Response({
                    'success': False,
                    'message': 'Cannot delete system labels'
                }, status=status.HTTP_400_BAD_REQUEST)

            instance.delete()
            return Response({
                'success': True,
                'message': 'Label deleted successfully'
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
