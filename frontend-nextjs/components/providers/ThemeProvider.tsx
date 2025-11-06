'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light"); // default to light
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    } else {
      setThemeState("light");
    }

    setMounted(true);
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => setThemeState(prev => (prev === "light" ? "dark" : "light"));
  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  // Render nothing until mounted to avoid FOUC
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
