import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

const ROUTES = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Projects", value: "vavinix.com ↗", href: "https://vavinix.com" },
  { label: "Speaking", value: "Invite me to speak", href: "/speaking" },
] as const;

export function ContactBanner() {
  return (
    <Section tone="ink" bordered labelledBy="cta-heading" className="grain relative">
      <p className="label text-zinc-400">04 — What is next</p>

      <TextReveal
        id="cta-heading"
        className="display mt-8 max-w-[13ch] text-paper"
        lines={["Let us build", "something that", "<em>matters.</em>"]}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <p className="lede max-w-xl !text-paper-200">
            Have an idea? Building a business? Looking for someone who will push back on the brief
            before agreeing to it? Start a conversation.
          </p>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <ul className="text-[15px]">
            {ROUTES.map((route) => (
              <li
                key={route.label}
                className="flex items-baseline justify-between gap-6 border-t border-white/15 py-4 last:border-b"
              >
                <span className="label text-zinc-400">{route.label}</span>
                {route.href.startsWith("http") || route.href.startsWith("mailto:") ? (
                  <a className="transition-colors hover:text-accent" href={route.href} rel="noopener">
                    {route.value}
                  </a>
                ) : (
                  <Link className="transition-colors hover:text-accent" href={route.href}>
                    {route.value}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <MagneticButton asChild className="btn-lg mt-10 border-paper text-paper">
            <Link href="/contact">
              <span>Tell me what you are building</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </Section>
  );
}
