import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Newspaper } from "lucide-react";

export type NewsStory = {
  title: string;
  slug: string;
  image?: string | null;
  snippet?: string;
};

/**
 * News shown as rows with the photograph beside the story, used by /news and by
 * the archived news index so both read the same way.
 */
export function NewsRows({ stories }: { stories: NewsStory[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_60px_-52px_rgba(21,61,49,0.6)]">
      {stories.map((story, index) => (
        <article
          key={story.slug}
          className={`group grid grid-cols-[6rem_1fr] items-center gap-4 p-4 transition-colors hover:bg-secondary/60 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:p-5 ${
            index > 0 ? "border-t border-border" : ""
          }`}
        >
          <Link
            to="/information/$slug"
            params={{ slug: story.slug }}
            tabIndex={-1}
            aria-hidden
            className="block overflow-hidden rounded-xl border border-border bg-secondary"
          >
            {story.image ? (
              <img
                src={story.image}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <span className="grid aspect-[4/3] w-full place-items-center">
                <Newspaper
                  className="size-8 text-primary/25 sm:size-10"
                  strokeWidth={1.2}
                  aria-hidden
                />
              </span>
            )}
          </Link>

          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[11px] font-bold text-primary">
              <span className="size-1.5 rotate-45 bg-primary" aria-hidden />
              BCH news
            </p>
            <h3
              className={`mt-1.5 font-bold leading-snug text-balance ${
                index === 0 ? "text-base sm:text-xl md:text-2xl" : "text-base sm:text-lg"
              }`}
            >
              <Link
                to="/information/$slug"
                params={{ slug: story.slug }}
                className="hover:text-primary"
              >
                {story.title}
              </Link>
            </h3>
            {story.snippet && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {story.snippet}
              </p>
            )}
            <Link
              to="/information/$slug"
              params={{ slug: story.slug }}
              className="mt-2.5 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
            >
              Read the full story
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
