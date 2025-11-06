from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CVViewSet,
    WorkExperienceViewSet,
    EducationViewSet,
    SkillViewSet,
    ProjectViewSet,
    CertificationViewSet
)

router = DefaultRouter()
router.register(r'', CVViewSet, basename='cv')
router.register(r'work-experience', WorkExperienceViewSet, basename='work-experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'certifications', CertificationViewSet, basename='certification')

urlpatterns = [
    path('', include(router.urls)),
]
