'use client';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Home, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  Star, 
  FilePlus,
  ArrowRight,
  User,
  Upload,
  Download,
  Layers,
  Database
} from "lucide-react";

interface WireframeOverviewProps {
  onViewPage: (page: string) => void;
}

export function WireframeOverview({ onViewPage }: WireframeOverviewProps) {
  const pages = [
    {
      id: 'home',
      name: 'Homepage',
      icon: Home,
      description: 'Landing page with features and CTA',
      sections: ['Hero', 'Features Grid', 'How It Works', 'CTA Section'],
      color: 'bg-blue-500/10 border-blue-500/20',
      iconColor: 'text-blue-500',
    },
    {
      id: 'login',
      name: 'Login Page',
      icon: LogIn,
      description: 'User authentication',
      sections: ['Email Input', 'Password Input', 'Login Button', 'Sign Up Link'],
      color: 'bg-green-500/10 border-green-500/20',
      iconColor: 'text-green-500',
    },
    {
      id: 'register',
      name: 'Register Page',
      icon: UserPlus,
      description: 'New user registration',
      sections: ['Full Name', 'Email', 'Password', 'Confirm Password', 'Sign Up Button'],
      color: 'bg-green-500/10 border-green-500/20',
      iconColor: 'text-green-500',
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      description: 'User dashboard with CV management',
      sections: ['Quick Actions', 'CV List', 'Import/Export', 'Statistics'],
      color: 'bg-purple-500/10 border-purple-500/20',
      iconColor: 'text-purple-500',
      protected: true,
    },
    {
      id: 'rating-example',
      name: 'CV Rating',
      icon: Star,
      description: 'AI-powered CV analysis and review',
      sections: ['Overall Score', 'Category Breakdown', 'Strengths', 'Improvements', 'AI Insights'],
      color: 'bg-yellow-500/10 border-yellow-500/20',
      iconColor: 'text-yellow-500',
    },
    {
      id: 'cv-create',
      name: 'CV Builder',
      icon: FilePlus,
      description: 'Create and edit CV with AI assistance',
      sections: ['Personal Info', 'Summary', 'Work Experience', 'Education'],
      color: 'bg-orange-500/10 border-orange-500/20',
      iconColor: 'text-orange-500',
      protected: true,
    },
  ];

  const flows = [
    {
      name: 'User Registration Flow',
      steps: ['home', 'register', 'dashboard'],
      color: 'border-green-500',
    },
    {
      name: 'CV Creation Flow',
      steps: ['dashboard', 'cv-create', 'rating-example'],
      color: 'border-orange-500',
    },
    {
      name: 'Guest Experience',
      steps: ['home', 'rating-example', 'register'],
      color: 'border-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm">Design System Preview</span>
          </div>
          <h1 className="mb-4">AI CV Pro - Site Wireframe</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Complete website structure with 6 pages including authentication, dashboard, 
            CV creation, and AI-powered rating system
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => onViewPage('canvas')} variant="outline">
              <Layers className="w-4 h-4 mr-2" />
              View Design Canvas
            </Button>
            <Button onClick={() => onViewPage('database')} variant="outline">
              <Database className="w-4 h-4 mr-2" />
              View Database Schema
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 text-center">
            <div className="text-3xl mb-1">6</div>
            <p className="text-sm text-muted-foreground">Total Pages</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-1">3</div>
            <p className="text-sm text-muted-foreground">User Flows</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-1">2</div>
            <p className="text-sm text-muted-foreground">Auth Pages</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-1">4</div>
            <p className="text-sm text-muted-foreground">Main Features</p>
          </Card>
        </div>

        {/* Pages Grid */}
        <div className="mb-16">
          <h2 className="mb-6">Page Structure</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Card 
                key={page.id}
                className={`p-6 ${page.color} border-2 hover:shadow-lg transition-all cursor-pointer group`}
                onClick={() => onViewPage(page.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${page.color} rounded-lg flex items-center justify-center`}>
                    <page.icon className={`w-6 h-6 ${page.iconColor}`} />
                  </div>
                  {page.protected && (
                    <Badge variant="secondary" className="text-xs">
                      Protected
                    </Badge>
                  )}
                </div>
                
                <h3 className="mb-2">{page.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {page.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <p className="text-xs uppercase text-muted-foreground">Sections:</p>
                  <div className="flex flex-wrap gap-1">
                    {page.sections.map((section, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full group-hover:bg-background/50"
                >
                  View Page
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* User Flows */}
        <div className="mb-16">
          <h2 className="mb-6">User Flows</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {flows.map((flow, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="mb-4">{flow.name}</h3>
                <div className="space-y-3">
                  {flow.steps.map((step, stepIdx) => {
                    const page = pages.find(p => p.id === step);
                    return (
                      <div key={stepIdx}>
                        <div 
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 ${page?.color} cursor-pointer hover:shadow-md transition-shadow`}
                          onClick={() => onViewPage(step)}
                        >
                          {page && <page.icon className={`w-4 h-4 ${page.iconColor}`} />}
                          <span className="text-sm">{page?.name}</span>
                        </div>
                        {stepIdx < flow.steps.length - 1 && (
                          <div className="flex justify-center py-1">
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <User className="w-8 h-8 text-primary mb-3" />
              <h4 className="mb-2">Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Complete login and registration system with form validation
              </p>
            </Card>
            <Card className="p-6">
              <Star className="w-8 h-8 text-primary mb-3" />
              <h4 className="mb-2">AI Rating</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive CV analysis with scores and detailed feedback
              </p>
            </Card>
            <Card className="p-6">
              <FilePlus className="w-8 h-8 text-primary mb-3" />
              <h4 className="mb-2">CV Builder</h4>
              <p className="text-sm text-muted-foreground">
                Multi-section form builder with AI assistance
              </p>
            </Card>
            <Card className="p-6">
              <Upload className="w-8 h-8 text-primary mb-3" />
              <h4 className="mb-2">Import/Export</h4>
              <p className="text-sm text-muted-foreground">
                Upload existing CVs and export in multiple formats
              </p>
            </Card>
          </div>
        </div>

        {/* Technical Stack */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10">
          <h2 className="mb-4">Technical Implementation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="mb-2">Frontend</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• React with TypeScript</li>
                <li>• Tailwind CSS v4</li>
                <li>• Shadcn/ui Components</li>
                <li>• Responsive Design</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2">Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mock Authentication</li>
                <li>• Dynamic Routing</li>
                <li>• Form Management</li>
                <li>• AI Simulations</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2">Ready for Backend</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Supabase Integration</li>
                <li>• User Management</li>
                <li>• File Storage</li>
                <li>• API Connections</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button onClick={() => onViewPage('database')} variant="secondary" size="lg">
              <Database className="w-5 h-5 mr-2" />
              View Complete Database Schema
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}