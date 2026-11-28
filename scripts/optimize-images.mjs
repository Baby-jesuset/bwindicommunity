/**
 * Builds the responsive image set used by the site.
 *
 * Every photograph published by BCH is stored once as a full-resolution
 * original in `public/images/bch` (or `public/bch-assets/images`). This script
 * derives AVIF and WebP renditions from those originals at the widths each
 * role actually renders, strips EXIF/metadata, bakes in the EXIF orientation
 * and writes a manifest the `ResponsiveImage` component reads.
 *
 * Originals are never modified or removed: they remain the fallback source and
 * stay directly downloadable.
 *
 *   node scripts/optimize-images.mjs          # regenerate derivatives + manifest
 *   node scripts/optimize-images.mjs --check  # verify committed derivatives exist
 */
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const OPT_DIR = join(root, "public", "images", "opt");
const MANIFEST = join(root, "src", "lib", "image-manifest.json");
const CHECK = process.argv.includes("--check");

const readJson = (relative) => JSON.parse(readFileSync(join(root, relative), "utf8"));
const publicPath = (url) => join(root, "public", url.replace(/^\//, "").split("/").join("\\"));

/** Quality/width policy per rendering role. */
const SPECS = {
  hero: {
    widths: [640, 960, 1280, 1820],
    formats: [
      ["avif", { quality: 52, effort: 5 }],
      ["webp", { quality: 76, effort: 5 }],
    ],
  },
  feature: {
    widths: [640, 960, 1280, 1600],
    formats: [
      ["avif", { quality: 52, effort: 4 }],
      ["webp", { quality: 76, effort: 4 }],
    ],
  },
  lead: {
    widths: [480, 960, 1280],
    formats: [
      ["avif", { quality: 52, effort: 4 }],
      ["webp", { quality: 76, effort: 4 }],
    ],
  },
  thumb: {
    widths: [320, 480, 960],
    formats: [
      ["avif", { quality: 52, effort: 4 }],
      ["webp", { quality: 76, effort: 4 }],
    ],
  },
  card: {
    widths: [320, 480, 960],
    formats: [
      ["avif", { quality: 52, effort: 4 }],
      ["webp", { quality: 76, effort: 4 }],
    ],
  },
  gallery: {
    widths: [320, 480, 960, 1280, 1600],
    formats: [
      ["avif", { quality: 52, effort: 4 }],
      ["webp", { quality: 76, effort: 4 }],
    ],
  },
  logo: {
    widths: [128, 256, 512],
    formats: [
      ["avif", { quality: 72, effort: 4 }],
      ["webp", { quality: 88, effort: 4 }],
    ],
  },
  // Text-heavy diagrams keep a lossless-ish WebP so labels stay crisp.
  diagram: {
    widths: [640, 1024, 1400],
    formats: [["webp", { quality: 88, effort: 4 }]],
  },
};

const roles = new Map();
const addRole = (url, role) => {
  if (!url) return;
  const set = roles.get(url) ?? new Set();
  set.add(role);
  roles.set(url, set);
};

const media = readJson("src/lib/bch-source-media.json");
const pages = readJson("src/lib/bch-original-pages.json");
const staff = readJson("src/lib/bch-published-staff.json");

// Gallery: the 8 curated photographs plus the 20 archived gallery photos.
for (const item of media) {
  if (
    item.source.includes("/gallery_images/") &&
    !item.source.includes("2048sq_PORTFOLIO") &&
    !item.source.includes("C-Section") &&
    !item.source.includes("IMG_0194")
  ) {
    addRole(item.url, "gallery");
  }
}

// Curated hero/section photographs imported by src/lib/bch-images.ts.
const imagesTs = readFileSync(join(root, "src/lib/bch-images.ts"), "utf8");
const curatedFiles = [...imagesTs.matchAll(/@\/assets\/bch-originals\/([^"]+\.asset\.json)/g)].map(
  (match) => match[1],
);
for (const file of curatedFiles) {
  const asset = readJson(`src/assets/bch-originals/${file}`);
  addRole(asset.url, "feature");
}

// Two of the curated images are text diagrams, not photographs.
const diagramFiles = ["core-values.asset.json", "organisation-structure.asset.json"];
for (const file of diagramFiles) {
  const asset = readJson(`src/assets/bch-originals/${file}`);
  addRole(asset.url, "diagram");
}

// The eight curated photographs are also rendered in the gallery grid, which
// needs the smaller thumbnail widths as well as the section-image widths.
const galleryTs = readFileSync(join(root, "src/routes/gallery.tsx"), "utf8");
const featuredBlock = galleryTs.slice(
  galleryTs.indexOf("const featuredImages"),
  galleryTs.indexOf("const images"),
);
const keyToFile = new Map(
  [...imagesTs.matchAll(/import (\w+) from "@\/assets\/bch-originals\/([^"]+\.asset\.json)"/g)].map(
    (match) => [match[1], match[2]],
  ),
);
for (const match of featuredBlock.matchAll(/bchImages\.(\w+)/g)) {
  const file = keyToFile.get(match[1]);
  if (file) addRole(readJson(`src/assets/bch-originals/${file}`).url, "gallery");
}

// Article photographs: heavily illustrated pages use the compact thumbnail grid.
const mediaBySource = new Map(media.map((item) => [item.source, item.url]));
for (const page of pages) {
  const photos = (page.imageSources ?? []).filter(
    (source) => source && !source.includes("default_image"),
  );
  const role = photos.length >= 5 ? "thumb" : "lead";
  for (const source of photos) {
    const url = mediaBySource.get(source);
    if (url) addRole(url, role);
  }
}

// Staff portraits.
for (const person of staff) {
  if (person.image) addRole(person.image, "card");
}

// Hero, hospital logo and partner logos.
addRole("/images/bch/hero-building.jpg", "hero");
addRole("/bch-assets/images/images-BCH-logo.png", "logo");
for (const name of [
  "images-nursing.jpg",
  "images-Logo-College.JPG",
  "images-Bwindi-guest-house.png",
  "images-Aerolink_Uganda_logo.svg.png",
]) {
  addRole(`/bch-assets/images/${name}`, "logo");
}

const safeStem = (url) =>
  basename(url, extname(url))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const planFor = (roleSet) => {
  const list = [...roleSet];
  // Diagrams are rendered as diagrams everywhere, so they never get the
  // photographic AVIF treatment.
  if (list.includes("diagram"))
    return { widths: SPECS.diagram.widths, formats: SPECS.diagram.formats };

  const widths = new Set();
  const formats = new Map();
  for (const role of list) {
    for (const width of SPECS[role].widths) widths.add(width);
    for (const [format, options] of SPECS[role].formats) {
      if (!formats.has(format)) formats.set(format, options);
    }
  }
  return { widths: [...widths].sort((a, b) => a - b), formats: [...formats.entries()] };
};

const manifest = {};
const jobs = [];

for (const [url, roleSet] of roles) {
  const source = publicPath(url);
  if (!existsSync(source)) {
    console.warn(`missing source, skipping: ${url}`);
    continue;
  }
  const meta = await sharp(source).metadata();
  let width = meta.width ?? 0;
  let height = meta.height ?? 0;
  if ((meta.orientation ?? 1) >= 5) [width, height] = [height, width];

  const { widths, formats } = planFor(roleSet);
  const capped = [...new Set(widths.map((value) => Math.min(value, width)))].sort((a, b) => a - b);
  const entry = {
    w: width,
    h: height,
    avif: undefined,
    webp: undefined,
    detail: url,
    avifDetail: undefined,
  };
  const stem = safeStem(url);

  for (const format of formats) {
    const [name, options] = format;
    const parts = [];
    for (const target of capped) {
      jobs.push({ url, source, stem, target, format: name, options, parts });
    }
    entry[name] = parts;
  }

  manifest[url] = entry;
}

if (!CHECK) {
  rmSync(OPT_DIR, { recursive: true, force: true });
  mkdirSync(OPT_DIR, { recursive: true });
}

let done = 0;
const encode = async (job) => {
  const buffer = await sharp(job.source)
    .rotate()
    .resize({ width: job.target, withoutEnlargement: true })
    .toFormat(job.format, job.options)
    .toBuffer();
  const hash = createHash("sha256").update(buffer).digest("hex").slice(0, 8);
  const file = `${job.stem}-${hash}-${job.target}.${job.format}`;
  const output = join(OPT_DIR, file);
  if (!CHECK) writeFileSync(output, buffer);
  job.parts.push({ target: job.target, url: `/images/opt/${file}`, size: buffer.length });
  done += 1;
  if (done % 50 === 0) process.stderr.write(`  encoded ${done}/${jobs.length}\n`);
};

const queue = [...jobs];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length > 0) await encode(queue.shift());
  }),
);

let totalBytes = 0;
let missing = 0;
for (const entry of Object.values(manifest)) {
  for (const format of ["avif", "webp"]) {
    const parts = entry[format];
    if (!parts) continue;
    parts.sort((a, b) => a.target - b.target);
    entry[format] = parts.map((part) => `${part.url} ${part.target}w`).join(", ");
    const largest = parts[parts.length - 1];
    entry.detail = largest.url;
    if (format === "avif") entry.avifDetail = largest.url;
    for (const part of parts) {
      totalBytes += part.size;
      if (
        CHECK &&
        !existsSync(join(root, "public", part.url.replace(/^\//, "").split("/").join("\\")))
      ) {
        missing += 1;
        console.error(`missing derivative: ${part.url}`);
      }
    }
  }
}

if (CHECK) {
  if (missing > 0) {
    console.error(`\n${missing} derivative(s) missing. Run: node scripts/optimize-images.mjs`);
    process.exit(1);
  }
  console.log(
    `image derivatives verified: ${Object.keys(manifest).length} images, ${jobs.length} files`,
  );
  process.exit(0);
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest)}\n`);

const megabytes = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(
  `optimized ${Object.keys(manifest).length} images into ${jobs.length} files, ` +
    `${megabytes(totalBytes)} MB total (AVIF + WebP)`,
);
