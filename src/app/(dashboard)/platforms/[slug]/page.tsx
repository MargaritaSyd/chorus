import { notFound } from "next/navigation";
import { OverviewView } from "@/components/overview-view";
import { analytics, isPlatform, PLATFORM_META } from "@/lib/analytics";
import { rangeFromSearchParams } from "@/lib/search-params";

type PlatformPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ range?: string | string[] }>;
};

export function generateStaticParams() {
  return [
    { slug: "instagram" },
    { slug: "linkedin" },
    { slug: "youtube" },
  ];
}

export async function generateMetadata({ params }: PlatformPageProps) {
  const { slug } = await params;
  if (!isPlatform(slug)) {
    return { title: "Platform" };
  }
  return { title: PLATFORM_META[slug].label };
}

export default async function PlatformPage({
  params,
  searchParams,
}: PlatformPageProps) {
  const { slug } = await params;
  if (!isPlatform(slug)) {
    notFound();
  }

  const range = await rangeFromSearchParams(searchParams);
  const snapshot = await analytics.getDashboard({ range, platform: slug });

  return <OverviewView snapshot={snapshot} />;
}
