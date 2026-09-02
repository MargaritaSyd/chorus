"use client";

import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equals,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { postEngagement } from "@/lib/analytics/engagement";
import {
  PLATFORM_META,
  PLATFORMS,
  type Platform,
  type Post,
} from "@/lib/analytics";
import { formatInteger, formatPercent } from "@/lib/format";

const PAGE_SIZE = 8;

const features = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { equals: filterFn_equals },
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

function formatPostDate(publishedAt: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}

function SortIcon({ state }: { state: false | "asc" | "desc" }) {
  if (state === "asc") {
    return <ArrowUpIcon />;
  }
  if (state === "desc") {
    return <ArrowDownIcon />;
  }
  return <ArrowUpDownIcon />;
}

const columns: Array<ColumnDef<typeof features, Post>> = [
  {
    accessorKey: "platform",
    header: "Platform",
    filterFn: filterFn_equals,
    cell: (info) => {
      const value = info.getValue<Platform>();
      return (
        <Badge variant="outline" className="gap-1.5">
          <span
            className="size-1.5 rounded-full"
            style={{ background: PLATFORM_META[value].color }}
          />
          {PLATFORM_META[value].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Date",
    cell: (info) => (
      <span className="font-mono tabular-nums text-muted-foreground">
        {formatPostDate(info.getValue<string>())}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: "Post",
    enableSorting: false,
    cell: (info) => (
      <a
        href={info.row.original.url}
        className="max-w-xs text-pretty whitespace-normal underline-offset-4 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        {info.row.original.title}
      </a>
    ),
  },
  {
    accessorKey: "likes",
    header: "Likes",
    cell: (info) => (
      <span className="font-mono tabular-nums">
        {formatInteger(info.getValue<number>())}
      </span>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: (info) => (
      <span className="font-mono tabular-nums">
        {formatInteger(info.getValue<number>())}
      </span>
    ),
  },
  {
    accessorKey: "shares",
    header: "Shares",
    cell: (info) => (
      <span className="font-mono tabular-nums">
        {formatInteger(info.getValue<number>())}
      </span>
    ),
  },
  {
    id: "engagement",
    accessorFn: (row) =>
      postEngagement(row.likes, row.comments, row.shares, row.impressions),
    header: "Engagement",
    cell: (info) => (
      <span className="font-mono tabular-nums">
        {formatPercent(info.getValue<number>())}
      </span>
    ),
  },
];

export function PostsTable({ posts }: { posts: Post[] }) {
  const table = useTable({
    features,
    columns,
    data: posts,
    initialState: {
      sorting: [{ id: "publishedAt", desc: true }],
      pagination: { pageIndex: 0, pageSize: PAGE_SIZE },
    },
  });

  const platformFilter =
    (table.getColumn("platform")?.getFilterValue() as string | undefined) ??
    "all";
  const filteredCount = table.getFilteredRowModel().rows.length;
  const pagination = table.state.pagination;
  const pageStart =
    filteredCount === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const pageEnd = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    filteredCount,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <CardTitle>
          {filteredCount} {filteredCount === 1 ? "post" : "posts"}
        </CardTitle>
        <Select
          value={platformFilter}
          onValueChange={(value) => {
            if (!value) {
              return;
            }
            table
              .getColumn("platform")
              ?.setFilterValue(value === "all" ? undefined : value);
            table.setPageIndex(0);
          }}
        >
          <SelectTrigger size="sm" aria-label="Filter by platform">
            <SelectValue placeholder="All platforms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All platforms</SelectItem>
            {PLATFORMS.map((item) => (
              <SelectItem key={item} value={item}>
                {PLATFORM_META[item].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : canSort ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-ml-2.5"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <table.FlexRender header={header} />
                          <SortIcon state={sorted} />
                        </Button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "title"
                          ? "whitespace-normal"
                          : undefined
                      }
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No posts in this range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            {filteredCount === 0
              ? "0 posts"
              : `${pageStart}–${pageEnd} of ${filteredCount}`}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
