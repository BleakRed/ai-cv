'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // use AuthContext

  const isLoggedIn = !!user; // true if user exists

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Hide header on special pages
  if (pathname === "/wireframe" || pathname === "/canvas" || pathname === "/database") {
    return null;
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          href={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl">AI CV Pro</span>
        </Link>

        <nav className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/rating-example">Example</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="mr-2 text-sm">Hi, {user.username}!</span>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/cv-create">Create CV</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/rating-example">Rating Example</Link>
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
