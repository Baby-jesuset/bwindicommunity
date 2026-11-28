import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CTA, Kicker, PageHero, Section } from "@/components/page-sections";
import { ResponsiveImage } from "@/components/responsive-image";
import { Button } from "@/components/ui/button";
import team from "@/lib/bch-published-staff.json";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Bwindi Community Hospital" },
      {
        name: "description",
        content: "Meet BCH hospital leaders, clinicians and community health professionals.",
      },
      { property: "og:title", content: "Our Team — BCH" },
      {
        property: "og:description",
        content: "The people leading care and community health at Bwindi Community Hospital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="BCH senior contacts."
        intro="BCH is staffed by 209 people. Seventy percent of employees are from within the hospital’s catchment area and thirty percent are from other parts of Uganda."
        action={
          <Button variant="outline" asChild>
            <Link to="/contact">
              Contact BCH
              <ArrowUpRight />
            </Link>
          </Button>
        }
      />

      <Section>
        <Kicker>Published contacts</Kicker>
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
            The people behind BCH
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Published senior contacts of Bwindi Community Hospital. Roles are shown as recorded in
            the hospital’s staff listing.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_44px_-44px_rgba(21,61,49,0.5)]"
            >
              {p.image ? (
                <ResponsiveImage
                  src={p.image}
                  alt={p.name}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[4/5] w-full place-items-center bg-secondary">
                  <span
                    className="grid size-20 place-items-center rounded-full bg-peach font-display text-2xl font-extrabold text-primary"
                    aria-hidden
                  >
                    {p.name
                      .split(" ")
                      .map((x) => x[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold leading-snug">{p.name}</h3>
                <p className="mt-1 flex-1 text-xs font-semibold text-primary">{p.role}</p>
              </div>
            </article>
          ))}
        </div>

        <Link
          to="/information/$slug"
          params={{ slug: "senior-contact" }}
          className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          View the BCH senior contacts page
          <ArrowUpRight className="size-4" />
        </Link>
      </Section>

      <CTA
        title="Contact BCH."
        text="Reach a department, clinical service or member of the senior team."
        primary="Contact BCH"
      />

      <PublishedContentLinks prefix={["senior-contact"]} title="BCH senior contact details" />
    </>
  );
}
