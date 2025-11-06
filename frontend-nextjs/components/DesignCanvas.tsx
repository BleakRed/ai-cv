
"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ZoomIn, ZoomOut, Maximize2, Download, Grid3x3 } from "lucide-react";

interface DesignCanvasProps {
  onNavigate: (page: string) => void;
}

export function DesignCanvas({ onNavigate }: DesignCanvasProps) {
  const [zoom, setZoom] = useState(0.4);
  const [view, setView] = useState<'all' | 'desktop' | 'mobile'>('all');

  const increaseZoom = () => setZoom(Math.min(zoom + 0.1, 1));
  const decreaseZoom = () => setZoom(Math.max(zoom - 0.1, 0.2));

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1">Design Canvas - AI CV Pro</h2>
              <p className="text-sm text-muted-foreground">
                Full site overview • 7 screens • Desktop & Mobile
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                <Button
                  variant={view === 'all' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('all')}
                >
                  All
                </Button>
                <Button
                  variant={view === 'desktop' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('desktop')}
                >
                  Desktop
                </Button>
                <Button
                  variant={view === 'mobile' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('mobile')}
                >
                  Mobile
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={decreaseZoom}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm min-w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button variant="outline" size="sm" onClick={increaseZoom}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-16">
          {/* Homepage Artboard */}
          <ArtboardFrame
            title="01 • Homepage"
            description="Landing page with hero, features, and CTA"
            zoom={zoom}
            onClick={() => onNavigate('home')}
          >
            <div className="bg-background">
              {/* Header */}
              <div className="border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg" />
                  <span>AI CV Pro</span>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-16 bg-muted rounded" />
                  <div className="h-8 w-16 bg-muted rounded" />
                  <div className="h-8 w-16 bg-muted rounded" />
                  <div className="h-8 w-20 bg-primary rounded" />
                </div>
              </div>

              {/* Hero */}
              <div className="px-6 py-20 text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-4">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-xs">AI-Powered CV Analysis</span>
                </div>
                <div className="max-w-2xl mx-auto">
                  <div className="h-12 bg-foreground/90 rounded mb-4" />
                  <div className="h-12 bg-foreground/70 rounded mb-6" />
                  <div className="space-y-2 mb-8">
                    <div className="h-4 bg-muted rounded mx-auto w-3/4" />
                    <div className="h-4 bg-muted rounded mx-auto w-2/3" />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <div className="h-10 w-32 bg-primary rounded" />
                    <div className="h-10 w-32 bg-muted rounded" />
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="px-6 py-16 bg-muted/30">
                <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background rounded-lg p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg mb-4" />
                      <div className="h-5 bg-foreground/80 rounded mb-2 w-3/4" />
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded" />
                        <div className="h-3 bg-muted rounded w-5/6" />
                        <div className="h-3 bg-muted rounded w-4/6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="px-6 py-16">
                <div className="text-center mb-12">
                  <div className="h-8 bg-foreground/80 rounded mx-auto w-48 mb-3" />
                  <div className="h-4 bg-muted rounded mx-auto w-96" />
                </div>
                <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 bg-primary rounded-full mx-auto mb-4" />
                      <div className="h-5 bg-foreground/70 rounded mb-2 mx-auto w-32" />
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded mx-auto" />
                        <div className="h-3 bg-muted rounded mx-auto w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="px-6 py-16">
                <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center">
                  <div className="h-8 bg-foreground/80 rounded mx-auto w-64 mb-3" />
                  <div className="h-4 bg-muted rounded mx-auto w-96 mb-6" />
                  <div className="h-10 w-36 bg-primary rounded mx-auto" />
                </div>
              </div>
            </div>
          </ArtboardFrame>

          {/* Login Page Artboard */}
          <ArtboardFrame
            title="02 • Login Page"
            description="User authentication"
            zoom={zoom}
            onClick={() => onNavigate('login')}
          >
            <div className="bg-muted/30 min-h-screen flex items-center justify-center p-6">
              <div className="bg-background rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-16 h-16 bg-primary rounded-lg mb-4" />
                  <div className="h-7 bg-foreground/80 rounded w-40 mb-2" />
                  <div className="h-4 bg-muted rounded w-56" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="h-4 bg-foreground/70 rounded w-16 mb-2" />
                    <div className="h-10 bg-input-background rounded" />
                  </div>
                  <div>
                    <div className="h-4 bg-foreground/70 rounded w-20 mb-2" />
                    <div className="h-10 bg-input-background rounded" />
                  </div>
                  <div className="h-10 bg-primary rounded" />
                </div>
                <div className="mt-6 text-center">
                  <div className="h-4 bg-muted rounded w-48 mx-auto" />
                </div>
              </div>
            </div>
          </ArtboardFrame>

          {/* Register Page Artboard */}
          <ArtboardFrame
            title="03 • Register Page"
            description="New user registration"
            zoom={zoom}
            onClick={() => onNavigate('register')}
          >
            <div className="bg-muted/30 min-h-screen flex items-center justify-center p-6">
              <div className="bg-background rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-16 h-16 bg-primary rounded-lg mb-4" />
                  <div className="h-7 bg-foreground/80 rounded w-48 mb-2" />
                  <div className="h-4 bg-muted rounded w-56" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="h-4 bg-foreground/70 rounded w-20 mb-2" />
                    <div className="h-10 bg-input-background rounded" />
                  </div>
                  <div>
                    <div className="h-4 bg-foreground/70 rounded w-16 mb-2" />
                    <div className="h-10 bg-input-background rounded" />
                  </div>
                  <div>
                    <div className="h-4 bg-foreground/70 rounded w-20 mb-2" />
                    <div className="h-10 bg-input-background rounded" />
                  </div>
                  <div>
                    <div className="h-4 bg-foreground/70 rounded w-32 mb-2" />
                    <div className="h-10 bg-input-background rounded" />
                  </div>
                  <div className="h-10 bg-primary rounded" />
                </div>
                <div className="mt-6 text-center">
                  <div className="h-4 bg-muted rounded w-48 mx-auto" />
                </div>
              </div>
            </div>
          </ArtboardFrame>

          {/* Dashboard Artboard */}
          <ArtboardFrame
            title="04 • Dashboard"
            description="User CV management dashboard"
            zoom={zoom}
            onClick={() => onNavigate('dashboard')}
          >
            <div className="bg-muted/30">
              {/* Header */}
              <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg" />
                  <span>AI CV Pro</span>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-20 bg-muted rounded" />
                  <div className="h-8 w-24 bg-muted rounded" />
                  <div className="h-8 w-28 bg-muted rounded" />
                  <div className="h-8 w-20 bg-muted rounded" />
                </div>
              </div>

              <div className="px-6 py-12">
                {/* Welcome */}
                <div className="mb-8">
                  <div className="h-9 bg-foreground/80 rounded w-80 mb-2" />
                  <div className="h-4 bg-muted rounded w-64" />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {[
                    { color: 'bg-primary/10', icon: 'bg-primary' },
                    { color: 'bg-primary/10', icon: 'bg-primary' },
                    { color: 'bg-primary/10', icon: 'bg-primary' }
                  ].map((item, i) => (
                    <div key={i} className={`${item.color} bg-background border rounded-lg p-6`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${item.color} rounded-lg`} />
                        <div className="flex-1">
                          <div className="h-5 bg-foreground/70 rounded mb-2 w-32" />
                          <div className="h-3 bg-muted rounded w-24" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent CVs */}
                <div>
                  <div className="h-7 bg-foreground/80 rounded w-32 mb-6" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-background rounded-lg p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-lg" />
                          <div>
                            <div className="h-5 bg-foreground/70 rounded w-48 mb-2" />
                            <div className="h-3 bg-muted rounded w-32" />
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div>
                            <div className="h-3 bg-muted rounded w-16 mb-2 ml-auto" />
                            <div className="h-5 bg-foreground/70 rounded w-20" />
                          </div>
                          <div className="flex gap-2">
                            <div className="h-8 w-24 bg-muted rounded" />
                            <div className="h-8 w-24 bg-muted rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ArtboardFrame>

          {/* CV Rating Page Artboard */}
          <ArtboardFrame
            title="05 • CV Rating & Review"
            description="AI-powered CV analysis with scores"
            zoom={zoom}
            onClick={() => onNavigate('rating-example')}
          >
            <div className="bg-muted/30">
              {/* Header */}
              <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg" />
                  <span>AI CV Pro</span>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-20 bg-muted rounded" />
                  <div className="h-8 w-24 bg-muted rounded" />
                  <div className="h-8 w-28 bg-muted rounded" />
                  <div className="h-8 w-20 bg-muted rounded" />
                </div>
              </div>

              <div className="px-6 py-12 max-w-5xl mx-auto">
                {/* Title */}
                <div className="mb-8">
                  <div className="h-9 bg-foreground/80 rounded w-72 mb-2" />
                  <div className="h-4 bg-muted rounded w-96" />
                </div>

                {/* Overall Score Card */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 bg-background rounded-lg p-8 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-4 bg-muted rounded w-32 mb-3" />
                      <div className="h-16 bg-foreground/80 rounded w-24" />
                    </div>
                    <div className="text-right">
                      <div className="h-6 bg-primary/20 rounded-full w-32 mb-2 ml-auto" />
                      <div className="h-3 bg-muted rounded w-36" />
                    </div>
                  </div>
                </div>

                {/* Category Ratings */}
                <div className="bg-background rounded-lg p-8 mb-8">
                  <div className="h-7 bg-foreground/80 rounded w-48 mb-6" />
                  <div className="space-y-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <div className="h-4 bg-foreground/70 rounded w-40" />
                          <div className="h-4 bg-foreground/70 rounded w-12" />
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${60 + i * 5}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-background rounded-lg p-8 mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-green-500 rounded-full" />
                    <div className="h-7 bg-foreground/80 rounded w-32" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-muted rounded" />
                          <div className="h-3 bg-muted rounded w-5/6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div className="bg-background rounded-lg p-8 mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-orange-500 rounded-full" />
                    <div className="h-7 bg-foreground/80 rounded w-48" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-5 h-5 bg-orange-500 rounded-full flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-muted rounded" />
                          <div className="h-3 bg-muted rounded w-4/6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-primary/5 bg-background rounded-lg p-8 mb-8">
                  <div className="h-6 bg-foreground/80 rounded w-48 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-3 bg-muted rounded" style={{ width: `${95 - i * 8}%` }} />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <div className="h-11 w-40 bg-primary rounded" />
                  <div className="h-11 w-40 bg-muted rounded" />
                </div>
              </div>
            </div>
          </ArtboardFrame>

          {/* CV Create Page Artboard */}
          <ArtboardFrame
            title="06 • CV Builder"
            description="Multi-step CV creation form"
            zoom={zoom}
            onClick={() => onNavigate('cv-create')}
          >
            <div className="bg-muted/30">
              {/* Header */}
              <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg" />
                  <span>AI CV Pro</span>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-20 bg-muted rounded" />
                  <div className="h-8 w-24 bg-muted rounded" />
                  <div className="h-8 w-28 bg-muted rounded" />
                  <div className="h-8 w-20 bg-muted rounded" />
                </div>
              </div>

              <div className="px-6 py-12 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="h-9 bg-foreground/80 rounded w-48 mb-2" />
                    <div className="h-4 bg-muted rounded w-80" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-32 bg-muted rounded" />
                    <div className="h-10 w-32 bg-primary rounded" />
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                  <div className="flex gap-1 bg-muted rounded-lg p-1">
                    {['Personal', 'Summary', 'Experience', 'Education', 'Skills'].map((tab, i) => (
                      <div
                        key={i}
                        className={`h-9 flex-1 rounded ${i === 0 ? 'bg-background' : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div className="bg-background rounded-lg p-8">
                  <div className="h-6 bg-foreground/80 rounded w-48 mb-6" />
                  <div className="space-y-4">
                    {/* Two Column Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i}>
                          <div className="h-4 bg-foreground/70 rounded w-24 mb-2" />
                          <div className="h-10 bg-input-background rounded" />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i}>
                          <div className="h-4 bg-foreground/70 rounded w-20 mb-2" />
                          <div className="h-10 bg-input-background rounded" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="h-4 bg-foreground/70 rounded w-32 mb-2" />
                      <div className="h-10 bg-input-background rounded" />
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 flex gap-4 justify-between">
                  <div className="h-10 w-32 bg-muted rounded" />
                  <div className="flex gap-2">
                    <div className="h-10 w-32 bg-muted rounded" />
                    <div className="h-10 w-32 bg-primary rounded" />
                  </div>
                </div>
              </div>
            </div>
          </ArtboardFrame>

          {/* CV Theme Page Artboard */}
          <ArtboardFrame
            title="07 • CV Theme Selector"
            description="Template gallery and theme customization"
            zoom={zoom}
            onClick={() => onNavigate('cv-theme')}
          >
            <div className="bg-muted/30">
              {/* Header */}
              <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg" />
                  <span>AI CV Pro</span>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-20 bg-muted rounded" />
                  <div className="h-8 w-24 bg-muted rounded" />
                  <div className="h-8 w-28 bg-muted rounded" />
                  <div className="h-8 w-20 bg-muted rounded" />
                </div>
              </div>

              <div className="px-6 py-12">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="h-3 bg-muted rounded w-32 mb-4" />
                    <div className="h-9 bg-foreground/80 rounded w-64 mb-2" />
                    <div className="h-4 bg-muted rounded w-96" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-28 bg-muted rounded" />
                    <div className="h-10 w-32 bg-primary rounded" />
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="h-10 bg-background border border-border rounded w-80" />
                </div>

                {/* Category Tabs */}
                <div className="mb-6">
                  <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
                    {['All', 'Classic', 'Modern', 'Creative'].map((tab, i) => (
                      <div
                        key={i}
                        className={`h-9 px-6 rounded ${i === 0 ? 'bg-background' : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-background rounded-lg overflow-hidden">
                      {/* Template Preview */}
                      <div className={`h-48 relative ${
                        i === 1 ? 'bg-blue-500' :
                        i === 2 ? 'bg-purple-500' :
                        i === 3 ? 'bg-orange-500' :
                        i === 4 ? 'bg-gray-700' :
                        i === 5 ? 'bg-green-500' :
                        'bg-pink-500'
                      } bg-gradient-to-br from-current to-current/80`}>
                        {/* Badge */}
                        {i <= 3 && (
                          <div className="absolute top-3 right-3 h-5 w-16 bg-primary rounded-full" />
                        )}
                        {/* Mini CV Preview */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded shadow-lg w-24 h-32 p-2 transform rotate-2">
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-300 rounded w-3/4" />
                              <div className="h-0.5 bg-gray-200 rounded w-1/2" />
                              <div className="h-1.5 bg-gray-400 rounded w-full mt-2" />
                              <div className="space-y-0.5 mt-2">
                                <div className="h-0.5 bg-gray-200 rounded" />
                                <div className="h-0.5 bg-gray-200 rounded w-5/6" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Selected Check */}
                        {i === 1 && (
                          <div className="absolute top-3 left-3 w-6 h-6 bg-primary rounded-full" />
                        )}
                      </div>
                      {/* Template Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="h-5 bg-foreground/80 rounded w-32 mb-2" />
                            <div className="h-4 w-16 bg-muted rounded-full" />
                          </div>
                        </div>
                        <div className="space-y-2 mt-3">
                          <div className="h-3 bg-muted rounded" />
                          <div className="h-3 bg-muted rounded w-5/6" />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <div className={`h-8 flex-1 rounded ${i === 1 ? 'bg-primary' : 'bg-muted'}`} />
                          <div className="h-8 w-16 bg-muted rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Template Info */}
                <div className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 bg-background rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-6 bg-foreground/80 rounded w-64 mb-2" />
                      <div className="h-3 bg-muted rounded w-96" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-10 w-36 bg-muted rounded" />
                      <div className="h-10 w-36 bg-primary rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ArtboardFrame>
        </div>
      </div>

      {/* Grid Overlay Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button variant="outline" size="sm" className="bg-background shadow-lg">
          <Grid3x3 className="w-4 h-4 mr-2" />
          Show Grid
        </Button>
      </div>
    </div>
  );
}

interface ArtboardFrameProps {
  title: string;
  description: string;
  zoom: number;
  children: React.ReactNode;
  onClick: () => void;
}

function ArtboardFrame({ title, description, zoom, children, onClick }: ArtboardFrameProps) {
  return (
    <div className="space-y-4">
      {/* Artboard Label */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">1440 × 900</Badge>
          <Button variant="outline" size="sm" onClick={onClick}>
            <Maximize2 className="w-4 h-4 mr-2" />
            View Full
          </Button>
        </div>
      </div>

      {/* Artboard Frame */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-8 border-gray-800">
        <div
          className="origin-top-left cursor-pointer hover:opacity-95 transition-opacity"
          style={{
            transform: `scale(${zoom})`,
            width: `${100 / zoom}%`,
            height: `${100 / zoom}%`,
          }}
          onClick={onClick}
        >
          <div className="w-[1440px] bg-background">{children}</div>
        </div>
      </div>
    </div>
  );
}