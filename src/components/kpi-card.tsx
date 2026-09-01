import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompact, formatDelta, formatInteger, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { KpiMetric } from "@/lib/analytics/types";

type Format = "compact" | "integer" | "percent";

const formatters: Record<Format, (value: number) => string> = {
  compact: formatCompact,
  integer: formatInteger,
  percent: formatPercent,
};

export function KpiCard({
  label,
  metric,
  format = "compact",
}: {
  label: string;
  metric: KpiMetric;
  format?: Format;
}) {
  const delta = metric.delta;
  const up = delta !== null && delta > 0;
  const down = delta !== null && delta < 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-3">
        <p className="font-mono text-3xl font-medium tracking-tight tabular-nums">
          {formatters[format](metric.value)}
        </p>
        {delta === null ? (
          <span className="text-xs text-muted-foreground">No prior window</span>
        ) : (
          <Badge
            variant="secondary"
            className={cn(
              "font-mono tabular-nums",
              up && "bg-emerald-500/15 text-emerald-400",
              down && "bg-red-500/15 text-red-400",
            )}
          >
            {formatDelta(delta)}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
