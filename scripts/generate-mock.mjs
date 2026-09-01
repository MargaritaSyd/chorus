import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const asOf = new Date("2026-09-01T00:00:00Z");

function iso(date) {
  return date.toISOString().slice(0, 10);
}

function daysBack(n) {
  const date = new Date(asOf);
  date.setUTCDate(date.getUTCDate() - n);
  return date;
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function hash(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 2 ** 32;
}

function dailySeries({ platform, startFollowers, endFollowers, reachBase, reachSpread }) {
  const daily = [];
  for (let i = 89; i >= 0; i -= 1) {
    const date = iso(daysBack(i));
    const t = (89 - i) / 89;
    const wobble =
      Math.sin(i / 5) * 0.004 + (hash(`${platform}:${date}`) - 0.5) * 0.008;
    const followers = Math.round(
      lerp(startFollowers, endFollowers, t) * (1 + wobble),
    );
    const weekend = [0, 6].includes(daysBack(i).getUTCDay());
    const reach = Math.round(
      reachBase *
        (weekend ? 0.72 : 1) *
        (1 + (hash(`${date}:${platform}:reach`) - 0.5) * reachSpread),
    );
    const impressions = Math.round(
      reach * (1.2 + hash(`${date}:${platform}:impr`) * 0.35),
    );
    daily.push({ date, followers, reach, impressions });
  }
  return daily;
}

function post({ id, platform, daysAgo, title, likes, comments, shares, impressions }) {
  return {
    id,
    platform,
    publishedAt: `${iso(daysBack(daysAgo))}T14:30:00.000Z`,
    title,
    url: `https://example.com/${platform}/${id}`,
    likes,
    comments,
    shares,
    impressions,
  };
}

const catalogs = {
  instagram: {
    platform: "instagram",
    daily: dailySeries({
      platform: "instagram",
      startFollowers: 11840,
      endFollowers: 12890,
      reachBase: 4200,
      reachSpread: 0.45,
    }),
    posts: [
      post({ id: "ig-01", platform: "instagram", daysAgo: 88, title: "Welcome to a quieter analytics view", likes: 214, comments: 18, shares: 11, impressions: 6100 }),
      post({ id: "ig-02", platform: "instagram", daysAgo: 81, title: "Carousel: three networks, one scoreboard", likes: 341, comments: 27, shares: 19, impressions: 8400 }),
      post({ id: "ig-03", platform: "instagram", daysAgo: 74, title: "Design notes: dark mode that still reads as data", likes: 289, comments: 21, shares: 14, impressions: 7200 }),
      post({ id: "ig-04", platform: "instagram", daysAgo: 67, title: "Reel: 7d vs 30d vs 90d in fifteen seconds", likes: 512, comments: 44, shares: 38, impressions: 12100 }),
      post({ id: "ig-05", platform: "instagram", daysAgo: 60, title: "How we mock a month of growth without lying", likes: 198, comments: 16, shares: 9, impressions: 5400 }),
      post({ id: "ig-06", platform: "instagram", daysAgo: 52, title: "Color system for Instagram, LinkedIn, YouTube", likes: 276, comments: 19, shares: 22, impressions: 6900 }),
      post({ id: "ig-07", platform: "instagram", daysAgo: 45, title: "A KPI should fit on a phone in the subway", likes: 365, comments: 31, shares: 17, impressions: 9100 }),
      post({ id: "ig-08", platform: "instagram", daysAgo: 38, title: "Behind the chart: why followers lag reach", likes: 241, comments: 22, shares: 13, impressions: 6400 }),
      post({ id: "ig-09", platform: "instagram", daysAgo: 31, title: "Story series: reading an engagement dip", likes: 188, comments: 29, shares: 8, impressions: 5100 }),
      post({ id: "ig-10", platform: "instagram", daysAgo: 24, title: "New layout preview: sidebar + range filter", likes: 428, comments: 36, shares: 27, impressions: 10200 }),
      post({ id: "ig-11", platform: "instagram", daysAgo: 17, title: "What “mix by platform” is actually saying", likes: 307, comments: 24, shares: 18, impressions: 7800 }),
      post({ id: "ig-12", platform: "instagram", daysAgo: 11, title: "Weekend reach is quieter. That is a feature.", likes: 256, comments: 15, shares: 12, impressions: 6700 }),
      post({ id: "ig-13", platform: "instagram", daysAgo: 6, title: "Shipping mock data that still feels like a week", likes: 391, comments: 33, shares: 21, impressions: 9600 }),
      post({ id: "ig-14", platform: "instagram", daysAgo: 2, title: "Chorus, from one screen", likes: 447, comments: 41, shares: 29, impressions: 11400 }),
    ],
  },
  linkedin: {
    platform: "linkedin",
    daily: dailySeries({
      platform: "linkedin",
      startFollowers: 6420,
      endFollowers: 7180,
      reachBase: 2100,
      reachSpread: 0.38,
    }),
    posts: [
      post({ id: "li-01", platform: "linkedin", daysAgo: 85, title: "Why social reporting still lives in spreadsheets", likes: 86, comments: 14, shares: 9, impressions: 3200 }),
      post({ id: "li-02", platform: "linkedin", daysAgo: 72, title: "A dashboard should explain itself in a minute", likes: 124, comments: 21, shares: 16, impressions: 4100 }),
      post({ id: "li-03", platform: "linkedin", daysAgo: 61, title: "Adapters first: keep the UI off the API", likes: 97, comments: 18, shares: 11, impressions: 3600 }),
      post({ id: "li-04", platform: "linkedin", daysAgo: 49, title: "Range filters that belong in the URL", likes: 141, comments: 19, shares: 22, impressions: 4700 }),
      post({ id: "li-05", platform: "linkedin", daysAgo: 36, title: "Engagement rate without vanity math", likes: 168, comments: 27, shares: 19, impressions: 5300 }),
      post({ id: "li-06", platform: "linkedin", daysAgo: 23, title: "What we left out of v1 on purpose", likes: 192, comments: 34, shares: 28, impressions: 6100 }),
      post({ id: "li-07", platform: "linkedin", daysAgo: 14, title: "Mock data is a product decision, not a shortcut", likes: 155, comments: 23, shares: 17, impressions: 4900 }),
      post({ id: "li-08", platform: "linkedin", daysAgo: 8, title: "Building Chorus in public: the overview slice", likes: 211, comments: 31, shares: 24, impressions: 6800 }),
      post({ id: "li-09", platform: "linkedin", daysAgo: 3, title: "Three networks. One panel. No keys required.", likes: 238, comments: 29, shares: 33, impressions: 7400 }),
    ],
  },
  youtube: {
    platform: "youtube",
    daily: dailySeries({
      platform: "youtube",
      startFollowers: 18400,
      endFollowers: 19650,
      reachBase: 8600,
      reachSpread: 0.5,
    }),
    posts: [
      post({ id: "yt-01", platform: "youtube", daysAgo: 84, title: "Walkthrough: a social dashboard you can actually ship", likes: 420, comments: 37, shares: 48, impressions: 18200 }),
      post({ id: "yt-02", platform: "youtube", daysAgo: 70, title: "Reading the 30-day growth line", likes: 365, comments: 29, shares: 31, impressions: 15400 }),
      post({ id: "yt-03", platform: "youtube", daysAgo: 56, title: "Donuts, bars, and when not to use them", likes: 298, comments: 41, shares: 22, impressions: 13900 }),
      post({ id: "yt-04", platform: "youtube", daysAgo: 42, title: "From JSON mock to a live adapter", likes: 512, comments: 46, shares: 57, impressions: 22100 }),
      post({ id: "yt-05", platform: "youtube", daysAgo: 28, title: "Designing KPIs that survive a 7-day zoom", likes: 387, comments: 33, shares: 29, impressions: 16800 }),
      post({ id: "yt-06", platform: "youtube", daysAgo: 16, title: "Sidebar navigation for a one-person analytics app", likes: 341, comments: 22, shares: 18, impressions: 14700 }),
      post({ id: "yt-07", platform: "youtube", daysAgo: 5, title: "Chorus overview: followers, reach, mix", likes: 478, comments: 39, shares: 44, impressions: 19600 }),
    ],
  },
};

const dataDir = join(root, "src", "data");
mkdirSync(dataDir, { recursive: true });

for (const [name, catalog] of Object.entries(catalogs)) {
  writeFileSync(join(dataDir, `${name}.json`), `${JSON.stringify(catalog, null, 2)}\n`);
}

console.log("Wrote instagram, linkedin, and youtube mock catalogs.");
