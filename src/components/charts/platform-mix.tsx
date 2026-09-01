"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PLATFORM_META, type Platform } from "@/lib/analytics";
import type { MixSlice } from "@/lib/analytics/types";
import { formatCompact } from "@/lib/format";

export function PlatformMix({ data }: { data: MixSlice[] }) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <div className="flex h-72 flex-col justify-center gap-4 sm:flex-row sm:items-center">
      <div className="h-56 w-full sm:h-64 sm:w-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="platform"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={2}
              stroke="var(--card)"
            >
              {data.map((slice) => (
                <Cell
                  key={slice.platform}
                  fill={PLATFORM_META[slice.platform].color}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value, name) => [
                formatCompact(Number(value)),
                PLATFORM_META[name as Platform].label,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex flex-col gap-2 text-sm">
        {data.map((slice) => {
          const share = total === 0 ? 0 : slice.value / total;
          return (
            <li key={slice.platform} className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ background: PLATFORM_META[slice.platform].color }}
              />
              <span className="w-24 text-muted-foreground">
                {PLATFORM_META[slice.platform].label}
              </span>
              <span className="font-mono tabular-nums">
                {formatCompact(slice.value)}
              </span>
              <span className="font-mono text-muted-foreground tabular-nums">
                {(share * 100).toFixed(0)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
