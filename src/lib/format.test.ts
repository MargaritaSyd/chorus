import { describe, expect, it } from "vitest";
import {
  formatAxisDate,
  formatCompact,
  formatDelta,
  formatInteger,
  formatPercent,
  formatRangeLabel,
} from "./format";

describe("number formatters", () => {
  it("compacts large values", () => {
    expect(formatCompact(12400)).toBe("12.4K");
  });

  it("formats integers with grouping", () => {
    expect(formatInteger(12400)).toBe("12,400");
  });

  it("formats ratios as percents", () => {
    expect(formatPercent(0.123)).toBe("12.3%");
  });
});

describe("formatDelta", () => {
  it("prefixes gains with a plus", () => {
    expect(formatDelta(0.05)).toBe("+5%");
  });

  it("prefixes losses with a minus sign", () => {
    expect(formatDelta(-0.123)).toBe("−12.3%");
  });

  it("leaves a zero change unsigned", () => {
    expect(formatDelta(0)).toBe("0%");
  });
});

describe("date labels", () => {
  it("formats a UTC calendar date for chart axes", () => {
    expect(formatAxisDate("2026-09-01")).toBe("Sep 1");
  });

  it("joins a range with an en dash", () => {
    expect(formatRangeLabel("2026-08-03", "2026-09-01")).toBe("Aug 3 – Sep 1");
  });
});
