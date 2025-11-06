
"use client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CVRatingPageProps {
  onNavigate: (page: string) => void;
}

export function CVRatingPage({ onNavigate }: CVRatingPageProps) {
  const ratings = [
    { category: "Format & Layout", score: 92, color: "text-green-500" },
    { category: "Content Quality", score: 85, color: "text-green-500" },
    { category: "Keywords & ATS", score: 73, color: "text-yellow-500" },
    { category: "Professional Summary", score: 88, color: "text-green-500" },
    { category: "Work Experience", score: 90, color: "text-green-500" },
    { category: "Skills Section", score: 65, color: "text-orange-500" },
  ];

  const overallScore = 82;

  const strengths = [
    "Clear, professional layout with good use of white space",
    "Strong quantifiable achievements in work experience",
    "Well-structured professional summary that highlights key skills",
    "Consistent formatting throughout the document",
  ];

  const improvements = [
    "Add more industry-specific keywords for better ATS compatibility",
    "Expand skills section to include more technical competencies",
    "Consider adding certifications or professional development",
    "Include measurable outcomes for recent projects",
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">CV Rating & Review</h1>
          <p className="text-muted-foreground">
            Comprehensive AI analysis of your CV with actionable insights
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
              <div className="flex items-center gap-4">
                <div className="text-5xl">{overallScore}/100</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(overallScore / 20)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Excellent! Your CV is highly competitive
              </p>
            </div>
            <Badge className="text-lg px-6 py-3">Excellent</Badge>
          </div>
        </Card>

        {/* Category Ratings */}
        <Card className="p-8 mb-8">
          <h3 className="mb-6">Detailed Category Scores</h3>
          <div className="space-y-6">
            {ratings.map((rating) => (
              <div key={rating.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{rating.category}</span>
                  <span className={`text-sm ${rating.color}`}>
                    {rating.score}/100
                  </span>
                </div>
                <Progress value={rating.score} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3>Strengths</h3>
          </div>
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <li key={index} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Areas for Improvement */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3>Areas for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{improvement}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* ATS Compatibility */}
        <Card className="p-8 mb-8">
          <h3 className="mb-4">ATS Compatibility Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Keyword Match</span>
                <span className="text-sm text-yellow-500">73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> Include more industry-specific keywords from job descriptions
                to improve your ATS score. Consider adding terms like "agile methodology",
                "CI/CD", "microservices", and other relevant technical terms.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
          <Button onClick={() => onNavigate('cv-create')}>Apply Suggestions</Button>
        </div>
      </div>
    </div>
  );
}
