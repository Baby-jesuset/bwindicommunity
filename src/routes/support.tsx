import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ClipboardCheck, FileCheck, Landmark, ShieldCheck } from "lucide-react";
import { CTA, Kicker, PageHero, Section } from "@/components/page-sections";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & Donate — Bwindi Community Hospital" },
      { name: "description", content: "BCH donation details and registered giving partners." },
      { property: "og:title", content: "Support Bwindi Community Hospital" },
      {
        property: "og:description",
        content: "Donation information published by Bwindi Community Hospital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const partners = [
  {
    country: "United States",
    name: "The Kellermann Foundation",
    href: "http://www.kellermannfoundation.org/",
  },
  {
    country: "United States",
    name: "Abercrombie & Kent Philanthropy",
    href: "http://www.akphilanthropy.org/donate-2/",
  },
  {
    country: "Germany",
    name: "Health For All Uganda e.V.",
    href: "https://health-for-all-uganda.com/",
  },
  { country: "United Kingdom", name: "REACHBwindi", href: "https://reachbwindi.com/" },
] as const;

const controls = [
  {
    icon: Landmark,
    title: "Tracked in QuickBooks",
    text: "BCH publishes that donations are recorded and tracked in QuickBooks accounting software.",
    tone: "bg-peach text-primary",
  },
  {
    icon: ClipboardCheck,
    title: "Superintendent sign-off",
    text: "Published practice requires the Medical Superintendent to sign off on donations received.",
    tone: "bg-butter text-amber-700",
  },
  {
    icon: ShieldCheck,
    title: "Annual external audit",
    text: "Donations are reviewed through the hospital’s annual external audit.",
    tone: "bg-mint text-emerald-700",
  },
] as const;

const guidance = [
  { label: "Donation management", slug: "manage-donation" },
  { label: "BCH wish lists", slug: "what-we-need" },
  { label: "Equipment donation guidelines", slug: "donner-equipment" },
] as const;

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Support BCH"
        title="Donation information."
        intro="Verified bank and registered partner information published by Bwindi Community Hospital."
        action={
          <Button variant="outline" asChild>
            <Link to="/projects">
              See what support can fund
              <ArrowUpRight />
            </Link>
          </Button>
        }
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="relative overflow-hidden rounded-[2rem] bg-foreground p-6 text-background sm:p-8">
            <div
              aria-hidden
              className="absolute -left-16 -top-20 size-56 rounded-full bg-[radial-gradient(circle,oklch(0.45_0.08_155/0.55),transparent_65%)]"
            />
            <div className="relative">
              <Kicker light>Ugandan bank account</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-white md:text-4xl">
                Direct bank transfer
              </h2>
              <div className="mt-6 rounded-2xl bg-background p-5 text-foreground sm:p-6">
                <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3.5 text-sm">
                  <dt className="text-muted-foreground">Bank</dt>
                  <dd className="font-semibold">Stanbic Bank Uganda Ltd</dd>
                  <dt className="text-muted-foreground">Branch</dt>
                  <dd className="font-semibold">Kihihi</dd>
                  <dt className="text-muted-foreground">Sort code</dt>
                  <dd className="font-mono">045360</dd>
                  <dt className="text-muted-foreground">Account</dt>
                  <dd className="font-semibold">Bwindi Community Hospital</dd>
                  <dt className="text-muted-foreground">Number</dt>
                  <dd className="font-mono">9030008175194</dd>
                  <dt className="text-muted-foreground">SWIFT</dt>
                  <dd className="font-mono">SBICUGKX</dd>
                  <dt className="text-muted-foreground">Currency</dt>
                  <dd className="font-semibold">USD</dd>
                </dl>
              </div>
              <p className="mt-4 text-xs leading-5 text-background/60">
                Account details reproduced from BCH’s published donation page. Confirm details with
                the hospital before sending funds.
              </p>
            </div>
          </article>

          <article>
            <Kicker>Tax-efficient giving</Kicker>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-4xl">
              Registered partners
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              BCH publishes these registered partners for donors who need a tax-efficient route.
            </p>
            <div className="mt-5 grid gap-2.5">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  <span className="grid min-w-16 shrink-0 place-items-center rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold text-primary">
                    {partner.country}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-bold leading-snug">
                    {partner.name}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>
          </article>
        </div>
      </Section>

      <Section tone="cream" label="How BCH manages donations">
        <Kicker>Accountability</Kicker>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
          How BCH manages donations
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          BCH publishes that donations are tracked through QuickBooks, require Medical
          Superintendent sign-off, and are reviewed through annual external audit.
        </p>
        <div className="mt-9 grid gap-3 lg:grid-cols-3">
          {controls.map(({ icon: Icon, title, text, tone }) => (
            <article
              key={title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 lg:flex-col lg:gap-0 lg:p-6"
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-full ${tone}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-bold lg:mt-4">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-2.5 sm:grid-cols-3">
          {guidance.map((item) => (
            <Link
              key={item.slug}
              to="/information/$slug"
              params={{ slug: item.slug }}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary/40 hover:text-primary"
            >
              <FileCheck className="size-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1 text-sm font-bold leading-snug">{item.label}</span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        title="Talk to BCH about giving."
        text="For institutional, equipment or financial support, contact the hospital team before sending anything."
        primary="Contact the hospital"
        secondary={{ label: "View projects", to: "/projects" }}
      />

      <PublishedContentLinks
        prefix={[
          "make-donation",
          "manage-donation",
          "what-we-need",
          "donner-equipment",
          "donner-patterners",
        ]}
        title="Complete donation guidance & partner stories"
      />
    </>
  );
}
