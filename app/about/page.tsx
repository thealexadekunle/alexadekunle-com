import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { MaskedLines } from "@/components/motion/masked-lines";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { BELIEFS, LIFESTYLE_FRAMES, MILESTONES } from "@/lib/content/about";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Alex Adekunle | Nigerian Technology Entrepreneur and Founder",
  description:
    "Alex Akinyele Adekunle, technology entrepreneur, web developer and founder of Vavinix. Building on the web since 2011. BSc Mathematics, FUNAAB, Nigeria.",
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="about-heading">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><span className="label">About — Alex Akinyele Adekunle</span></Reveal>
            <Reveal delay={80}><span className="label">Nigeria · Since 2011</span></Reveal>
          </div>

          <MaskedLines
            as="h1"
            id="about-heading"
            className="display mt-10 max-w-[13ch]"
            lines={["The person", "behind the <em>work.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">I am not interested in being reduced to a job title.</p>
          </Reveal>
        </Container>
      </section>

      <Section labelledBy="story-heading" className="!py-20 sm:!py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal as="figure" className="lg:sticky lg:top-28">
              <MediaFrame
                src="/img/alex-adekunle-portrait.jpg"
                alt="Alex Akinyele Adekunle, technology entrepreneur and founder of Vavinix"
                width={901}
                height={1200}
                aspect="aspect-[4/5]"
                muted={false}
                priority
                parallax={false}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-[11px] text-zinc-500">
                <span>Alex Akinyele Adekunle</span>
                <span className="label">Fig. 01</span>
              </figcaption>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="story-heading" className="label">My story</h2>
            <Reveal>
              <p className="lede mt-8">
                My full name is Alex Akinyele Adekunle. Technology entrepreneur, web developer, based
                in Nigeria, building on the internet since 2011.
              </p>
              <p className="prose-body mt-6">
                Technology became part of my life because I liked the act of building. A blank screen
                never felt empty to me. It felt like the most permissive thing in the room.
              </p>
              <p className="prose-body mt-5">
                That curiosity turned into a career, though not in a straight line. I studied
                Mathematics at the Federal University of Agriculture, Abeokuta, and spent my final
                year on the application of algebraic coding theory, which is a formal way of saying I
                spent a year on the mathematics of making information survive a journey it should not
                survive. At the time it felt entirely disconnected from anything I would do for a
                living. It turned out to be decent preparation for a career spent making things hold
                together inside systems that are indifferent to your intentions.
              </p>
              <p className="prose-body mt-5">
                Websites became products. Projects became businesses. Technical skill became a way of
                seeing bigger problems. In 2021 I founded Vavinix.
              </p>
              <p className="prose-body mt-5">
                Fifteen years in, the instinct has not changed at all: I see something that could be
                better, I want to know why it is not, and then I want to build the version that is.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised" bordered labelledBy="milestones-heading">
        <header className="grid gap-8 lg:grid-cols-12">
          <p className="label lg:col-span-3">The line so far</p>
          <MaskedLines
            id="milestones-heading"
            className="display-sm max-w-[14ch] lg:col-span-9"
            lines={["Not a straight line.", "A consistent direction."]}
          />
        </header>

        <ol className="mt-16">
          {MILESTONES.map((item) => (
            <li key={item.marker} className="drow">
              <span className="tile-index">{item.marker}</span>
              <span className="text-2xl font-medium tracking-editorial">{item.title}</span>
              <span className="prose-body text-[15px]">{item.body}</span>
              <span className={`label ${item.accent ? "label-accent" : ""}`}>{item.kind}</span>
            </li>
          ))}
          <li className="border-t border-paper-200" />
        </ol>
      </Section>

      <Section labelledBy="work-heading">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 id="work-heading" className="label">How I work</h2>
            <Reveal>
              <p className="lede mt-8">I think from both sides of the screen.</p>
              <p className="prose-body mt-6">
                I care how something looks, and I care what it has to accomplish. I care about clean
                code, and I care about the business model sitting underneath it. I care about user
                experience, and I care about trust, positioning, conversion and what the thing is
                worth in three years.
              </p>
              <p className="prose-body mt-5">
                Most technical people optimise one side of that. Most business people optimise the
                other, and then the two of them have a tense meeting about it. The work gets
                interesting when the same person is holding both, because the argument happens inside
                one head and resolves faster.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="label">What I have learned</h2>
            <Reveal>
              <p className="lede mt-8">
                You can learn a technology in a month. Learning how to think takes considerably longer
                and nobody issues a certificate for it.
              </p>
              <p className="prose-body mt-6">
                Tools change. Frameworks change. Platforms change. Markets change, usually the week
                after you have finished adapting to the last change. What compounds is the ability to
                learn, adapt, communicate and finish.
              </p>
              <p className="prose-body mt-5">
                And the lesson that took longest: good work is not about getting something done. It is
                about working out what should be done in the first place. Most of the expensive
                mistakes I have watched were executed beautifully.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">What I believe</p>
            <MaskedLines className="display-sm mt-6 max-w-[10ch]" lines={["Six lines I", "keep testing."]} />
            <Reveal>
              <p className="prose-body mt-8 max-w-sm">
                Curiosity starts it. Building sustains it. Freedom is why it matters. Impact is what
                keeps it pointed somewhere.
              </p>
            </Reveal>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {BELIEFS.map((belief, index) => (
              <Reveal key={belief} as="li" className="cell flex items-baseline gap-6">
                <span className="label label-accent">{"i".repeat(index + 1).slice(0, 3) || "i"}</span>
                <span className="text-xl font-light tracking-editorial sm:text-2xl">{belief}</span>
              </Reveal>
            ))}
            <li className="border-t border-paper-200" />
          </ul>
        </div>
      </Section>

      <Section id="lifestyle" tone="raised" bordered labelledBy="lifestyle-heading">
        <header className="grid gap-8 lg:grid-cols-12">
          <p className="label lg:col-span-3">Beyond the work</p>
          <div className="lg:col-span-9">
            <MaskedLines
              id="lifestyle-heading"
              className="display-sm max-w-[13ch]"
              lines={["The life around", "the work."]}
            />
            <Reveal>
              <p className="prose-body mt-6 max-w-2xl">
                A personal brand should not only show what you do. It should show what you are doing
                it for.
              </p>
            </Reveal>
          </div>
        </header>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12">
          {LIFESTYLE_FRAMES.map((frame, index) => (
            <Reveal key={frame.src} as="figure" delay={index * 80} className={frame.span}>
              <MediaFrame
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                aspect={frame.aspect}
                muted={!frame.src.includes("alex-adekunle")}
                sizes="(max-width: 640px) 50vw, 30vw"
              />
              <figcaption className="mt-3 text-[11px] text-zinc-500">{frame.caption}</figcaption>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h3 className="label">Outside the screen</h3>
            <Reveal>
              <p className="prose-body mt-6">
                Technology is a large part of my life. It is not all of it, and the years when it
                nearly was are not years I would repeat.
              </p>
              <p className="prose-body mt-5">
                I care about experiences, style, travel, spaces, conversations, learning, people, and
                the small details that make a life feel lived rather than scheduled.
              </p>
            </Reveal>

            <h3 className="label mt-14">The workspace</h3>
            <Reveal>
              <p className="prose-body mt-6">
                Environment changes how you think, which sounds like an interiors magazine line until
                you have tried to solve something difficult in a room you dislike.
              </p>
              <p className="prose-body mt-5">
                I build spaces that make room for focus, creativity and ambition, because the room you
                work in is a decision you make once and then live inside every day after.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="label">The balance</h3>
            <Reveal>
              <p className="lede mt-6">Build seriously. Live intentionally.</p>
              <p className="prose-body mt-5">
                The ambition was never to work forever. It is to build something substantial enough to
                create freedom around the life you actually wanted in the first place.
              </p>
              <Link className="link-arrow mt-10" href="/gallery">
                See the gallery <i aria-hidden="true">→</i>
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="progress-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">A work in progress</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <MaskedLines id="progress-heading" className="display-sm max-w-[16ch]" lines={["I am still becoming."]} />
            <Reveal>
              <p className="prose-body mt-8">
                The person on this website is not a finished version of me and I would be worried if
                he were. There are skills I am still learning, ideas I am still testing, businesses I
                am still building and questions I have been carrying around for years without an
                answer.
              </p>
              <p className="prose-body mt-5">
                That is not a weakness, it is the arrangement. Curious enough to change my mind,
                disciplined enough to finish the things that matter, ambitious enough to keep starting
                new ones.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <ButtonLink href="/ventures" variant="ghost">See what I am building</ButtonLink>
                <ButtonLink href="/contact" magnetic>Start a conversation</ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd graph={[pageSchema("ProfilePage", "/about", "About Alex Adekunle")]} />
    </>
  );
}
