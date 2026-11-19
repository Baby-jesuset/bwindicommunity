import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CTA, Kicker, PageHero, Section } from "@/components/page-sections";
import { Button } from "@/components/ui/button";
import { bchImages } from "@/lib/bch-images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BCH — Bwindi Community Hospital" },
      {
        name: "description",
        content: "Learn the story, mission, vision and values of Bwindi Community Hospital.",
      },
      { property: "og:title", content: "About Bwindi Community Hospital" },
      {
        property: "og:description",
        content: "A Church of Uganda not-for-profit hospital founded in 2003.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { name: "Christ-centred", tone: "bg-peach text-primary" },
  { name: "Excellence", tone: "bg-butter text-amber-700" },
  { name: "Innovation", tone: "bg-sky text-sky-700" },
  { name: "Community Oriented", tone: "bg-mint text-emerald-700" },
  { name: "Collaboration", tone: "bg-secondary text-primary" },
] as const;

function About() {
  return (
    <>
      <PageHero
        eyebrow="About BCH"
        title="From care under a tree to a 155-bed hospital."
        intro="Bwindi Community Hospital was founded in 2003 by U.S. missionaries Dr. Scott and Carol Kellermann under the Diocese of Kinkiizi, Church of Uganda. It began as an outreach clinic for the Batwa community and grew into a hospital caring for more than 120,000 people."
        action={
          <Button asChild>
            <Link to="/team">
              Meet the hospital team
              <ArrowUpRight />
            </Link>
          </Button>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 hidden size-24 rounded-full border-[10px] border-accent/60 sm:block"
            />
            <div className="overflow-hidden rounded-[2rem] border-[8px] border-white shadow-[0_30px_60px_-40px_rgba(21,61,49,0.6)]">
              <img
                src={bchImages.communityOutreach}
                width={1200}
                height={800}
                alt="BCH community outreach"
                className="aspect-[5/4] w-full object-cover lg:aspect-[10/11]"
              />
            </div>
            <div className="absolute -bottom-6 -right-3 rounded-2xl bg-foreground px-5 py-4 text-background shadow-lg sm:-right-6">
              <p className="text-[11px] font-bold tracking-[0.08em] text-accent">SERVING SINCE</p>
              <p className="mt-1 font-display text-2xl font-extrabold leading-none">2003</p>
            </div>
          </div>

          <div>
            <Kicker>Mission & vision</Kicker>
            <article className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-40px_rgba(21,61,49,0.5)] sm:p-7">
              <h2 className="text-lg font-bold">Our mission</h2>
              <p className="mt-2.5 text-[15px] leading-7 text-muted-foreground">
                Serving Jesus Christ through giving holistic health care and life in all its
                fullness to the staff, patients, clients and visitors in the hospital and community.
              </p>
            </article>
            <article className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-40px_rgba(21,61,49,0.5)] sm:p-7">
              <h2 className="text-lg font-bold">Our vision</h2>
              <p className="mt-2.5 text-[15px] leading-7 text-muted-foreground">
                A healthy and productive community free from preventable disease and with excellent
                health services accessible to all.
              </p>
            </article>
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden />
              Mission, vision and values as published by Bwindi Community Hospital.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream" label="Our published core values">
        <Kicker>What guides us</Kicker>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
          Our published core values
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value, index) => (
            <article
              key={value.name}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_24px_44px_-42px_rgba(21,61,49,0.5)] lg:flex-col lg:items-start lg:gap-4 lg:p-5"
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${value.tone}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[15px] font-bold leading-snug">{value.name}</h3>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <figure className="overflow-hidden rounded-2xl border border-border bg-card p-3">
            <img
              src={bchImages.coreValues}
              alt="Bwindi Community Hospital core values"
              className="w-full rounded-xl"
            />
            <figcaption className="px-2 pb-1 pt-3 text-xs text-muted-foreground">
              Core values as published by BCH.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-border bg-card p-3">
            <img
              src={bchImages.organisationStructure}
              alt="Bwindi Community Hospital organisation structure"
              className="w-full rounded-xl"
            />
            <figcaption className="px-2 pb-1 pt-3 text-xs text-muted-foreground">
              Organisation structure as published by BCH.
            </figcaption>
          </figure>
        </div>
      </Section>

      <CTA
        title="Meet the people behind BCH."
        text="View the hospital team published by Bwindi Community Hospital."
        primary="View our team"
        to="/team"
        secondary={{ label: "Read our story", to: "/information" }}
      />

      <PublishedContentLinks
        prefix={["who-we-are", "board", "research", "volunteer", "jobs", "innovations"]}
        title="Hospital history, governance & research"
      />
    </>
  );
}
