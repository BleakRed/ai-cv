"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FileText, Star, Sparkles, Upload, Download, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">AI-Powered CV Analysis</span>
          </div>
          
          <h1 className="mb-6">
            Transform Your CV with AI Intelligence
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant AI-powered feedback on your CV, receive professional ratings, 
            and create stunning resumes that get you noticed by employers.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/rating-example">View Example</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2">AI CV Rating</h3>
            <p className="text-muted-foreground">
              Get comprehensive ratings across multiple categories with detailed feedback on how to improve.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2">Professional Templates</h3>
            <p className="text-muted-foreground">
              Choose from a variety of professionally designed CV templates that stand out.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="mb-2">Instant Export</h3>
            <p className="text-muted-foreground">
              Download your polished CV in multiple formats ready to send to employers.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-12">
            Create or improve your CV in three simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                1
              </div>
              <h4 className="mb-2">Upload or Create</h4>
              <p className="text-muted-foreground text-sm">
                Upload your existing CV or start creating a new one from scratch
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                2
              </div>
              <h4 className="mb-2">AI Analysis</h4>
              <p className="text-muted-foreground text-sm">
                Our AI analyzes your CV and provides detailed feedback and ratings
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                3
              </div>
              <h4 className="mb-2">Download & Apply</h4>
              <p className="text-muted-foreground text-sm">
                Download your improved CV and start applying to your dream jobs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="mb-4">Ready to Transform Your CV?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of professionals who have improved their CVs with AI
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Start For Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
