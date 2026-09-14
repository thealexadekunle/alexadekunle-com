export type Milestone = {
  readonly marker: string;
  readonly title: string;
  readonly body: string;
  readonly kind: string;
  readonly accent?: boolean;
};

export const MILESTONES: readonly Milestone[] = [
  {
    marker: "2011",
    title: "The first build",
    body: "Building on the web begins. Static brochure sites, and the habit of taking things apart to see why they work.",
    kind: "Start year",
  },
  {
    marker: "FUNAAB",
    title: "BSc Mathematics",
    body: "Federal University of Agriculture, Abeokuta. Final year on the application of algebraic coding theory.",
    kind: "Degree",
  },
  {
    marker: "↗",
    title: "Websites became products",
    body: "Projects became businesses. Technical skill became a way of seeing bigger problems.",
    kind: "The turn",
  },
  {
    marker: "2021",
    title: "Vavinix founded",
    body: "Web design, digital branding and software for businesses across the United States, the United Kingdom, Spain and Nigeria.",
    kind: "Company",
  },
  {
    marker: "Now",
    title: "Four ventures in build",
    body: "Vavinix, Aspire Trybe, OneArtPiece and The Receipt. More is coming. I would rather build than announce.",
    kind: "Current",
    accent: true,
  },
];

export const BELIEFS: readonly string[] = [
  "Build before you over-explain.",
  "Learn faster than the environment changes.",
  "Make technology useful, not merely impressive.",
  "Let the work speak, then it cannot be argued with.",
  "Give people systems and opportunities, not only motivation.",
  "Think long term, execute today.",
];

export type LifestyleFrame = {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width: number;
  readonly height: number;
  readonly aspect: string;
  readonly span: string;
};

export const LIFESTYLE_FRAMES: readonly LifestyleFrame[] = [
  {
    src: "/img/room-for-focus.jpg",
    alt: "A light-filled room built for focus: linen chair, low oak shelf, sheer curtains",
    caption: "The workspace — a decision you make once and then live inside",
    width: 1344,
    height: 752,
    aspect: "aspect-[16/10]",
    span: "col-span-2 lg:col-span-7",
  },
  {
    src: "/img/alex-adekunle-studio.jpg",
    alt: "Alex Adekunle, founder of Vavinix, photographed in the studio",
    caption: "Style — another form of communication",
    width: 853,
    height: 1200,
    aspect: "aspect-[4/5]",
    span: "lg:col-span-5 lg:pt-16",
  },
  {
    src: "/img/travel-stair.jpg",
    alt: "A sunlit whitewashed modernist stair against a bright sky, hard shadow across the wall",
    caption: "Experiences — not photographs",
    width: 1024,
    height: 1024,
    aspect: "aspect-square",
    span: "lg:col-span-4",
  },
  {
    src: "/img/books.jpg",
    alt: "A small stack of worn hardback books, one open face down, in raking window light",
    caption: "Learning — old books, no trends",
    width: 1024,
    height: 1024,
    aspect: "aspect-square",
    span: "lg:col-span-4",
  },
  {
    src: "/img/meeting-still-life.jpg",
    alt: "A meeting table still life: a document face down, a fountain pen, folded glasses, black coffee",
    caption: "The table where the second conversation happens",
    width: 896,
    height: 1120,
    aspect: "aspect-square",
    span: "col-span-2 lg:col-span-4",
  },
];
