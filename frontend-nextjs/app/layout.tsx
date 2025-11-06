import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/Header";
import { ViewToggle } from "@/components/ViewToggle";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context"; // <-- import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI CV Review & Creation Platform",
  description:
    "AI-powered CV review and creation platform with professional templates and detailed analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider> {/* <-- wrap children in AuthProvider */}
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <ViewToggle />
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
