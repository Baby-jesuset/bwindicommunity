import originalMedia from "@/lib/bch-source-media.json";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kicker, PageHero, Section } from "@/components/page-sections";
import { bchImages } from "@/lib/bch-images";

const featuredImages = [
  { src: bchImages.hospitalGallery, cat: "BCH gallery", alt: "Photo published in the BCH gallery" },
  { src: bchImages.galleryCare, cat: "BCH gallery", alt: "Photo published in the BCH gallery" },
  { src: bchImages.cSection, cat: "Clinical care", alt: "C-section care at BCH" },
  { src: bchImages.communityOutreach, cat: "Community outreach", alt: "BCH community outreach" },
  { src: bchImages.clinicalTraining, cat: "Education", alt: "Health care training at BCH" },
  { src: bchImages.laboratory, cat: "Diagnostics", alt: "Diagnostic services at BCH" },
  { src: bchImages.eyeCare, cat: "Eye care", alt: "Eye care services at BCH" },
  { src: bchImages.neonatal, cat: "Child health", alt: "Child care in the BCH neonatal unit" },
];

const images = [
  ...featuredImages,
  ...originalMedia
    .filter(
      (item) =>
        item.source.includes("/gallery_images/") &&
        !item.source.includes("2048sq_PORTFOLIO") &&
        !item.source.includes("C-Section") &&
        !item.source.includes("IMG_0194"),
    )
    .map((item) => ({
      src: item.url,
      cat: "BCH gallery",
      alt: "Photograph published in the BCH gallery",
    })),
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Bwindi Community Hospital" },
      { name: "description", content: "View photographs published by Bwindi Community Hospital." },
      { property: "og:title", content: "BCH Gallery" },
      {
        property: "og:description",
        content: "Original photographs published by Bwindi Community Hospital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<(typeof images)[number] | null>(null);
  const cats = ["All", ...new Set(images.map((x) => x.cat))];
  const visible = images.filter((x) => filter === "All" || x.cat === filter);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="BCH in pictures."
        intro="Original photographs published by Bwindi Community Hospital."
      />

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  filter === c
                    ? "bg-primary text-primary-foreground shadow-[0_10px_24px_-16px_rgba(241,101,45,0.9)]"
                    : "border border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            {visible.length} photograph{visible.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((x, index) => (
            <button
              key={`${x.src}-${index}`}
              type="button"
              onClick={() => setSelected(x)}
              aria-label={`Open photograph: ${x.alt}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-0 text-left"
            >
              <img
                src={x.src}
                alt={x.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-[linear-gradient(0deg,oklch(0.315_0.045_163/0.85),transparent)] px-4 pb-3 pt-8 text-xs font-bold text-white">
                {x.cat}
                <span className="grid size-7 place-items-center rounded-full bg-white/15">
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </span>
            </button>
          ))}
        </div>

        <Link
          to="/information/$slug"
          params={{ slug: "gallery" }}
          className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          View the complete BCH gallery
          <ArrowUpRight className="size-4" />
        </Link>
      </Section>

      {selected && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-foreground/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <Button
            variant="outline"
            size="icon"
            className="absolute right-5 top-5 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={() => setSelected(null)}
            aria-label="Close image"
          >
            <X />
          </Button>
          <figure className="max-w-5xl">
            <img
              src={selected.src}
              alt={selected.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm font-semibold text-white/80">
              {selected.cat}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
