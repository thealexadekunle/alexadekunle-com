export type Venture = {
  readonly slug: string;
  readonly name: string;
  readonly kind: string;
  readonly meta: string;
  readonly headline: string;
  readonly summary: string;
  /** Longer line used on the homepage; the hub runs the short `summary`. */
  readonly homeSummary: string;
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
    summary: "Web design, digital branding and software. Founded 2021, clients in four countries.",
    homeSummary:
      "The web design, digital branding and software company I founded in 2021. Clients in the United States, the United Kingdom, Spain and Nigeria.",
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
    summary: "The largest community of African tech talent, for people aged 17 to 30.",
    homeSummary:
      "A movement building the largest community of African tech talent. Skills, enterprise and real opportunity for people aged 17 to 30.",
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
    summary: "Verified physical artwork, with royalties that find the artist.",
    homeSummary:
      "A marketplace for verified physical artwork, where every piece carries a blockchain certificate and resale royalties find their way back to the artist.",
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
    summary: "Thirty six governors. Thirty six manifestos. One place to check.",
    homeSummary:
      "All thirty six Nigerian state governors, checked against the manifestos they were elected on.",
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
