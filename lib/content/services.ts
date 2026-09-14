export type Tier = {
  readonly index: string;
  readonly badge: string;
  readonly badgeAccent?: boolean;
  readonly title: string;
  readonly body: string;
  readonly deliverables: readonly string[];
  readonly timing: { readonly project: string; readonly retainer: string };
};

export const TIERS: readonly Tier[] = [
  {
    index: "Tier 01",
    badge: "Most requested",
    badgeAccent: true,
    title: "Positioning & strategy sprint",
    body: "The uncomfortable second conversation, run deliberately. What the business is trying to achieve, who has to be convinced, and what is currently getting in the way.",
    deliverables: [
      "Positioning and message architecture",
      "Audience, objection and evidence map",
      "Site or product structure recommendation",
      "A written brief the build can actually use",
    ],
    timing: {
      project: "Typically 2 to 3 weeks · fixed scope",
      retainer: "Folded into month one of a retainer",
    },
  },
  {
    index: "Tier 02",
    badge: "Via Vavinix",
    title: "Design, build & care",
    body: "Websites, digital brands and working systems. Design and development, digital branding, SEO and AI search optimisation, and care plans for the sites we build.",
    deliverables: [
      "Web design and development",
      "Digital branding",
      "SEO and AI search optimisation",
      "Care plan after launch",
    ],
    timing: {
      project: "Project length by scope · milestone billing",
      retainer: "Continuous delivery · monthly cadence",
    },
  },
  {
    index: "Tier 03",
    badge: "Ongoing",
    title: "Founder advisory",
    body: "A standing second opinion for founders holding both sides of the screen: product direction, technical judgement, and the business model sitting underneath it.",
    deliverables: [
      "Monthly working sessions",
      "Roadmap and prioritisation review",
      "Hiring and delivery structure",
      "Async access between sessions",
    ],
    timing: {
      project: "Available as a one-off working session",
      retainer: "Quarterly minimum · limited slots",
    },
  },
  {
    index: "Tier 04",
    badge: "Rooms & stages",
    title: "Speaking & workshops",
    body: "Technology, entrepreneurship, leadership, digital opportunity and what building actually looks like on a Tuesday. Conferences, universities, corporate events, workshops and podcasts.",
    deliverables: [
      "Keynote or fireside",
      "Team or cohort workshop",
      "Podcast and interview appearances",
      "In person or remote",
    ],
    timing: { project: "By date", retainer: "By date" },
  },
];

export type DeliverableRow = {
  readonly engagement: string;
  readonly deliverable: string;
  readonly owner: string;
  readonly timing: { readonly project: string; readonly retainer: string };
};

export const DELIVERABLES: readonly DeliverableRow[] = [
  {
    engagement: "Positioning sprint",
    deliverable: "Positioning, message architecture, objection map, written brief",
    owner: "Alex, direct",
    timing: { project: "2 to 3 weeks", retainer: "Month one" },
  },
  {
    engagement: "Design, build & care",
    deliverable: "Website or product build, digital branding, SEO and AI search, care plan",
    owner: "Vavinix team, Alex leading",
    timing: { project: "By scope", retainer: "Continuous" },
  },
  {
    engagement: "Founder advisory",
    deliverable: "Working sessions, roadmap review, hiring and delivery structure, async access",
    owner: "Alex, direct",
    timing: { project: "Single session", retainer: "Monthly, quarterly minimum" },
  },
  {
    engagement: "Speaking & workshops",
    deliverable: "Keynote, fireside, team or cohort workshop, podcast appearance",
    owner: "Alex, in person or remote",
    timing: { project: "By date", retainer: "By date" },
  },
];

export const PROCESS: readonly { readonly title: string; readonly body: string }[] = [
  {
    title: "01 — The uncomfortable second conversation",
    body: "Ask a business what it wants and you get a list of pages. Ask what it is trying to achieve and who has to be convinced and what is currently getting in the way, and you usually find the website was the third most important thing on the list. Week one is that conversation, on purpose, before anything is scoped.",
  },
  {
    title: "02 — Structure",
    body: "Taking something that exists only in someone’s head and giving it edges. Positioning, message architecture and the shape of the thing, written down in a brief precise enough that a build team can disagree with it.",
  },
  {
    title: "03 — Build",
    body: "Delivery runs through Vavinix: design, development, branding and search, with a team covering creative, design, project management, growth and client support. Server-rendered HTML, real performance budgets, schema that validates clean.",
  },
  {
    title: "04 — Stay on",
    body: "A website is not a delivery, it is a thing that has to survive contact with a business that keeps changing. Care plans exist because the version that shipped is never the version that matters in year two.",
  },
];

export const GOOD_FIT: readonly string[] = [
  "You want someone who will push back on the brief before agreeing to it.",
  "You are building a business, not ordering a deliverable.",
  "You would rather hear the objection now than discover it in month four.",
];

export const NOT_FIT: readonly string[] = [
  "You want an order-taker with a template and a two-day turnaround.",
  "The decision is already made and the brief is closed.",
];
