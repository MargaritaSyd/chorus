"use client";

import { usePathname } from "next/navigation";
import {
  AudioLinesIcon,
  BriefcaseIcon,
  CameraIcon,
  LayoutDashboardIcon,
  PlayCircleIcon,
  Rows3Icon,
} from "lucide-react";
import { RangeLink } from "@/components/range-link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PLATFORM_META } from "@/lib/analytics";

const platforms = [
  { ...PLATFORM_META.instagram, icon: CameraIcon },
  { ...PLATFORM_META.linkedin, icon: BriefcaseIcon },
  { ...PLATFORM_META.youtube, icon: PlayCircleIcon },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-4">
        <RangeLink
          href="/"
          className="flex items-center gap-2 rounded-md px-1 text-sidebar-foreground"
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-sidebar-accent">
            <AudioLinesIcon className="size-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium">Chorus</span>
            <span className="text-xs text-muted-foreground">Social analytics</span>
          </span>
        </RangeLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Overview">
                  <RangeLink href="/">
                    <LayoutDashboardIcon />
                    <span>Overview</span>
                  </RangeLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/posts"}
                  tooltip="Posts"
                >
                  <RangeLink href="/posts">
                    <Rows3Icon />
                    <span>Posts</span>
                  </RangeLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Platforms</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platforms.map((platform) => (
                <SidebarMenuItem key={platform.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === platform.href}
                    tooltip={platform.label}
                  >
                    <RangeLink href={platform.href}>
                      <platform.icon />
                      <span>{platform.label}</span>
                    </RangeLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 py-3 text-xs text-muted-foreground">
        Mock data · no API keys
      </SidebarFooter>
    </Sidebar>
  );
}
