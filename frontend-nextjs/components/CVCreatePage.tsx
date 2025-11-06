
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Plus, Trash2, Download, Sparkles, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CVCreatePageProps {
  onNavigate: (page: string) => void;
}

interface WorkExperience {
  id: number;
  title: string;
  company: string;
  dates: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

interface Skill {
  id: number;
  name: string;
  level: string;
  category: string;
}

export function CVCreatePage({ onNavigate }: CVCreatePageProps) {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
  });

  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  
  const [personalSkills, setPersonalSkills] = useState<Skill[]>([
    { id: 1, name: "", level: "Intermediate", category: "Technical" },
  ]);

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    { id: 1, title: "", company: "", dates: "", description: "" },
  ]);

  const [education, setEducation] = useState<Education[]>([
    { id: 1, degree: "", institution: "", year: "" },
  ]);

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      { id: Date.now(), title: "", company: "", dates: "", description: "" },
    ]);
  };

  const removeWorkExperience = (id: number) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
  };

  const updateWorkExperience = (id: number, field: string, value: string) => {
    setWorkExperiences(
      workExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now(), degree: "", institution: "", year: "" },
    ]);
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: number, field: string, value: string) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const addPersonalSkill = () => {
    setPersonalSkills([
      ...personalSkills,
      { id: Date.now(), name: "", level: "Intermediate", category: "Technical" },
    ]);
  };

  const removePersonalSkill = (id: number) => {
    setPersonalSkills(personalSkills.filter((skill) => skill.id !== id));
  };

  const updatePersonalSkill = (id: number, field: string, value: string) => {
    setPersonalSkills(
      personalSkills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleExport = () => {
    alert("Export functionality - would generate PDF/DOCX file");
  };

  const handleAIAssist = () => {
    alert("AI assistance - would provide suggestions for current section");
  };

  const handleSave = () => {
    alert("CV saved successfully!");
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Create Your CV</h1>
            <p className="text-muted-foreground">
              Build a professional CV with AI-powered suggestions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAIAssist}>
              <Sparkles className="w-4 h-4 mr-2" />
              AI Assist
            </Button>
            <Button onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export CV
            </Button>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="p-8">
              <h3 className="mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={personalInfo.fullName}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={personalInfo.phone}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="San Francisco, CA"
                      value={personalInfo.location}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/johndoe"
                    value={personalInfo.linkedin}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, linkedin: e.target.value })
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Professional Summary */}
          <TabsContent value="summary">
            <Card className="p-8">
              <h3 className="mb-2">Professional Summary</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Write a brief overview of your professional background and key strengths
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Experienced software engineer with 5+ years of expertise in full-stack development..."
                    rows={8}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Keep it concise (3-5 sentences) and highlight your most relevant achievements
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="JavaScript, React, Node.js, Python, AWS, Team Leadership..."
                    rows={4}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate skills with commas. Include both technical and soft skills
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Work Experience */}
          <TabsContent value="experience">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3>Work Experience</h3>
                <Button onClick={addWorkExperience} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>

              <div className="space-y-6">
                {workExperiences.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {index > 0 && <div className="border-t pt-6 mb-6" />}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Job Title *</Label>
                            <Input
                              placeholder="Senior Software Engineer"
                              value={exp.title}
                              onChange={(e) =>
                                updateWorkExperience(exp.id, "title", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Company *</Label>
                            <Input
                              placeholder="Tech Corp Inc."
                              value={exp.company}
                              onChange={(e) =>
                                updateWorkExperience(exp.id, "company", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        {workExperiences.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeWorkExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Dates</Label>
                        <Input
                          placeholder="Jan 2020 - Present"
                          value={exp.dates}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "dates", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description & Achievements</Label>
                        <Textarea
                          placeholder="• Led development of..."
                          rows={4}
                          value={exp.description}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "description", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3>Education</h3>
                <Button onClick={addEducation} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative">
                    {index > 0 && <div className="border-t pt-6 mb-6" />}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="space-y-2">
                            <Label>Degree *</Label>
                            <Input
                              placeholder="Bachelor of Science in Computer Science"
                              value={edu.degree}
                              onChange={(e) =>
                                updateEducation(edu.id, "degree", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Institution *</Label>
                              <Input
                                placeholder="University of California"
                                value={edu.institution}
                                onChange={(e) =>
                                  updateEducation(edu.id, "institution", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Year</Label>
                              <Input
                                placeholder="2018"
                                value={edu.year}
                                onChange={(e) =>
                                  updateEducation(edu.id, "year", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {education.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Personal Skills */}
          <TabsContent value="skills">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3>Skills & Competencies</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your technical and professional skills with proficiency levels
                  </p>
                </div>
                <Button onClick={addPersonalSkill} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>

              <div className="space-y-4">
                {personalSkills.map((skill, index) => (
                  <div key={skill.id} className="relative">
                    {index > 0 && <div className="border-t pt-4 mb-4" />}
                    <div className="flex items-start gap-4">
                      <div className="flex-1 grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Skill Name *</Label>
                          <Input
                            placeholder="e.g., JavaScript, Project Management"
                            value={skill.name}
                            onChange={(e) =>
                              updatePersonalSkill(skill.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select
                            value={skill.category}
                            onValueChange={(value) =>
                              updatePersonalSkill(skill.id, "category", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technical">Technical</SelectItem>
                              <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                              <SelectItem value="Language">Language</SelectItem>
                              <SelectItem value="Tool">Tool</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Proficiency Level</Label>
                          <Select
                            value={skill.level}
                            onValueChange={(value) =>
                              updatePersonalSkill(skill.id, "level", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {personalSkills.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePersonalSkill(skill.id)}
                          className="mt-8"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="text-sm mb-2">Tips for Skills Section:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Focus on skills relevant to your target role</li>
                  <li>• Be honest about your proficiency level</li>
                  <li>• Include both technical and soft skills</li>
                  <li>• Group similar skills in the same category</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Actions */}
        <div className="mt-8 flex gap-4 justify-between">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Save as Draft
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onNavigate('cv-theme')}>
              <Palette className="w-4 h-4 mr-2" />
              Choose Theme
            </Button>
            <Button variant="outline" onClick={() => onNavigate('rating-example')}>
              Get AI Rating
            </Button>
            <Button onClick={handleSave}>
              <Download className="w-4 h-4 mr-2" />
              Save CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
