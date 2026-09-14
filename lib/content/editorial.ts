/** Topic rows shared by the editorial pages (Ideas, Media, Resources). */
export type TopicRow = {
  readonly index: string;
  readonly title: string;
  readonly body: string;
  readonly meta: string;
  readonly accent?: boolean;
};

export const IDEAS_TOPICS: readonly TopicRow[] = [
  {
    index: "01",
    title: "Technology",
    body: "I write about technology as a builder rather than a spectator, which mostly means I am less impressed than the timeline. AI and where it genuinely helps against where it is being sold hard. Software, automation, Web3, digital products, and the shifting relationship between people and the tools they have quietly become dependent on.",
    meta: "Topic",
  },
  {
    index: "02",
    title: "Business",
    body: "A good product can still fail if the business around it is weak, and it usually does so slowly enough that everyone blames the wrong thing. Positioning, customer experience, systems, leverage, pricing, growth, and the unglamorous decisions that turn work into value.",
    meta: "Topic",
  },
  {
    index: "03",
    title: "Leadership",
    body: "Leadership is less about having the loudest voice and more about taking responsibility for the direction. Most of what gets sold as leadership is performance. The real version is quieter, harder to photograph, and considerably less fun.",
    meta: "Topic",
  },
  {
    index: "04",
    title: "Entrepreneurship",
    body: "Building a business is a long argument between an idea and reality. The market gets a vote. Customers get a vote. Execution gets the final say, and execution does not care how good the idea was at three in the morning.",
    meta: "Topic",
  },
  {
    index: "05",
    title: "Africa and opportunity",
    body: "There is enormous talent across Africa. The talent has never been the constraint, and repeating that it exists is not the same as doing anything about it. The constraint is access: to training, to networks, to capital, to the first opportunity that makes the second one possible. I write about building systems that widen that access rather than admiring the problem from a conference stage.",
    meta: "Topic",
  },
  {
    index: "06",
    title: "Adekunle Principles",
    body: "Short principles from years of building, failing, learning and starting again. One idea each, no padding, no motivational font.",
    meta: "Series",
    accent: true,
  },
];

export const MEDIA_ROWS: readonly TopicRow[] = [
  { index: "01", title: "Interviews", body: "Conversations about technology, business, entrepreneurship and building.", meta: "Long form" },
  { index: "02", title: "Podcasts", body: "The long-form ones, where there is time to get past the headline version of an answer.", meta: "Audio" },
  { index: "03", title: "Video", body: "Lessons, stories, behind the scenes, and the occasional thing that was meant to be a note to myself.", meta: "Video" },
  { index: "04", title: "Press and publications", body: "Selected articles, features, mentions and published work.", meta: "Print & web" },
];

export const RESOURCE_ROWS: readonly TopicRow[] = [
  {
    index: "01",
    title: "Digital and AI",
    body: "What I actually use for building, automating and researching, with a note on what each one is genuinely good at and the point where it stops being worth the subscription.",
    meta: "Stack",
  },
  {
    index: "02",
    title: "Business",
    body: "Frameworks and references for positioning, systems, growth and execution. The ones that survived contact with a real business, not the ones that photograph well on a slide.",
    meta: "Frameworks",
  },
  {
    index: "03",
    title: "Development",
    body: "What I build with, and what I would tell someone starting today, which is not always the same list.",
    meta: "Build",
  },
  {
    index: "04",
    title: "Learning",
    body: "Books, courses, ideas and people that changed how I think. Some of them are old and none of them are here because they were trending.",
    meta: "Reading",
  },
];

export const JOURNAL_ITEMS: readonly string[] = [
  "Founder notes",
  "Lessons from live projects, including the ones still on fire",
  "Building in public",
  "Business experiments and what they cost",
  "Technology observations",
  "Personal reflections",
  "Wins, mistakes, and things I would do differently",
  "Notes from the road",
];

export const SPEAKING_TOPICS: readonly string[] = [
  "Building with technology, and knowing when not to",
  "Entrepreneurship and execution",
  "AI, automation and the future of work",
  "Digital skills and youth opportunity in Africa",
  "Leadership and personal responsibility",
  "Building businesses in Nigeria and across Africa",
  "Personal brand and digital presence",
  "Turning ideas into products",
];

export type GalleryFrame = {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly category: "portraits" | "work" | "events" | "travel" | "objects";
  readonly width: number;
  readonly height: number;
  readonly aspect: string;
  readonly span: string;
};

export const GALLERY: readonly GalleryFrame[] = [
  { src: "/img/workspace-first-light.jpg", alt: "A plain oak desk in first light: closed laptop, a stack of paper, one pencil", caption: "The desk, mid-build", category: "work", width: 1344, height: 752, aspect: "aspect-[16/10]", span: "col-span-2 lg:col-span-7" },
  { src: "/img/alex-adekunle-portrait.jpg", alt: "Alex Adekunle, founder of Vavinix, studio portrait, Lagos, 2026", caption: "Portrait — Lagos, 2026", category: "portraits", width: 901, height: 1200, aspect: "aspect-[4/5]", span: "lg:col-span-5 lg:pt-14" },
  { src: "/img/workshop-space.jpg", alt: "A room set for a talk: light wood seating, tall windows, afternoon light", caption: "The room before a talk begins", category: "events", width: 1344, height: 752, aspect: "aspect-square", span: "lg:col-span-4" },
  { src: "/img/meeting-still-life.jpg", alt: "A meeting table still life: a document face down, a fountain pen, folded glasses, black coffee", caption: "A table mid-decision", category: "objects", width: 896, height: 1120, aspect: "aspect-square", span: "lg:col-span-4" },
  { src: "/img/alex-adekunle-agbada.jpg", alt: "Alex Adekunle, founder of Vavinix, in black and gold agbada, Lagos, 2026", caption: "Agbada — Lagos, 2026", category: "portraits", width: 895, height: 1200, aspect: "aspect-square", span: "lg:col-span-4" },
  { src: "/img/alex-adekunle-studio.jpg", alt: "Alex Adekunle, founder of Vavinix, studio session, Lagos, 2026", caption: "Studio — Lagos, 2026", category: "portraits", width: 853, height: 1200, aspect: "aspect-[4/5]", span: "lg:col-span-5" },
  { src: "/img/sky-edge.jpg", alt: "Looking up the clean edge of a white concrete building into open sky", caption: "Structure — everywhere, once you look", category: "travel", width: 896, height: 1120, aspect: "aspect-[16/10]", span: "col-span-2 lg:col-span-7 lg:pt-14" },
  { src: "/img/room-for-focus.jpg", alt: "A light-filled room built for focus: linen chair, low oak shelf, sheer curtains", caption: "Seats set for the next cohort", category: "objects", width: 1344, height: 752, aspect: "aspect-[16/9]", span: "col-span-2 lg:col-span-12" },
];
