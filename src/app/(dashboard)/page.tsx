import { OverviewView } from "@/components/overview-view";
import { analytics } from "@/lib/analytics";
import { rangeFromSearchParams } from "@/lib/search-params";

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string | string[] }>;
}) {
  const range = await rangeFromSearchParams(searchParams);
  const snapshot = await analytics.getDashboard({ range });

  return <OverviewView snapshot={snapshot} />;
}
