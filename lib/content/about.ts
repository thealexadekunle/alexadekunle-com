/** About copy, v5. This page now carries three jobs that used to be spread
 *  across three: the identity facts, the person, and the photographs. */

export const STORY: readonly string[] = [
  "My full name is Alex Akinyele Adekunle. I am a Nigerian technology entrepreneur and I have been building on the internet since 2011.",
  "I did not come to it through a plan. I came to it because a blank screen felt like the most permissive thing in the room, somewhere I could make something from nothing and see immediately whether it worked. That feeling has not worn off.",
  "The building turned into a career, the career turned into clients, and in 2021 the clients turned into a company: Vavinix.",
  // NOTE: the 2024 date is flagged in the strategy document for confirmation
  // before launch. It reverses the previous implication that the degree came
  // first, and it is exactly the kind of detail a reader checks.
  "In 2024, with Vavinix already running, I finished a degree in Mathematics at the Federal University of Agriculture, Abeokuta. My final year project was on algebraic coding theory, which is the mathematics of getting a message across a channel that is actively trying to scramble it. Running a company and writing that project in the same year taught me the same lesson twice.",
];

export const HOW_I_WORK: readonly string[] = [
  "I think from both sides of the screen. I care how a thing looks and what it has to earn. I care about clean code and the business model underneath it.",
  "Most technical people optimise one side, most business people optimise the other, and then they have a tense meeting about it. When one person holds both, that argument happens inside one head, and it finishes a lot sooner.",
];

export const WHAT_I_LEARNED: readonly string[] = [
  "You can learn a technology in a month. Learning how to think takes years, and nobody hands you a certificate for it.",
  "Most of the expensive mistakes I have seen were executed beautifully. The build was fine. Nobody had stopped to ask whether it should be built at all. Good work starts with working out what should be done, and only then doing it well.",
];

export const BELIEFS: readonly string[] = [
  "Build before you over-explain.",
  "Learn faster than the ground moves.",
  "Make technology useful, not merely impressive.",
  "Let the work speak, then it cannot be argued with.",
  "Give people systems and opportunities, not only motivation.",
  "Think long term. Execute today.",
];

export const BEYOND_THE_WORK: readonly string[] = [
  "Technology is a large part of my life. It is not all of it.",
  "I care about travel, style, good spaces, long conversations, faith, and the details that make a life feel lived rather than scheduled. The room you work in shapes how you think, which sounds like a line from a magazine until you have tried to solve something hard in a room you dislike.",
  "The ambition was never to work forever. It is to build something solid enough to give me freedom around the life I actually want.",
];

export const STILL_BECOMING: readonly string[] = [
  "The person on this page is not finished, and I would worry if he were. There are skills I am still learning, businesses I am still building and questions I have carried for years without an answer.",
  "Curious enough to change my mind, disciplined enough to finish, ambitious enough to keep starting.",
];

/**
 * The photo strip that replaced the Gallery page. Same naming rule, same alt
 * rule, fewer images: alex-adekunle-[context], and alt text that says what is
 * happening and where.
 */
export type Photo = {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly ratio: "16/10" | "4/5" | "2/3" | "1/1";
  readonly span: string;
  readonly real: boolean;
};

export const PHOTO_STRIP: readonly Photo[] = [
  {
    src: "/img/alex-adekunle-portrait.jpg",
    alt: "Alex Adekunle, founder of Vavinix, studio portrait, Lagos",
    caption: "Portrait — Lagos",
    ratio: "4/5",
    span: "col-span-2 sm:col-span-1 lg:col-span-4",
    real: true,
  },
  {
    src: "/img/alex-adekunle-agbada.jpg",
    alt: "Alex Adekunle, founder of Vavinix, in black and gold agbada, Lagos",
    caption: "Agbada — Lagos",
    ratio: "4/5",
    span: "col-span-2 sm:col-span-1 lg:col-span-4",
    real: true,
  },
  {
    src: "/img/alex-adekunle-studio.jpg",
    alt: "Alex Adekunle, founder of Vavinix, in a studio session, Lagos",
    caption: "Studio — Lagos",
    ratio: "4/5",
    span: "col-span-2 sm:col-span-1 lg:col-span-4",
    real: true,
  },
  {
    src: "/img/room-for-focus.jpg",
    alt: "The room Alex Adekunle works in: linen chair, low oak shelf, sheer curtains",
    caption: "The room you work in shapes how you think",
    ratio: "16/10",
    span: "col-span-2 lg:col-span-7",
    real: false,
  },
  {
    src: "/img/travel-stair.jpg",
    alt: "A sunlit whitewashed stair against a bright sky, from Alex Adekunle's travels",
    caption: "Travel — structure, everywhere",
    ratio: "1/1",
    span: "col-span-1 lg:col-span-5",
    real: false,
  },
];
