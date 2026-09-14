import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ScopeSwitch } from "@/components/sections/scope-switch";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { Section } from "@/components/ui/section";
import { GOOD_FIT, NOT_FIT, PROCESS } from "@/lib/content/services";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Work With Alex Adekunle | Advisory, Ventures and Delivery",
  description:
    "How to work with Alex Adekunle: strategy and advisory, delivery through Vavinix, speaking and venture partnerships. Scope, process and timelines.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="services-heading">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><span className="label">Advisory — Work with Alex Adekunle</span></Reveal>
            <Reveal delay={80}><span className="label">Selective · Remote or in person</span></Reveal>
          </div>

          <TextReveal
            as="h1"
            id="services-heading"
            className="display mt-10 max-w-[15ch]"
            lines={["Tell me what you", "are trying to <em>achieve.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              Not what you think you need built. Those two are almost never the same sentence, and the
              gap between them is where the useful part of the conversation happens.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <ButtonLink href="/contact" size="lg" magnetic>Start a conversation</ButtonLink>
              <ButtonLink href="https://vavinix.com" variant="ghost" size="lg">
                Delivery runs through Vavinix ↗
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section labelledBy="tiers-heading">
        <header className="grid gap-8 lg:grid-cols-12">
          <p className="label lg:col-span-3">01 — Scope tiers</p>
          <div className="lg:col-span-9">
            <TextReveal
              id="tiers-heading"
              className="display-sm max-w-[14ch]"
              lines={["Four engagements.", "Different weights."]}
            />
          </div>
        </header>
        <ScopeSwitch />
      </Section>

      <Section tone="raised" bordered labelledBy="process-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
            <p className="label">02 — Process</p>
            <TextReveal
              id="process-heading"
              className="display-sm mt-6 max-w-[11ch]"
              lines={["How the work", "actually runs."]}
            />
            <Reveal>
              <p className="prose-body mt-8 max-w-sm">
                An idea becomes a strategy. A strategy becomes a product. A product becomes a
                business. And a business, if you build it properly, becomes something that creates
                value without you standing over it.
              </p>
            </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {PROCESS.map((step, index) => (
              <details key={step.title} className="border-t border-line-strong" open={index === 0}>
                <summary className="flex min-h-[var(--touch)] cursor-pointer list-none items-center justify-between gap-5 py-[22px] text-[clamp(1.05rem,3.4vw,1.6rem)] tracking-editorial transition-colors hover:text-accent">
                  <span>{step.title}</span>
                  <span aria-hidden="true" className="text-accent">+</span>
                </summary>
                <div className="prose-body max-w-[52ch] pb-[30px]">{step.body}</div>
              </details>
            ))}
            <div className="border-t border-line-strong" />

            <dl className="mt-12 grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              {[
                { value: "01", label: "Conversation" },
                { value: "2—3", label: "Weeks to brief" },
                { value: "04", label: "Countries served" },
                { value: "∞", label: "Care plan", accent: true },
              ].map((stat) => (
                <div key={stat.label} className="cell">
                  <dd className={`stat-value ${stat.accent ? "text-accent" : ""}`}>{stat.value}</dd>
                  <dt className="label mt-[10px]">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section labelledBy="fit-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="label">03 — Fit</p>
            <TextReveal
              id="fit-heading"
              className="display-sm mt-6 max-w-[12ch]"
              lines={["Who this is for,", "and who it is not."]}
            />
            <Reveal as="figure" className="mt-12">
              <AspectFrame
                src="/img/meeting-still-life.jpg"
                alt="A meeting table still life: a document face down, a fountain pen, folded glasses, black coffee"
              ratio="4/5"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="label label-ink">A good fit</h3>
            <ul className="mt-6">
              {GOOD_FIT.map((item) => (
                <Reveal key={item} as="li" className="cell text-xl font-light tracking-editorial">
                  {item}
                </Reveal>
              ))}
            </ul>

            <h3 className="label label-ink mt-16">Not a fit</h3>
            <ul className="mt-6">
              {NOT_FIT.map((item) => (
                <Reveal key={item} as="li" className="cell text-xl font-light tracking-editorial text-zinc-500">
                  {item}
                </Reveal>
              ))}
              <li className="border-t border-paper-200" />
            </ul>

            <Reveal>
              <p className="prose-body mt-12">
                Most failure is not caused by doing the wrong thing. It is caused by doing nine
                things, all of them reasonably well.
              </p>
              <div className="mt-10">
                <ButtonLink href="/contact" magnetic>Tell me what you are building</ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd graph={[pageSchema("WebPage", "/services", "Work with Alex Adekunle")]} />
    </>
  );
}
