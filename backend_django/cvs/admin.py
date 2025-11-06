from django.contrib import admin
from .models import CV, WorkExperience, Education, Skill, Project, Certification


class WorkExperienceInline(admin.TabularInline):
    model = WorkExperience
    extra = 0


class EducationInline(admin.TabularInline):
    model = Education
    extra = 0


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 0


@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'full_name', 'template', 'ai_rating', 'is_active', 'created_at')
    list_filter = ('template', 'is_active', 'created_at')
    search_fields = ('title', 'full_name', 'user__username', 'user__email')
    inlines = [WorkExperienceInline, EducationInline, SkillInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('user', 'title', 'template', 'is_active')
        }),
        ('Personal Details', {
            'fields': ('full_name', 'email', 'phone', 'location', 'website', 'linkedin', 'github')
        }),
        ('Professional Summary', {
            'fields': ('summary',)
        }),
        ('AI Analysis', {
            'fields': ('ai_rating', 'ai_review')
        }),
        ('File Upload', {
            'fields': ('uploaded_file',)
        }),
    )


@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'cv', 'start_date', 'end_date', 'is_current')
    list_filter = ('is_current', 'start_date')
    search_fields = ('position', 'company', 'cv__title')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'cv', 'start_date', 'end_date')
    list_filter = ('is_current', 'start_date')
    search_fields = ('degree', 'institution', 'cv__title')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'cv')
    list_filter = ('level', 'category')
    search_fields = ('name', 'cv__title')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'cv', 'start_date', 'end_date')
    search_fields = ('title', 'cv__title')


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuing_organization', 'cv', 'issue_date')
    search_fields = ('name', 'issuing_organization', 'cv__title')
