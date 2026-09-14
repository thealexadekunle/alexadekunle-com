import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { WorkArchive } from "@/components/sections/work-archive";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextReveal } from "@/components/ui/text-reveal";
import { CASE_STUDIES } from "@/lib/content/work";
import { pageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work | Client Projects Led by Alex Adekunle",
  description:
    "Selected client work led by Alex Adekunle through Vavinix: property, retail, finance, accommodation, remodeling and civic technology across four countries.",
  alternates: { canonical: "https://vavinix.com/work" },
  // Canonical sits on the agency domain: client-name queries should land where
  // the commercial intent does. Flip this to index once that is no longer true.
  robots: { index: false, follow: true },
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="work-heading">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><span className="label">Selected work — led through Vavinix</span></Reveal>
            <Reveal delay={80}><span className="label">Six engagements · Four countries</span></Reveal>
          </div>

          <TextReveal
            as="h1"
            id="work-heading"
            className="display mt-10 max-w-[13ch]"
            lines={["The work,", "rather than the <em>claim.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              My commercial work runs through Vavinix. Clients in four countries, across property,
              retail, finance, remodeling, energy and civic technology. Design, development,
              branding, search, and staying on afterwards to keep the thing alive.
            </p>
          </Reveal>

          <WorkArchive />
        </Container>
      </section>

      <Section tone="raised" bordered>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="prose-body max-w-xl">
            The full portfolio, with current work and client detail, lives on the agency site. If you
            want to see the work rather than read about it, that is where to go.
          </p>
          <ButtonLink href="https://vavinix.com" magnetic>
            See the full portfolio ↗
          </ButtonLink>
        </div>
      </Section>

      <JsonLd
        graph={[
          pageSchema("CollectionPage", "/work", "Selected Work", {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: CASE_STUDIES.map((study, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE.url}/work/${study.slug}`,
                name: study.client,
              })),
            },
          }),
        ]}
      />
    </>
  );
}
