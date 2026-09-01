import { parseRange, type DateRange } from "@/lib/analytics";

export async function rangeFromSearchParams(
  searchParams: Promise<{ range?: string | string[] | undefined }>,
): Promise<DateRange> {
  const params = await searchParams;
  const range = params.range;
  return parseRange(Array.isArray(range) ? range[0] : range);
}
