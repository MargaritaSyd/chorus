import { describe, expect, it } from "vitest";
import {
  addUtcDays,
  isDateInRange,
  parseRange,
  postDate,
  previousWindow,
  resolveWindow,
} from "./range";

describe("parseRange", () => {
  it("accepts known ranges", () => {
    expect(parseRange("7d")).toBe("7d");
    expect(parseRange("30d")).toBe("30d");
    expect(parseRange("90d")).toBe("90d");
  });

  it("falls back to 30d for unknown values", () => {
    expect(parseRange(undefined)).toBe("30d");
    expect(parseRange("14d")).toBe("30d");
    expect(parseRange(7)).toBe("30d");
  });
});

describe("date windows", () => {
  it("adds UTC days without shifting the calendar date", () => {
    expect(addUtcDays("2026-09-01", -6)).toBe("2026-08-26");
    expect(addUtcDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("resolves an inclusive 7-day window from the mock as-of date", () => {
    expect(resolveWindow("7d")).toEqual({
      start: "2026-08-26",
      end: "2026-09-01",
      days: 7,
    });
  });

  it("returns the immediately preceding window of the same length", () => {
    expect(previousWindow("2026-08-26", 7)).toEqual({
      start: "2026-08-19",
      end: "2026-08-25",
    });
  });

  it("includes the start and end dates", () => {
    expect(isDateInRange("2026-08-26", "2026-08-26", "2026-09-01")).toBe(true);
    expect(isDateInRange("2026-09-01", "2026-08-26", "2026-09-01")).toBe(true);
    expect(isDateInRange("2026-08-25", "2026-08-26", "2026-09-01")).toBe(false);
  });

  it("extracts the calendar date from a timestamp", () => {
    expect(postDate("2026-08-30T18:12:00.000Z")).toBe("2026-08-30");
  });
});
