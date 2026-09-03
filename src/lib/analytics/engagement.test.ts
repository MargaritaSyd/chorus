import { expect, test } from "vitest";
import { postEngagement } from "./engagement";

test("divides interactions by impressions", () => {
  expect(postEngagement(10, 5, 5, 100)).toBe(0.2);
});

test("returns 0 when there are no impressions", () => {
  expect(postEngagement(12, 3, 1, 0)).toBe(0);
});
