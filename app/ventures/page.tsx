import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { MaskedLines } from "@/components/motion/masked-lines";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { VENTURES } from "@/lib/content/ventures";
import { pageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ventures | Vavinix, Aspire Trybe, OneArtPiece and The Receipt",
  description:
    "The companies Alex Adekunle is building: Vavinix, Aspire Trybe, OneArtPiece and The Receipt. Technology, youth opportunity, art and accountability.",
  alternates: { canonical: "/ventures" },
};

export default function VenturesPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="ventures-heading">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><span className="label">Ventures — Four companies</span></Reveal>
            <Reveal delay={80}>
              <span className="label">Vavinix · Aspire Trybe · OneArtPiece · The Receipt</span>
            </Reveal>
          </div>

          <MaskedLines
            as="h1"
            id="ventures-heading"
            className="display mt-10 max-w-[14ch]"
            lines={["I do not just", "work on ideas.", "<em>I build them.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              Some turn into companies. Some turn into products. Some stay experiments and teach me
              something anyway. All four of these started as a problem I could not stop turning over.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="!py-20 sm:!py-28">
        {VENTURES.map((venture, index) => (
          <Reveal
            key={venture.slug}
            as="article"
            className={`group border-t border-paper-200 pt-10 ${index > 0 ? "mt-16" : ""}`}
          >
            <Link
              href={`/ventures/${venture.slug}`}
              className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-8 lg:grid-cols-12 lg:gap-10"
              data-cursor-label="Open"
            >
              <div className="lg:col-span-5">
                <div className="frame logo-plate aspect-[16/10]">
                  {venture.logo && venture.logoSize ? (
                    <Image
                      src={venture.logo}
                      alt={`${venture.name} logo`}
                      width={venture.logoSize.width}
                      height={venture.logoSize.height}
                      sizes="(max-width: 640px) 70vw, 30vw"
                    />
                  ) : null}
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <span className="tile-index">
                  0{index + 1} — {venture.kind} · {venture.meta}
                </span>
                <h2 className="tile-title">{venture.name}</h2>
                <p className="lede mt-4">{venture.headline}</p>
                <p className="prose-body mt-4">{venture.summary}</p>
                <span className="link-arrow mt-8">
                  More on {venture.name} <i aria-hidden="true">→</i>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </Section>

      <Section tone="raised" bordered labelledBy="bigger-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="label">The bigger picture</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <MaskedLines
              id="bigger-heading"
              className="display-sm max-w-[16ch]"
              lines={["I do not want the things", "I build to look the same."]}
            />
            <Reveal>
              <p className="prose-body mt-8">
                That would suggest I am solving the same problem repeatedly and calling it range.
              </p>
              <p className="prose-body mt-5">
                Four ventures, four different failures: how businesses show up online, how young
                people get access, how artists get paid, how citizens hold power to account. The
                through line is not the sector. It is that each one is a system quietly failing
                somebody, and systems are built things, which means they can be rebuilt.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <ButtonLink href="/contact" magnetic>Follow what I am building</ButtonLink>
                <ButtonLink href="/about" variant="ghost">About {SITE.name}</ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd
        graph={[
          pageSchema("CollectionPage", "/ventures", "Ventures", {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: VENTURES.map((venture, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE.url}/ventures/${venture.slug}`,
                name: venture.name,
              })),
            },
          }),
        ]}
      />
    </>
  );
}
