import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import pages from "@/lib/bch-original-pages.json";
import { pageTitle } from "@/lib/bch-display-titles";

export function PublishedContentLinks({
  prefix,
  title = "BCH published information",
}: {
  prefix: string[];
  title?: string;
}) {
  const selected = pages.filter((page) =>
    prefix.some((item) => page.slug === item || page.slug.startsWith(`${item}-`)),
  );

  return (
    <section aria-label={title} className="bg-secondary">
      <div className="site-container py-14 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[13px] font-bold text-primary">
              <span className="size-1.5 rotate-45 bg-primary" aria-hidden />
              From the archive
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
              {title}
            </h2>
          </div>
          <Link
            to="/information"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            All BCH information
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          {selected.map((page, index) => (
            <article
              key={page.slug}
              className={`flex items-center gap-4 p-4 sm:gap-5 sm:p-5 ${index > 0 ? "border-t border-border" : ""}`}
            >
              <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary sm:grid">
                <FileText className="size-4" aria-hidden />
              </span>
              <h3 className="min-w-0 flex-1 text-[15px] font-bold leading-snug">
                {pageTitle(page)}
              </h3>
              <Link
                to="/information/$slug"
                params={{ slug: page.slug }}
                aria-label={`Read ${pageTitle(page)}`}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
