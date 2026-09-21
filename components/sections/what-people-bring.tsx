import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { TextReveal } from "@/components/ui/text-reveal";
import { FIFTEEN_YEARS, WHAT_PEOPLE_BRING } from "@/lib/content/home";

/**
 * The two arguments the homepage actually makes: what arrives, and what
 * fifteen years taught about why it goes wrong.
 */
export function WhatPeopleBring() {
  return (
    <Section tone="raised" bordered labelledBy="bring-heading">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label">01 — What arrives</p>
          <TextReveal
            id="bring-heading"
            className="display-sm mt-6 max-w-[11ch]"
            lines={[...WHAT_PEOPLE_BRING.heading]}
          />
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="lede">{WHAT_PEOPLE_BRING.body[0]}</p>
          </Reveal>

          <ul className="mt-10">
            {WHAT_PEOPLE_BRING.items.map((item) => (
              <Reveal key={item.index} as="li" className="drow">
                <span className="tile-index">{item.index}</span>
                <span className="text-2xl font-medium tracking-editorial">{item.title}</span>
                <span className="prose-body text-[15px]">{item.body}</span>
                <span className="label" aria-hidden="true">—</span>
              </Reveal>
            ))}
            <li className="border-t border-paper-200" />
          </ul>

          <Reveal>
            <p className="prose-body mt-10">{WHAT_PEOPLE_BRING.body[1]}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label">02 — What it teaches</p>
          <TextReveal
            className="display-sm mt-6 max-w-[12ch]"
            lines={[...FIFTEEN_YEARS.heading]}
          />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <blockquote className="border-l border-accent pl-7">
              <p className="text-[clamp(1.35rem,2.6vw,2.1rem)] font-light leading-[1.25] tracking-editorial text-ink">
                {FIFTEEN_YEARS.body[0]}
              </p>
            </blockquote>
            <p className="prose-body mt-8">{FIFTEEN_YEARS.body[1]}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
