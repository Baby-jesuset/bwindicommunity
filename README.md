# Bwindi Community Hospital — website

A public website for **Bwindi Community Hospital**, a not-for-profit hospital of the Church of Uganda in Kanungu, Uganda. It presents the hospital's services, departments, community health programmes, education, projects, news and giving information.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routes, SSR)
- Vite 8, Tailwind CSS 4, shadcn/ui components on Radix primitives
- Supabase for appointment and contact request storage
- Nitro build output for Cloudflare Workers/Pages

## Getting started

Requires [Bun](https://bun.sh) (or Node.js 20+ with npm).

```sh
bun install
cp .env.example .env   # then fill in the values
bun run dev            # http://localhost:8080
```

The site reads its Supabase credentials from `.env`, which is not committed. Without them the pages still render; only the form endpoints that write to Supabase need the values.

### Scripts

| Command           | Purpose                          |
| ----------------- | -------------------------------- |
| `bun run dev`     | Start the Vite dev server        |
| `bun run build`   | Production build into `.output/` |
| `bun run preview` | Preview the last build           |
| `bun run lint`    | Run ESLint                       |
| `bun run format`  | Format with Prettier             |

## Environment variables

| Variable                        | Used by                     |
| ------------------------------- | --------------------------- |
| `SUPABASE_URL`                  | Server-side Supabase client |
| `SUPABASE_PUBLISHABLE_KEY`      | Server-side Supabase client |
| `VITE_SUPABASE_URL`             | Browser Supabase client     |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser Supabase client     |

Set the same variables in your hosting provider when deploying.

## Structure

```
src/
  routes/                 file-based routes (home, sections, information archive)
  components/             shared layout and section components
  components/ui/          shadcn/ui primitives
  lib/
    bch-original-pages.json   full text of the hospital's published information pages
    bch-source-media.json     source URL -> local file map for every archived photograph
    bch-images.ts             curated images used by the redesigned sections
    bch-news-entries.ts       archive news metadata and parsing helpers
  integrations/supabase/  Supabase clients and auth middleware
supabase/migrations/      SQL for the request tables
public/
  bch-assets/             images and documents copied from the hospital's website
  images/bch/             additional hospital photographs
```

## Content and images

All copy, photographs and documents belong to Bwindi Community Hospital. Nothing on this site is a placeholder or a stock substitute:

- The information archive reproduces the hospital's published pages in full, under `/information`, with the original wording intact.
- `src/lib/bch-original-pages.json` holds the recovered page text; `src/lib/bch-source-media.json` maps each original media URL to its local copy, and `public/bch-assets/PROVENANCE.json` records checksums.
- News, projects, services and team details are taken from the hospital's own published material.
- The contact and appointment forms store real requests in Supabase (`website_requests`). No payment details are collected by the site.

If a fact, photograph or figure changes, update the corresponding entry in these files rather than replacing it with new copy.

## Deploying

`bun run build` produces a Nitro server bundle in `.output/` configured for Cloudflare. Deploy it with Wrangler, or point another Nitro preset at the same build by adjusting `vite.config.ts`.

Remember to configure the Supabase environment variables in the hosting dashboard.
