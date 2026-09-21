/** Home copy, v5. Roughly half the length of the previous build: a homepage
 *  is a set of doors, not the house. */

export const HERO = {
  lines: ["I build ideas", "into things that", "<em>exist.</em>"],
  disciplines: ["Technology", "Business", "Ventures", "Ideas"],
  intro:
    "I am Alex Adekunle, a Nigerian technology entrepreneur. I write code, I shape strategy, and I start companies. Most people you could hire do one of those. I have been doing all three since 2011, and the overlap is where the useful work happens.",
  building: "I founded Vavinix. I am building Aspire Trybe, OneArtPiece and The Receipt.",
} as const;

export const WHAT_PEOPLE_BRING = {
  heading: ["What people", "bring me."],
  body: [
    "Usually one of three things. An idea that will not leave them alone. A business that has outgrown the way it shows up. Or a website that looks perfectly fine and does absolutely nothing.",
    "They look like three different problems. They are the same problem in different clothes: something real is not reaching the people it should. Fixing that is sometimes a website, sometimes a strategy, sometimes a whole new business. Knowing which is most of the job.",
  ],
  items: [
    { index: "01", title: "An idea", body: "That will not leave them alone." },
    { index: "02", title: "A business", body: "That has outgrown the way it shows up." },
    { index: "03", title: "A website", body: "That looks perfectly fine and does absolutely nothing." },
  ],
} as const;

export const FIFTEEN_YEARS = {
  heading: ["The part fifteen", "years teaches you."],
  body: [
    "Projects rarely fail in the build. They fail in the meeting where everyone agrees too quickly. Fast agreement usually means nobody has said what they actually want yet, and the awkward second conversation, the one where someone finally does, is the one that saves the project.",
    "I have learned to ask for that conversation early. It is not the most comfortable part of working with me. It is the most valuable.",
  ],
} as const;

export const CLIENT_WORK = {
  heading: ["The client work."],
  body: "My commercial work runs through Vavinix, and the portfolio lives there. If you would rather see the work than read about it, that is the right instinct, and that is where to go.",
  cta: "See the portfolio at vavinix.com",
} as const;

export const CLOSING = {
  lines: ["Let us build", "something that", "<em>matters.</em>"],
  body:
    "Bring the idea, the business, or the website that is not pulling its weight. I will push back on the brief before I agree to it, which is the point.",
} as const;
