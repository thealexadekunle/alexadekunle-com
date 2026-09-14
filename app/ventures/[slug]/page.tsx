import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { Section } from "@/components/ui/section";
import { VENTURE_DETAIL } from "@/lib/content/venture-detail";
import { VENTURES, ventureBySlug } from "@/lib/content/ventures";
import { ventureSchema, vavinixSchema } from "@/lib/schema";

type Params = { readonly slug: string };

/** Every venture page is known at build time — the export needs no fallback. */
export function generateStaticParams(): Params[] {
  return VENTURES.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = VENTURE_DETAIL[slug];
  if (!detail) return {};
  return {
    title: detail.title,
    description: detail.description,
    alternates: { canonical: `/ventures/${slug}` },
  };
}

export default async function VenturePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const venture = ventureBySlug(slug);
  const detail = VENTURE_DETAIL[slug];
  if (!venture || !detail) notFound();

  const schema =
    slug === "vavinix"
      ? vavinixSchema
      : ventureSchema(
          slug,
          venture.name,
          detail.description,
          slug === "aspire-trybe" ? { alternateName: "AspireTrybeX" } : {},
        );

  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="venture-heading">
        <Container>
          <nav className="label" aria-label="Breadcrumb">
            <Link className="transition-colors hover:text-ink" href="/ventures">
              Ventures
            </Link>{" "}
            <span className="text-accent">/</span> {venture.name}
          </nav>

          <TextReveal
            as="h1"
            id="venture-heading"
            className="display mt-8"
            lines={[venture.name]}
          />

          <Reveal>
            <p className="lede mt-8 max-w-2xl">{venture.headline}</p>
          </Reveal>

          {venture.logo && venture.logoSize ? (
            <Reveal>
              <Image
                src={venture.logo}
                alt={`${venture.name} logo`}
                width={venture.logoSize.width}
                height={venture.logoSize.height}
                className="venture-mark mt-10"
                sizes="200px"
              />
            </Reveal>
          ) : null}

          <Reveal className="mt-14">
            <AspectFrame
              src={detail.hero.src}
              alt={detail.hero.alt}
              ratio="16/9"
              priority
              sizes="100vw"
            />
          </Reveal>

          {detail.stats.length > 0 ? (
            <dl className="mt-10 grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              {detail.stats.map((stat) => (
                <div key={stat.label} className="cell">
                  <dd className={`stat-value ${stat.accent ? "text-accent" : ""}`}>{stat.value}</dd>
                  <dt className="label mt-[10px]">{stat.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </Container>
      </section>

      <Section className="!py-20 sm:!py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            {detail.left.map((block, index) => (
              <div key={block.heading} className={index > 0 ? "mt-14" : ""}>
                <h2 className="label">{block.heading}</h2>
                <Reveal>
                  {block.paragraphs.map((paragraph, i) => (
                    <p key={paragraph.slice(0, 24)} className={`prose-body ${i === 0 ? "mt-6" : "mt-5"}`}>
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {detail.right.map((block) => (
              <div key={block.heading}>
                <h2 className="label">{block.heading}</h2>
                <Reveal>
                  {block.paragraphs.map((paragraph, i) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className={i === 0 ? "lede mt-6" : "prose-body mt-5"}
                    >
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </div>
            ))}

            {detail.pullQuote ? (
              <Reveal>
                <blockquote className="mt-10 border-l border-accent pl-7">
                  <p className="text-[clamp(1.25rem,2.2vw,1.9rem)] font-light leading-[1.25] tracking-editorial">
                    {detail.pullQuote}
                  </p>
                </blockquote>
              </Reveal>
            ) : null}

            {detail.rows.length > 0 ? (
              <div className="mt-14">
                {detail.rowsHeading ? <h2 className="label">{detail.rowsHeading}</h2> : null}
                <ul className="mt-6">
                  {detail.rows.map((row) => (
                    <li key={row.index} className="drow">
                      <span className="tile-index">{row.index}</span>
                      <span className="text-2xl font-medium tracking-editorial">{row.title}</span>
                      <span className="prose-body text-[15px]">{row.body}</span>
                      <span className={`label ${row.accent ? "label-accent" : ""}`}>{row.meta}</span>
                    </li>
                  ))}
                  <li className="border-t border-paper-200" />
                </ul>
              </div>
            ) : null}

            <div className="mt-10">
              <ButtonLink href={detail.cta.href} magnetic>
                {detail.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <JsonLd graph={[schema]} />
    </>
  );
}
