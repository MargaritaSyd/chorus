# Chorus

Social analytics dashboard for Instagram, LinkedIn, and YouTube.

One panel with KPIs, charts, and a posts table. v1 uses mock JSON so the app deploys on Vercel with no API keys. Each network has an adapter seam so live APIs can land later without rewriting the UI.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- shadcn/ui, Recharts, TanStack Table (coming next)

## Screens

| Route | What you see |
| --- | --- |
| `/` | Overview: followers, reach, engagement rate, posts; 30-day growth; mix by platform |
| `/posts` | Table: platform, date, likes, comments, shares, engagement |
| `/platforms/[slug]` | Same overview, filtered to Instagram, LinkedIn, or YouTube |

Date range filter (`7d` / `30d` / `90d`) on all three.

## Out of v1

Auth, database, scraping, and live social APIs. Those block a portfolio deploy and do not help the first impression.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy

Vercel, no environment variables required for mock data.
