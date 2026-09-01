"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { withRange } from "@/lib/with-range";

export function RangeLink({
  href,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const next = withRange(
          href,
          new URLSearchParams(window.location.search).get("range"),
        );
        if (next !== href) {
          event.preventDefault();
          router.push(next);
        }
      }}
      {...props}
    />
  );
}
