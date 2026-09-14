import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { Section } from "@/components/ui/section";

const STEPS = [
  { step: "Step 01", name: "Idea", body: "Said out loud, still shapeless." },
  { step: "Step 02", name: "Strategy", body: "The idea, given edges." },
  { step: "Step 03", name: "Product", body: "Built, shipped, used." },
  { step: "Step 04", name: "Business", body: "Value without you standing over it." },
] as const;

export function Philosophy() {
  return (
    <Section tone="raised" bordered labelledBy="philosophy-heading">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label">02 — The way I think</p>
          <TextReveal
            id="philosophy-heading"
            className="display-sm mt-6 max-w-[11ch]"
            lines={["Technology was never", "the destination."]}
          />
          <Reveal as="figure" className="mt-12 hidden lg:block">
            <AspectFrame
              src="/img/sky-edge.jpg"
              alt="Looking up the clean edge of a white concrete building into open sky"
              ratio="1/1"
              parallax={0.05}
              sizes="30vw"
            />
            <figcaption className="mt-4 text-[11px] text-zinc-500">
              Fig. 02 — Structure before decoration
            </figcaption>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="lede">
              I started with technology, but technology was never the destination. It was the tool.
            </p>
            <p className="prose-body mt-6">
              I have worked across web development, software, digital strategy, SEO, Web3, automation
              and digital products. The deeper I went, the more obvious it became that the interesting
              problems are not technical at all. They are human, and humans are considerably harder to
              debug.
            </p>
          </Reveal>

          <Reveal>
            <blockquote className="mt-12 border-l border-accent pl-7">
              <p className="text-[clamp(1.35rem,2.6vw,2.1rem)] font-light leading-[1.25] tracking-editorial text-ink">
                It goes wrong in the meeting where everyone agrees too quickly. Fast agreement usually
                means nobody has said what they actually want yet. The uncomfortable second
                conversation is the one that saves the project.
              </p>
              <footer className="label mt-6">What fifteen years teaches you</footer>
            </blockquote>
          </Reveal>

          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item, index) => (
              <Reveal key={item.name} as="li" delay={index * 70} className="cell">
                <span className="label label-accent">{item.step}</span>
                <p className="mt-3 text-lg font-medium tracking-editorial">{item.name}</p>
                <p className="mt-2 text-sm text-zinc-500">{item.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <p className="prose-body mt-12 max-w-2xl">
              Consistency beats intensity. Execution creates evidence. Technology should create
              leverage, not complexity. And your reputation is not what you say about yourself, it is
              the thing people expect from you before you arrive.
            </p>
            <Link className="link-arrow mt-8" href="/the-eagle">
              Enter The Eagle <i aria-hidden="true">→</i>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
