
"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Database, 
  Table2, 
  Key, 
  Link2, 
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileJson,
  Code2
} from "lucide-react";

export function DatabaseSchema() {
  const [zoom, setZoom] = useState(1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const increaseZoom = () => setZoom(Math.min(zoom + 0.1, 1.5));
  const decreaseZoom = () => setZoom(Math.max(zoom - 0.1, 0.5));

  const tables = [
    {
      name: "users",
      category: "authentication",
      color: "border-blue-500 bg-blue-500/5",
      position: { x: 50, y: 100 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "email", type: "VARCHAR(255)", isUnique: true, isRequired: true },
        { name: "password_hash", type: "VARCHAR(255)", isRequired: true },
        { name: "full_name", type: "VARCHAR(255)", isRequired: true },
        { name: "avatar_url", type: "TEXT", isRequired: false },
        { name: "role", type: "ENUM", isRequired: true, default: "'user'" },
        { name: "email_verified", type: "BOOLEAN", isRequired: true, default: "false" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "last_login", type: "TIMESTAMP", isRequired: false },
      ],
      indexes: ["email", "created_at"],
    },
    {
      name: "user_profiles",
      category: "authentication",
      color: "border-blue-500 bg-blue-500/5",
      position: { x: 50, y: 480 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users.id", isRequired: true },
        { name: "phone", type: "VARCHAR(50)", isRequired: false },
        { name: "location", type: "VARCHAR(255)", isRequired: false },
        { name: "linkedin_url", type: "TEXT", isRequired: false },
        { name: "github_url", type: "TEXT", isRequired: false },
        { name: "website_url", type: "TEXT", isRequired: false },
        { name: "bio", type: "TEXT", isRequired: false },
        { name: "preferences", type: "JSONB", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["user_id"],
    },
    {
      name: "cvs",
      category: "core",
      color: "border-purple-500 bg-purple-500/5",
      position: { x: 450, y: 100 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users.id", isRequired: true },
        { name: "title", type: "VARCHAR(255)", isRequired: true },
        { name: "template_id", type: "UUID", isForeign: true, references: "cv_templates.id", isRequired: false },
        { name: "status", type: "ENUM", isRequired: true, default: "'draft'" },
        { name: "version", type: "INTEGER", isRequired: true, default: "1" },
        { name: "is_public", type: "BOOLEAN", isRequired: true, default: "false" },
        { name: "file_url", type: "TEXT", isRequired: false },
        { name: "file_type", type: "VARCHAR(50)", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "published_at", type: "TIMESTAMP", isRequired: false },
      ],
      indexes: ["user_id", "status", "created_at"],
    },
    {
      name: "cv_personal_info",
      category: "core",
      color: "border-purple-500 bg-purple-500/5",
      position: { x: 850, y: 100 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: true },
        { name: "full_name", type: "VARCHAR(255)", isRequired: true },
        { name: "email", type: "VARCHAR(255)", isRequired: true },
        { name: "phone", type: "VARCHAR(50)", isRequired: false },
        { name: "location", type: "VARCHAR(255)", isRequired: false },
        { name: "linkedin", type: "TEXT", isRequired: false },
        { name: "github", type: "TEXT", isRequired: false },
        { name: "website", type: "TEXT", isRequired: false },
        { name: "summary", type: "TEXT", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["cv_id"],
    },
    {
      name: "cv_work_experience",
      category: "core",
      color: "border-purple-500 bg-purple-500/5",
      position: { x: 850, y: 420 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: true },
        { name: "company", type: "VARCHAR(255)", isRequired: true },
        { name: "position", type: "VARCHAR(255)", isRequired: true },
        { name: "location", type: "VARCHAR(255)", isRequired: false },
        { name: "start_date", type: "DATE", isRequired: true },
        { name: "end_date", type: "DATE", isRequired: false },
        { name: "is_current", type: "BOOLEAN", isRequired: true, default: "false" },
        { name: "description", type: "TEXT", isRequired: false },
        { name: "achievements", type: "TEXT[]", isRequired: false },
        { name: "sort_order", type: "INTEGER", isRequired: true, default: "0" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["cv_id", "sort_order"],
    },
    {
      name: "cv_education",
      category: "core",
      color: "border-purple-500 bg-purple-500/5",
      position: { x: 850, y: 740 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: true },
        { name: "institution", type: "VARCHAR(255)", isRequired: true },
        { name: "degree", type: "VARCHAR(255)", isRequired: true },
        { name: "field_of_study", type: "VARCHAR(255)", isRequired: false },
        { name: "location", type: "VARCHAR(255)", isRequired: false },
        { name: "start_date", type: "DATE", isRequired: true },
        { name: "end_date", type: "DATE", isRequired: false },
        { name: "is_current", type: "BOOLEAN", isRequired: true, default: "false" },
        { name: "gpa", type: "DECIMAL(3,2)", isRequired: false },
        { name: "description", type: "TEXT", isRequired: false },
        { name: "sort_order", type: "INTEGER", isRequired: true, default: "0" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["cv_id", "sort_order"],
    },
    {
      name: "cv_skills",
      category: "core",
      color: "border-purple-500 bg-purple-500/5",
      position: { x: 1250, y: 100 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: true },
        { name: "skill_name", type: "VARCHAR(255)", isRequired: true },
        { name: "category", type: "VARCHAR(100)", isRequired: false },
        { name: "proficiency", type: "ENUM", isRequired: false },
        { name: "years_of_experience", type: "INTEGER", isRequired: false },
        { name: "sort_order", type: "INTEGER", isRequired: true, default: "0" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["cv_id", "category"],
    },
    {
      name: "cv_projects",
      category: "core",
      color: "border-purple-500 bg-purple-500/5",
      position: { x: 1250, y: 380 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: true },
        { name: "project_name", type: "VARCHAR(255)", isRequired: true },
        { name: "description", type: "TEXT", isRequired: false },
        { name: "role", type: "VARCHAR(255)", isRequired: false },
        { name: "technologies", type: "TEXT[]", isRequired: false },
        { name: "url", type: "TEXT", isRequired: false },
        { name: "start_date", type: "DATE", isRequired: false },
        { name: "end_date", type: "DATE", isRequired: false },
        { name: "sort_order", type: "INTEGER", isRequired: true, default: "0" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["cv_id", "sort_order"],
    },
    {
      name: "cv_ratings",
      category: "ai",
      color: "border-orange-500 bg-orange-500/5",
      position: { x: 450, y: 480 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users.id", isRequired: true },
        { name: "overall_score", type: "DECIMAL(3,1)", isRequired: true },
        { name: "content_score", type: "DECIMAL(3,1)", isRequired: true },
        { name: "formatting_score", type: "DECIMAL(3,1)", isRequired: true },
        { name: "keywords_score", type: "DECIMAL(3,1)", isRequired: true },
        { name: "experience_score", type: "DECIMAL(3,1)", isRequired: true },
        { name: "education_score", type: "DECIMAL(3,1)", isRequired: true },
        { name: "skills_score", type: "DECIMAL(3,1)", isRequired: true },
        { name: "strengths", type: "TEXT[]", isRequired: false },
        { name: "weaknesses", type: "TEXT[]", isRequired: false },
        { name: "suggestions", type: "TEXT[]", isRequired: false },
        { name: "ai_insights", type: "TEXT", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["cv_id", "user_id", "created_at"],
    },
    {
      name: "cv_templates",
      category: "templates",
      color: "border-green-500 bg-green-500/5",
      position: { x: 50, y: 820 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "name", type: "VARCHAR(255)", isRequired: true },
        { name: "description", type: "TEXT", isRequired: false },
        { name: "category", type: "VARCHAR(100)", isRequired: false },
        { name: "preview_url", type: "TEXT", isRequired: false },
        { name: "html_template", type: "TEXT", isRequired: false },
        { name: "css_template", type: "TEXT", isRequired: false },
        { name: "is_premium", type: "BOOLEAN", isRequired: true, default: "false" },
        { name: "is_active", type: "BOOLEAN", isRequired: true, default: "true" },
        { name: "usage_count", type: "INTEGER", isRequired: true, default: "0" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["category", "is_active"],
    },
    {
      name: "ai_analysis_history",
      category: "ai",
      color: "border-orange-500 bg-orange-500/5",
      position: { x: 450, y: 820 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users.id", isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: false },
        { name: "analysis_type", type: "ENUM", isRequired: true },
        { name: "input_data", type: "JSONB", isRequired: false },
        { name: "output_data", type: "JSONB", isRequired: false },
        { name: "tokens_used", type: "INTEGER", isRequired: false },
        { name: "model_version", type: "VARCHAR(100)", isRequired: false },
        { name: "processing_time_ms", type: "INTEGER", isRequired: false },
        { name: "status", type: "ENUM", isRequired: true, default: "'completed'" },
        { name: "error_message", type: "TEXT", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["user_id", "cv_id", "analysis_type", "created_at"],
    },
    {
      name: "user_subscriptions",
      category: "billing",
      color: "border-pink-500 bg-pink-500/5",
      position: { x: 1250, y: 640 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users.id", isRequired: true },
        { name: "plan_type", type: "ENUM", isRequired: true },
        { name: "status", type: "ENUM", isRequired: true, default: "'active'" },
        { name: "billing_cycle", type: "ENUM", isRequired: true },
        { name: "price", type: "DECIMAL(10,2)", isRequired: true },
        { name: "currency", type: "VARCHAR(3)", isRequired: true, default: "'USD'" },
        { name: "ai_credits_monthly", type: "INTEGER", isRequired: true },
        { name: "ai_credits_remaining", type: "INTEGER", isRequired: true },
        { name: "started_at", type: "TIMESTAMP", isRequired: true },
        { name: "expires_at", type: "TIMESTAMP", isRequired: true },
        { name: "canceled_at", type: "TIMESTAMP", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["user_id", "status", "expires_at"],
    },
    {
      name: "activity_logs",
      category: "audit",
      color: "border-gray-500 bg-gray-500/5",
      position: { x: 1250, y: 950 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users.id", isRequired: false },
        { name: "action", type: "VARCHAR(255)", isRequired: true },
        { name: "entity_type", type: "VARCHAR(100)", isRequired: false },
        { name: "entity_id", type: "UUID", isRequired: false },
        { name: "metadata", type: "JSONB", isRequired: false },
        { name: "ip_address", type: "INET", isRequired: false },
        { name: "user_agent", type: "TEXT", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["user_id", "action", "entity_type", "created_at"],
    },
    {
      name: "cv_exports",
      category: "core",
      color: "border-purple-500 bg-purple-500/5",
      position: { x: 850, y: 1020 },
      fields: [
        { name: "id", type: "UUID", isPrimary: true, isRequired: true },
        { name: "cv_id", type: "UUID", isForeign: true, references: "cvs.id", isRequired: true },
        { name: "user_id", type: "UUID", isForeign: true, references: "users.id", isRequired: true },
        { name: "format", type: "ENUM", isRequired: true },
        { name: "file_url", type: "TEXT", isRequired: true },
        { name: "file_size", type: "INTEGER", isRequired: false },
        { name: "download_count", type: "INTEGER", isRequired: true, default: "0" },
        { name: "expires_at", type: "TIMESTAMP", isRequired: false },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, default: "NOW()" },
      ],
      indexes: ["cv_id", "user_id", "created_at"],
    },
  ];

  const relationships = [
    { from: "users", to: "user_profiles", type: "one-to-one", fromField: "id", toField: "user_id" },
    { from: "users", to: "cvs", type: "one-to-many", fromField: "id", toField: "user_id" },
    { from: "users", to: "cv_ratings", type: "one-to-many", fromField: "id", toField: "user_id" },
    { from: "users", to: "ai_analysis_history", type: "one-to-many", fromField: "id", toField: "user_id" },
    { from: "users", to: "user_subscriptions", type: "one-to-many", fromField: "id", toField: "user_id" },
    { from: "users", to: "activity_logs", type: "one-to-many", fromField: "id", toField: "user_id" },
    { from: "users", to: "cv_exports", type: "one-to-many", fromField: "id", toField: "user_id" },
    
    { from: "cvs", to: "cv_personal_info", type: "one-to-one", fromField: "id", toField: "cv_id" },
    { from: "cvs", to: "cv_work_experience", type: "one-to-many", fromField: "id", toField: "cv_id" },
    { from: "cvs", to: "cv_education", type: "one-to-many", fromField: "id", toField: "cv_id" },
    { from: "cvs", to: "cv_skills", type: "one-to-many", fromField: "id", toField: "cv_id" },
    { from: "cvs", to: "cv_projects", type: "one-to-many", fromField: "id", toField: "cv_id" },
    { from: "cvs", to: "cv_ratings", type: "one-to-many", fromField: "id", toField: "cv_id" },
    { from: "cvs", to: "ai_analysis_history", type: "one-to-many", fromField: "id", toField: "cv_id" },
    { from: "cvs", to: "cv_exports", type: "one-to-many", fromField: "id", toField: "cv_id" },
    
    { from: "cv_templates", to: "cvs", type: "one-to-many", fromField: "id", toField: "template_id" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="mb-0">Database Schema</h2>
                  <p className="text-sm text-muted-foreground">AI CV Pro • PostgreSQL Design</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={decreaseZoom}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm min-w-12 text-center">{Math.round(zoom * 100)}%</span>
                <Button variant="outline" size="sm" onClick={increaseZoom}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm">
                <FileJson className="w-4 h-4 mr-2" />
                Export SQL
              </Button>

              <Button variant="outline" size="sm">
                <Code2 className="w-4 h-4 mr-2" />
                Generate Types
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-purple-500 text-purple-700">Core</Badge>
              <span className="text-muted-foreground">8 tables</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-500 text-blue-700">Auth</Badge>
              <span className="text-muted-foreground">2 tables</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-orange-500 text-orange-700">AI</Badge>
              <span className="text-muted-foreground">2 tables</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-500 text-green-700">Templates</Badge>
              <span className="text-muted-foreground">1 table</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-pink-500 text-pink-700">Billing</Badge>
              <span className="text-muted-foreground">1 table</span>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{relationships.length} relationships</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="diagram" className="flex-1">
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-6">
            <TabsList className="bg-transparent border-b-0">
              <TabsTrigger value="diagram" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                ER Diagram
              </TabsTrigger>
              <TabsTrigger value="tables" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Table Details
              </TabsTrigger>
              <TabsTrigger value="relationships" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Relationships
              </TabsTrigger>
              <TabsTrigger value="indexes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Indexes & Performance
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="diagram" className="mt-0">
          <div className="p-6 overflow-auto" style={{ height: 'calc(100vh - 240px)' }}>
            <div
              className="relative bg-grid-pattern"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                minWidth: '1800px',
                minHeight: '1400px',
              }}
            >
              {/* Relationship Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {relationships.map((rel, idx) => {
                  const fromTable = tables.find(t => t.name === rel.from);
                  const toTable = tables.find(t => t.name === rel.to);
                  if (!fromTable || !toTable) return null;

                  const fromX = fromTable.position.x + 180;
                  const fromY = fromTable.position.y + 30;
                  const toX = toTable.position.x;
                  const toY = toTable.position.y + 30;

                  return (
                    <g key={idx}>
                      <line
                        x1={fromX}
                        y1={fromY}
                        x2={toX}
                        y2={toY}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray={rel.type === 'one-to-one' ? '5,5' : '0'}
                      />
                      <circle cx={fromX} cy={fromY} r="4" fill="#3b82f6" />
                      <circle cx={toX} cy={toY} r="4" fill="#ef4444" />
                    </g>
                  );
                })}
              </svg>

              {/* Tables */}
              {tables.map((table) => (
                <TableCard
                  key={table.name}
                  table={table}
                  isSelected={selectedTable === table.name}
                  onClick={() => setSelectedTable(table.name)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tables" className="mt-0">
          <div className="container mx-auto px-6 py-8">
            <div className="space-y-6">
              {tables.map((table) => (
                <Card key={table.name} className={`p-6 ${table.color} border-2`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-1">{table.name}</h3>
                      <Badge variant="outline">{table.category}</Badge>
                    </div>
                    <Badge variant="secondary">{table.fields.length} fields</Badge>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-3">Field</th>
                          <th className="text-left py-2 px-3">Type</th>
                          <th className="text-left py-2 px-3">Constraints</th>
                          <th className="text-left py-2 px-3">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.fields.map((field, idx) => (
                          <tr key={idx} className="border-b border-border/50">
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                {field.isPrimary && <Key className="w-3 h-3 text-yellow-500" />}
                                {field.isForeign && <Link2 className="w-3 h-3 text-blue-500" />}
                                <span className={field.isPrimary ? "font-medium" : ""}>{field.name}</span>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <code className="text-xs bg-muted px-2 py-1 rounded">{field.type}</code>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex gap-1">
                                {field.isRequired && <Badge variant="outline" className="text-xs">NOT NULL</Badge>}
                                {field.isUnique && <Badge variant="outline" className="text-xs">UNIQUE</Badge>}
                              </div>
                            </td>
                            <td className="py-2 px-3 text-muted-foreground">
                              {field.default || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {table.fields.filter(f => f.isForeign).length > 0 && (
                    <div className="mt-4 space-y-2">
                      {table.fields.filter(f => f.isForeign).map((field, idx) => (
                        <div key={idx} className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                          <p className="text-sm text-blue-700">
                            <Link2 className="w-3 h-3 inline mr-1" />
                            <strong>{field.name}</strong> references {field.references}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="relationships" className="mt-0">
          <div className="container mx-auto px-6 py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {relationships.map((rel, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4>{rel.from} → {rel.to}</h4>
                    <Badge variant={rel.type === 'one-to-one' ? 'default' : 'secondary'}>
                      {rel.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">From:</span>
                      <code className="bg-muted px-2 py-1 rounded">{rel.from}.{rel.fromField}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">To:</span>
                      <code className="bg-muted px-2 py-1 rounded">{rel.to}.{rel.toField}</code>
                    </div>
                    <div className="mt-4 p-3 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground">
                        {rel.type === 'one-to-one' 
                          ? `Each ${rel.from} record has exactly one ${rel.to} record`
                          : `Each ${rel.from} record can have multiple ${rel.to} records`
                        }
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="indexes" className="mt-0">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <h3 className="mb-2">Indexing Strategy</h3>
              <p className="text-muted-foreground">
                Optimized indexes for query performance and data retrieval
              </p>
            </div>

            <div className="space-y-6">
              {tables.filter(t => t.indexes.length > 0).map((table) => (
                <Card key={table.name} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4>{table.name}</h4>
                    <Badge variant="outline">{table.indexes.length} indexes</Badge>
                  </div>
                  <div className="space-y-2">
                    {table.indexes.map((index, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                        <Table2 className="w-4 h-4 text-muted-foreground" />
                        <code className="text-sm">idx_{table.name}_{index}</code>
                        <span className="text-sm text-muted-foreground">on</span>
                        <code className="text-sm bg-primary/10 px-2 py-1 rounded">{index}</code>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-primary/10">
              <h4 className="mb-4">Performance Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>All foreign keys are indexed for JOIN optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Timestamp fields indexed for time-based queries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Composite indexes on frequently queried field combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>JSONB fields for flexible metadata storage</span>
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TableCardProps {
  table: {
    name: string;
    category: string;
    color: string;
    position: { x: number; y: number };
    fields: Array<{
      name: string;
      type: string;
      isPrimary?: boolean;
      isForeign?: boolean;
      isRequired?: boolean;
      isUnique?: boolean;
      references?: string;
    }>;
  };
  isSelected: boolean;
  onClick: () => void;
}

function TableCard({ table, isSelected, onClick }: TableCardProps) {
  return (
    <div
      className={`absolute bg-background rounded-lg shadow-lg border-2 transition-all cursor-pointer ${
        table.color
      } ${isSelected ? 'ring-4 ring-primary ring-offset-2' : ''}`}
      style={{
        left: `${table.position.x}px`,
        top: `${table.position.y}px`,
        width: '360px',
        zIndex: isSelected ? 10 : 1,
      }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center justify-between mb-1">
          <h4 className="mb-0">{table.name}</h4>
          <Badge variant="outline" className="text-xs">{table.category}</Badge>
        </div>
      </div>

      {/* Fields */}
      <div className="p-3 max-h-[280px] overflow-y-auto">
        <div className="space-y-1">
          {table.fields.map((field, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                field.isPrimary ? 'bg-yellow-500/10' : field.isForeign ? 'bg-blue-500/10' : 'hover:bg-muted/50'
              }`}
            >
              {field.isPrimary && <Key className="w-3 h-3 text-yellow-600 flex-shrink-0" />}
              {field.isForeign && <Link2 className="w-3 h-3 text-blue-600 flex-shrink-0" />}
              {!field.isPrimary && !field.isForeign && <div className="w-3" />}
              
              <span className={`flex-1 ${field.isPrimary ? 'font-medium' : ''}`}>
                {field.name}
              </span>
              
              <code className="text-xs text-muted-foreground">{field.type}</code>
              
              {field.isRequired && (
                <span className="text-red-500 font-medium">*</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-border bg-muted/20 text-xs text-muted-foreground">
        {table.fields.length} fields
      </div>
    </div>
  );
}
