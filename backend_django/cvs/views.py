from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import CV, WorkExperience, Education, Skill, Project, Certification
from .serializers import (
    CVSerializer, 
    CVListSerializer,
    CVCreateUpdateSerializer,
    WorkExperienceSerializer,
    EducationSerializer,
    SkillSerializer,
    ProjectSerializer,
    CertificationSerializer
)


class CVViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CV CRUD operations
    """
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    
    def get_queryset(self):
        return CV.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CVListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return CVCreateUpdateSerializer
        return CVSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def analyze(self, request, pk=None):
        """Analyze CV with AI (placeholder for actual AI integration)"""
        cv = self.get_object()
        
        # Placeholder AI analysis - replace with actual AI service
        mock_analysis = {
            'overall_score': 85,
            'strengths': [
                'Strong technical skills section',
                'Clear work experience descriptions',
                'Good use of action verbs'
            ],
            'improvements': [
                'Add more quantifiable achievements',
                'Include relevant certifications',
                'Expand project descriptions'
            ],
            'section_scores': {
                'personal_info': 90,
                'summary': 80,
                'experience': 85,
                'education': 90,
                'skills': 88,
                'projects': 75
            }
        }
        
        cv.ai_rating = mock_analysis['overall_score']
        cv.ai_review = mock_analysis
        cv.save()
        
        return Response({
            'message': 'CV analyzed successfully',
            'analysis': mock_analysis
        })
    
    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        """Create a duplicate of the CV"""
        original_cv = self.get_object()
        
        # Create new CV instance
        new_cv = CV.objects.create(
            user=request.user,
            title=f"{original_cv.title} (Copy)",
            template=original_cv.template,
            full_name=original_cv.full_name,
            email=original_cv.email,
            phone=original_cv.phone,
            location=original_cv.location,
            website=original_cv.website,
            linkedin=original_cv.linkedin,
            github=original_cv.github,
            summary=original_cv.summary
        )
        
        # Copy related objects
        for exp in original_cv.work_experiences.all():
            WorkExperience.objects.create(
                cv=new_cv,
                company=exp.company,
                position=exp.position,
                location=exp.location,
                start_date=exp.start_date,
                end_date=exp.end_date,
                is_current=exp.is_current,
                description=exp.description,
                order=exp.order
            )
        
        for edu in original_cv.education.all():
            Education.objects.create(
                cv=new_cv,
                institution=edu.institution,
                degree=edu.degree,
                field_of_study=edu.field_of_study,
                location=edu.location,
                start_date=edu.start_date,
                end_date=edu.end_date,
                is_current=edu.is_current,
                grade=edu.grade,
                description=edu.description,
                order=edu.order
            )
        
        for skill in original_cv.skills.all():
            Skill.objects.create(
                cv=new_cv,
                name=skill.name,
                category=skill.category,
                level=skill.level,
                order=skill.order
            )
        
        return Response({
            'message': 'CV duplicated successfully',
            'cv': CVSerializer(new_cv).data
        }, status=status.HTTP_201_CREATED)


class WorkExperienceViewSet(viewsets.ModelViewSet):
    """ViewSet for Work Experience CRUD"""
    serializer_class = WorkExperienceSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        cv_id = self.request.query_params.get('cv_id')
        if cv_id:
            return WorkExperience.objects.filter(
                cv_id=cv_id, 
                cv__user=self.request.user
            )
        return WorkExperience.objects.filter(cv__user=self.request.user)


class EducationViewSet(viewsets.ModelViewSet):
    """ViewSet for Education CRUD"""
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        cv_id = self.request.query_params.get('cv_id')
        if cv_id:
            return Education.objects.filter(
                cv_id=cv_id,
                cv__user=self.request.user
            )
        return Education.objects.filter(cv__user=self.request.user)


class SkillViewSet(viewsets.ModelViewSet):
    """ViewSet for Skills CRUD"""
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        cv_id = self.request.query_params.get('cv_id')
        if cv_id:
            return Skill.objects.filter(
                cv_id=cv_id,
                cv__user=self.request.user
            )
        return Skill.objects.filter(cv__user=self.request.user)


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for Projects CRUD"""
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        cv_id = self.request.query_params.get('cv_id')
        if cv_id:
            return Project.objects.filter(
                cv_id=cv_id,
                cv__user=self.request.user
            )
        return Project.objects.filter(cv__user=self.request.user)


class CertificationViewSet(viewsets.ModelViewSet):
    """ViewSet for Certifications CRUD"""
    serializer_class = CertificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        cv_id = self.request.query_params.get('cv_id')
        if cv_id:
            return Certification.objects.filter(
                cv_id=cv_id,
                cv__user=self.request.user
            )
        return Certification.objects.filter(cv__user=self.request.user)
