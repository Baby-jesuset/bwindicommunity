import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import { Kicker, PageHero, Section } from "@/components/page-sections";
import pages from "@/lib/bch-archive-index.json";
import { pageTitle } from "@/lib/bch-display-titles";
import {
  reports,
  innovations,
  awards,
  newsletters,
  wishLists,
  articles,
  forms,
  jobAdverts,
  finances,
} from "@/lib/bch-published-resources";

export const Route = createFileRoute("/information/")({
  head: () => ({
    meta: [
      { title: "BCH Information, Articles & Reports — Bwindi Community Hospital" },
      {
        name: "description",
        content:
          "Complete BCH articles, clinical services, community programs, education, innovations and annual reports.",
      },
      { property: "og:title", content: "BCH Information, Articles & Reports" },
      {
        property: "og:description",
        content: "Read original information published by Bwindi Community Hospital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InformationIndex,
});

const jumps = [
  ["BCH pages", "#pages"],
  ["Documents", "#documents"],
  ["Innovations", "#innovations"],
  ["Awards", "#awards"],
] as const;

function InformationIndex() {
  return (
    <>
      <PageHero
        eyebrow="BCH information"
        title="Hospital information & reports."
        intro="Services, community programs, research, training, news and support information from Bwindi Community Hospital."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {jumps.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>

        <div id="pages" className="mt-12 scroll-mt-24">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <Kicker>Archive index</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
                BCH pages
              </h2>
            </div>
            <p className="text-xs font-semibold text-muted-foreground">
              {pages.length} preserved pages
            </p>
          </div>
          <ul className="mt-6 grid overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-2">
            {pages.map((page) => (
              <li key={page.slug} className="border-b border-border sm:[&:nth-child(odd)]:border-r">
                <Link
                  to="/information/$slug"
                  params={{ slug: page.slug }}
                  className="flex h-full items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary hover:text-primary"
                >
                  <span className="min-w-0 flex-1">{pageTitle(page)}</span>
                  <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream" label="BCH documents">
        <div id="documents" className="scroll-mt-24">
          <Kicker>Documents</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
            Reports, newsletters &amp; published documents
          </h2>

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <DocGroup title="Annual reports, surveys & strategic plans" docs={reports} />
            <DocGroup title="Newsletters" docs={newsletters} />
            <DocGroup title="Wish lists" docs={wishLists} />
            <DocGroup title="Articles & stories" docs={articles} />
            <DocGroup title="Forms & policies" docs={[...forms, ...jobAdverts]} />
            <DocGroup title="Audited accounts & budgets (archive)" docs={finances} />
          </div>
        </div>
      </Section>

      <Section label="Innovations and awards">
        <div id="innovations" className="scroll-mt-24">
          <Kicker>Innovations</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
            Innovations
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {innovations.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm leading-6"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-peach text-xs font-extrabold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div id="awards" className="mt-14 scroll-mt-24">
          <Kicker>Awards & recognition</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
            Awards &amp; recognition
          </h2>
          <ul className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            {awards.map((item, index) => (
              <li
                key={item}
                className={`flex items-start gap-3 p-5 text-sm leading-6 ${index > 0 ? "border-t border-border" : ""}`}
              >
                <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

function DocGroup({
  title,
  docs,
}: {
  title: string;
  docs: readonly { title: string; url: string }[];
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h3 className="text-base font-bold">{title}</h3>
      <ul className="mt-3">
        {docs.map((doc, index) => (
          <li key={doc.url} className={index > 0 ? "border-t border-border" : ""}>
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 py-2.5 text-sm font-semibold transition-colors hover:text-primary"
            >
              <FileText className="size-4 shrink-0 text-primary/70" aria-hidden />
              <span className="min-w-0 flex-1">{doc.title}</span>
              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
