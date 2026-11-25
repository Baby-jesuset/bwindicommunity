import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Banknote,
  FileText,
  Heart,
  HeartHandshake,
  HeartPulse,
  Package,
  Plus,
  Quote,
  Sprout,
  Stethoscope,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/page-sections";
import { contact, services } from "@/lib/bch-content";
import { bchImages } from "@/lib/bch-images";
import { newsletters, reports } from "@/lib/bch-published-resources";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bwindi Community Hospital — We Treat, God Heals" },
      {
        name: "description",
        content:
          "Hospital care, community health, outreach and clinical training serving Kanungu and southwestern Uganda.",
      },
      { property: "og:title", content: "Bwindi Community Hospital" },
      {
        property: "og:description",
        content: "We treat, God heals. Clinical care and community health in Kanungu, Uganda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content: `https://www.bwindihospital.com${bchImages.hospitalGallery}`,
      },
      { property: "og:image:alt", content: "Bwindi Community Hospital" },
      {
        name: "twitter:image",
        content: `https://www.bwindihospital.com${bchImages.hospitalGallery}`,
      },
    ],
    links: [{ rel: "canonical", href: "https://www.bwindihospital.com/" }],
  }),
  component: Home,
});

const mission =
  "Serving Jesus Christ through giving holistic health care and life in all its fullness to the staff, patients, clients and visitors in the hospital and community.";
const vision =
  "A healthy and productive community free from preventable disease, with excellent health services accessible to all.";

const whatWeDo = [
  {
    title: "Maternal health",
    text: "Antenatal, delivery and postnatal care, with a mothers’ waiting hostel for families who travel far.",
    icon: HeartPulse,
    tone: "bg-peach text-primary",
  },
  {
    title: "Child health",
    text: "A 38-bed children’s ward, neonatal care and paediatric treatment for the youngest patients.",
    icon: Baby,
    tone: "bg-butter text-amber-700",
  },
  {
    title: "Surgery & inpatient",
    text: "A 24-hour theatre and a 31-bed adult unit supporting planned and emergency procedures.",
    icon: Stethoscope,
    tone: "bg-sky text-sky-700",
  },
  {
    title: "Community health",
    text: "Preventive care and outreach across 101 villages, including dedicated Batwa programmes.",
    icon: Users,
    tone: "bg-mint text-emerald-700",
  },
] as const;

const campaigns = [
  {
    title: "Oxygen plant appeal",
    goal: "US$300,000",
    note: "A reliable oxygen supply for the hospital and the wider Kigezi sub-region.",
    image: bchImages.laboratory,
    tag: "Infrastructure",
  },
  {
    title: "Ambulance for outreaches",
    goal: "US$75,000",
    raised: "US$9,000 reported",
    progress: 12,
    note: "Weekly outreach, emergency referrals and transport for vulnerable mothers.",
    image: bchImages.communityOutreach,
    tag: "Transport",
  },
  {
    title: "Land acquisition",
    goal: "US$200,000",
    note: "Secure land for the hospital’s growing clinical and training services.",
    image: bchImages.dentalEyeBuilding,
    tag: "Infrastructure",
  },
] as const;

const stories = [
  {
    quote:
      "When I came to the hospital, I thought I was having a miscarriage. But the health workers at Bwindi Hospital helped me. They saved us. I am very happy.",
    name: "Grace Kyomugisha",
    role: "Mother, NICU story",
    initials: "GK",
    slug: "news-worldprematurityday",
    tone: "bg-peach text-primary",
  },
  {
    quote:
      "The intention of the Moonlight Clinic is to screen individuals at risk of acquiring HIV … offer HIV testing, ensuring that individuals whose results are positive are linked to treatment.",
    name: "Kennedy Ahimbisibwe",
    role: "HIV/AIDS department",
    initials: "KA",
    slug: "news-moonlight",
    tone: "bg-mint text-emerald-700",
  },
  {
    quote: "When I arrived, there was no dental officer. Today, I have seen other improvements.",
    name: "Dr. Jean Creasey",
    role: "Long-time friend of BCH",
    initials: "JC",
    slug: "news-news",
    tone: "bg-sky text-sky-700",
  },
] as const;

const publications = [
  {
    top: "FY",
    main: "24/25",
    title: reports[0]!.title,
    note: "The hospital’s annual review, published as a PDF.",
    url: reports[0]!.url,
  },
  {
    top: "MAR",
    main: "2023",
    title: newsletters[0]!.title,
    note: "The March 2023 newsletter, published as a PDF.",
    url: newsletters[0]!.url,
  },
  {
    top: "NOV",
    main: "2020",
    title: newsletters[1]!.title,
    note: "The November 2020 newsletter, published as a PDF.",
    url: newsletters[1]!.url,
  },
] as const;

const faqs = [
  {
    q: "How do I book an appointment?",
    a: `Call ${contact.phoneDisplay} or send a message through the contact page. For urgent care, come to the hospital or call the emergency line so the team can prepare for you.`,
  },
  {
    q: "Where is Bwindi Community Hospital?",
    a: "BCH is in Buhoma, Kanungu District, near Bwindi Impenetrable National Park in southwestern Uganda. The contact page links to directions.",
  },
  {
    q: "Is BCH a government hospital?",
    a: "No. BCH is a private, not-for-profit hospital of the Church of Uganda, Diocese of Kinkiizi. Services are heavily subsidised so the poorest families can still reach care.",
  },
  {
    q: "Can I donate equipment or supplies?",
    a: "Yes. The hospital publishes wish lists for laboratory, child health and diagnostics. Please confirm current needs with the hospital before shipping anything.",
  },
  {
    q: "How are donations used?",
    a: "Giving supports equipment, infrastructure, outreach and the subsidy that keeps care affordable. BCH publishes externally audited accounts every year.",
  },
] as const;

const news = [
  {
    title: "Born at 26 Weeks: Story of Survival from the Bwindi Hospital NICU",
    category: "Patient story",
    image: bchImages.nicuStory,
    slug: "news-worldprematurityday",
  },
  {
    title: "Strengthening the One Health approach around Bwindi Impenetrable National Park",
    category: "One Health",
    image: bchImages.oneHealth,
    slug: "news-onehealth-bwindi",
  },
  {
    title: "Bwindi Hospital Commissions New Dental and Eye Building",
    category: "Hospital news",
    image: bchImages.dentalEyeBuilding,
    slug: "news-dental-commissioning",
  },
] as const;

const giving = [
  { label: "Bank transfer", note: "Verified BCH account details", icon: Banknote },
  { label: "Equipment & supplies", note: "Current laboratory and ward wish lists", icon: Package },
  { label: "Volunteer", note: "Policy, placements and application", icon: HeartHandshake },
] as const;

function Home() {
  const [tab, setTab] = useState<"mission" | "vision">("mission");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-foreground text-background">
        <img
          src="/images/bch/hero-building.jpg"
          width={1820}
          height={720}
          fetchPriority="high"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[45%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.245_0.045_163/0.93)_0%,oklch(0.245_0.045_163/0.8)_100%)] md:bg-[linear-gradient(100deg,oklch(0.245_0.045_163/0.96)_0%,oklch(0.25_0.045_163/0.93)_36%,oklch(0.27_0.05_162/0.6)_66%,oklch(0.3_0.05_162/0.15)_100%)]" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-foreground/55 to-transparent"
        />

        <div className="site-container relative py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="max-w-2xl animate-[rise_0.6s_ease-out_both]">
            <p className="text-[13px] font-semibold tracking-[0.02em] text-accent">
              Serving Kanungu since 2003
            </p>
            <h1 className="mt-4 max-w-xl text-[2.65rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-balance text-white md:text-[3.2rem] lg:text-[3.7rem] xl:text-[4.4rem]">
              We treat,
              <br />
              God heals.
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-background/85 sm:text-base">
              Bwindi Community Hospital is a not-for-profit hospital at the edge of Bwindi
              Impenetrable Forest, bringing dependable, humane care to more than 120,000 people.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link to="/support">
                  <Heart className="fill-current" />
                  Donate now
                </Link>
              </Button>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-background/85 underline-offset-4 hover:text-white hover:underline"
              >
                Explore our services
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-xs text-background/65">
              <span className="h-px w-8 bg-background/35" aria-hidden />A hospital of the Church of
              Uganda, Diocese of Kinkiizi
            </p>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section aria-label="Affiliations" className="border-b border-border bg-background">
        <div className="site-container flex flex-wrap items-center justify-center gap-x-7 gap-y-3 py-6 md:justify-center lg:justify-between">
          {[
            "Church of Uganda",
            "Diocese of Kinkiizi",
            "UPMB member",
            "eQuality Health",
            "Bwindi Impenetrable NP",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-xs font-bold tracking-[0.01em] text-foreground/50 transition-colors hover:text-foreground/80"
            >
              <span className="size-1.5 rotate-45 bg-primary/60" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="bg-background">
        <div className="site-container py-16 md:py-24">
          <SectionHead kicker="What we do" title="A hospital focused on the whole community" />
          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map(({ title, text, icon: Icon, tone }) => (
              <article
                key={title}
                className="relative rounded-2xl border border-border bg-card p-6 pt-11 shadow-[0_24px_44px_-38px_rgba(21,61,49,0.55)]"
              >
                <span
                  className={`absolute -top-6 left-6 grid size-12 place-items-center rounded-full ${tone}`}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                <Link
                  to="/services"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                >
                  Learn more
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">See all {services.length} services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="relative overflow-hidden bg-secondary">
        <Heart
          aria-hidden
          strokeWidth={1}
          className="pointer-events-none absolute -right-8 top-8 size-40 text-foreground/[0.06] lg:size-60"
        />
        <div className="site-container grid gap-14 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -left-3 -top-3 z-10 grid size-20 place-items-center rounded-full bg-foreground text-background shadow-lg sm:-left-5 sm:-top-5">
              <Sprout className="size-9 text-accent" aria-hidden />
            </div>
            <div className="overflow-hidden rounded-[2rem] border-[8px] border-white shadow-[0_30px_60px_-40px_rgba(21,61,49,0.6)]">
              <img
                src={bchImages.hospitalGallery}
                loading="lazy"
                width={2000}
                height={1333}
                alt="Community members with a health worker during a BCH outreach visit"
                className="aspect-[5/4] w-full object-cover object-[50%_58%] sm:aspect-[16/11] lg:aspect-[10/11]"
              />
            </div>
            <div className="absolute -bottom-6 -left-2 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:-left-6 sm:w-40">
              <img
                src={bchImages.communityOutreach}
                loading="lazy"
                alt="A health worker measuring a child’s arm"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -bottom-10 right-6 hidden size-24 rounded-full border-[10px] border-accent/60 sm:block"
            />
          </div>

          <div>
            <Kicker>Who we are</Kicker>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.6rem]">
              A hospital built with the community, for the community.
            </h2>

            <div
              role="tablist"
              aria-label="Mission and vision"
              className="mt-7 flex gap-7 border-b border-foreground/15"
            >
              {(["mission", "vision"] as const).map((key) => (
                <button
                  key={key}
                  id={`tab-${key}`}
                  role="tab"
                  aria-selected={tab === key}
                  aria-controls={`panel-${key}`}
                  onClick={() => setTab(key)}
                  className={`-mb-px border-b-2 pb-2.5 text-sm font-bold transition-colors ${tab === key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  Our {key}.
                </button>
              ))}
            </div>
            <p
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground"
            >
              {tab === "mission" ? mission : vision}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button size="lg" asChild>
                <Link to="/about">
                  Explore more
                  <ArrowRight />
                </Link>
              </Button>
              <div className="flex items-center gap-3 border-l border-foreground/15 pl-6">
                <span className="font-display text-4xl font-extrabold tracking-[-0.04em]">
                  100%
                </span>
                <span className="text-xs font-semibold leading-4 text-muted-foreground">
                  Not-for-profit
                  <br />
                  &amp; transparent
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="bg-background">
        <div className="site-container py-16 md:py-24">
          <SectionHead kicker="Campaigns" title="Featured campaigns you can help today" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {campaigns.map((campaign) => (
              <article
                key={campaign.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_44px_-38px_rgba(21,61,49,0.5)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={campaign.image}
                    loading="lazy"
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-[11px] font-bold text-foreground">
                    {campaign.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug">{campaign.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                    {campaign.note}
                  </p>
                  <div className="mt-5 min-h-[4.5rem] border-t border-border pt-3.5">
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                      <span className="text-muted-foreground">Funding goal</span>
                      <span className="text-foreground">{campaign.goal}</span>
                    </div>
                    {"progress" in campaign && (
                      <div className="mt-3">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs font-semibold text-primary">
                          {campaign.raised}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button className="mt-5 w-full" asChild>
                    <Link to="/projects">Support this appeal</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">View all projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Volunteers band */}
      <section className="bg-background pb-16 md:pb-24">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-10 text-background sm:px-10 md:py-12 lg:px-14">
            <div
              aria-hidden
              className="absolute -left-20 -top-24 size-72 rounded-full bg-[radial-gradient(circle,oklch(0.45_0.08_155/0.5),transparent_65%)]"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <Kicker light>Volunteers</Kicker>
                <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance text-white md:text-[2.5rem]">
                  Volunteers making a difference
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-background/70">
                  BCH works with Village Health Team volunteers across 101 villages, bringing
                  preventive care, referral support and dedicated Batwa programmes closer to
                  families.
                </p>
                <Link
                  to="/community-health"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent underline-offset-4 hover:underline"
                >
                  Explore community health
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="relative mx-auto w-full max-w-sm">
                <div
                  aria-hidden
                  className="absolute inset-0 -skew-x-6 rounded-2xl border-[3px] border-accent/30"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-3 inset-y-0 -skew-x-6 rounded-2xl bg-accent sm:inset-x-0"
                />
                <div className="relative flex items-center justify-center gap-4 px-6 py-8 text-accent-foreground">
                  <span
                    data-impact
                    className="font-display text-5xl font-extrabold tracking-[-0.04em] md:text-6xl"
                  >
                    525
                  </span>
                  <span className="max-w-[9rem] text-sm font-bold leading-snug">
                    village health team volunteers
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-10 grid grid-cols-2 gap-6 border-t border-background/15 pt-6 sm:grid-cols-4">
              {[
                ["101", "villages reached"],
                ["155", "hospital beds"],
                ["209", "staff members"],
                ["40,000", "consultations a year"],
              ].map(([value, label]) => (
                <div key={label} data-impact>
                  <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-white md:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-background/60">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories of hope */}
      <section className="bg-background">
        <div className="site-container py-16 md:py-24">
          <SectionHead
            kicker="Stories of hope"
            title="Stories shared by families and friends of BCH"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <figure
                key={story.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-40px_rgba(21,61,49,0.5)] sm:p-7"
              >
                <Quote className="size-7 text-primary/35" aria-hidden />
                <blockquote className="mt-4 flex-1 text-[15px] leading-7 text-foreground/85">
                  “{story.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-extrabold ${story.tone}`}
                  >
                    {story.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold">{story.name}</span>
                    <span className="block text-xs text-muted-foreground">{story.role}</span>
                  </span>
                </figcaption>
                <Link
                  to="/information/$slug"
                  params={{ slug: story.slug }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                >
                  Read the story
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="bg-secondary">
        <div className="site-container py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Kicker>From the archive</Kicker>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
                Newsletters, reports and hospital updates
              </h2>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="shrink-0 self-start md:self-auto"
              asChild
            >
              <Link to="/information">Browse the archive</Link>
            </Button>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            {publications.map((item, index) => (
              <article
                key={item.title}
                className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6 ${index > 0 ? "border-t border-border" : ""}`}
              >
                <div className="grid h-16 w-16 shrink-0 place-content-center rounded-xl bg-secondary text-center">
                  <span className="text-[10px] font-bold tracking-[0.08em] text-primary">
                    {item.top}
                  </span>
                  <span className="font-display text-xl font-extrabold leading-tight">
                    {item.main}
                  </span>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-peach text-primary">
                  <FileText className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                </div>
                <Button variant="outline" className="shrink-0 self-start sm:self-auto" asChild>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Read
                    <ArrowUpRight />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Donation card */}
      <section className="bg-background">
        <div className="site-container py-16 md:py-24">
          <div className="overflow-hidden rounded-[2rem] bg-foreground text-background">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative p-7 sm:p-10 lg:p-12">
                <img
                  src={bchImages.hospitalGallery}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.315_0.045_163)_35%,oklch(0.315_0.045_163/0.92)_65%,oklch(0.315_0.045_163/0.6))]" />
                <div className="relative">
                  <Kicker light>Support BCH</Kicker>
                  <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-balance text-white md:text-[2.6rem]">
                    Your gift keeps care within reach.
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-background/75">
                    BCH is a private not-for-profit hospital. Giving funds equipment, outreach and
                    the subsidy that keeps care affordable for the poorest families.
                  </p>
                  <Button size="lg" className="mt-7" asChild>
                    <Link to="/support">
                      <Heart className="fill-current" />
                      Donate now
                    </Link>
                  </Button>
                  <p className="mt-6 flex items-center gap-2 text-xs text-background/55">
                    <span className="h-px w-8 bg-background/30" aria-hidden />
                    Externally audited every year
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-7">
                <div className="h-full rounded-2xl bg-background p-6 text-foreground sm:p-7">
                  <h3 className="font-display text-xl font-extrabold tracking-[-0.02em]">
                    Ways to give
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose what your support can carry.
                  </p>
                  <div className="mt-5 grid gap-2.5">
                    {giving.map(({ label, note, icon: Icon }) => (
                      <Link
                        key={label}
                        to="/support"
                        className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:border-primary/40 hover:bg-secondary"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold">{label}</span>
                          <span className="block text-xs text-muted-foreground">{note}</span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-5 w-full" asChild>
                    <Link to="/support">See donation details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background pb-16 md:pb-24">
        <div className="site-container">
          <SectionHead kicker="FAQ" title="Questions about care or giving?" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card px-5 sm:px-8">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-bold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-transform duration-200 group-open:rotate-45">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Still unsure?{" "}
            <Link to="/contact" className="font-bold text-primary hover:underline">
              Talk to the hospital team
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Latest news */}
      <section className="bg-secondary">
        <div className="site-container py-16 md:py-24">
          <SectionHead kicker="News" title="Latest updates from Bwindi" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {news.map((item) => (
              <article key={item.slug} className="group">
                <Link
                  to="/information/$slug"
                  params={{ slug: item.slug }}
                  className="block overflow-hidden rounded-2xl"
                >
                  <img
                    src={item.image}
                    loading="lazy"
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </Link>
                <p className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
                  <span className="size-1.5 rotate-45 bg-primary" aria-hidden />
                  {item.category}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug">
                  <Link
                    to="/information/$slug"
                    params={{ slug: item.slug }}
                    className="hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </h3>
                <Link
                  to="/information/$slug"
                  params={{ slug: item.slug }}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                >
                  Read more
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/news">All news &amp; events</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="flex items-center justify-center gap-2 text-[13px] font-bold tracking-[0.02em] text-primary">
        <span className="size-1.5 rotate-45 bg-primary" aria-hidden />
        {kicker}
        <span className="size-1.5 rotate-45 bg-primary" aria-hidden />
      </p>
      <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.6rem]">
        {title}
      </h2>
    </div>
  );
}
