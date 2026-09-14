import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import {
  FOOTER_CONNECT,
  FOOTER_EXPLORE,
  FOOTER_VENTURES,
} from "@/lib/content/navigation";
import { SITE, SOCIALS } from "@/lib/site";

/** Editorial footer: kinetic name band, three link columns, legal line. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-200 bg-paper-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="overflow-hidden border-b border-paper-200 py-8 sm:py-12">
        <Marquee
          items={[SITE.name]}
          speed={0.35}
          repeat={8}
          itemClassName="text-[clamp(3rem,12vw,9rem)] font-medium leading-[0.85] tracking-display text-paper-200"
        />
      </div>

      <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/img/logo.svg" alt={SITE.name} width={298} height={92} className="h-[42px] w-auto" />
            <p className="label-lg mt-3">Technology · Business · Ventures · Ideas</p>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-zinc-500">{SITE.tagline}</p>
            <NewsletterForm />
          </div>

          <nav className="lg:col-span-3" aria-label="Explore">
            <p className="label">Explore</p>
            <ul className="mt-6 space-y-3 text-[15px]">
              {FOOTER_EXPLORE.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a className="foot-link" href={item.href} rel="noopener">
                      {item.label} ↗
                    </a>
                  ) : (
                    <Link className="foot-link" href={item.href}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Ventures">
            <p className="label">Ventures</p>
            <ul className="mt-6 space-y-3 text-[15px]">
              {FOOTER_VENTURES.map((item) => (
                <li key={item.href}>
                  <Link className="foot-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Connect">
            <p className="label">Connect</p>
            <ul className="mt-6 space-y-3 text-[15px]">
              {SOCIALS.map((item) => (
                <li key={item.href}>
                  <a className="foot-link" href={item.href} rel="me noopener">
                    {item.label}
                  </a>
                </li>
              ))}
              {FOOTER_CONNECT.map((item) => (
                <li key={item.href}>
                  <Link className="foot-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper-200 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Client work and case studies live at{" "}
            <a
              className="underline underline-offset-4 transition-colors hover:text-accent"
              href="https://vavinix.com"
              rel="noopener"
            >
              vavinix.com
            </a>
          </p>
          <p className="max-w-md">
            Portraits are photographs. Interiors and still lifes are AI-generated stand-ins, pending a shoot.
          </p>
          <p>© {year} {SITE.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
