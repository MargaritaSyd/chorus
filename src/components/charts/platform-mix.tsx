"use client";

import { PLATFORM_META } from "@/lib/analytics";
import type { MixSlice } from "@/lib/analytics/types";
import { formatCompact } from "@/lib/format";

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 58;
const THICKNESS = 20;

export function PlatformMix({ data }: { data: MixSlice[] }) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);
  const circumference = 2 * Math.PI * RADIUS;
  let offset = 0;
  const rings = data.map((slice) => {
    const length = total === 0 ? 0 : (slice.value / total) * circumference;
    const ring = { ...slice, length, offset };
    offset += length;
    return ring;
  });

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="aspect-square w-full max-w-[13.75rem]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block size-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Reach mix by platform"
        >
          <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
            {rings.map((slice) => (
              <circle
                key={slice.platform}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke={PLATFORM_META[slice.platform].color}
                strokeWidth={THICKNESS}
                strokeDasharray={`${slice.length} ${circumference - slice.length}`}
                strokeDashoffset={-slice.offset}
                strokeLinecap="butt"
              >
                <title>{`${PLATFORM_META[slice.platform].label}: ${formatCompact(slice.value)}`}</title>
              </circle>
            ))}
          </g>
        </svg>
      </div>
      <ul className="flex w-full max-w-xs flex-col gap-2 text-sm">
        {data.map((slice) => {
          const share = total === 0 ? 0 : slice.value / total;
          return (
            <li key={slice.platform} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: PLATFORM_META[slice.platform].color }}
              />
              <span className="w-24 text-muted-foreground">
                {PLATFORM_META[slice.platform].label}
              </span>
              <span className="font-mono tabular-nums">
                {formatCompact(slice.value)}
              </span>
              <span className="ml-auto font-mono text-muted-foreground tabular-nums">
                {(share * 100).toFixed(0)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
