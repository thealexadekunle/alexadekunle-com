import { Reveal } from "@/components/motion/reveal";
import type { TopicRow } from "@/lib/content/editorial";

/** Numbered editorial rows — the shared spine of the writing pages. */
export function TopicRows({ rows }: { readonly rows: readonly TopicRow[] }) {
  return (
    <>
      {rows.map((row) => (
        <Reveal key={row.index} as="article" className="drow">
          <span className="tile-index">{row.index}</span>
          <h2 className="text-3xl font-medium tracking-editorial">{row.title}</h2>
          <p className="prose-body">{row.body}</p>
          <span className={`label ${row.accent ? "label-accent" : ""}`}>{row.meta}</span>
        </Reveal>
      ))}
      <div className="border-t border-paper-200" />
    </>
  );
}
