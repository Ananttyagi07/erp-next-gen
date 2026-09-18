"""Admin configuration for dashboard"""
from django.contrib import admin
from .models import DashboardActivity


@admin.register(DashboardActivity)
class DashboardActivityAdmin(admin.ModelAdmin):
    list_display = ('id', 'activity_type', 'description', 'timestamp', 'user')
    list_filter = ('activity_type', 'timestamp', 'user')
    search_fields = ('description', 'user__username')
    ordering = ('-timestamp',)
    readonly_fields = ('timestamp',)

    fieldsets = (
        ('Activity Information', {
            'fields': ('activity_type', 'description', 'user')
        }),
        ('Related Object', {
            'fields': ('related_object_type', 'related_object_id')
        }),
        ('Metadata', {
            'fields': ('timestamp',)
        }),
    )
