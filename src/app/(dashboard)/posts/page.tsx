import { analytics } from "@/lib/analytics";
import { formatInteger, formatRangeLabel } from "@/lib/format";
import { rangeFromSearchParams } from "@/lib/search-params";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string | string[] }>;
}) {
  const range = await rangeFromSearchParams(searchParams);
  const snapshot = await analytics.getDashboard({ range });

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        {formatRangeLabel(snapshot.start, snapshot.end)}
      </p>
      <h2 className="text-lg font-medium">
        {formatInteger(snapshot.posts.length)} posts in this range
      </h2>
      <p className="text-sm text-muted-foreground">
        Sortable table with likes, comments, shares, and engagement ships next.
      </p>
    </div>
  );
}
