/**
 * Site-level constants. Every canonical URL, schema @id and profile link
 * resolves from here, so the domain is changed in exactly one place.
 */
export const SITE = {
  url: "https://alexadekunle.com",
  name: "Alex Adekunle",
  legalName: "Alex Akinyele Adekunle",
  locale: "en_NG",
  handle: "thealexadekunle",
  email: "hello@alexadekunle.com",
  speakingEmail: "speaking@alexadekunle.com",
  pressEmail: "press@alexadekunle.com",
  timezone: "Africa/Lagos",
  portrait: "/img/alex-adekunle-portrait.jpg",
  tagline: "Think better. Build better. Lead better.",
  disciplines: ["Technology", "Business", "Ventures", "Ideas"] as const,
} as const;

export const PERSON_ID = `${SITE.url}/#alex-adekunle`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const VAVINIX_ID = "https://vavinix.com/#organization";

export const SOCIALS = [
  { label: "Instagram", href: `https://www.instagram.com/${SITE.handle}` },
  { label: "LinkedIn", href: `https://www.linkedin.com/in/${SITE.handle}/` },
  { label: "X", href: `https://x.com/${SITE.handle}` },
  { label: "Facebook", href: `https://www.facebook.com/${SITE.handle}` },
  { label: "TikTok", href: `https://www.tiktok.com/@${SITE.handle}` },
] as const;

export const SAME_AS: string[] = [
  ...SOCIALS.map((s) => s.href),
  "https://vavinix.com",
  "https://techbehemoths.com/company/vavinix-ltd",
];

/** The standard bio, used verbatim everywhere it appears. */
export const BIO = {
  short:
    "Technology entrepreneur and web developer. Founder of Vavinix. Building Aspire Trybe, OneArtPiece and The Receipt. Think better. Build better. Lead better.",
  medium:
    "Founder of Vavinix | Technology Entrepreneur, Web Developer and Business Strategist | Building Aspire Trybe, OneArtPiece and The Receipt",
  long: "Alex Akinyele Adekunle is a Nigerian technology entrepreneur, web developer and business strategist. He founded Vavinix in 2021, a web design and digital branding company working with clients across the United States, the United Kingdom, Spain and Nigeria. He is also building Aspire Trybe, a movement for African tech talent, OneArtPiece, a marketplace for verified physical artwork, and The Receipt, a civic accountability platform auditing Nigeria’s thirty six state governors against their manifestos. He has been building on the web since 2011 and holds a BSc in Mathematics from the Federal University of Agriculture, Abeokuta.",
} as const;

/**
 * Prefix a public asset path with the deploy base path.
 *
 * `next/image` routes through the custom loader, which handles this itself, but
 * metadata fields (icons, manifest) are emitted verbatim and need it applied.
 */
export function withBasePath(path: string): string {
  const base = process.env["NEXT_PUBLIC_BASE_PATH"] ?? "";
  return base && !path.startsWith(base) ? `${base}${path}` : path;
}
