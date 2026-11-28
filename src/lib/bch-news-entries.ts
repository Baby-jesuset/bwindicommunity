import archiveIndex from "@/lib/bch-archive-index.json";

/**
 * The generic slider banner that BCH used as the header image for almost every
 * archived page. It belongs to the site chrome, not to any single article, so
 * article pages never render it as their content photograph.
 */
export const SITE_BANNER_IMAGE = "https://www.bwindihospital.com/slider_images/default_image.PNG";

export function isSiteBanner(source: string) {
  return source === SITE_BANNER_IMAGE || source.includes("slider_images/default_image");
}

/** First real photograph published on an archive page, if it has one. */
export function firstPhotoForSlug(slug: string) {
  return archiveIndex.find((item) => item.slug === slug)?.firstPhoto ?? null;
}

export type ArchiveNewsEntry = {
  title: string;
  slug: string;
  snippet: string;
  image: string | null;
};

/**
 * The archived news index stores each story as a heading, a short standfirst
 * and a "Read more..." link. Pull those back out so the index can be rendered
 * as news rows instead of one long block of prose.
 */
export function parseNewsEntries(body: string) {
  const entries: ArchiveNewsEntry[] = [];
  const marker = /\[Read more\.\.\.\]\(([^)]+)\)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = marker.exec(body)) !== null) {
    const block = body.slice(cursor, match.index);
    const headings = [...block.matchAll(/^#{3,6}\s+(.+)$/gm)];
    const heading = headings[headings.length - 1];

    if (heading && heading[1] && match[1]) {
      const after = block.slice((heading.index ?? 0) + heading[0].length);
      const snippet =
        after
          .replace(/\[\]\([^)]*\)/g, "")
          .trim()
          .split(/\n{2,}/)[0]
          ?.replace(/\s+/g, " ")
          .trim() ?? "";
      const slug = match[1].replace(/^\/information\//, "");

      entries.push({
        title: heading[1].trim(),
        slug,
        snippet,
        image: firstPhotoForSlug(slug),
      });
    }

    cursor = marker.lastIndex;
  }

  return { entries, rest: body.slice(cursor).trim() };
}
