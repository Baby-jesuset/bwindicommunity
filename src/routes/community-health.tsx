import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute } from "@tanstack/react-router";
import { Ambulance, Home, ShieldCheck, Smartphone, Sprout, Users } from "lucide-react";
import { CTA, Kicker, PageHero, Section } from "@/components/page-sections";
import { ResponsiveImage } from "@/components/responsive-image";
import { bchImages } from "@/lib/bch-images";

export const Route = createFileRoute("/community-health")({
  head: () => ({
    meta: [
      { title: "Community Health & Batwa Programs — BCH" },
      {
        name: "description",
        content: "See BCH outreach, Batwa health, village teams and community health innovations.",
      },
      { property: "og:title", content: "Community Health — BCH" },
      { property: "og:description", content: "Care reaching 101 villages around Bwindi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const stats = [
  ["70,000+", "people reached"],
  ["17,023", "households"],
  ["525", "VHT volunteers"],
  ["101", "villages"],
] as const;

const programmes = [
  {
    name: "Community health and Batwa",
    text: "Preventive and curative services extended within BCH’s catchment area.",
    icon: Users,
    tone: "bg-peach text-primary",
  },
  {
    name: "Mobile Community Health Information System",
    text: "A platform used to promote maternal and child health at community level.",
    icon: Smartphone,
    tone: "bg-sky text-sky-700",
  },
  {
    name: "Mothers waiting homes",
    text: "BCH pioneered mothers waiting homes so mothers can stay close to the hospital before delivery.",
    icon: Home,
    tone: "bg-butter text-amber-700",
  },
  {
    name: "Ambulance outreach",
    text: "Transport for vulnerable mothers, emergencies and referral cases.",
    icon: Ambulance,
    tone: "bg-mint text-emerald-700",
  },
  {
    name: "Community health insurance",
    text: "The eQuality Health Insurance scheme supports access to care.",
    icon: ShieldCheck,
    tone: "bg-sky text-sky-700",
  },
  {
    name: "Livelihood project",
    text: "BCH’s published materials show goats distributed among the Batwa as part of its livelihood project.",
    icon: Sprout,
    tone: "bg-butter text-amber-700",
  },
] as const;

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Community health"
        title="Healthcare that reaches the village."
        intro="BCH conducts weekly outreach and extends services to communities in its catchment area, including dedicated work with the Batwa community."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="overflow-hidden rounded-[2rem] border-[8px] border-white shadow-[0_30px_60px_-46px_rgba(21,61,49,0.6)]">
            <ResponsiveImage
              src={bchImages.communityOutreach}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="BCH community outreach"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div>
            <Kicker>By the numbers</Kicker>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
              Reaching families where they live
            </h2>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7">
              {stats.map(([value, label]) => (
                <div key={label} className="border-t border-border pt-4">
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span
                      data-impact
                      className="font-display text-3xl font-extrabold tracking-[-0.03em] text-primary sm:text-4xl"
                    >
                      {value}
                    </span>
                    <span className="mt-1.5 block text-xs font-semibold text-muted-foreground">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="cream" label="Published community programs and innovations">
        <Kicker>Programmes</Kicker>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
          Published community programs and innovations
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map(({ name, text, icon: Icon, tone }) => (
            <article
              key={name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-44px_rgba(21,61,49,0.5)]"
            >
              <span className={`grid size-11 place-items-center rounded-full ${tone}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <CTA
        title="Support BCH outreach."
        text="The hospital is seeking support for community health and ambulance outreach."
        primary="View support options"
        to="/support"
        secondary={{ label: "Contact BCH", to: "/contact" }}
      />

      <PublishedContentLinks
        prefix={["community", "setlite-clinics", "equality"]}
        title="Full community programs & satellite clinics"
      />
    </>
  );
}
