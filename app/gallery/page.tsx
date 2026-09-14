import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { MaskedLines } from "@/components/motion/masked-lines";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gallery | Alex Adekunle in Photographs",
  description:
    "Photographs from the journey: work, travel, speaking and the people around the building. Alex Adekunle, founder of Vavinix.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="gallery-heading">
        <Container>
          <Reveal><span className="label">Gallery — Alex Adekunle in photographs</span></Reveal>

          <MaskedLines
            as="h1"
            id="gallery-heading"
            className="display mt-10 max-w-[13ch]"
            lines={["Moments from", "the <em>journey.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              Work, travel, events, spaces, and the people who were there for the parts nobody
              photographs.
            </p>
            <p className="prose-body mt-6 max-w-2xl">
              Photographs of Alex Adekunle are real. The rooms and still lifes between them are
              generated stand-ins, waiting on the shoot.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="!py-16 sm:!py-24">
        <GalleryGrid />
        <MaskedLines className="display-sm mt-20 max-w-[14ch]" lines={["Still building.", "Still documenting."]} />
      </Section>

      <JsonLd graph={[pageSchema("ImageGallery", "/gallery", "Gallery")]} />
    </>
  );
}
