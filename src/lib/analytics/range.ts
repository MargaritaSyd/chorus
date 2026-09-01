import { DATE_RANGES, type DateRange } from "./types";

export const MOCK_AS_OF = "2026-09-01";

export const RANGE_DAYS: Record<DateRange, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export function parseRange(value: unknown): DateRange {
  if (typeof value === "string" && DATE_RANGES.includes(value as DateRange)) {
    return value as DateRange;
  }
  return "30d";
}

export function addUtcDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function resolveWindow(
  range: DateRange,
  asOf: string = MOCK_AS_OF,
): { start: string; end: string; days: number } {
  const days = RANGE_DAYS[range];
  return {
    start: addUtcDays(asOf, -(days - 1)),
    end: asOf,
    days,
  };
}

export function previousWindow(start: string, days: number): {
  start: string;
  end: string;
} {
  return {
    start: addUtcDays(start, -days),
    end: addUtcDays(start, -1),
  };
}

export function isDateInRange(
  isoDate: string,
  start: string,
  end: string,
): boolean {
  return isoDate >= start && isoDate <= end;
}

export function postDate(publishedAt: string): string {
  return publishedAt.slice(0, 10);
}
