/**
 * Client work, structured per the brand document's case-study specification:
 * the problem, the approach, what was built, the outcome, the stack — in that
 * order.
 *
 * Two rules hold here:
 *
 * 1. Only engagements the document names as real client work appear. The ten
 *    further names in the original draft (Spylt, Noka Organics, Skyller,
 *    Webuildpower, Acctual, Wider, Paradigma, Grenergy, Cyber Resilience,
 *    Viewbox) are excluded: several circulate widely as template and practice
 *    builds, and a client who recognises one discounts everything beside it.
 * 2. `metrics` carries no invented numbers. `value: null` renders as a pending
 *    marker until a figure can be verified against analytics the client can see.
 */
export type Metric = { readonly label: string; readonly value: string | null; readonly note?: string };

export type CaseStudy = {
  readonly slug: string;
  readonly client: string;
  readonly sector: "property" | "retail" | "finance" | "remodeling" | "accommodation" | "civic";
  readonly sectorLabel: string;
  readonly discipline: string;
  readonly year: string;
  readonly summary: string;
  readonly problem: readonly string[];
  readonly approach: readonly string[];
  readonly approachRows: readonly { readonly numeral: string; readonly title: string; readonly body: string; readonly meta: string }[];
  readonly built: readonly string[];
  readonly outcome: readonly string[];
  readonly metrics: readonly Metric[];
  readonly stack: readonly string[];
  readonly cover: string;
  readonly coverAlt: string;
  readonly gallery: readonly { readonly src: string; readonly alt: string; readonly caption: string; readonly ratio: "16/10" | "4/5" | "1/1" }[];
  readonly external: string;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "norsemenhaus",
    client: "NorsemenHaus",
    sector: "property",
    sectorLabel: "Property",
    discipline: "Website design and development",
    year: "2024",
    summary:
      "Modular homes sold from a screen, where the product is the one thing a buyer cannot stand inside before committing.",
    problem: [
      "Modular homes are a considered purchase made almost entirely on a screen. The buyer cannot walk the rooms, cannot knock on the walls, and cannot borrow confidence from a showroom. Everything the site fails to answer becomes a reason to leave and think about it, and thinking about it is where this category loses people.",
      "The conversation opened, as it usually does, with a list of pages. It got useful when it moved to the objective: what has to be true before someone enquires, and what is currently getting in the way.",
    ],
    approach: [
      "Structure the site around the decision rather than the catalogue: specification where a buyer expects atmosphere, atmosphere where they expect specification. Make the configuration legible. Put the price conversation early instead of behind a form. Treat the enquiry as the end of a sequence rather than a button.",
    ],
    approachRows: [
      { numeral: "i", title: "Decision-first architecture", body: "Pages ordered by what the buyer needs to settle, not by what the business wanted to show.", meta: "Strategy" },
      { numeral: "ii", title: "Evidence over adjectives", body: "Specifications, materials, timelines and real photography carrying the persuasion.", meta: "Content" },
      { numeral: "iii", title: "Search built in, not bolted on", body: "Modular-home queries mapped to pages that answer them, with schema and clean rendering.", meta: "Search" },
    ],
    built: [
      "A complete website and content system: model pages, configuration detail, specification tables, enquiry routing, and a care plan so the thing keeps working after launch.",
      "A website is not a delivery, it is a thing that has to survive contact with a business that keeps changing. The build assumed new models, new photography and new price positions, and made each of those a content edit rather than a development ticket.",
    ],
    outcome: [
      "Numbers go in only once they are verified against analytics the client can see. An unverifiable metric on a case study does more damage than an empty space, because a reader who catches one inflated line re-reads everything above it with suspicion.",
    ],
    metrics: [
      { label: "Enquiry volume", value: null, note: "Pending client analytics" },
      { label: "Organic sessions", value: null, note: "Pending client analytics" },
      { label: "Core Web Vitals", value: null, note: "Pending field data" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Headless CMS", "Static rendering", "Schema.org", "Analytics", "Care plan"],
    cover: "/img/workspace-first-light.jpg",
    coverAlt: "A plain oak desk in first light: closed laptop, a stack of paper, one pencil",
    gallery: [
      { src: "/img/room-for-focus.jpg", alt: "A light-filled room built for focus: linen chair, low oak shelf, sheer curtains", caption: "Interior set — specification shown as atmosphere", ratio: "4/5" },
      { src: "/img/sky-edge.jpg", alt: "Looking up the clean edge of a white concrete building into open sky", caption: "Configuration detail — legible, not clever", ratio: "4/5" },
    ],
    external: "https://vavinix.com",
  },
  {
    slug: "sofa-club-uk",
    client: "Sofa Club UK",
    sector: "retail",
    sectorLabel: "Retail",
    discipline: "Ecommerce and branding",
    year: "2023",
    summary:
      "A sofa you cannot sit on before you buy it. The entire problem in nine words, and the whole brief in one sentence.",
    problem: [
      "Furniture bought online asks for a leap of faith: comfort, scale and colour are the three things a screen is worst at conveying, and all three are the reasons a sofa gets returned.",
      "Returns are the tax on unanswered questions. Every ambiguity left on a product page arrives later as a courier booking.",
    ],
    approach: [
      "Answer the three unanswerable things deliberately: scale against a known object, material in close detail, and comfort described by the people who already own it. Make delivery and returns legible before checkout rather than after it.",
    ],
    approachRows: [
      { numeral: "i", title: "Scale you can judge", body: "Dimensions shown against everyday reference points instead of a spec table alone.", meta: "Product" },
      { numeral: "ii", title: "Material up close", body: "Fabric and frame photographed at a distance a buyer would actually inspect them from.", meta: "Content" },
      { numeral: "iii", title: "Terms before checkout", body: "Delivery windows and returns stated on the product page, not buried in a policy link.", meta: "Trust" },
    ],
    built: ["A product and category experience built around the objection rather than the catalogue, with branding applied consistently from listing to confirmation email."],
    outcome: ["Outcome figures are held until the client's own reporting confirms them."],
    metrics: [
      { label: "Return rate", value: null, note: "Pending client reporting" },
      { label: "Conversion", value: null, note: "Pending client reporting" },
    ],
    stack: ["Ecommerce platform", "Custom theme", "Digital branding", "Performance budget"],
    cover: "/img/style-flatlay.jpg",
    coverAlt: "Flat lay on white linen: a folded shirt, a leather watch strap, thin metal glasses",
    gallery: [
      { src: "/img/books.jpg", alt: "A small stack of worn hardback books, one open face down, in raking window light", caption: "Material studies", ratio: "1/1" },
    ],
    external: "https://vavinix.com",
  },
  {
    slug: "startengine",
    client: "StartEngine",
    sector: "finance",
    sectorLabel: "Finance",
    discipline: "Product and development",
    year: "2023",
    summary:
      "Where trust has to be established before anything else happens, and every interface decision is either building it or spending it.",
    problem: [
      "In investment products, the interface is the prospectus. Ambiguity does not read as simplicity — it reads as something being withheld.",
    ],
    approach: [
      "Treat disclosure as a design material. Make risk, terms and process visible at the moment a decision is being made rather than at the end of a funnel.",
    ],
    approachRows: [
      { numeral: "i", title: "Disclosure in place", body: "Terms surfaced beside the decision they affect, not collected in a footer.", meta: "Product" },
      { numeral: "ii", title: "Legible states", body: "Every pending, cleared and failed state given its own unambiguous treatment.", meta: "Interface" },
    ],
    built: ["Product surfaces and supporting development work, built to keep the disclosure model intact as the offering changed."],
    outcome: ["Reporting sits with the client; no figures are published here without it."],
    metrics: [{ label: "Completion rate", value: null, note: "Pending client reporting" }],
    stack: ["Product design", "Frontend development", "Accessibility review"],
    cover: "/img/meeting-still-life.jpg",
    coverAlt: "A meeting table still life: a document face down, a fountain pen, folded glasses, black coffee",
    gallery: [],
    external: "https://vavinix.com",
  },
  {
    slug: "sojourn-accommodation",
    client: "Sojourn Accommodation",
    sector: "accommodation",
    sectorLabel: "Accommodation",
    discipline: "Booking experience",
    year: "2024",
    summary:
      "Stays booked on a phone, at night, by someone comparing four tabs. The design job is making the decision easy, not making the photographs bigger.",
    problem: [
      "Accommodation is chosen in a comparison, not in isolation. The site that answers fastest wins, and most of them answer slowest exactly where it matters: availability, total price, and what the place is actually near.",
    ],
    approach: [
      "Compress the decision. Availability and total cost visible without a round trip, location described in terms a visitor can act on, and a booking flow that survives a one-handed phone at midnight.",
    ],
    approachRows: [
      { numeral: "i", title: "Total price, early", body: "The number a guest actually pays shown before the final step.", meta: "Booking" },
      { numeral: "ii", title: "Location as context", body: "Proximity described by what a guest came for, not by coordinates.", meta: "Content" },
    ],
    built: ["A booking experience and supporting site, with a care plan covering seasonal rate and availability changes."],
    outcome: ["Figures pending the client's booking reporting."],
    metrics: [{ label: "Direct bookings", value: null, note: "Pending client reporting" }],
    stack: ["Design", "Booking flow", "Care plan"],
    cover: "/img/travel-stair.jpg",
    coverAlt: "A sunlit whitewashed modernist stair against a bright sky, hard shadow across the wall",
    gallery: [],
    external: "https://vavinix.com",
  },
  {
    slug: "jc-carpentry",
    client: "JC Carpentry",
    sector: "remodeling",
    sectorLabel: "Remodeling",
    discipline: "Brand and website",
    year: "2023",
    summary: "A trade business whose best asset was the work itself, and whose website was quietly hiding it.",
    problem: [
      "Trade businesses win on evidence and lose on presentation. The craft was not in question; the way it was shown was.",
    ],
    approach: [
      "Put the work first at the scale it deserves, and make enquiry a single obvious step from any piece of it.",
    ],
    approachRows: [
      { numeral: "i", title: "Work at full size", body: "Finished joinery shown large enough to read the craft.", meta: "Content" },
      { numeral: "ii", title: "One step to enquiry", body: "A route from any project straight into a conversation.", meta: "Conversion" },
    ],
    built: ["Digital branding and a website built around the portfolio, sized for a business that adds projects itself."],
    outcome: ["Enquiry figures sit with the client."],
    metrics: [{ label: "Enquiries", value: null, note: "Pending client reporting" }],
    stack: ["Digital branding", "Website", "Content system"],
    cover: "/img/studio-daylight.jpg",
    coverAlt: "An empty design studio in daylight: long white desk, monitors off, concrete floor",
    gallery: [],
    external: "https://vavinix.com",
  },
  {
    slug: "the-receipt",
    client: "The Receipt",
    sector: "civic",
    sectorLabel: "Civic technology",
    discipline: "In-house venture",
    year: "2025",
    summary: "Thirty six governors, thirty six manifestos, one checkable record. Built under Vavinix.",
    problem: [
      "Accountability here does not usually fail for dramatic reasons. It fails for an ordinary one: the record goes missing.",
      "A manifesto gets published. It is quoted for about a week. Then it effectively disappears, and three years later nobody can produce what was actually promised.",
    ],
    approach: [
      "Put the record in one place. Keep it current. Attach the source. No editorialising and no scoring anyone into a political corner — the entire value of the thing is that it is checkable.",
    ],
    approachRows: [
      { numeral: "i", title: "One record, current", body: "Every governor, every commitment, each with a status and a source you can click.", meta: "Data" },
      { numeral: "ii", title: "Restraint as strategy", body: "The moment it reads as partisan it becomes an opinion with better design.", meta: "Editorial" },
    ],
    built: ["A civic accountability platform covering all thirty six states, structured so evidence can be added as it emerges."],
    outcome: ["Coverage and usage reported once the platform's own analytics are established."],
    metrics: [
      { label: "States covered", value: "36" },
      { label: "Manifestos tracked", value: "36" },
    ],
    stack: ["Product", "Data model", "Civic research", "Built under Vavinix"],
    cover: "/img/civic-facade.jpg",
    coverAlt: "A modernist civic building facade in bright daylight, repeating concrete fins",
    gallery: [],
    external: "/ventures/the-receipt",
  },
];

export const WORK_SECTORS = [
  { value: "all", label: "All" },
  { value: "property", label: "Property" },
  { value: "retail", label: "Retail" },
  { value: "finance", label: "Finance" },
  { value: "accommodation", label: "Accommodation" },
  { value: "remodeling", label: "Remodeling" },
  { value: "civic", label: "Civic" },
] as const;

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
