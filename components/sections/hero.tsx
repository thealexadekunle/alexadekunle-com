import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/ui/text-reveal";
import { HERO } from "@/lib/content/home";

/** Three claims, one portrait, two doors. Nothing else above the fold. */
export function Hero() {
  return (
    <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="hero-heading">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Reveal>
            <span className="pill">
              <span className="pill-pip" aria-hidden="true" />
              Building since 2011 · Founder of Vavinix
            </span>
          </Reveal>
          <Reveal delay={80}>
            <span className="label">Nigeria — working worldwide</span>
          </Reveal>
        </div>

        <TextReveal
          as="h1"
          id="hero-heading"
          className="display mt-10 max-w-[14ch]"
          lines={[...HERO.lines]}
        />

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-paper-200 py-5">
          {HERO.disciplines.map((item, index) => (
            <span key={item} className="flex items-center gap-8">
              <span className="label label-ink">{item}</span>
              {index < HERO.disciplines.length - 1 ? (
                <span className="text-accent" aria-hidden="true">/</span>
              ) : null}
            </span>
          ))}
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="lede max-w-xl">{HERO.intro}</p>
            <p className="prose-body mt-7 max-w-xl">{HERO.building}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" size="lg" magnetic>Start a conversation</ButtonLink>
              <ButtonLink href="/ventures" variant="ghost" size="lg">Explore the ventures</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} as="figure" className="lg:col-span-7">
            <AspectFrame
              src="/img/alex-adekunle-agbada.jpg"
              alt="Alex Adekunle, founder of Vavinix, in black and gold agbada"
              ratio="4/5"
              muted={false}
              priority
              parallax={false}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="sm:aspect-[3/4] lg:aspect-[4/5]"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-[11px] text-zinc-500">
              <span>Alex Akinyele Adekunle — Lagos</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
                Fig. 01
              </span>
            </figcaption>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
