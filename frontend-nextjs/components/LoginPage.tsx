"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { AuthProvider, useAuth } from "@/lib/auth-context";


export function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login(username, password);
    toast.success("Login successful!");
    router.push("/dashboard");
  } catch (error: any) {
    toast.error(error.message || "Login failed");
  }
};
  return (
    
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
    <AuthProvider> 
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="mb-2">Welcome Back</h2>
          <p className="text-muted-foreground text-center">
            Login to access your CV dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="you name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
      </AuthProvider>
    </div>
  );
}
function login(username: any, password: string) {
  throw new Error("Function not implemented.");
}

