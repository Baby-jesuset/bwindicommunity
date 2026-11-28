import manifestJson from "@/lib/image-manifest.json";

export type ImageEntry = {
  w: number;
  h: number;
  avif?: string;
  webp?: string;
  detail: string;
  avifDetail?: string;
};

const manifest = manifestJson as unknown as Record<string, ImageEntry>;

/** Manifest metadata for a published image URL, if a rendition set exists. */
export function imageEntry(src?: string | null) {
  return src ? manifest[src] : undefined;
}

/** Largest optimized rendition, used by lightboxes and full-size links. */
export function detailImageUrl(src: string) {
  return manifest[src]?.detail ?? src;
}
