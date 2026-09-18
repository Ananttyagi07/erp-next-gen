"""URL configuration for dashboard endpoints"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardViewSet

router = DefaultRouter()
router.register(r'', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
    # Alternative direct paths for dashboard endpoints
    path('stats/', DashboardViewSet.as_view({'get': 'stats'}), name='dashboard-stats'),
    path('enrollment-trend/', DashboardViewSet.as_view({'get': 'enrollment_trend'}), name='dashboard-enrollment'),
    path('revenue-trend/', DashboardViewSet.as_view({'get': 'revenue_trend'}), name='dashboard-revenue'),
    path('recent-activities/', DashboardViewSet.as_view({'get': 'recent_activities'}), name='dashboard-activities'),
]
