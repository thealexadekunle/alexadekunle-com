import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextReveal } from "@/components/ui/text-reveal";
import { CASE_STUDIES, caseStudyBySlug } from "@/lib/content/work";
import { PERSON_ID, VAVINIX_ID } from "@/lib/site";

type Params = { readonly slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};

  const title = `${study.client} ${study.discipline} | Vavinix`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `https://vavinix.com/work/${slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description: study.summary,
      type: "article",
      images: [{ url: study.cover, alt: study.coverAlt }],
    },
    twitter: { card: "summary_large_image", title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  const index = CASE_STUDIES.findIndex((item) => item.slug === slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];

  return (
    <article>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="case-heading">
        <Container>
          <nav className="label" aria-label="Breadcrumb">
            <Link className="transition-colors hover:text-ink" href="/work">Work</Link>{" "}
            <span className="text-accent">/</span> {study.client}
          </nav>

          <TextReveal as="h1" id="case-heading" className="display mt-8 max-w-[12ch]" lines={[study.client]} />

          <Reveal>
            <p className="lede mt-8 max-w-2xl">{study.summary}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="tag">{study.sectorLabel}</span>
              <span className="tag">{study.discipline}</span>
              <span className="tag">{study.year}</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <Reveal className="mt-14">
        <AspectFrame
          src={study.cover}
          alt={study.coverAlt}
          ratio="16/9"
          priority
          parallax={0.04}
          sizes="100vw"
          className="max-h-[78vh]"
        />
      </Reveal>

      <Section className="!py-20 sm:!py-28">
        <dl className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
          {[
            { term: "Client", value: study.client },
            { term: "Scope", value: study.discipline },
            { term: "Delivered by", value: "Vavinix" },
            { term: "Role", value: "Founder & lead" },
          ].map((fact) => (
            <div key={fact.term} className="cell">
              <dt className="label">{fact.term}</dt>
              <dd className="mt-3 text-xl font-medium tracking-editorial">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Sticky editorial: the section title pins while its content scrolls past. */}
        {[
          { eyebrow: "01 — The problem", heading: ["A problem worth", "naming precisely."], body: study.problem },
          { eyebrow: "02 — The approach", heading: ["Answer the objection", "before it is raised."], body: study.approach },
        ].map((block) => (
          <div key={block.eyebrow} className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="label">{block.eyebrow}</p>
                <TextReveal className="display-sm mt-6 max-w-[14ch]" lines={block.heading} />
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                {block.body.map((paragraph, i) => (
                  <p key={paragraph.slice(0, 24)} className={`prose-body ${i === 0 ? "" : "mt-5"}`}>
                    {paragraph}
                  </p>
                ))}
              </Reveal>
              {block.eyebrow.startsWith("02") ? (
                <ul className="mt-10">
                  {study.approachRows.map((row) => (
                    <li key={row.numeral} className="drow">
                      <span className="tile-index">{row.numeral}</span>
                      <span className="text-xl font-medium tracking-editorial">{row.title}</span>
                      <span className="prose-body text-[15px]">{row.body}</span>
                      <span className="label">{row.meta}</span>
                    </li>
                  ))}
                  <li className="border-t border-paper-200" />
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </Section>

      {study.gallery.length > 0 ? (
        <Section className="!py-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {study.gallery.map((item, i) => (
              <Reveal key={item.src} as="figure" delay={i * 80} className={i % 2 === 1 ? "sm:pt-16" : ""}>
                <AspectFrame src={item.src} alt={item.alt} ratio={item.ratio} sizes="(max-width: 640px) 100vw, 45vw" />
                <figcaption className="mt-3 text-[11px] text-zinc-500">{item.caption}</figcaption>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="!py-20 sm:!py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><p className="label">03 — What was built</p></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              {study.built.map((paragraph, i) => (
                <p key={paragraph.slice(0, 24)} className={i === 0 ? "lede" : "prose-body mt-6"}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><p className="label">04 — The outcome</p></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <TextReveal className="display-sm max-w-[14ch]" lines={["Measured,", "not asserted."]} />
            <dl className="mt-10 grid grid-cols-2 gap-x-8 sm:grid-cols-3">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="cell">
                  <dd className={`stat-value ${metric.value ? "" : "text-zinc-400"}`}>
                    {metric.value ?? "—"}
                  </dd>
                  <dt className="label mt-[10px]">{metric.label}</dt>
                  {metric.note ? <dd className="mt-2 text-xs text-zinc-400">{metric.note}</dd> : null}
                </div>
              ))}
            </dl>
            <Reveal>
              {study.outcome.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="prose-body mt-8">{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4"><p className="label">05 — The stack</p></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="flex flex-wrap gap-3">
                {study.stack.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
              <p className="prose-body mt-8">
                Server-rendered HTML on every content route, because a page whose copy only appears
                after JavaScript executes goes into a slower render queue, and most AI crawlers do
                not execute JavaScript at all.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-t border-paper-200 pt-10">
          <div>
            <p className="label">Next case</p>
            <p className="display-sm mt-4">{next?.client ?? "Selected work"}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={next ? `/work/${next.slug}` : "/work"} variant="ghost">
              Next project
            </ButtonLink>
            <ButtonLink href="/contact" magnetic>Start a conversation</ButtonLink>
          </div>
        </div>
      </Section>

      <JsonLd
        graph={[
          {
            "@type": "CreativeWork",
            "@id": `https://vavinix.com/work/${study.slug}#work`,
            name: `${study.client} ${study.discipline}`,
            description: study.summary,
            creator: { "@id": VAVINIX_ID },
            author: { "@id": PERSON_ID },
            about: study.sectorLabel,
            datePublished: study.year,
          },
        ]}
      />
    </article>
  );
}
