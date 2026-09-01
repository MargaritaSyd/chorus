import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GrowthLine } from "@/components/charts/growth-line";
import { PlatformMix } from "@/components/charts/platform-mix";
import { KpiCard } from "@/components/kpi-card";
import type { DashboardSnapshot } from "@/lib/analytics";
import { formatRangeLabel } from "@/lib/format";

export function OverviewView({ snapshot }: { snapshot: DashboardSnapshot }) {
  const windowLabel = formatRangeLabel(snapshot.start, snapshot.end);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">{windowLabel}</p>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Followers" metric={snapshot.kpis.followers} />
        <KpiCard label="Reach" metric={snapshot.kpis.reach} />
        <KpiCard
          label="Engagement rate"
          metric={snapshot.kpis.engagementRate}
          format="percent"
        />
        <KpiCard label="Posts" metric={snapshot.kpis.posts} format="integer" />
      </section>
      <section className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Follower growth</CardTitle>
            <CardDescription>Daily followers by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <GrowthLine data={snapshot.growth} platform={snapshot.platform} />
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Reach mix</CardTitle>
            <CardDescription>Share of reach in this window</CardDescription>
          </CardHeader>
          <CardContent>
            <PlatformMix data={snapshot.mix} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
