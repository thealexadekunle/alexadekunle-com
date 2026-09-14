"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Static-export image loader.
 *
 * The asset pipeline emits width variants next to each source
 * (`name-480.jpg`, `name-768.jpg`, …) and records them in
 * `public/img/manifest.json`. This loader rewrites a request for a given width
 * to the nearest variant that exists, so `next/image` produces a genuine
 * srcset with no server-side optimiser in front of it.
 *
 * Anything without variants (SVG, logo PNGs) is returned untouched.
 */
import manifest from "@/public/img/manifest.json";

type ManifestEntry = { widths: number[]; native: number; height: number };
const entries = manifest as Record<string, ManifestEntry>;

/**
 * Deploy prefix. On GitHub Pages the site lives under /alexadekunle-com, and a
 * loader that returns root-relative URLs would 404 every image there.
 */
const BASE = process.env["NEXT_PUBLIC_BASE_PATH"] ?? "";

const withBase = (path: string): string =>
  BASE && !path.startsWith(BASE) ? `${BASE}${path}` : path;

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const match = /^\/img\/([^/.]+)\.(jpg|jpeg)$/i.exec(src);
  if (!match) return withBase(src);

  const name = match[1];
  if (!name) return withBase(src);

  const entry = entries[name];
  if (!entry) return withBase(src);

  const candidate =
    entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];

  return withBase(candidate === undefined ? src : `/img/${name}-${candidate}.jpg`);
}
