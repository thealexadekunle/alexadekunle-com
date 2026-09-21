import type { MetadataRoute } from "next";

// Static export: these routes are generated once at build time.
export const dynamic = "force-static";
import { VENTURES } from "@/lib/content/ventures";
import { SITE } from "@/lib/site";

/**
 * Ten URLs at launch, every one indexable and none of them thin.
 *
 * /writing is deliberately absent: it ships `noindex, follow` until three
 * pieces exist, and a sitemap listing a noindex URL sends contradictory
 * instructions. Add it here the day it flips.
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
    { url: `${SITE.url}/speaking`, priority: 0.7, lastModified: now },
  ];
  return entries;
}
