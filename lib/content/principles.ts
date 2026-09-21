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
    body: "Do what needs doing, especially on the days you do not want to. Motivation is weather. Discipline is climate.",
  },
  {
    id: "focus",
    numeral: "ii",
    name: "Focus",
    body: "Most failure is not doing the wrong thing. It is doing nine things, all of them reasonably well.",
  },
  {
    id: "consistency",
    numeral: "iii",
    name: "Consistency",
    body: "Small actions repeated long enough become big results. There is nothing exciting about that, which is exactly why it keeps working for the few who do it.",
  },
  {
    id: "faith",
    numeral: "iv",
    name: "Faith",
    body: "Believe in what you are building before anyone else can see it. Everything real spends a while existing only in one person’s head, and that stretch is lonelier than anyone tells you.",
  },
  {
    id: "patience",
    numeral: "v",
    name: "Patience",
    body: "The internet makes it easy to mistake being seen for making progress. They are different things, and only one of them compounds.",
  },
  {
    id: "hustle",
    numeral: "vi",
    name: "Hustle",
    body: "Move. Learn. Adapt. Direction beats speed, but neither does much standing still.",
  },
  {
    id: "freedom",
    numeral: "vii",
    name: "Freedom",
    body: "A life where your time, your choices and your work belong to you. That is what the other six are for.",
  },
];
