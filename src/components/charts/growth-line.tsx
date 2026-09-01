"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PLATFORM_META, PLATFORMS, type Platform } from "@/lib/analytics";
import type { GrowthPoint } from "@/lib/analytics/types";
import { formatAxisDate, formatInteger } from "@/lib/format";

export function GrowthLine({
  data,
  platform,
}: {
  data: GrowthPoint[];
  platform?: Platform;
}) {
  const keys = platform ? [platform] : [...PLATFORMS];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatAxisDate}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <YAxis
            tickFormatter={formatInteger}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)" }}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelFormatter={(label) => formatAxisDate(String(label))}
            formatter={(value, name) => [
              formatInteger(Number(value)),
              PLATFORM_META[name as Platform].label,
            ]}
          />
          <Legend
            formatter={(value) => PLATFORM_META[value as Platform].label}
            wrapperStyle={{ fontSize: 12 }}
          />
          {keys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={PLATFORM_META[key].color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
