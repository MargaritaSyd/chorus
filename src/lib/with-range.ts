import { parseRange } from "@/lib/analytics";

export function withRange(pathname: string, range: string | null): string {
  const parsed = parseRange(range);
  if (parsed === "30d") {
    return pathname;
  }
  return `${pathname}?range=${parsed}`;
}
