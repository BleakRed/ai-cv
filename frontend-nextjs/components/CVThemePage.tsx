
"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Check, 
  Search, 
  Star, 
  Sparkles, 
  Crown,
  ArrowLeft,
  Download,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Link from "next/link";

interface CVThemePageProps {
  onNavigate: (page: string) => void;
}

interface CVTemplate {
  id: number;
  name: string;
  category: string;
  description: string;
  isPremium: boolean;
  isFeatured: boolean;
  color: string;
  preview: string;
}

export function CVThemePage({ onNavigate }: CVThemePageProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const templates: CVTemplate[] = [
    {
      id: 1,
      name: "Professional",
      category: "Classic",
      description: "Clean and traditional layout perfect for corporate roles",
      isPremium: false,
      isFeatured: true,
      color: "bg-blue-500",
      preview: "modern"
    },
    {
      id: 2,
      name: "Modern Minimalist",
      category: "Modern",
      description: "Simple, elegant design with focus on content",
      isPremium: false,
      isFeatured: false,
      color: "bg-gray-500",
      preview: "minimalist"
    },
    {
      id: 3,
      name: "Executive",
      category: "Modern",
      description: "Bold, executive-level design with visual hierarchy",
      isPremium: true,
      isFeatured: true,
      color: "bg-purple-500",
      preview: "executive"
    },
    {
      id: 4,
      name: "Creative",
      category: "Creative",
      description: "Eye-catching design for creative professionals",
      isPremium: false,
      isFeatured: false,
      color: "bg-pink-500",
      preview: "creative"
    },
    {
      id: 5,
      name: "Technical",
      category: "Modern",
      description: "Structured layout ideal for tech roles",
      isPremium: false,
      isFeatured: false,
      color: "bg-green-500",
      preview: "technical"
    },
    {
      id: 6,
      name: "Designer Pro",
      category: "Creative",
      description: "Portfolio-style design for designers and creatives",
      isPremium: true,
      isFeatured: false,
      color: "bg-orange-500",
      preview: "designer"
    },
    {
      id: 7,
      name: "Academic",
      category: "Classic",
      description: "Traditional format for academic and research positions",
      isPremium: false,
      isFeatured: false,
      color: "bg-indigo-500",
      preview: "academic"
    },
    {
      id: 8,
      name: "Startup",
      category: "Modern",
      description: "Dynamic layout for startup and entrepreneurial roles",
      isPremium: true,
      isFeatured: true,
      color: "bg-teal-500",
      preview: "startup"
    },
    {
      id: 9,
      name: "Classic",
      category: "Classic",
      description: "Timeless design that never goes out of style",
      isPremium: false,
      isFeatured: false,
      color: "bg-slate-600",
      preview: "classic"
    }
  ];

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const templatesByCategory = (category: string) =>
    filteredTemplates.filter((t) => t.category === category);

  const allTemplates = filteredTemplates;
  const modernTemplates = templatesByCategory("Modern");
  const classicTemplates = templatesByCategory("Classic");
  const creativeTemplates = templatesByCategory("Creative");

  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      alert(`Using template #${selectedTemplate}. Redirecting to CV builder...`);
      onNavigate('cv-create');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Choose Your CV Template</h1>
          <p className="text-muted-foreground">
            Select a professional template that best represents your style
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Templates Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              All Templates ({allTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="modern">
              Modern ({modernTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="classic">
              Classic ({classicTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="creative">
              Creative ({creativeTemplates.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {allTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="modern" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {modernTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="classic" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {classicTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {creativeTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-12 flex gap-4 justify-center">
          <Link href="/dashboard" passHref>
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          </Link>
          <Button 
            onClick={handleUseTemplate} 
            disabled={!selectedTemplate}
          >
            <Check className="w-4 h-4 mr-2" />
            Use Selected Template
          </Button>
          {selectedTemplate && (
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: CVTemplate;
  isSelected: boolean;
  onSelect: (id: number) => void;
}) {
  return (
    <Card
      className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => onSelect(template.id)}
    >
      {/* Preview */}
      <div className={`h-64 ${template.color} relative flex items-center justify-center`}>
        <div className="w-3/4 h-3/4 bg-white rounded shadow-xl flex flex-col gap-2 p-4">
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-2/3"></div>
          <div className="mt-2 space-y-1">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
            <div className="h-2 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {template.isFeatured && (
            <Badge className="bg-yellow-500">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {template.isPremium && (
            <Badge className="bg-purple-500">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>

        {/* Selected Check */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4>{template.name}</h4>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
    </Card>
  );
}
