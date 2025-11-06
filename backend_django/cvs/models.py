from django.db import models
from django.conf import settings


class CV(models.Model):
    """CV/Resume model"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cvs')
    title = models.CharField(max_length=255)
    template = models.CharField(max_length=100, default='modern')
    
    # Personal Information
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    
    # Professional Summary
    summary = models.TextField(blank=True)
    
    # AI Rating (if CV has been analyzed)
    ai_rating = models.IntegerField(null=True, blank=True)
    ai_review = models.JSONField(null=True, blank=True)  # Stores detailed AI analysis
    
    # File upload
    uploaded_file = models.FileField(upload_to='cvs/', null=True, blank=True)
    
    # Metadata
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cvs'
        ordering = ['-updated_at']
        verbose_name = 'CV'
        verbose_name_plural = 'CVs'
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"


class WorkExperience(models.Model):
    """Work experience entries for a CV"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='work_experiences')
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    order = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'work_experiences'
        ordering = ['order', '-start_date']
    
    def __str__(self):
        return f"{self.position} at {self.company}"


class Education(models.Model):
    """Education entries for a CV"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='education')
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    grade = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'education'
        ordering = ['order', '-start_date']
    
    def __str__(self):
        return f"{self.degree} at {self.institution}"


class Skill(models.Model):
    """Skills for a CV"""
    SKILL_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]
    
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True)  # e.g., 'Technical', 'Soft Skills'
    level = models.CharField(max_length=20, choices=SKILL_LEVELS, default='intermediate')
    order = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'skills'
        ordering = ['order', 'category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.level})"


class Project(models.Model):
    """Projects for a CV"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    description = models.TextField()
    technologies = models.CharField(max_length=500, blank=True)  # Comma-separated
    url = models.URLField(blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'projects'
        ordering = ['order', '-start_date']
    
    def __str__(self):
        return self.title


class Certification(models.Model):
    """Certifications for a CV"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='certifications')
    name = models.CharField(max_length=255)
    issuing_organization = models.CharField(max_length=255)
    issue_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=255, blank=True)
    credential_url = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'certifications'
        ordering = ['order', '-issue_date']
    
    def __str__(self):
        return f"{self.name} - {self.issuing_organization}"
