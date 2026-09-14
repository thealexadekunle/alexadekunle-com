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
          "The company I founded in 2021. Vavinix builds websites, digital brands and working systems for businesses across the United States, the United Kingdom, Spain and Nigeria.",
          "Design and development, digital branding, SEO and AI search optimisation, and care plans for the sites we build, because a website is not a delivery, it is a thing that has to survive contact with a business that keeps changing. Behind it sits a team covering creative, design, project management, growth and client support.",
        ],
      },
      {
        heading: "How I work in it",
        paragraphs: [
          "Founder and lead, which in practice means close to the work rather than above it. Positioning and strategy on every project, and hands in the build far more often than a founder probably should have. It is the part of the job I would keep if someone made me give up the rest.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "Most businesses get sold one of two things. A cheap website that looks perfectly fine and does nothing, or an expensive rebuild that solves a problem they did not have.",
          "Both fail for the same reason, and it is not budget. It is that the conversation opened with the deliverable instead of the objective.",
          "Ask a business what it wants and you get a list of pages. Ask what it is trying to achieve and who has to be convinced and what is currently getting in the way, and you usually find the website was the third most important thing on the list.",
        ],
      },
    ],
    pullQuote:
      "Vavinix was built to start at that end. The website is the answer. It should not also be the question.",
    rowsHeading: null,
    rows: [],
    cta: { label: "See the full portfolio at vavinix.com ↗", href: "https://vavinix.com" },
  },

  "aspire-trybe": {
    title: "Aspire Trybe | The African Tech Talent Movement by Alex Adekunle",
    description:
      "Aspire Trybe is a youth movement building the largest community of African tech talent. Digital skills, entrepreneurship and opportunity for ages 17 to 30.",
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
          "A youth movement for people aged 17 to 30, built around four things: digital skills, entrepreneurship, leadership and access to real opportunity.",
          "Not a course. Not a mentorship programme with a certificate at the end. A community with a route through it, where someone arrives with an interest and leaves with a skill, a network, and a way to earn from both.",
        ],
      },
      {
        heading: "What it does",
        paragraphs: [
          "Digital skills, taught to the standard the market pays for rather than the standard a certificate requires. Entrepreneurship treated as a practice rather than a posture. Leadership meaning responsibility, not volume. And opportunity, which mostly means connecting people who can do the work to the people who need it done, then getting out of the way.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "Africa does not have a talent problem. It has never had a talent problem, and anyone who has actually hired here knows it within about a week.",
          "What it has is an access problem. Access to training that is current rather than four years behind the market. Access to the rooms where opportunities get mentioned before they get advertised. Access to the first paid piece of work, which is the one that makes the second one possible and which nobody hands to someone with an empty profile. Access to capital, for anyone who wants to build rather than be employed.",
        ],
      },
    ],
    pullQuote:
      "You cannot fix an access problem with motivation, and a great deal of what gets aimed at young Africans is motivation. Systems fix access problems.",
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
        body: "Time, judgement, and the introductions that move someone forward.",
        meta: "Time",
      },
      {
        index: "03",
        title: "Hire from it",
        body: "Costs you nothing and changes the most. The first paid piece of work makes the second possible.",
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
          "A marketplace for original physical artwork where every piece carries a blockchain certificate of authenticity. Provenance is verifiable. Ownership history is traceable. And resale royalties follow the artist instead of ending at the first sale.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "A painting can triple in price across three resales while the person who made it sees nothing past the first cheque. Everyone in the art world knows this and it has been true for a very long time.",
          "It sounds like an injustice, and it is, but underneath it is something more boring and much more fixable: a record-keeping problem. Nobody can reliably prove what a piece is, who made it, who has owned it, and what it changed hands for. Without that record there is no mechanism to route anything back to the artist, and no confidence for the buyer either. The paper certificate, which is the current answer, is a document in somebody’s drawer hoping to survive forty years and a house move.",
          "Record-keeping is the one thing this technology is genuinely good at. Not speculation. Not digital collectibles. Not a token bolted onto a JPEG. A durable public record attached to a real object, which is what makes both authenticity and royalties enforceable rather than aspirational.",
        ],
      },
    ],
    pullQuote: null,
    rowsHeading: "What it does",
    rows: [
      {
        index: "01",
        title: "For artists",
        body: "A verifiable certificate for each piece, and a royalty that applies every time it sells, not once.",
        meta: "Royalties",
        accent: true,
      },
      {
        index: "02",
        title: "For buyers",
        body: "Proof that a piece is what the seller says it is, and the full history of where it has been.",
        meta: "Provenance",
      },
      {
        index: "03",
        title: "For the market",
        body: "A provenance record that does not depend on a piece of paper surviving four decades in a drawer.",
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
          "An audit of all thirty six Nigerian state governors against the manifestos they campaigned on. Promises made, promises tracked, evidence attached, kept current.",
          "Built under Vavinix.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Every governor, every manifesto commitment, each with a status and a source you can click. No editorialising and no scoring anyone into a political corner.",
          "That restraint is not neutrality for its own sake. The entire value of the thing is that it is checkable, and the moment it reads as partisan it becomes just another opinion with better design, useful to nobody it was built for.",
        ],
      },
    ],
    right: [
      {
        heading: "Why it exists",
        paragraphs: [
          "Accountability here does not usually fail for dramatic reasons. It fails for an ordinary one: the record goes missing.",
          "A manifesto gets published. It is quoted for about a week. Then it effectively disappears, and three years later nobody can produce what was actually promised, so the argument stops being about evidence and becomes about memory and allegiance, which is an argument nobody wins and everybody enjoys having.",
        ],
      },
    ],
    pullQuote:
      "Put the record in one place. Keep it current. Attach the source. The conversation changes, not because anyone has been persuaded, but because there is now a document on the table.",
    rowsHeading: null,
    rows: [],
    cta: { label: "Visit The Receipt", href: "/contact" },
  },
};
