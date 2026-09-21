/** Writing, v5: one stream replacing Ideas and Journal. The essays/notes
 *  split is real, but it belongs in a filter, not in two URLs chasing the
 *  same searches. */

export const TOPICS: readonly { readonly name: string; readonly body: string }[] = [
  {
    name: "Technology",
    body: "From a builder rather than a spectator, which mostly means I am less impressed than the timeline.",
  },
  {
    name: "Business",
    body: "The unglamorous decisions that turn work into value.",
  },
  {
    name: "Leadership",
    body: "The quiet responsible version rather than the loud photographed one.",
  },
  {
    name: "Africa",
    body: "Where the talent has never been the constraint and access always has been.",
  },
];

export const KINDS: readonly { readonly name: string; readonly body: string; readonly meta: string }[] = [
  {
    name: "Essays",
    body: "One idea, argued properly, written to still be true in two years.",
    meta: "Evergreen",
  },
  {
    name: "Notes",
    body: "Dated, specific, from inside whatever I am building right now. Lessons, experiments, what things cost, and the occasional thing I would do differently.",
    meta: "Dated",
  },
  {
    name: "Adekunle Principles",
    body: "A running series of short principles from years of building, failing and starting again. One idea each, no padding.",
    meta: "Series",
  },
];

export const WHY: readonly string[] = [
  "Memory is selective and building moves fast. Ask me in two years how something went and you will get the tidy version, which is usually the wrong one.",
  "Writing it down now keeps the real lesson.",
];
