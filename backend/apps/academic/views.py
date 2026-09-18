"""Academic views"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SchoolClass, ClassSection, Subject, Syllabus, StudyMaterial
from .serializers import (SchoolClassSerializer, ClassSectionSerializer, SubjectSerializer,
                          SyllabusSerializer, StudyMaterialSerializer)


class CollegeScopedViewSet(viewsets.ModelViewSet):
    """Filters list/detail results to the branch selected via X-School-Id."""

    def get_queryset(self):
        queryset = super().get_queryset()
        college_id = self.request.headers.get('X-School-Id')
        if college_id:
            queryset = queryset.filter(college_id=college_id)
        return queryset


class SchoolClassViewSet(CollegeScopedViewSet):
    permission_classes = [IsAuthenticated]
    queryset = SchoolClass.objects.select_related('college', 'class_teacher').all()
    serializer_class = SchoolClassSerializer


class ClassSectionViewSet(CollegeScopedViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ClassSection.objects.select_related('school_class', 'section_teacher', 'college').all()
    serializer_class = ClassSectionSerializer


class SubjectViewSet(CollegeScopedViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Subject.objects.select_related('school_class', 'teacher', 'college').all()
    serializer_class = SubjectSerializer


class SyllabusViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Syllabus.objects.select_related('school_class', 'subject', 'college').all()
    serializer_class = SyllabusSerializer


class StudyMaterialViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = StudyMaterial.objects.select_related('school_class', 'subject', 'college').all()
    serializer_class = StudyMaterialSerializer
