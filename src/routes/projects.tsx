import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Ambulance,
  ArrowUpRight,
  Car,
  GraduationCap,
  MapPinned,
  Monitor,
  Pill,
  Waves,
  Wind,
} from "lucide-react";
import { CTA, Kicker, PageHero, Section } from "@/components/page-sections";
import { PublishedContentLinks } from "@/components/published-content-links";

const projects = [
  {
    name: "Oxygen plant appeal",
    amount: "US$300,000",
    note: "BCH published this appeal for an oxygen plant.",
    icon: Wind,
    tone: "bg-sky text-sky-700",
  },
  {
    name: "Administrative vehicle",
    amount: "US$50,000",
    note: "A vehicle appears among BCH’s published funding needs.",
    icon: Car,
    tone: "bg-butter text-amber-700",
  },
  {
    name: "Land acquisition",
    amount: "US$200,000",
    note: "Land acquisition appears among BCH’s published funding needs.",
    icon: MapPinned,
    tone: "bg-peach text-primary",
  },
  {
    name: "Sewage infrastructure",
    amount: "US$300,000",
    note: "Sewage infrastructure appears among BCH’s published funding needs.",
    icon: Waves,
    tone: "bg-mint text-emerald-700",
  },
  {
    name: "COVID-19 medicine outreach",
    amount: "US$27,000",
    note: "Three months of delivering essential medicines to vulnerable patients in 101 villages.",
    icon: Pill,
    tone: "bg-sky text-sky-700",
  },
  {
    name: "Ambulance for outreaches",
    amount: "US$75,000",
    note: "For weekly outreach, emergency referrals and transport for vulnerable mothers.",
    icon: Ambulance,
    tone: "bg-peach text-primary",
    progress: { percent: 12, caption: "BCH reported US$9,000 received." },
  },
  {
    name: "Staff training and development",
    amount: "Funding pledges sought",
    note: "Published subjects include orthopaedic surgery, medical education, midwifery and public health dentistry.",
    icon: GraduationCap,
    tone: "bg-butter text-amber-700",
  },
  {
    name: "IT infrastructure",
    amount: "Funding pledges sought",
    note: "Published needs include an IT programmer, network server, broadband, computers and the mobile Community Health Information System.",
    icon: Monitor,
    tone: "bg-mint text-emerald-700",
  },
] as const;

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Appeals — Bwindi Community Hospital" },
      {
        name: "description",
        content: "Explore BCH capital projects, care priorities and funding appeals.",
      },
      { property: "og:title", content: "BCH Projects & Impact" },
      {
        property: "og:description",
        content: "Support equipment, infrastructure, training and community health priorities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Projects & appeals"
        title="BCH published priorities."
        intro="The figures below are preserved from Bwindi Community Hospital’s existing appeals."
      />

      <Section>
        <Kicker>Where support goes</Kicker>
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
            Published funding needs
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Each appeal and amount is reproduced from BCH’s published priorities. Figures are not
            live fundraising totals.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ name, amount, note, icon: Icon, tone, ...rest }, index) => (
            <article
              key={name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-42px_rgba(21,61,49,0.5)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`grid size-11 place-items-center rounded-full ${tone}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-display text-xs font-extrabold tracking-[0.08em] text-foreground/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug">{name}</h3>
              <p className="mt-1.5 font-display text-xl font-extrabold tracking-[-0.02em] text-primary">
                {amount}
              </p>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{note}</p>

              {"progress" in rest && rest.progress && (
                <div className="mt-4 border-t border-border pt-3.5">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${rest.progress.percent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-primary">{rest.progress.caption}</p>
                </div>
              )}

              <Link
                to="/support"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                Support this appeal
                <ArrowUpRight className="size-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <CTA
        title="Contact BCH about a project."
        text="Discuss institutional, equipment or financial support with the hospital."
        primary="Ways to give"
        to="/support"
        secondary={{ label: "Contact BCH", to: "/contact" }}
      />

      <PublishedContentLinks
        prefix={["projects", "apeal"]}
        title="Full project details & funding figures"
      />
    </>
  );
}
