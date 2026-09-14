import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { SITE } from "@/lib/site";

type Stat = { readonly value: string; readonly label: string; readonly accent?: boolean };

const STATS: readonly Stat[] = [
  { value: "2011", label: "Building on the web since" },
  { value: "2021", label: "Vavinix founded" },
  { value: "04", label: "Countries served" },
  { value: "04", label: "Ventures in build", accent: true },
] as const;

export function Hero() {
  return (
    <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="hero-heading">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Reveal>
            <span className="pill">
              <span className="pill-pip" aria-hidden="true" />
              Building since 2011 · Founder of Vavinix
            </span>
          </Reveal>
          <Reveal delay={80}>
            <span className="label">Nigeria — working worldwide</span>
          </Reveal>
        </div>

        <TextReveal
          as="h1"
          id="hero-heading"
          className="display mt-10 max-w-[14ch]"
          lines={["I build ideas", "into things that", "<em>exist.</em>"]}
        />

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-paper-200 py-5">
          {SITE.disciplines.map((item, index) => (
            <span key={item} className="flex items-center gap-8">
              <span className="label label-ink">{item}</span>
              {index < SITE.disciplines.length - 1 ? (
                <span className="text-accent" aria-hidden="true">/</span>
              ) : null}
            </span>
          ))}
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="lede max-w-xl">
              I am Alex Adekunle. Nigerian. Technology entrepreneur, web developer, business
              strategist, and the guy who has been awake at two in the morning more times than is
              strictly reasonable, making something work that nobody had asked for yet.
            </p>
            <p className="prose-body mt-7 max-w-xl">
              Since 2011 I have been turning ideas, problems and half-formed opportunities into
              products, businesses and experiences. I founded Vavinix. I am building Aspire Trybe,
              OneArtPiece and The Receipt.
            </p>
            <p className="prose-body mt-5 max-w-xl">
              I build websites. I develop software. I build businesses. Mostly I am interested in
              what happens where technology meets ambition, because that is where things either take
              off or quietly fall apart, and both are worth watching closely.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" size="lg" magnetic>
                Start a conversation
              </ButtonLink>
              <ButtonLink href="/ventures" variant="ghost" size="lg">
                Explore the ventures
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} as="figure" className="lg:col-span-7">
            <AspectFrame
              src="/img/alex-adekunle-agbada.jpg"
              alt="Alex Adekunle, founder of Vavinix, in black and gold agbada"
              ratio="4/5"
              muted={false}
              priority
              parallax={false}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-[11px] text-zinc-500">
              <span>Alex Akinyele Adekunle — Lagos, 2026</span>
              <span className="label">Fig. 01</span>
            </figcaption>
          </Reveal>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70} className="cell">
              <dd className={`stat-value ${stat.accent ? "text-accent" : ""}`}>{stat.value}</dd>
              <dt className="label mt-[10px]">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
