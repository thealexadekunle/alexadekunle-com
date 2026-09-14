export type Venture = {
  readonly slug: string;
  readonly name: string;
  readonly kind: string;
  readonly meta: string;
  readonly headline: string;
  readonly summary: string;
  readonly logo: string | null;
  readonly logoSize: { readonly width: number; readonly height: number } | null;
  readonly scene: string;
  readonly sceneAlt: string;
  readonly tags: readonly string[];
};

/** The four ventures, in the order they carry weight. */
export const VENTURES: readonly Venture[] = [
  {
    slug: "vavinix",
    name: "Vavinix",
    kind: "Company",
    meta: "Founded 2021",
    headline: "Web design. Digital branding. Software development.",
    summary:
      "Founded 2021. Websites and digital systems for businesses in four countries, built by people who ask what the business is for before they ask what it should look like.",
    logo: "/img/vavinix-venture.png",
    logoSize: { width: 362, height: 104 },
    scene: "/img/studio-daylight.jpg",
    sceneAlt:
      "An empty design studio in daylight: long white desk, monitors off, concrete floor",
    tags: ["United States", "United Kingdom", "Spain", "Nigeria"],
  },
  {
    slug: "aspire-trybe",
    name: "Aspire Trybe",
    kind: "Movement",
    meta: "Ages 17 to 30",
    headline: "Building the largest community of African tech talent.",
    summary:
      "A youth movement for 17 to 30 year olds. Skills, entrepreneurship, leadership, and the introductions that actually move someone forward.",
    logo: "/img/aspire-trybe-venture.png",
    logoSize: { width: 247, height: 159 },
    scene: "/img/workshop-space.jpg",
    sceneAlt:
      "A learning space before a workshop begins: light wood tables, closed laptops, tall windows",
    tags: ["Digital skills", "Entrepreneurship", "Nigeria"],
  },
  {
    slug: "oneartpiece",
    name: "OneArtPiece",
    kind: "Marketplace",
    meta: "Provenance",
    headline: "Verified physical artwork, with royalties that find the artist.",
    summary:
      "A marketplace where authenticity is provable and a resale does not quietly cut out the person who made the thing.",
    logo: "/img/oneartpiece-venture.png",
    logoSize: { width: 319, height: 85 },
    scene: "/img/gallery-wall.jpg",
    sceneAlt:
      "Three original paintings hung on a white gallery wall under a skylight",
    tags: ["Blockchain certificate", "Artist royalties"],
  },
  {
    slug: "the-receipt",
    name: "The Receipt",
    kind: "Civic platform",
    meta: "36 states",
    headline: "Nigerian political accountability, made checkable.",
    summary:
      "Thirty six governors. Thirty six manifestos. One place to see what was promised and what has happened since.",
    logo: "/img/thereceipt-venture.png",
    logoSize: { width: 312, height: 82 },
    scene: "/img/civic-facade.jpg",
    sceneAlt:
      "A modernist civic building facade in bright daylight, repeating concrete fins",
    tags: ["Manifesto tracking", "Evidence attached", "Built under Vavinix"],
  },
];

export function ventureBySlug(slug: string): Venture | undefined {
  return VENTURES.find((v) => v.slug === slug);
}
