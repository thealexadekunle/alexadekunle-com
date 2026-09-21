import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SpeakingForm } from "@/components/ui/speaking-form";
import { TextReveal } from "@/components/ui/text-reveal";
import { APPEARANCES, APPROACH, TOPICS } from "@/lib/content/speaking";
import { pageSchema } from "@/lib/schema";
import { BIO, PERSON_ID, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speaking | Book Alex Adekunle, Technology and Entrepreneurship Speaker",
  description:
    "Alex Adekunle speaks on technology, entrepreneurship, AI and opportunity in Africa. For conferences, universities and podcasts. Press kit inside.",
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
            className="display mt-10 max-w-[14ch]"
            lines={["Ideas worth taking", "out of the <em>room.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              I speak about technology, entrepreneurship, leadership and opportunity in Africa, and
              about what building actually looks like on an ordinary Tuesday.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <AspectFrame
              src="/img/workshop-space.jpg"
              alt="Alex Adekunle, founder of Vavinix, a room set for a talk: light wood seating, tall windows"
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
              {TOPICS.map((topic) => (
                <Reveal key={topic} as="li" className="cell text-xl font-light tracking-editorial">
                  {topic}
                </Reveal>
              ))}
              <li className="border-t border-paper-200" />
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="label">How I approach a talk</h2>
            <Reveal>
              {APPROACH.map((paragraph, index) => (
                <p key={paragraph.slice(0, 24)} className={index === 0 ? "lede mt-8" : "prose-body mt-6"}>
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <SpeakingForm />
          </div>
        </div>

        {/* Appearances: rendered only when there is a real entry. Every one is
            an independent site describing him, which is what settles the name. */}
        {APPEARANCES.length > 0 ? (
          <div className="mt-24 border-t border-paper-200 pt-10">
            <h2 className="label">Appearances</h2>
            <ul className="mt-8">
              {APPEARANCES.map((item) => (
                <li key={item.href} className="drow">
                  <span className="tile-index">{item.date}</span>
                  <span className="text-2xl font-medium tracking-editorial">{item.title}</span>
                  <span className="prose-body text-[15px]">{item.outlet}</span>
                  <a className="label label-accent" href={item.href} rel="noopener">
                    {item.kind} ↗
                  </a>
                </li>
              ))}
              <li className="border-t border-paper-200" />
            </ul>
          </div>
        ) : null}
      </Section>

      {/* The press kit: the highest-leverage part of this page. Producers who
          can copy a ready bio describe him in his own words, everywhere. */}
      <Section id="press-kit" tone="raised" bordered labelledBy="press-kit-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">Press kit</p>
            <TextReveal
              id="press-kit-heading"
              className="display-sm mt-6 max-w-[12ch]"
              lines={["Take what you need,", "no need to email first."]}
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="prose-body">
                Short bio, long bio, high resolution photographs and current company details.
              </p>
            </Reveal>

            <Reveal className="mt-10 border border-line-strong bg-paper p-6 sm:p-8">
              <p className="label">Short bio</p>
              <p className="prose-body mt-4 text-[15px] !text-ink">{BIO.short}</p>
            </Reveal>

            <Reveal className="mt-6 border border-line-strong bg-paper p-6 sm:p-8">
              <p className="label">Long bio</p>
              <p className="prose-body mt-4 text-[15px] !text-ink">{BIO.long}</p>
            </Reveal>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="tag">Portraits — high resolution</span>
              <span className="tag">Logo assets</span>
              <span className="tag">Company details</span>
            </div>

            <h3 className="label mt-14">Press enquiry</h3>
            <div className="mt-6 flex flex-wrap gap-4">
              <ButtonLink href={`mailto:${SITE.pressEmail}`} magnetic>{SITE.pressEmail}</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">Contact form</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <JsonLd
        graph={[
          pageSchema("WebPage", "/speaking", "Speaking", {
            mainEntity: { "@id": PERSON_ID },
            about: TOPICS,
          }),
        ]}
      />
    </>
  );
}
