import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { EditorialHero } from "@/components/sections/editorial-hero";
import { TopicRows } from "@/components/sections/topic-rows";
import { MaskedLines } from "@/components/motion/masked-lines";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { IDEAS_TOPICS } from "@/lib/content/editorial";
import { pageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ideas | Alex Adekunle on Technology, Business and Building in Africa",
  description:
    "Essays and principles from Alex Adekunle on technology, business, leadership, entrepreneurship and building opportunity across Africa.",
  alternates: { canonical: "/ideas" },
  // Thin at launch: four empty pages on a new domain teach Google the domain
  // is thin. Flips to index once three essays are published.
  robots: { index: false, follow: true },
};

export default function IdeasPage() {
  return (
    <>
      <EditorialHero
        id="ideas-heading"
        eyebrow="Ideas — essays and principles"
        lines={["Ideas worth", "thinking <em>about.</em>"]}
        lede="Technology changes quickly. Good thinking should change what we do with it."
      />

      <Section className="!py-20 sm:!py-28">
        <TopicRows rows={IDEAS_TOPICS} />
        <MaskedLines className="display-sm mt-20 max-w-[14ch]" lines={[SITE.tagline]} />
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/journal" variant="ghost">Read the journal</ButtonLink>
          <ButtonLink href="/the-eagle" magnetic>Enter The Eagle</ButtonLink>
        </div>
      </Section>

      <JsonLd graph={[pageSchema("CollectionPage", "/ideas", "Ideas")]} />
    </>
  );
}
