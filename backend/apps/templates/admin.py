"""Templates admin"""
from django.contrib import admin
from .models import SMSTemplate, EmailTemplate

@admin.register(SMSTemplate)
class SMSTemplateAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'template_type', 'is_active', 'created_at']
    search_fields = ['name', 'content']
    list_filter = ['is_active', 'template_type', 'created_at']

@admin.register(EmailTemplate)
class EmailTemplateAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'template_type', 'subject', 'is_active', 'created_at']
    search_fields = ['name', 'subject', 'content']
    list_filter = ['is_active', 'template_type', 'created_at']
