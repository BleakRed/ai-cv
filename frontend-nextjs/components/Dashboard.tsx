
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Download, Star, Trash2, Edit } from "lucide-react";
interface DashboardProps {
  onNavigate: (page: string) => void;
  userName?: string;
}

export function Dashboard({ onNavigate, userName = "User" }: DashboardProps) {
  // Mock data for demonstration
  const mockCVs = [
    {
      id: 1,
      title: "Software Engineer CV",
      lastUpdated: "2 days ago",
      rating: 85,
      status: "complete"
    },
    {
      id: 2,
      title: "Senior Developer Resume",
      lastUpdated: "1 week ago",
      rating: 92,
      status: "complete"
    },
    {
      id: 3,
      title: "Project Manager CV",
      lastUpdated: "3 days ago",
      rating: 78,
      status: "draft"
    }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-green-500";
    if (rating >= 75) return "text-yellow-500";
    return "text-orange-500";
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 90) return "Excellent";
    if (rating >= 75) return "Good";
    return "Needs Work";
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground text-lg">
            Manage your CVs and track your improvements
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-8 border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total CVs</p>
                <p className="text-4xl font-bold">{mockCVs.length}</p>
              </div>
              <div className="w-14 h-14 bg-foreground rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-background" />
              </div>
            </div>
          </Card>

          <Card className="p-8 border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Avg. Rating</p>
                <p className="text-4xl font-bold">85</p>
              </div>
              <div className="w-14 h-14 bg-foreground rounded-xl flex items-center justify-center">
                <Star className="w-7 h-7 text-background" />
              </div>
            </div>
          </Card>

          <Card className="p-8 border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">This Month</p>
                <p className="text-4xl font-bold">2</p>
              </div>
              <div className="w-14 h-14 bg-foreground rounded-xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-background" />
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Button size="lg" onClick={() => onNavigate('cv-create')}>
            <Plus className="w-5 h-5 mr-2" />
            Create New CV
          </Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate('cv-theme')}>
            <FileText className="w-5 h-5 mr-2" />
            Browse Templates
          </Button>
        </div>

        {/* CV List */}
        <div>
          <h3 className="mb-6">Your CVs</h3>
          <div className="grid gap-6">
            {mockCVs.map((cv) => (
              <Card key={cv.id} className="p-8 border-border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-6 flex-1">
                    <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4>{cv.title}</h4>
                        {cv.status === "draft" && (
                          <Badge variant="outline">Draft</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Last updated {cv.lastUpdated}
                      </p>
                      <div className="flex items-center gap-2">
                        <Star className={`w-4 h-4 ${getRatingColor(cv.rating)}`} />
                        <span className={`text-sm ${getRatingColor(cv.rating)}`}>
                          Rating: {cv.rating}/100
                        </span>
                        <Badge variant="secondary" className="ml-2">
                          {getRatingBadge(cv.rating)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate('cv-create')}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate('rating-example')}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      View Rating
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => alert('Delete functionality')}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State (if no CVs) */}
        {mockCVs.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No CVs yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first CV to get started with AI-powered analysis
            </p>
            <Button onClick={() => ('cv-create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First CV
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
