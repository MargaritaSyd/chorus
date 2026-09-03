import { expect, test } from "vitest";
import { withRange } from "./with-range";

test("omits the default 30d range from the query string", () => {
  expect(withRange("/posts", null)).toBe("/posts");
  expect(withRange("/posts", "30d")).toBe("/posts");
});

test("appends a non-default range", () => {
  expect(withRange("/posts", "7d")).toBe("/posts?range=7d");
  expect(withRange("/", "90d")).toBe("/?range=90d");
});

test("treats invalid values as the default range", () => {
  expect(withRange("/platforms/instagram", "14d")).toBe("/platforms/instagram");
});
