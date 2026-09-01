"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RangeToggle, RangeToggleGroup } from "@/components/range-toggle";
import { isPlatform, PLATFORM_META } from "@/lib/analytics";

function titleFromPath(pathname: string): string {
  if (pathname === "/posts") {
    return "Posts";
  }

  const match = pathname.match(/^\/platforms\/([^/]+)$/);
  if (match && isPlatform(match[1])) {
    return PLATFORM_META[match[1]].label;
  }

  return "Overview";
}

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3 md:px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <h1 className="truncate text-sm font-medium">{titleFromPath(pathname)}</h1>
        <Badge variant="outline">Mock</Badge>
      </div>
      <Suspense fallback={<RangeToggleGroup value="30d" />}>
        <RangeToggle />
      </Suspense>
    </header>
  );
}
