import { expect, test } from "vitest";
import { isPlatform, PLATFORM_META } from "./platforms";

test("recognizes the supported platforms", () => {
  expect(isPlatform("instagram")).toBe(true);
  expect(isPlatform("linkedin")).toBe(true);
  expect(isPlatform("youtube")).toBe(true);
});

test("rejects unknown slugs", () => {
  expect(isPlatform("tiktok")).toBe(false);
  expect(isPlatform("")).toBe(false);
});

test("exposes labels and routes for each platform", () => {
  expect(PLATFORM_META.instagram).toMatchObject({
    label: "Instagram",
    href: "/platforms/instagram",
  });
});
