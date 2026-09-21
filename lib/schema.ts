import { BIO, PERSON_ID, SAME_AS, SITE, VAVINIX_ID, WEBSITE_ID } from "./site";

/**
 * One canonical Person node for the whole site. Every other page references
 * this @id rather than declaring a second Person — two Person nodes for one
 * human split the exact entity the site exists to consolidate.
 */
export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.name,
  alternateName: [SITE.legalName, SITE.handle],
  givenName: "Alex",
  additionalName: "Akinyele",
  familyName: "Adekunle",
  nationality: { "@type": "Country", name: "Nigeria" },
  url: `${SITE.url}/`,
  mainEntityOfPage: `${SITE.url}/about`,
  image: `${SITE.url}${SITE.portrait}`,
  description:
    "Nigerian technology entrepreneur, web developer and business strategist. Founder of Vavinix. Building Aspire Trybe, OneArtPiece and The Receipt.",
  jobTitle: ["Founder", "Technology Entrepreneur", "Web Developer", "Business Strategist"],
  worksFor: { "@id": VAVINIX_ID },
  founder: [
    { "@id": VAVINIX_ID },
    { "@id": `${SITE.url}/ventures/aspire-trybe#organization` },
    { "@id": `${SITE.url}/ventures/oneartpiece#organization` },
    { "@id": `${SITE.url}/ventures/the-receipt#organization` },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Federal University of Agriculture, Abeokuta",
    alternateName: "FUNAAB",
    url: "https://funaab.edu.ng/",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    educationalLevel: "BSc",
    about: "Mathematics",
  },
  knowsAbout: [
    "Web development",
    "Web design",
    "Search engine optimization",
    "Digital branding",
    "Technology entrepreneurship",
    "Business strategy",
    "AI automation",
    "Youth empowerment in Africa",
  ],
  knowsLanguage: ["English", "Yoruba"],
  sameAs: SAME_AS,
} as const;

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  publisher: { "@id": PERSON_ID },
  inLanguage: "en",
} as const;

/** Organization points back at the Person as founder, closing the loop. */
export const vavinixSchema = {
  "@type": "Organization",
  "@id": VAVINIX_ID,
  name: "Vavinix",
  url: "https://vavinix.com",
  foundingDate: "2021",
  founder: { "@id": PERSON_ID },
  description:
    "Web design, digital branding and software development company serving clients across the United States, United Kingdom, Spain and Nigeria.",
  areaServed: ["US", "GB", "ES", "NG"],
  sameAs: ["https://techbehemoths.com/company/vavinix-ltd"],
} as const;

export function ventureSchema(
  slug: string,
  name: string,
  description: string,
  extra: Record<string, unknown> = {},
) {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/ventures/${slug}#organization`,
    name,
    founder: { "@id": PERSON_ID },
    description,
    areaServed: "NG",
    ...extra,
  };
}

export function pageSchema(
  type: string,
  path: string,
  name: string,
  extra: Record<string, unknown> = {},
) {
  return {
    "@type": type,
    "@id": `${SITE.url}${path}#page`,
    url: `${SITE.url}${path}`,
    name,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    ...extra,
  };
}

export { BIO };
