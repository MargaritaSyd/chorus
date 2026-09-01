import instagramCatalog from "@/data/instagram.json";
import linkedinCatalog from "@/data/linkedin.json";
import youtubeCatalog from "@/data/youtube.json";
import {
  isDateInRange,
  postDate,
  previousWindow,
  resolveWindow,
} from "./range";
import { PLATFORMS, type AnalyticsProvider, type DailySnapshot, type DashboardSnapshot, type DateRange, type GrowthPoint, type KpiMetric, type Platform, type PlatformCatalog, type Post } from "./types";

const catalogs: Record<Platform, PlatformCatalog> = {
  instagram: instagramCatalog as PlatformCatalog,
  linkedin: linkedinCatalog as PlatformCatalog,
  youtube: youtubeCatalog as PlatformCatalog,
};

function selectedPlatforms(platform?: Platform): Platform[] {
  return platform ? [platform] : [...PLATFORMS];
}

function inWindow<T extends { date?: string; publishedAt?: string }>(
  items: T[],
  start: string,
  end: string,
  getDate: (item: T) => string,
): T[] {
  return items.filter((item) => isDateInRange(getDate(item), start, end));
}

function lastFollowers(daily: DailySnapshot[]): number {
  return daily.at(-1)?.followers ?? 0;
}

function sumReach(daily: DailySnapshot[]): number {
  return daily.reduce((total, point) => total + point.reach, 0);
}

function engagementRate(posts: Post[]): number {
  const impressions = posts.reduce((total, post) => total + post.impressions, 0);
  if (impressions === 0) {
    return 0;
  }
  const interactions = posts.reduce(
    (total, post) => total + post.likes + post.comments + post.shares,
    0,
  );
  return interactions / impressions;
}

function delta(current: number, previous: number): number | null {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }
  return (current - previous) / previous;
}

function kpi(current: number, previous: number): KpiMetric {
  return { value: current, delta: delta(current, previous) };
}

function catalogDaily(
  platform: Platform,
  start: string,
  end: string,
): DailySnapshot[] {
  return inWindow(catalogs[platform].daily, start, end, (point) => point.date);
}

function catalogPosts(
  platforms: Platform[],
  start: string,
  end: string,
): Post[] {
  return platforms
    .flatMap((platform) => catalogs[platform].posts)
    .filter((post) => isDateInRange(postDate(post.publishedAt), start, end))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function growthSeries(start: string, end: string): GrowthPoint[] {
  const dates = catalogs.instagram.daily
    .map((point) => point.date)
    .filter((date) => isDateInRange(date, start, end));

  return dates.map((date) => {
    const point: GrowthPoint = {
      date,
      instagram: 0,
      linkedin: 0,
      youtube: 0,
    };
    for (const platform of PLATFORMS) {
      point[platform] =
        catalogs[platform].daily.find((entry) => entry.date === date)
          ?.followers ?? 0;
    }
    return point;
  });
}

function periodMetrics(platforms: Platform[], start: string, end: string) {
  const daily = platforms.flatMap((platform) =>
    catalogDaily(platform, start, end),
  );
  const posts = catalogPosts(platforms, start, end);
  const followers = platforms.reduce(
    (total, platform) => total + lastFollowers(catalogDaily(platform, start, end)),
    0,
  );

  return {
    followers,
    reach: sumReach(daily),
    engagementRate: engagementRate(posts),
    posts: posts.length,
    postsList: posts,
  };
}

function buildSnapshot(
  range: DateRange,
  platform?: Platform,
): DashboardSnapshot {
  const { start, end, days } = resolveWindow(range);
  const prior = previousWindow(start, days);
  const platforms = selectedPlatforms(platform);
  const current = periodMetrics(platforms, start, end);
  const previous = periodMetrics(platforms, prior.start, prior.end);

  return {
    range,
    start,
    end,
    platform,
    kpis: {
      followers: kpi(current.followers, previous.followers),
      reach: kpi(current.reach, previous.reach),
      engagementRate: kpi(current.engagementRate, previous.engagementRate),
      posts: kpi(current.posts, previous.posts),
    },
    growth: growthSeries(start, end),
    mix: PLATFORMS.map((item) => ({
      platform: item,
      value: sumReach(catalogDaily(item, start, end)),
    })),
    posts: current.postsList,
  };
}

export const mockAnalyticsProvider: AnalyticsProvider = {
  async getDashboard({ range, platform }) {
    return buildSnapshot(range, platform);
  },
};
