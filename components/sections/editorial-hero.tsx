import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

type EditorialHeroProps = {
  readonly eyebrow: string;
  readonly lines: readonly string[];
  readonly lede: string;
  readonly id: string;
  readonly note?: string;
  readonly children?: React.ReactNode;
};

/** Shared opening for the writing and archive pages. */
export function EditorialHero({ eyebrow, lines, lede, id, note, children }: EditorialHeroProps) {
  return (
    <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby={id}>
      <Container>
        <Reveal><span className="label">{eyebrow}</span></Reveal>
        <TextReveal as="h1" id={id} className="display mt-10 max-w-[14ch]" lines={lines} />
        <Reveal>
          <p className="lede mt-10 max-w-2xl">{lede}</p>
          {note ? <p className="prose-body mt-6 max-w-2xl">{note}</p> : null}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
