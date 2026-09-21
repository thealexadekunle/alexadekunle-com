import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { Section } from "@/components/ui/section";
import { PRINCIPLES } from "@/lib/content/principles";
import { pageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Eagle | The Seven Principles of Alex Adekunle",
  description:
    "Discipline, focus, consistency, faith, patience, hustle and freedom. The Eagle is the personal philosophy behind how Alex Adekunle builds.",
  alternates: { canonical: "/the-eagle" },
};

export default function EaglePage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="eagle-heading">
        <Container>
          <Reveal><span className="label">The Eagle — a working philosophy</span></Reveal>

          <TextReveal
            as="h1"
            id="eagle-heading"
            className="display mt-10 max-w-[12ch]"
            lines={["Rise above", "the <em>noise.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              Seven principles. Not a poster. A working philosophy I have to reread more often than I would like.
            </p>
          </Reveal>

          <nav className="mt-12 flex flex-wrap gap-2" aria-label="Principles">
            {PRINCIPLES.map((principle) => (
              <a key={principle.id} className="chip" href={`#${principle.id}`}>
                {principle.name}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Section className="!py-20 sm:!py-28">
        {PRINCIPLES.map((principle, index) => (
          <Reveal key={principle.id} as="article" className="drow scroll-mt-28">
            <span className="tile-index" id={principle.id}>{principle.numeral}</span>
            <h2 className="text-3xl font-medium tracking-editorial">{principle.name}</h2>
            <p className="prose-body">{principle.body}</p>
            <span className="label label-accent">0{index + 1}</span>
          </Reveal>
        ))}
        <div className="border-t border-paper-200" />
      </Section>

      <Section tone="raised" bordered labelledBy="why-eagle">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="label">Why the eagle</p>
            <TextReveal id="why-eagle" className="display-sm mt-6" lines={["Perspective."]} />
            <Reveal as="figure" className="mt-12">
              <AspectFrame
                src="/img/eagle-perspective.svg"
                alt="The Eagle, illustrated: a bald eagle in a suit reading a book titled A Bigger Tomorrow, holding a mug reading Think Better, Build Better, Lead Better, beside a globe, a stack of books on leadership, strategy, innovation, discipline, wealth and freedom, and a notepad reading Progress Over Excuses"
                ratio="2/3"
                muted={false}
                parallax={0.04}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="prose-body">
                Perspective. It sees further than the thing right in front of it and moves on purpose
                instead of in a panic.
              </p>
              <p className="prose-body mt-5">
                Most of my bad decisions were made at ground level, fast, with something urgent
                shouting in my ear. The eagle is the reminder to climb before choosing. I manage it
                more often than I used to.
              </p>
            </Reveal>

            <h3 className="label mt-14">Eagle Lessons</h3>
            <Reveal>
              <p className="lede mt-6">
                Short lessons on these principles, published under Writing.
              </p>
              <p className="prose-body mt-5">Not motivation for a day. A philosophy for the long game.</p>
            </Reveal>

            <TextReveal className="display-sm mt-16 max-w-[14ch]" lines={[SITE.tagline]} />

            <div className="mt-12 flex flex-wrap gap-4">
              <ButtonLink href="/writing" variant="ghost">Read the writing</ButtonLink>
              <ButtonLink href="/contact" magnetic>Start a conversation</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <JsonLd
        graph={[
          pageSchema("WebPage", "/the-eagle", "The Eagle", {
            about: {
              "@type": "ItemList",
              itemListElement: PRINCIPLES.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.name,
              })),
            },
          }),
        ]}
      />
    </>
  );
}
