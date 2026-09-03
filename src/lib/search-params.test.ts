import { expect, test } from "vitest";
import { rangeFromSearchParams } from "./search-params";

test("reads a single range param", async () => {
  await expect(
    rangeFromSearchParams(Promise.resolve({ range: "7d" })),
  ).resolves.toBe("7d");
});

test("uses the first value when the param is repeated", async () => {
  await expect(
    rangeFromSearchParams(Promise.resolve({ range: ["90d", "7d"] })),
  ).resolves.toBe("90d");
});

test("defaults to 30d when range is missing", async () => {
  await expect(rangeFromSearchParams(Promise.resolve({}))).resolves.toBe("30d");
});
