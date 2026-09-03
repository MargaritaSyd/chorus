import { describe, expect, it } from "vitest";
import { mockAnalyticsProvider } from "./mock";
import { isDateInRange, postDate, resolveWindow } from "./range";

describe("mockAnalyticsProvider", () => {
  it("builds a 30-day overview snapshot from mock catalogs", async () => {
    const snapshot = await mockAnalyticsProvider.getDashboard({ range: "30d" });
    const { start, end } = resolveWindow("30d");

    expect(snapshot).toMatchObject({
      range: "30d",
      start,
      end,
    });
    expect(snapshot.kpis.followers.value).toBeGreaterThan(0);
    expect(snapshot.growth).toHaveLength(30);
    expect(snapshot.mix.map((slice) => slice.platform)).toEqual([
      "instagram",
      "linkedin",
      "youtube",
    ]);
    expect(
      snapshot.posts.every((post) =>
        isDateInRange(postDate(post.publishedAt), start, end),
      ),
    ).toBe(true);
  });

  it("scopes posts and KPIs to a single platform", async () => {
    const snapshot = await mockAnalyticsProvider.getDashboard({
      range: "7d",
      platform: "instagram",
    });

    expect(snapshot.platform).toBe("instagram");
    expect(snapshot.posts.every((post) => post.platform === "instagram")).toBe(
      true,
    );
    expect(snapshot.growth).toHaveLength(7);
  });
});
