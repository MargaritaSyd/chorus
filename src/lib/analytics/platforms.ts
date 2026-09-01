import type { Platform } from "./types";

export const PLATFORM_META: Record<
  Platform,
  { label: string; color: string; href: string }
> = {
  instagram: {
    label: "Instagram",
    color: "var(--platform-instagram)",
    href: "/platforms/instagram",
  },
  linkedin: {
    label: "LinkedIn",
    color: "var(--platform-linkedin)",
    href: "/platforms/linkedin",
  },
  youtube: {
    label: "YouTube",
    color: "var(--platform-youtube)",
    href: "/platforms/youtube",
  },
};

export function isPlatform(value: string): value is Platform {
  return value in PLATFORM_META;
}
