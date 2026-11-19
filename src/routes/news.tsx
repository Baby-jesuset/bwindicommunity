import { PublishedContentLinks } from "@/components/published-content-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Kicker, PageHero, Section } from "@/components/page-sections";
import { NewsRows } from "@/components/news-rows";
import { bchImages } from "@/lib/bch-images";
import { firstPhotoForSlug } from "@/lib/bch-news-entries";

const stories = [
  {
    t: "Strengthening the One Health approach in communities surrounding BINP",
    i: bchImages.oneHealth,
    slug: "news-onehealth-bwindi",
  },
  {
    t: "BCH, GVTC, AND UWA Strengthen One Health-Based Prevention",
    i: null,
    slug: "news-greater-20virunga",
  },
  {
    t: "BCH Staff Wins HIHA-Outstanding Nutritionist Award of the Year",
    i: null,
    slug: "news-outstandingnutritionist",
  },
  {
    t: "Born at 26 Weeks: Story of Survival from the Bwindi Hospital NICU",
    i: bchImages.nicuStory,
    slug: "news-worldprematurityday",
  },
  {
    t: "Bwindi Hospital Commissions New Dental and Eye Building",
    i: bchImages.dentalEyeBuilding,
    slug: "news-dental-commissioning",
  },
];

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Bwindi Community Hospital" },
      {
        name: "description",
        content: "Read news and event updates published by Bwindi Community Hospital.",
      },
      { property: "og:title", content: "News & Events — BCH" },
      { property: "og:description", content: "Published updates from Bwindi Community Hospital." },
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
        eyebrow="News & events"
        title="Latest news from BCH."
        intro="News published by Bwindi Community Hospital."
      />

      <Section>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Kicker>Latest stories</Kicker>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-balance md:text-[2.5rem]">
              Stories published by BCH
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Every story links to its full article in the BCH information archive.
          </p>
        </div>

        <div className="mt-9">
          <NewsRows
            stories={stories.map((story) => ({
              title: story.t,
              slug: story.slug,
              image: story.i ?? firstPhotoForSlug(story.slug),
            }))}
          />
        </div>
      </Section>

      <Section tone="cream" label="Events">
        <div className="grid gap-6 rounded-[2rem] bg-card p-6 shadow-[0_24px_44px_-46px_rgba(21,61,49,0.5)] sm:p-8 lg:grid-cols-[1.2fr_auto] lg:items-center lg:p-10">
          <div>
            <Kicker>Events</Kicker>
            <h2 className="mt-3 max-w-xl text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] text-balance md:text-3xl">
              Upcoming BCH events are announced through our news updates and newsletters.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              The hospital publishes its news and event archive alongside annual reports and
              newsletters.
            </p>
          </div>
          <Link
            to="/information/$slug"
            params={{ slug: "news-news" }}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-bold transition-colors hover:border-primary/50 hover:bg-secondary"
          >
            View the news &amp; events archive
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Section>

      <PublishedContentLinks prefix={["news"]} title="All BCH articles & archived news" />
    </>
  );
}
