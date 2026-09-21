import Image from "next/image";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { VENTURES } from "@/lib/content/ventures";

const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5 lg:pt-24",
  "lg:col-span-5",
  "lg:col-span-7 lg:pt-24",
] as const;

const PLATE_ASPECT = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/10]"] as const;

/** Asymmetric bento: each venture led by its own brand mark. */
export function VenturesGrid() {
  return (
    <section id="ventures" className="scroll-mt-28 py-24 sm:py-32" aria-labelledby="featured-heading">
      <Container>
        <header className="grid gap-8 lg:grid-cols-12">
          <p className="label lg:col-span-3">01 — What I am building</p>
          <div className="lg:col-span-9">
            <TextReveal
              id="featured-heading"
              className="display-sm max-w-[16ch]"
              lines={["I do not just have", "ideas. I build them."]}
            />
          </div>
        </header>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-12">
          {VENTURES.map((venture, index) => (
            <Reveal
              key={venture.slug}
              as="article"
              delay={index % 2 === 0 ? 0 : 90}
              className={`group ${SPANS[index] ?? "lg:col-span-6"}`}
            >
              <Link
                href={`/ventures/${venture.slug}`}
                className="block"
                data-cursor-label={venture.name}
              >
                <div className={`frame logo-plate ${PLATE_ASPECT[index] ?? "aspect-[16/10]"}`}>
                  {venture.logo && venture.logoSize ? (
                    <Image
                      src={venture.logo}
                      alt={`${venture.name} logo`}
                      width={venture.logoSize.width}
                      height={venture.logoSize.height}
                      sizes="(max-width: 640px) 70vw, 32vw"
                    />
                  ) : null}
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-6">
                  <span className="tile-index">
                    Venture 0{index + 1} — {venture.kind}
                  </span>
                  <span className="label">{venture.meta}</span>
                </div>

                <h3 className="tile-title">{venture.name}</h3>
                <p className="prose-body mt-4 max-w-xl">{venture.homeSummary}</p>

                <div className="mt-[18px] flex flex-wrap gap-2">
                  {venture.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="tile-rule" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-paper-200 pt-8">
          <p className="prose-body max-w-lg">
            Four ventures, four different problems. Each has a page of its own.
          </p>
          <Link className="link-arrow" href="/ventures">
            Explore the ventures <i aria-hidden="true">→</i>
          </Link>
        </div>
      </Container>
    </section>
  );
}
