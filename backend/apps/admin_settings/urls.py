"""
URL patterns for admin settings
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GeneralSettingView, SchoolPaymentSettingView, SMSSettingView, EmailSettingViewSet,
    AcademicYearViewSet, ActivityLogViewSet, FeedbackViewSet, OpeningHourViewSet,
    LanguageViewSet, LanguageLabelViewSet
)

router = DefaultRouter()
router.register(r'academic-years', AcademicYearViewSet, basename='academic-year')
router.register(r'activity-logs', ActivityLogViewSet, basename='activity-log')
router.register(r'feedback', FeedbackViewSet, basename='feedback')
router.register(r'opening-hours', OpeningHourViewSet, basename='opening-hour')
router.register(r'email-settings', EmailSettingViewSet, basename='email-setting')
router.register(r'languages', LanguageViewSet, basename='language')
router.register(r'language-labels', LanguageLabelViewSet, basename='language-label')

app_name = 'admin_settings'

urlpatterns = [
    path('general/', GeneralSettingView.as_view(), name='general-setting'),
    path('payment/', SchoolPaymentSettingView.as_view(), name='payment-setting'),
    path('sms/', SMSSettingView.as_view(), name='sms-setting'),
    path('', include(router.urls)),
]
