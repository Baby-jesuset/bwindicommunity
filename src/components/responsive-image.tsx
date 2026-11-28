import type { ImgHTMLAttributes } from "react";

import { imageEntry } from "@/lib/image-meta";

type Props = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt" | "fetchPriority"
> & {
  src: string;
  alt: string;
  sizes?: string;
  width?: number;
  height?: number;
  /** Above-the-fold image: eager loading and high fetch priority. */
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Renders an AVIF/WebP `<picture>` from the build-time rendition manifest, with
 * the original published image as the final fallback. Intrinsic dimensions are
 * always emitted so the browser reserves the correct box before the image
 * arrives. Unknown URLs fall back to a plain `<img>`.
 */
export function ResponsiveImage({
  src,
  alt,
  sizes = "100vw",
  width,
  height,
  className,
  loading,
  decoding,
  priority = false,
  fetchPriority,
  ...rest
}: Props) {
  const entry = imageEntry(src);
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : undefined);

  if (!entry) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={resolvedLoading}
        decoding={decoding ?? "async"}
        fetchPriority={resolvedFetchPriority}
        {...rest}
      />
    );
  }

  return (
    <picture className="contents">
      {entry.avif ? <source type="image/avif" srcSet={entry.avif} sizes={sizes} /> : null}
      {entry.webp ? <source type="image/webp" srcSet={entry.webp} sizes={sizes} /> : null}
      <img
        src={entry.detail}
        alt={alt}
        width={width ?? entry.w}
        height={height ?? entry.h}
        sizes={sizes}
        className={className}
        loading={resolvedLoading}
        decoding={decoding ?? "async"}
        fetchPriority={resolvedFetchPriority}
        {...rest}
      />
    </picture>
  );
}
