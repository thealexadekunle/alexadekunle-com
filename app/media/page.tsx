import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { EditorialHero } from "@/components/sections/editorial-hero";
import { TopicRows } from "@/components/sections/topic-rows";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { MEDIA_ROWS } from "@/lib/content/editorial";
import { pageSchema } from "@/lib/schema";
import { BIO, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media and Press | Alex Adekunle Interviews, Podcasts and Features",
  description:
    "Interviews, podcast appearances, features and press coverage of Alex Adekunle, founder of Vavinix. Press kit and media enquiries.",
  alternates: { canonical: "/media" },
  robots: { index: false, follow: true },
};

export default function MediaPage() {
  return (
    <>
      <EditorialHero
        id="media-heading"
        eyebrow="Media and press"
        lines={["Where the work", "gets <em>heard.</em>"]}
        lede="Interviews, conversations, appearances, articles, and the other rooms these ideas have ended up in."
      />

      <Section className="!py-20 sm:!py-28">
        <TopicRows rows={MEDIA_ROWS} />

        {/* The press kit is the highest-leverage part of this page: producers who
            can copy a ready bio describe you in your own words, consistently. */}
        <div id="press-kit" className="mt-24 scroll-mt-28 grid gap-14 border-t border-paper-200 pt-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">Press kit</p>
            <TextReveal
              className="display-sm mt-6 max-w-[12ch]"
              lines={["Take what you need", "without emailing me first."]}
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="prose-body">
                Short bio, long bio, high resolution photographs, brand assets and current company
                details.
              </p>
            </Reveal>

            <Reveal className="mt-10 border border-line-strong bg-paper-50 p-6 sm:p-8">
              <p className="label">Short bio</p>
              <p className="prose-body mt-4 text-[15px] !text-ink">{BIO.short}</p>
            </Reveal>

            <Reveal className="mt-6 border border-line-strong bg-paper-50 p-6 sm:p-8">
              <p className="label">Long bio</p>
              <p className="prose-body mt-4 text-[15px] !text-ink">{BIO.long}</p>
            </Reveal>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="tag">Portraits — high resolution</span>
              <span className="tag">Logo assets</span>
              <span className="tag">Company details</span>
            </div>

            <h3 className="label mt-14">Media enquiry</h3>
            <p className="prose-body mt-4">Interviews, podcasts, features, collaborations. Get in touch.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={`mailto:${SITE.pressEmail}`} magnetic>{SITE.pressEmail}</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">Contact form</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <JsonLd graph={[pageSchema("CollectionPage", "/media", "Media and Press")]} />
    </>
  );
}
