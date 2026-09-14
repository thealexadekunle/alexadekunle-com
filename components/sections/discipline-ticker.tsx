import { Marquee } from "@/components/ui/marquee";

const DISCIPLINES = [
  "Web development",
  "Digital branding",
  "Software",
  "SEO & AI search",
  "Automation",
  "Web3",
  "Digital products",
  "Business strategy",
] as const;

/** Proof strip. Velocity-reactive, and announced once for assistive tech. */
export function DisciplineTicker() {
  return (
    <section className="border-y border-paper-200 bg-paper-50 py-5" aria-label="Disciplines">
      <Marquee items={[...DISCIPLINES]} />
      <p className="sr-only">{DISCIPLINES.join(", ")}.</p>
    </section>
  );
}
