"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutGrid, Eye, Layers, Database } from "lucide-react";

export function ViewToggle() {
  const pathname = usePathname();

  // Special pages where we show view toggles
  const isSpecialPage = pathname === "/wireframe" || pathname === "/canvas" || pathname === "/database";

  if (isSpecialPage) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <Button asChild size="lg" variant="default" className="shadow-lg">
          <Link href="/">
            <Eye className="w-5 h-5 mr-2" />
            Live Site
          </Link>
        </Button>
        {pathname !== "/database" && (
          <Button asChild size="lg" variant="outline" className="shadow-lg bg-background">
            <Link href="/database">
              <Database className="w-5 h-5 mr-2" />
              Database
            </Link>
          </Button>
        )}
        {pathname !== "/canvas" && (
          <Button asChild size="lg" variant="outline" className="shadow-lg bg-background">
            <Link href="/canvas">
              <Layers className="w-5 h-5 mr-2" />
              Canvas
            </Link>
          </Button>
        )}
        {pathname !== "/wireframe" && (
          <Button asChild size="lg" variant="outline" className="shadow-lg bg-background">
            <Link href="/wireframe">
              <LayoutGrid className="w-5 h-5 mr-2" />
              Wireframe
            </Link>
          </Button>
        )}
      </div>
    );
  }

  // Regular pages - show buttons to go to special views
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <Button asChild size="lg" className="shadow-lg">
        <Link href="/database">
          <Database className="w-5 h-5 mr-2" />
          Database
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="shadow-lg bg-background">
        <Link href="/canvas">
          <Layers className="w-5 h-5 mr-2" />
          Canvas
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="shadow-lg bg-background">
        <Link href="/wireframe">
          <LayoutGrid className="w-5 h-5 mr-2" />
          Wireframe
        </Link>
      </Button>
    </div>
  );
}
