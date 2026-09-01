import { mockAnalyticsProvider } from "./mock";

export const analytics = mockAnalyticsProvider;

export { isPlatform, PLATFORM_META } from "./platforms";
export { parseRange } from "./range";
export { DATE_RANGES, PLATFORMS } from "./types";
export type {
  AnalyticsProvider,
  DashboardSnapshot,
  DateRange,
  Platform,
  Post,
} from "./types";
