from rest_framework import serializers
from .models import CV, WorkExperience, Education, Skill, Project, Certification


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'
        read_only_fields = ('cv',)


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        read_only_fields = ('cv',)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        read_only_fields = ('cv',)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('cv',)


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'
        read_only_fields = ('cv',)


class CVSerializer(serializers.ModelSerializer):
    work_experiences = WorkExperienceSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    
    class Meta:
        model = CV
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')


class CVListSerializer(serializers.ModelSerializer):
    """Simplified serializer for CV list view"""
    skills_count = serializers.SerializerMethodField()
    experience_count = serializers.SerializerMethodField()
    
    class Meta:
        model = CV
        fields = ('id', 'title', 'template', 'full_name', 'ai_rating', 
                  'is_active', 'created_at', 'updated_at', 'skills_count', 'experience_count')
    
    def get_skills_count(self, obj):
        return obj.skills.count()
    
    def get_experience_count(self, obj):
        return obj.work_experiences.count()


class CVCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating CVs"""
    
    class Meta:
        model = CV
        exclude = ('user', 'created_at', 'updated_at')
