import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  BELIEFS,
  BEYOND_THE_WORK,
  HOW_I_WORK,
  PHOTO_STRIP,
  STILL_BECOMING,
  STORY,
  WHAT_I_LEARNED,
} from "@/lib/content/about";
import { pageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Alex Adekunle | Nigerian Technology Entrepreneur and Founder",
  description:
    "Alex Akinyele Adekunle, technology entrepreneur and founder of Vavinix. Building on the web since 2011. BSc Mathematics, FUNAAB, Nigeria.",
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", url: "/about" },
};

/** Roman numerals for the belief list, so the markers stay typographic. */
const NUMERALS = ["i", "ii", "iii", "iv", "v", "vi"] as const;

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="about-heading">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><span className="label">About — Alex Akinyele Adekunle</span></Reveal>
            <Reveal delay={80}><span className="label">Nigeria · Building since 2011</span></Reveal>
          </div>

          <TextReveal
            as="h1"
            id="about-heading"
            className="display mt-10 max-w-[13ch]"
            lines={["The person", "behind the <em>work.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              Job titles are useful for forms. This is the rest of it.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The identity block: eight checkable facts, told as a story rather
          than listed as a CV. */}
      <Section className="!py-20 sm:!py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal as="figure" className="lg:sticky lg:top-28">
              <AspectFrame
                src="/img/alex-adekunle-portrait.jpg"
                alt="Alex Akinyele Adekunle, technology entrepreneur and founder of Vavinix"
                ratio="4/5"
                muted={false}
                priority
                parallax={false}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-[11px] text-zinc-500">
                <span>Alex Akinyele Adekunle</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
                  Fig. 01
                </span>
              </figcaption>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="label">The story</h2>
            <Reveal>
              {STORY.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={index === 0 ? "lede mt-8" : "prose-body mt-6"}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <dl className="mt-14 grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              {[
                { term: "Building since", value: "2011" },
                { term: "Vavinix founded", value: "2021" },
                { term: "BSc Mathematics", value: "2024" },
                { term: "University", value: "FUNAAB" },
              ].map((fact) => (
                <div key={fact.term} className="cell">
                  <dd className="stat-value">{fact.value}</dd>
                  <dt className="label mt-[10px]">{fact.term}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="raised" bordered labelledBy="work-heading">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 id="work-heading" className="label">How I work</h2>
            <Reveal>
              {HOW_I_WORK.map((paragraph, index) => (
                <p key={paragraph.slice(0, 24)} className={index === 0 ? "lede mt-8" : "prose-body mt-6"}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="label">What I have learned</h2>
            <Reveal>
              {WHAT_I_LEARNED.map((paragraph, index) => (
                <p key={paragraph.slice(0, 24)} className={index === 0 ? "lede mt-8" : "prose-body mt-6"}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">What I believe</p>
            <TextReveal className="display-sm mt-6 max-w-[10ch]" lines={["Six lines I", "keep testing."]} />
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {BELIEFS.map((belief, index) => (
              <Reveal key={belief} as="li" className="cell flex items-baseline gap-6">
                <span className="label label-accent">{NUMERALS[index]}</span>
                <span className="text-xl font-light tracking-editorial sm:text-2xl">{belief}</span>
              </Reveal>
            ))}
            <li className="border-t border-paper-200" />
          </ul>
        </div>
      </Section>

      {/* Lifestyle and Gallery folded in here: the halves fit together where a
          visitor is already deciding whether they like you. */}
      <Section id="beyond" labelledBy="beyond-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">Beyond the work</p>
            <TextReveal
              id="beyond-heading"
              className="display-sm mt-6 max-w-[12ch]"
              lines={["Technology is a large", "part of my life.", "<em>Not all of it.</em>"]}
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              {BEYOND_THE_WORK.slice(1).map((paragraph, index) => (
                <p key={paragraph.slice(0, 24)} className={index === 0 ? "lede" : "prose-body mt-6"}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12">
          {PHOTO_STRIP.map((photo, index) => (
            <Reveal key={photo.src} as="figure" delay={(index % 3) * 80} className={photo.span}>
              <AspectFrame
                src={photo.src}
                alt={photo.alt}
                ratio={photo.ratio}
                muted={!photo.real}
                sizes="(max-width: 640px) 50vw, 30vw"
              />
              <figcaption className="mt-3 text-[11px] text-zinc-500">{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised" bordered labelledBy="becoming-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><p className="label">Still becoming</p></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <TextReveal
              id="becoming-heading"
              className="display-sm max-w-[16ch]"
              lines={["The person on this page", "is not finished."]}
            />
            <Reveal>
              {STILL_BECOMING.map((paragraph, index) => (
                <p key={paragraph.slice(0, 24)} className={index === 0 ? "prose-body mt-8" : "prose-body mt-5"}>
                  {paragraph}
                </p>
              ))}
              <div className="mt-12 flex flex-wrap gap-4">
                <ButtonLink href="/ventures" variant="ghost">See what I am building</ButtonLink>
                <ButtonLink href="/contact" magnetic>Start a conversation</ButtonLink>
              </div>
              <p className="prose-body mt-10 text-[15px]">
                Or read the <Link className="text-ink underline underline-offset-4 hover:text-accent" href="/writing">writing</Link>,
                the <Link className="text-ink underline underline-offset-4 hover:text-accent" href="/the-eagle">seven principles</Link>,
                or the <Link className="text-ink underline underline-offset-4 hover:text-accent" href="/speaking">speaking page</Link>.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd
        graph={[
          pageSchema("ProfilePage", "/about", "About Alex Adekunle", {
            // Each photograph declared so the strip can carry the image signal
            // the Gallery page used to.
            image: PHOTO_STRIP.map((photo) => ({
              "@type": "ImageObject",
              contentUrl: `${SITE.url}${photo.src}`,
              caption: photo.caption,
            })),
          }),
        ]}
      />
    </>
  );
}
