export const PLATFORMS = ["instagram", "linkedin", "youtube"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const DATE_RANGES = ["7d", "30d", "90d"] as const;
export type DateRange = (typeof DATE_RANGES)[number];

export type DailySnapshot = {
  date: string;
  followers: number;
  reach: number;
  impressions: number;
};

export type Post = {
  id: string;
  platform: Platform;
  publishedAt: string;
  title: string;
  url: string;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
};

export type PlatformCatalog = {
  platform: Platform;
  daily: DailySnapshot[];
  posts: Post[];
};

export type KpiMetric = {
  value: number;
  delta: number | null;
};

export type GrowthPoint = {
  date: string;
  instagram: number;
  linkedin: number;
  youtube: number;
};

export type MixSlice = {
  platform: Platform;
  value: number;
};

export type DashboardSnapshot = {
  range: DateRange;
  start: string;
  end: string;
  platform?: Platform;
  kpis: {
    followers: KpiMetric;
    reach: KpiMetric;
    engagementRate: KpiMetric;
    posts: KpiMetric;
  };
  growth: GrowthPoint[];
  mix: MixSlice[];
  posts: Post[];
};

export type AnalyticsQuery = {
  range: DateRange;
  platform?: Platform;
};

export type AnalyticsProvider = {
  getDashboard(query: AnalyticsQuery): Promise<DashboardSnapshot>;
};
