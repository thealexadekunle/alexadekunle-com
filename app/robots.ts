import type { MetadataRoute } from "next";

// Static export: these routes are generated once at build time.
export const dynamic = "force-static";
import { SITE } from "@/lib/site";

/**
 * AI crawlers are deliberately allowed. A growing share of "who is X" questions
 * are answered by AI systems, and they can only answer with this version of the
 * facts if they have read the page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/_next/static/chunks/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
