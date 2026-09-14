import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { EditorialHero } from "@/components/sections/editorial-hero";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { JOURNAL_ITEMS } from "@/lib/content/editorial";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal | Alex Adekunle, Building in Public",
  description:
    "Founder notes, project lessons and business experiments from Alex Adekunle. Building in public, documented as it happens.",
  alternates: { canonical: "/journal" },
  robots: { index: false, follow: true },
};

export default function JournalPage() {
  return (
    <>
      <EditorialHero
        id="journal-heading"
        eyebrow="Journal — building in public"
        lines={["Building in", "real <em>time.</em>"]}
        lede="Not everything worth writing down deserves a case study."
      />

      <Section className="!py-20 sm:!py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="label">What you will find here</h2>
            <ul className="mt-8">
              {JOURNAL_ITEMS.map((item) => (
                <Reveal key={item} as="li" className="cell text-xl font-light tracking-editorial">
                  {item}
                </Reveal>
              ))}
              <li className="border-t border-paper-200" />
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="label">The point</h2>
            <Reveal>
              <p className="lede mt-8">
                The Journal is where the process lives, unedited enough to still be true.
              </p>
              <p className="prose-body mt-6">
                Less about presenting finished answers, more about documenting better questions. Some
                entries will be practical. Some personal. Some will just be an idea I did not want to
                lose on the way to somewhere else.
              </p>
            </Reveal>

            <h2 className="label mt-14">Opening note</h2>
            <Reveal>
              <p className="prose-body mt-6">
                I am documenting this because memory is selective and building moves fast. Ask me in
                two years how a project went and you will get the tidy version, which is usually the
                wrong one.
              </p>
              <p className="prose-body mt-5">
                The things that feel obvious to me now were problems I had no idea how to solve, and I
                have already forgotten how long some of them took. Writing them down gives the lesson
                somewhere to live.
              </p>
              <p className="prose-body mt-5">
                Maybe something here saves someone a few months. Maybe it starts a conversation. Maybe
                it just reminds me, later, how far this actually came.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd graph={[pageSchema("Blog", "/journal", "Journal")]} />
    </>
  );
}
