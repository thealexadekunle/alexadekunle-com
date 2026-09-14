import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { Section } from "@/components/ui/section";
import { SpeakingForm } from "@/components/ui/speaking-form";
import { SPEAKING_TOPICS } from "@/lib/content/editorial";
import { pageSchema, personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Speaking | Book Alex Adekunle, Technology and Entrepreneurship Speaker",
  description:
    "Alex Adekunle speaks on technology, entrepreneurship, AI and digital opportunity in Africa. Available for conferences, universities and podcasts.",
  alternates: { canonical: "/speaking" },
};

export default function SpeakingPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="speaking-heading">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><span className="label">Speaking — conferences, universities, podcasts</span></Reveal>
            <Reveal delay={80}><span className="label">In person or remote</span></Reveal>
          </div>

          <TextReveal
            as="h1"
            id="speaking-heading"
            className="display mt-10 max-w-[13ch]"
            lines={["Ideas worth", "<em>sharing.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              I talk about technology, entrepreneurship, leadership, digital opportunity and what
              building actually looks like on a Tuesday.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <AspectFrame
              src="/img/workshop-space.jpg"
              alt="A room set for a talk: light wood seating, tall windows, afternoon light"
              ratio="16/9"
              priority
              sizes="100vw"
            />
          </Reveal>
        </Container>
      </section>

      <Section className="!py-20 sm:!py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="label">Topics</h2>
            <ul className="mt-8">
              {SPEAKING_TOPICS.map((topic) => (
                <Reveal key={topic} as="li" className="cell text-xl font-light tracking-editorial">
                  {topic}
                </Reveal>
              ))}
              <li className="border-t border-paper-200" />
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="label">My approach</h2>
            <Reveal>
              <p className="lede mt-8">
                A good talk should not just sound good in the room. Sounding good in the room is the
                easy part, and it wears off by the car park.
              </p>
              <p className="prose-body mt-6">
                It should hand people something they can carry out. A better question. A clearer way
                of seeing the thing they are stuck on. A practical next step. Or the nerve to start,
                which is more often the blocker than anyone admits in the Q and A.
              </p>
              <p className="prose-body mt-5">
                Conferences, universities, corporate events, workshops and podcasts. In person or
                remote.
              </p>
            </Reveal>

            <SpeakingForm />
          </div>
        </div>

        {/* Recordings ship with a full transcript: a video page without one is
            close to invisible to search. */}
        <div className="mt-24 border-t border-paper-200 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="label">Recorded talks</h2>
            <span className="label label-accent">Transcripts included</span>
          </div>
          <p className="prose-body mt-6 max-w-2xl">
            Recordings go here as they happen, each with a full transcript. Transcripts are indexable
            and dense with topic vocabulary, and a video page without one is close to invisible to
            search.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {["Slot 01", "Slot 02", "Slot 03"].map((slot) => (
              <div key={slot} className="border border-dashed border-line-strong bg-paper-50 p-6">
                <p className="label">{slot}</p>
                <p className="mt-3 text-sm text-zinc-500">Talk title, venue, year, transcript.</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <JsonLd
        graph={[
          pageSchema("WebPage", "/speaking", "Speaking", {
            mainEntity: { "@id": personSchema["@id"] },
            about: SPEAKING_TOPICS,
          }),
        ]}
      />
    </>
  );
}
