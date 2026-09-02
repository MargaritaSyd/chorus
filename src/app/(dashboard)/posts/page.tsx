import { PostsTable } from "@/components/posts-table";
import { analytics } from "@/lib/analytics";
import { formatRangeLabel } from "@/lib/format";
import { rangeFromSearchParams } from "@/lib/search-params";

export const metadata = {
  title: "Posts",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string | string[] }>;
}) {
  const range = await rangeFromSearchParams(searchParams);
  const snapshot = await analytics.getDashboard({ range });

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {formatRangeLabel(snapshot.start, snapshot.end)}
      </p>
      <PostsTable key={snapshot.range} posts={snapshot.posts} />
    </div>
  );
}
