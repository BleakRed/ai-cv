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
import { useAuth } from "@/lib/auth-context";

// Inside your register function

export function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side password match validation
    if (password !== password2) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await register({
        username,
        email,
        password,
        password2,
        full_name: fullName || "",
      });

      toast.success("Registration successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="mb-2">Create an Account</h2>
          <p className="text-muted-foreground text-center">
            Sign up to access your CV dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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

          <div className="space-y-2">
            <Label htmlFor="password2">Confirm Password</Label>
            <Input
              id="password2"
              type="password"
              placeholder="••••••••"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
