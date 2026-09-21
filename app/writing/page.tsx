import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Section } from "@/components/ui/section";
import { TextReveal } from "@/components/ui/text-reveal";
import { KINDS, TOPICS, WHY } from "@/lib/content/writing";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Writing | Alex Adekunle on Technology, Business and Building",
  description:
    "Essays, principles and founder notes from Alex Adekunle on technology, business, leadership and building opportunity across Africa.",
  alternates: { canonical: "/writing" },
  // noindex, follow until three pieces exist — and absent from the sitemap
  // until then. Link equity still passes through to the pieces underneath.
  robots: { index: false, follow: true },
};

export default function WritingPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="writing-heading">
        <Container>
          <Reveal><span className="label">Writing — essays, notes and principles</span></Reveal>

          <TextReveal
            as="h1"
            id="writing-heading"
            className="display mt-10 max-w-[13ch]"
            lines={["Thinking out loud,", "<em>on purpose.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              Essays when an idea deserves an argument. Notes when it just deserves writing down.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="!py-20 sm:!py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="label">What I write about</h2>
            <ul className="mt-8">
              {TOPICS.map((topic) => (
                <Reveal key={topic.name} as="li" className="cell">
                  <p className="text-xl font-medium tracking-editorial sm:text-2xl">{topic.name}</p>
                  <p className="prose-body mt-2 text-[15px]">{topic.body}</p>
                </Reveal>
              ))}
              <li className="border-t border-paper-200" />
            </ul>

            <Reveal as="figure" className="mt-14">
              <AspectFrame
                src="/img/eagle-observe.svg"
                alt="The Eagle, illustrated: a bald eagle in a waistcoat and glasses sitting back in a leather armchair with an open notebook, pen held to its beak, considering something"
                ratio="2/3"
                muted={false}
                parallax={0.04}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="label">Two kinds of piece</h2>
            <ul className="mt-8">
              {KINDS.map((kind, index) => (
                <Reveal key={kind.name} as="li" className="drow">
                  <span className="tile-index">0{index + 1}</span>
                  <span className="text-2xl font-medium tracking-editorial">{kind.name}</span>
                  <span className="prose-body text-[15px]">{kind.body}</span>
                  <span className={`label ${index === 2 ? "label-accent" : ""}`}>{kind.meta}</span>
                </Reveal>
              ))}
              <li className="border-t border-paper-200" />
            </ul>

            <h2 className="label mt-16">Why I bother</h2>
            <Reveal>
              {WHY.map((paragraph, index) => (
                <p key={paragraph.slice(0, 24)} className={index === 0 ? "lede mt-8" : "prose-body mt-6"}>
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {/* Nothing published yet: say so rather than staging an empty list. */}
            <div className="mt-14 border border-dashed border-line-strong bg-paper-50 p-6 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="label">The first pieces</h2>
                <span className="label label-accent">In progress</span>
              </div>
              <p className="prose-body mt-4 text-[15px]">
                Pieces appear here as they are written, each dated and tagged as an essay or a note.
                One a fortnight, sustained, is the target.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Section>

      <JsonLd graph={[pageSchema("Blog", "/writing", "Writing")]} />
    </>
  );
}
