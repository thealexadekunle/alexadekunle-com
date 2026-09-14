export type Principle = {
  readonly id: string;
  readonly numeral: string;
  readonly name: string;
  readonly body: string;
};

/** The Eagle — seven principles, each with a stable anchor for direct linking. */
export const PRINCIPLES: readonly Principle[] = [
  {
    id: "discipline",
    numeral: "i",
    name: "Discipline",
    body: "Do what needs doing, especially on the days you do not feel like it. Motivation is weather. Discipline is climate. One of them you can plan around.",
  },
  {
    id: "focus",
    numeral: "ii",
    name: "Focus",
    body: "Know what deserves your attention and what does not. Most failure is not caused by doing the wrong thing. It is caused by doing nine things, all of them reasonably well.",
  },
  {
    id: "consistency",
    numeral: "iii",
    name: "Consistency",
    body: "Small actions repeated long enough become extraordinary results. There is nothing exciting about that sentence, which is precisely why most people will not do it and why it keeps working for the ones who do.",
  },
  {
    id: "faith",
    numeral: "iv",
    name: "Faith",
    body: "Believe in what you are building before anyone else can see it. Every real thing spends a stretch of time existing only inside the head of the person building it, and that stretch is lonelier than anyone tells you.",
  },
  {
    id: "patience",
    numeral: "v",
    name: "Patience",
    body: "Meaningful things take time. The internet has made it very easy to mistake visibility for progress, and speed for value, and a busy week for a good one.",
  },
  {
    id: "hustle",
    numeral: "vi",
    name: "Hustle",
    body: "Move. Learn. Adapt. Keep going. Direction beats speed, but neither does much standing still.",
  },
  {
    id: "freedom",
    numeral: "vii",
    name: "Freedom",
    body: "Build a life where your time, your choices and your work belong to you. That is the point of the other six.",
  },
];
