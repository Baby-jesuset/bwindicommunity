import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Kicker, PageHero, Section } from "@/components/page-sections";
import { bchImages } from "@/lib/bch-images";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education & Training — Bwindi Community Hospital" },
      {
        name: "description",
        content:
          "Learn about BCH health sciences training and the transition to African University of Science and Management.",
      },
      { property: "og:title", content: "Education & Training — BCH" },
      {
        property: "og:description",
        content: "Training future healthcare professionals in Bwindi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const programmes = [
  {
    title: "Bachelor programs",
    tone: "bg-peach text-primary",
    items: [
      "Nursing",
      "Midwifery",
      "Environmental Health",
      "Tourism and Travel Management",
      "Hotel and Hospitality Management",
    ],
  },
  {
    title: "Diploma programs",
    tone: "bg-butter text-amber-700",
    items: [
      "Nursing / Midwifery",
      "Extension Program in Midwifery and Nursing",
      "Clinical Medicine and Community Health",
      "Public Health Dentistry",
    ],
  },
  {
    title: "Certificate programs",
    tone: "bg-sky text-sky-700",
    items: ["Nursing / Midwifery", "Pharmacy", "Medical Laboratory Techniques"],
  },
] as const;

const institutions = [
  {
    img: "/bch-assets/images/images-nursing.jpg",
    name: "Uganda Nursing School Bwindi",
    href: "http://www.unsbwindi.ac.ug/",
  },
  {
    img: "/bch-assets/images/images-Logo-College.JPG",
    name: "Uganda College of Health Science Bwindi",
    href: "https://www.uchsb.ac.ug",
  },
  {
    img: "/bch-assets/images/images-Bwindi-guest-house.png",
    name: "Bwindi Guest House",
    href: "https://www.bwindiguesthouse.com/",
  },
  {
    img: "/bch-assets/images/images-Aerolink_Uganda_logo.svg.png",
    name: "Aerolink Uganda",
    href: "https://www.aerolinkuganda.com/en",
  },
] as const;

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Education & training"
        title="African University of Science and Management."
        intro="Uganda Nursing School Bwindi and Uganda College of Health Sciences Bwindi, established by BCH in 2013 and 2018, transitioned to the Church of Uganda-affiliated African University of Science and Management in 2024."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="overflow-hidden rounded-[2rem] border-[8px] border-white shadow-[0_30px_60px_-45px_rgba(21,61,49,0.6)]">
            <img
              src={bchImages.clinicalTraining}
              width={1200}
              height={800}
              alt="Health care training at Bwindi Community Hospital"
              className="aspect-[5/4] w-full object-cover lg:aspect-[4/3]"
            />
          </div>
          <div>
            <Kicker>Why training matters</Kicker>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
              Training the next health workforce
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
              AUSM is licensed to offer medical, business and humanities-related courses. BCH
              established its training institutions in response to the critical shortage of health
              workers in the Bwindi area.
            </p>
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden />
              Course information is reproduced from BCH’s published education pages.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream" label="Courses published by BCH">
        <Kicker>Study programmes</Kicker>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
          Courses published by BCH
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((programme) => (
            <article
              key={programme.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_24px_44px_-44px_rgba(21,61,49,0.5)]"
            >
              <span className={`grid size-11 place-items-center rounded-full ${programme.tone}`}>
                <BookOpen className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold">{programme.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {programme.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 border-b border-border pb-2.5 last:border-0 last:pb-0"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-primary/60"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section label="Sister institutions & partners">
        <Kicker>Sister institutions</Kicker>
        <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
          Sister institutions &amp; partners
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {institutions.map(({ img, name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/40"
            >
              <span className="grid h-24 place-items-center">
                <img
                  src={img}
                  alt={`${name} logo`}
                  loading="lazy"
                  className="max-h-20 w-auto max-w-full object-contain"
                />
              </span>
              <span className="flex items-center gap-1.5 text-sm font-bold leading-snug">
                {name}
                <ArrowUpRight className="size-3.5 text-primary" />
              </span>
            </a>
          ))}
        </div>
      </Section>

      <PublishedContentLinks
        prefix={["education"]}
        title="Complete education & training information"
      />
    </>
  );
}
