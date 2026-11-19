import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CTA, Kicker, PageHero, Section } from "@/components/page-sections";
import { Button } from "@/components/ui/button";
import { departments } from "@/lib/bch-content";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Bwindi Community Hospital" },
      {
        name: "description",
        content: "Explore BCH clinical departments, services and team leads.",
      },
      { property: "og:title", content: "Clinical Departments — BCH" },
      {
        property: "og:description",
        content: "Professional care departments at Bwindi Community Hospital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Departments,
});

function Departments() {
  return (
    <>
      <PageHero
        eyebrow="Departments"
        title="BCH clinical departments."
        intro="Clinical areas and services published by Bwindi Community Hospital."
      />

      <Section>
        <Kicker>Clinical areas</Kicker>
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
            Departments &amp; published services
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Each department listing follows BCH’s published service information.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {departments.map((d, index) => (
            <article
              key={d.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-44px_rgba(21,61,49,0.5)] sm:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold leading-snug">{d.name}</h3>
                <span className="font-display text-xs font-extrabold tracking-[0.08em] text-foreground/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{d.description}</p>

              <p className="mt-5 text-[11px] font-bold tracking-[0.06em] text-primary">
                SERVICES OFFERED
              </p>
              <ul className="mt-2.5 grid flex-1 content-start gap-x-5 gap-y-2 text-sm sm:grid-cols-2">
                {d.offerings.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-primary/60"
                      aria-hidden
                    />
                    {o}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                {"lead" in d && d.lead ? (
                  <p className="text-xs leading-5 text-muted-foreground">
                    <span className="font-bold text-foreground">Published team lead:</span> {d.lead}
                  </p>
                ) : (
                  <span />
                )}
                <Button variant="outline" className="shrink-0 self-start" asChild>
                  <Link to="/contact" search={{ type: "appointment" }}>
                    Contact department
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTA
        title="Contact a department."
        text="Send BCH an appointment request or call the hospital."
      />

      <PublishedContentLinks
        prefix={[
          "child-health",
          "sexual-reproductive-health",
          "surgery",
          "aip",
          "opd",
          "diagnostics",
          "hiv",
        ]}
        title="Full department information"
      />
    </>
  );
}
