import Link from "next/link";
import { MaskedLines } from "@/components/motion/masked-lines";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";

const ROWS = [
  {
    index: "01",
    title: "Client work & digital systems",
    scope: "Design, development, branding, search, and staying on afterwards to keep the thing alive.",
    where: "Runs through Vavinix ↗",
    href: "https://vavinix.com",
  },
  {
    index: "02",
    title: "Strategy & advisory",
    scope: "Positioning, product direction, and the uncomfortable second conversation before the build starts.",
    where: "Direct · Selective",
    href: "/services",
  },
  {
    index: "03",
    title: "Speaking & workshops",
    scope: "Conferences, universities, corporate events, workshops and podcasts. In person or remote.",
    where: "Worldwide",
    href: "/speaking",
  },
  {
    index: "04",
    title: "Venture building",
    scope: "Aspire Trybe, OneArtPiece and The Receipt. Founded and run, not advised from a distance.",
    where: "Ongoing",
    href: "/ventures",
  },
] as const;

const SECTORS = ["Property", "Retail", "Finance", "Remodeling", "Energy", "Civic technology"] as const;

export function Engagements() {
  return (
    <Section labelledBy="offer-heading">
      <header className="grid gap-8 lg:grid-cols-12">
        <p className="label lg:col-span-3">03 — How to work with me</p>
        <div className="lg:col-span-9">
          <MaskedLines
            id="offer-heading"
            className="display-sm max-w-[15ch]"
            lines={["Four ways in.", "One conversation first."]}
          />
        </div>
      </header>

      <div className="mt-14">
        {ROWS.map((row) =>
          row.href.startsWith("http") ? (
            <a key={row.index} className="drow group" href={row.href} rel="noopener">
              <span className="tile-index">{row.index}</span>
              <span className="text-2xl font-medium tracking-editorial">{row.title}</span>
              <span className="prose-body text-[15px]">{row.scope}</span>
              <span className="label">{row.where}</span>
            </a>
          ) : (
            <Link key={row.index} className="drow group" href={row.href}>
              <span className="tile-index">{row.index}</span>
              <span className="text-2xl font-medium tracking-editorial">{row.title}</span>
              <span className="prose-body text-[15px]">{row.scope}</span>
              <span className="label">{row.where}</span>
            </Link>
          ),
        )}
        <div className="border-t border-paper-200" />
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <MaskedLines
            className="display-sm max-w-[12ch]"
            lines={["The portfolio lives", "there, not here."]}
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="prose-body">
              My commercial work runs through Vavinix. Clients in four countries, across property,
              retail, finance, remodeling, energy and civic technology. Design, development, branding,
              search, and staying on afterwards to keep the thing alive.
            </p>
            <p className="prose-body mt-5">
              If you want to see the work rather than read about it, that is where to go.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SECTORS.map((sector) => (
                <span key={sector} className="tag">
                  {sector}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink href="https://vavinix.com" magnetic>
                See the portfolio at vavinix.com ↗
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
