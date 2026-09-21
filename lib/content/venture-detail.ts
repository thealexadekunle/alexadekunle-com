export type DetailBlock = { readonly heading: string; readonly paragraphs: readonly string[] };
export type DetailStat = { readonly value: string; readonly label: string; readonly accent?: boolean };
export type DetailRow = { readonly index: string; readonly title: string; readonly body: string; readonly meta: string; readonly accent?: boolean };

export type VentureDetail = {
  readonly title: string;
  readonly description: string;
  readonly hero: { readonly src: string; readonly alt: string };
  readonly stats: readonly DetailStat[];
  readonly left: readonly DetailBlock[];
  readonly right: readonly DetailBlock[];
  readonly pullQuote: string | null;
  readonly rows: readonly DetailRow[];
  readonly rowsHeading: string | null;
  readonly cta: { readonly label: string; readonly href: string };
};

export const VENTURE_DETAIL: Record<string, VentureDetail> = {
  vavinix: {
    title: "Vavinix | The Web Design Company Founded by Alex Adekunle",
    description:
      "Vavinix is the web design and digital branding company Alex Adekunle founded in 2021, serving clients in the US, UK, Spain and Nigeria.",
    hero: {
      src: "/img/studio-daylight.jpg",
      alt: "An empty design studio in daylight: long white desk, monitors off, concrete floor",
    },
    stats: [
      { value: "2021", label: "Founded" },
      { value: "04", label: "Countries served" },
      { value: "06", label: "Sectors" },
      { value: "↗", label: "vavinix.com", accent: true },
    ],
    left: [
      {
        heading: "What it is",
        paragraphs: [
          "The company I founded in 2021. Vavinix builds websites, brands and working digital systems for businesses in the United States, the United Kingdom, Spain and Nigeria, with a team covering creative, design, project management, growth and client support.",
          "Design and development, branding, SEO and AI search, and care plans that keep a site healthy after launch. A website is not a delivery. It has to survive a business that keeps changing.",
        ],
      },
      {
        heading: "My role",
        paragraphs: [
          "Founder and lead. Close to the work, not above it. Strategy on every project, and hands in the build more often than a founder probably should.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "Ask a business what it wants and you get a list of pages.",
          "Ask what it is trying to achieve, who has to be convinced and what is in the way, and the website usually turns out to be the third most important thing on the list.",
          "Most agencies start with the list. Vavinix starts with the second question.",
        ],
      },
    ],
    pullQuote: "The website is the answer, not the brief.",
    rowsHeading: null,
    rows: [],
    cta: { label: "See the portfolio and start a project at vavinix.com ↗", href: "https://vavinix.com" },
  },

  "aspire-trybe": {
    title: "Aspire Trybe | The African Tech Talent Movement by Alex Adekunle",
    description:
      "Aspire Trybe is a movement building the largest community of African tech talent. Skills, enterprise and opportunity for ages 17 to 30.",
    hero: {
      src: "/img/workshop-space.jpg",
      alt: "A learning space before a workshop begins: light wood tables, closed laptops, tall windows",
    },
    stats: [
      { value: "17—30", label: "Age range" },
      { value: "04", label: "Pillars" },
      { value: "NG", label: "Base" },
      { value: "03", label: "Ways to support", accent: true },
    ],
    left: [
      {
        heading: "What it is",
        paragraphs: [
          "A movement for people aged 17 to 30, built on four things: digital skills, entrepreneurship, leadership and access to real opportunity.",
          "Not a course with a certificate at the end. A community with a route through it. You arrive with an interest and leave with a skill, a network, and a way to earn from both.",
        ],
      },
      {
        heading: "Where the money goes",
        paragraphs: [
          "Programme delivery, training materials and the cost of running cohorts. Ask me exactly where, and I will tell you exactly where.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "Africa does not have a talent problem. Anyone who has hired here knows that within a week.",
          "It has an access problem. Access to training that is current, not four years behind. Access to the rooms where opportunities are mentioned before they are advertised. Access to the first paid job, the one that makes the second possible and that nobody gives to someone with an empty profile.",
        ],
      },
    ],
    pullQuote: "Motivation does not fix access. Systems do. That is the whole idea.",
    rowsHeading: "Support the work",
    rows: [
      {
        index: "01",
        title: "Fund a cohort",
        body: "Programme delivery, training materials and the cost of running cohorts.",
        meta: "Financial",
        accent: true,
      },
      {
        index: "02",
        title: "Mentor someone",
        body: "Walk one person through a cohort. Time, judgement, and the introductions that move them forward.",
        meta: "Time",
      },
      {
        index: "03",
        title: "Hire from it",
        body: "Costs you nothing and changes the most. The first paid job is the one that makes the second possible.",
        meta: "Free",
      },
    ],
    cta: { label: "Get involved", href: "/contact" },
  },

  oneartpiece: {
    title: "OneArtPiece | Verified Physical Artwork and Artist Royalties",
    description:
      "OneArtPiece is a marketplace for verified physical artwork. Blockchain certificates of authenticity and resale royalties that follow the artist.",
    hero: {
      src: "/img/gallery-wall.jpg",
      alt: "Three original paintings hung on a white gallery wall under a skylight",
    },
    stats: [],
    left: [
      {
        heading: "What it is",
        paragraphs: [
          "A marketplace for original physical artwork. Every piece carries a blockchain certificate of authenticity, so its origin and ownership history can be checked, and resale royalties follow the artist rather than stopping at the first sale.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "A painting can triple in value across three resales while the person who painted it sees nothing after the first cheque.",
          "It looks like an injustice, and it is, but underneath is a duller, fixable problem: record-keeping. Nobody can reliably prove what a piece is, who made it and who has owned it. The current answer is a paper certificate in a drawer, hoping to survive forty years and a house move.",
          "Keeping a durable public record is the one thing this technology is genuinely good at. Not speculation. Not a token bolted to a JPEG. A permanent record attached to a real object, which is what makes authenticity provable and royalties enforceable.",
        ],
      },
    ],
    pullQuote: null,
    rowsHeading: "Who it is for",
    rows: [
      {
        index: "01",
        title: "Artists",
        body: "A verifiable certificate for every piece, and a royalty on every sale, not just the first.",
        meta: "Royalties",
        accent: true,
      },
      {
        index: "02",
        title: "Buyers",
        body: "Proof that a piece is what the seller says it is, with its full history.",
        meta: "Provenance",
      },
      {
        index: "03",
        title: "The market",
        body: "Provenance that does not depend on paper.",
        meta: "Record",
      },
    ],
    cta: { label: "Explore OneArtPiece", href: "/contact" },
  },

  "the-receipt": {
    title: "The Receipt | Auditing Nigeria’s 36 Governors Against Their Manifestos",
    description:
      "The Receipt tracks all 36 Nigerian state governors against their campaign manifestos. Promises made, evidence attached, updated over time.",
    hero: {
      src: "/img/civic-facade.jpg",
      alt: "A modernist civic building facade in bright daylight, repeating concrete fins",
    },
    stats: [
      { value: "36", label: "State governors" },
      { value: "36", label: "Manifestos" },
      { value: "01", label: "Place to check" },
      { value: "NG", label: "Coverage", accent: true },
    ],
    left: [
      {
        heading: "What it is",
        paragraphs: [
          "Every one of Nigeria’s thirty six state governors, tracked against the manifesto they campaigned on. Each promise has a status and a source you can click.",
          "Built under Vavinix.",
        ],
      },
      {
        heading: "How it stays useful",
        paragraphs: [
          "No commentary and no scoring anyone into a corner.",
          "The whole value is that it can be checked, and the moment it reads as partisan it becomes one more opinion with better design.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "Accountability here rarely fails for dramatic reasons. It fails because the record goes missing.",
          "A manifesto is published, quoted for a week, then forgotten. Three years later nobody can produce what was promised, so the argument is about memory and loyalty instead of evidence. Everyone enjoys that argument. Nobody wins it.",
        ],
      },
    ],
    pullQuote:
      "Put the record in one place, keep it current, attach the source. The conversation changes, not because anyone was persuaded, but because there is now a document on the table.",
    rowsHeading: null,
    rows: [],
    cta: { label: "Visit The Receipt", href: "/contact" },
  },
};
