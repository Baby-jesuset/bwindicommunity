/**
 * Builds the lightweight archive index used by every page that only needs
 * titles, slugs and a thumbnail. The full page bodies stay in
 * `bch-original-pages.json`, which is imported only by the article route.
 *
 *   node scripts/build-archive-index.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const readJson = (relative) => JSON.parse(readFileSync(join(root, relative), "utf8"));

const pages = readJson("src/lib/bch-original-pages.json");
const media = readJson("src/lib/bch-source-media.json");
const mediaBySource = new Map(media.map((item) => [item.source, item.url]));

const SITE_BANNER = "https://www.bwindihospital.com/slider_images/default_image.PNG";
const isSiteBanner = (source) =>
  source === SITE_BANNER || source.includes("slider_images/default_image");

const index = pages.map((page) => {
  const firstSource = (page.imageSources ?? []).find((source) => source && !isSiteBanner(source));
  return {
    slug: page.slug,
    title: page.title,
    firstPhoto: firstSource ? (mediaBySource.get(firstSource) ?? null) : null,
  };
});

writeFileSync(join(root, "src", "lib", "bch-archive-index.json"), `${JSON.stringify(index)}\n`);

console.log(`archive index: ${index.length} pages`);
