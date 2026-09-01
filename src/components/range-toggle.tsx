"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DATE_RANGES, parseRange, type DateRange } from "@/lib/analytics";

const LABELS: Record<DateRange, string> = {
  "7d": "7d",
  "30d": "30d",
  "90d": "90d",
};

export function RangeToggleGroup({
  value,
  onValueChange,
}: {
  value: DateRange;
  onValueChange?: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onValueChange}
      variant="outline"
      size="sm"
      spacing={0}
      aria-label="Date range"
    >
      {DATE_RANGES.map((item) => (
        <ToggleGroupItem key={item} value={item} aria-label={`Last ${item}`}>
          {LABELS[item]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function RangeToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const range = parseRange(searchParams.get("range"));

  function onValueChange(value: string) {
    if (!value) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (value === "30d") {
      params.delete("range");
    } else {
      params.set("range", value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return <RangeToggleGroup value={range} onValueChange={onValueChange} />;
}
