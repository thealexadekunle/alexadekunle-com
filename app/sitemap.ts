import type { MetadataRoute } from "next";

// Static export: these routes are generated once at build time.
export const dynamic = "force-static";
import { VENTURES } from "@/lib/content/ventures";
import { SITE } from "@/lib/site";

/**
 * Indexable URLs only. Ideas, Journal, Media and Resources ship `noindex,
 * follow` until each holds three real items, and a sitemap that lists noindex
 * URLs sends contradictory instructions.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, priority: 1, changeFrequency: "weekly", lastModified: now },
    { url: `${SITE.url}/about`, priority: 0.9, lastModified: now },
    { url: `${SITE.url}/ventures`, priority: 0.9, lastModified: now },
    ...VENTURES.map((venture) => ({
      url: `${SITE.url}/ventures/${venture.slug}`,
      priority: 0.8,
      lastModified: now,
    })),
    { url: `${SITE.url}/the-eagle`, priority: 0.8, lastModified: now },
    { url: `${SITE.url}/contact`, priority: 0.8, lastModified: now },
    { url: `${SITE.url}/services`, priority: 0.7, lastModified: now },
    { url: `${SITE.url}/speaking`, priority: 0.7, lastModified: now },
    { url: `${SITE.url}/gallery`, priority: 0.5, lastModified: now },
  ];
  return entries;
}
