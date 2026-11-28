import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ArrowUpRight, FileText } from "lucide-react";
import media from "@/lib/bch-source-media.json";
import { pageTitle } from "@/lib/bch-display-titles";
import { isSiteBanner, parseNewsEntries } from "@/lib/bch-news-entries";
import { Button } from "@/components/ui/button";
import { BackLink, Kicker } from "@/components/page-sections";
import { NewsRows } from "@/components/news-rows";
import { ResponsiveImage } from "@/components/responsive-image";
import { detailImageUrl } from "@/lib/image-meta";

/** Map an archived source URL to the local copy that was published with it. */
function imageUrlForSource(source: string) {
  return media.find((item) => item.source === source)?.url ?? null;
}

export const Route = createFileRoute("/information/$slug")({
  loader: async ({ params }) => {
    // The 325 KB archive only ships when an article is actually opened.
    const { default: pages } = await import("@/lib/bch-original-pages.json");
    const page = pages.find((item) => item.slug === params.slug);
    if (!page) throw notFound();
    return { ...page, title: pageTitle(page) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "BCH Information"} — Bwindi Community Hospital` },
      {
        name: "description",
        content: `Read BCH’s published information about ${loaderData?.title ?? "hospital services"}.`,
      },
      { property: "og:title", content: loaderData?.title ?? "BCH Information" },
      {
        property: "og:description",
        content: "Original information published by Bwindi Community Hospital.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OriginalArticle,
});

function OriginalArticle() {
  const page = Route.useLoaderData();

  // The archived news index carries a photograph per story rather than one for
  // the page, so it is rendered as news rows instead of a photo block.
  const news = page.slug === "news-news" ? parseNewsEntries(page.body) : null;

  const photos = news
    ? []
    : page.imageSources
        .filter((source) => !isSiteBanner(source))
        .map((source) => imageUrlForSource(source))
        .filter((url) => url !== null);
  // The archive body often repeats the page title as its own heading. Drop it
  // when it matches the title we now render in the header, ignoring case and
  // punctuation so lowercase or punctuated source titles still match.
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const body = page.body.replace(/^#{1,6}\s+([^\n]+)\n*/, (heading, text: string) =>
    normalize(text) === normalize(page.title) ? "" : heading,
  );

  // Some archive pages (notably the gallery) list each photograph as a link
  // with no text. Those images are already shown above, so drop the empty
  // links rather than rendering a column of blank bullets.
  const content = (news ? news.rest : body)
    .split("\n")
    .filter((line) => !/^\s*(?:[-*+]\s*)?\[\]\([^)]*\)\s*$/.test(line))
    .join("\n")
    .replace(/\[\]\([^)]*\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return (
    <article>
      <header className="relative overflow-hidden bg-secondary">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full border-[26px] border-primary/10 lg:size-80"
        />
        <div className="site-container relative py-10 md:py-14">
          <BackLink fallback="/information" />
          <div className="mt-6">
            <Kicker>From the BCH archive</Kicker>
            <h1 className="mt-3 max-w-4xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance md:text-4xl lg:text-5xl">
              {page.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="site-container grid gap-12 pb-14 pt-10 md:pb-16 md:pt-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <div className="min-w-0">
          <PhotoBlock title={page.title} photos={photos} />

          <div className="max-w-3xl break-words">
            {news && (
              <div className="mb-10">
                <NewsRows stories={news.entries} />
              </div>
            )}
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="mt-10 text-2xl font-extrabold leading-snug tracking-[-0.02em] first:mt-0 md:text-3xl">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-10 text-2xl font-extrabold leading-snug tracking-[-0.02em] first:mt-0 md:text-3xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-8 text-xl font-bold leading-snug first:mt-0">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="mt-6 text-base font-bold first:mt-0">{children}</h4>
                ),
                p: ({ children }) => (
                  <p className="mt-4 text-[15.5px] leading-8 text-foreground/85 [&:first-child]:mt-0">
                    {children}
                  </p>
                ),
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-[15.5px] leading-7 marker:text-primary/50">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mt-4 list-decimal space-y-2 pl-6 text-[15.5px] leading-7 marker:font-bold marker:text-primary/50">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="mt-6 rounded-r-xl border-l-4 border-primary/40 bg-secondary px-5 py-4 text-[15.5px] italic leading-8 text-foreground/80">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-8 border-border" />,
                table: ({ children }) => (
                  <div className="mt-6 overflow-x-auto rounded-xl border border-border">
                    <table className="w-full border-collapse text-sm">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border-b border-border bg-secondary px-3 py-2 text-left font-bold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-border px-3 py-2 align-top">{children}</td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-5">
            <span className="grid size-10 place-items-center rounded-full bg-peach text-primary">
              <FileText className="size-4" aria-hidden />
            </span>
            <h2 className="mt-3 text-sm font-bold">About this page</h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Published by Bwindi Community Hospital and preserved here with its original wording.
            </p>
            <Link
              to="/information"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              Browse the archive
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-4 rounded-2xl bg-secondary p-5">
            <h2 className="text-sm font-bold">Need care?</h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              For urgent care call the hospital. Routine appointments can be requested online.
            </p>
            <Button className="mt-4 w-full" size="sm" asChild>
              <Link to="/contact">Contact BCH</Link>
            </Button>
          </div>
        </aside>
      </div>
    </article>
  );
}

/**
 * Article photographs sit directly under the page header. Pages with a single
 * photo get a lead image, a handful get a two-up grid, and heavily illustrated
 * archive pages fall back to a compact thumbnail grid so the text still starts
 * near the top.
 */
function PhotoBlock({ title, photos }: { title: string; photos: string[] }) {
  if (photos.length === 0) return null;

  if (photos.length >= 5) {
    return (
      <div className="mb-9 grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((src, index) => (
          <a
            key={src}
            href={detailImageUrl(src)}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-xl border border-border bg-secondary"
          >
            <ResponsiveImage
              src={src}
              sizes="(min-width: 640px) 180px, 33vw"
              alt={`${title} — photograph ${index + 1}`}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`mb-9 grid max-w-3xl gap-4 ${photos.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {photos.map((src, index) => (
        <ResponsiveImage
          key={src}
          src={src}
          sizes="(min-width: 640px) 50vw, 100vw"
          priority={index === 0}
          alt={`${title} — photograph ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
          className="aspect-[4/3] w-full rounded-2xl border border-border bg-secondary object-cover"
        />
      ))}
    </div>
  );
}
