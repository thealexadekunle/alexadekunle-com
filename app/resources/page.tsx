import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { EditorialHero } from "@/components/sections/editorial-hero";
import { TopicRows } from "@/components/sections/topic-rows";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { RESOURCE_ROWS } from "@/lib/content/editorial";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Resources | Tools and Systems Alex Adekunle Uses and Recommends",
  description:
    "The tools, frameworks, books and systems Alex Adekunle uses for building, automating and running a digital business. Tested, not sponsored.",
  alternates: { canonical: "/resources" },
  robots: { index: false, follow: true },
};

export default function ResourcesPage() {
  return (
    <>
      <EditorialHero
        id="resources-heading"
        eyebrow="Resources — tested, not sponsored"
        lines={["Things I use,", "learn from", "and <em>recommend.</em>"]}
        lede="Tools are useful. Systems are better. Most people have collected the first and skipped the second."
      />

      <Section className="!py-20 sm:!py-28">
        <TopicRows rows={RESOURCE_ROWS} />

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">A note on this page</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="lede">
                Everything here is something I have used. If a tool is on the list it earned the
                place, and when I stop using it, it comes off. That is the only rule.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd graph={[pageSchema("CollectionPage", "/resources", "Resources")]} />
    </>
  );
}
