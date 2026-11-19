import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import { CTA, Kicker, PageHero, Section } from "@/components/page-sections";
import { Button } from "@/components/ui/button";
import { contact, services } from "@/lib/bch-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Hospital Services — Bwindi Community Hospital" },
      {
        name: "description",
        content: "Explore clinical, diagnostic, emergency, community and support services at BCH.",
      },
      { property: "og:title", content: "Hospital Services — BCH" },
      {
        property: "og:description",
        content: "Find outpatient, inpatient, maternal, child, surgical and diagnostic care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const tones = [
  "bg-peach text-primary",
  "bg-butter text-amber-700",
  "bg-sky text-sky-700",
  "bg-mint text-emerald-700",
] as const;

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services directory"
        title="Care built around patients and families."
        intro="Browse BCH clinical and support services. For urgent care, call the hospital directly."
        action={
          <Button asChild>
            <Link to="/contact" search={{ type: "appointment" }}>
              Request an appointment
              <ArrowUpRight />
            </Link>
          </Button>
        }
      />

      <Section>
        <Kicker>What we offer</Kicker>
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
            {services.length} published services
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Each entry below is drawn from BCH’s published service list. Ask the hospital team if
            you are unsure which service you need.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ name, description, icon: Icon }, index) => (
            <article
              key={name}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-42px_rgba(21,61,49,0.5)] transition-colors hover:border-primary/35"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`grid size-11 place-items-center rounded-full ${tones[index % tones.length]}`}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-display text-xs font-extrabold tracking-[0.08em] text-foreground/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug">{name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
              <Link
                to="/contact"
                search={{ type: "appointment" }}
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                Enquire about this service
                <ArrowUpRight className="size-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" label="How to reach care">
        <div className="grid gap-6 rounded-[2rem] bg-card p-6 shadow-[0_24px_44px_-46px_rgba(21,61,49,0.5)] sm:p-8 lg:grid-cols-[1.2fr_auto] lg:items-center lg:p-10">
          <div>
            <Kicker>Need help choosing?</Kicker>
            <h2 className="mt-3 max-w-xl text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] text-balance md:text-3xl">
              Call the hospital and the team will point you to the right service.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Published outpatient hours are Monday–Saturday 8:00 am–5:00 pm and Sunday 10:00
              am–5:00 pm. Emergency services are open 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-stretch">
            <Button size="lg" asChild>
              <a href={contact.phoneHref}>
                <Phone />
                {contact.phoneDisplay}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Send a message</Link>
            </Button>
          </div>
        </div>
      </Section>

      <CTA
        title="Not sure where to begin?"
        text="Send an appointment request and the BCH team can help direct you to the right service."
      />

      <PublishedContentLinks
        prefix={[
          "services",
          "surgery",
          "hiv",
          "diagnostics",
          "aip",
          "child-health",
          "sexual-reproductive-health",
          "opd",
          "equality",
          "chaplaincy",
          "guest-house",
        ]}
        title="Service details & clinic schedules"
      />
    </>
  );
}
