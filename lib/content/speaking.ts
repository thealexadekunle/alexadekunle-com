/** Speaking, v5: now does two jobs, booking and press, because they serve the
 *  same visitor — someone deciding whether to put him in front of an audience. */

export const TOPICS: readonly string[] = [
  "Building with technology, and knowing when not to",
  "Entrepreneurship and execution",
  "AI, automation and the future of work",
  "Digital skills and youth opportunity in Africa",
  "Building businesses in Nigeria",
  "Turning ideas into products",
];

export const APPROACH: readonly string[] = [
  "Sounding good in the room is the easy part, and it wears off by the car park.",
  "A talk should hand people something they can carry out: a sharper question, a clearer way of seeing what they are stuck on, a practical next step, or the nerve to start. That last one is the real blocker more often than anyone admits in the Q and A.",
  "Conferences, universities, company events, workshops and podcasts. In person or remote.",
];

/**
 * Appearances stay hidden until there is at least one real entry. An empty
 * list advertises that nothing has happened yet; absence says nothing.
 */
export type Appearance = {
  readonly title: string;
  readonly outlet: string;
  readonly href: string;
  readonly date: string;
  readonly kind: "Talk" | "Podcast" | "Interview";
};

export const APPEARANCES: readonly Appearance[] = [];
