import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Availability } from "@/components/ui/availability";
import { ContactForm } from "@/components/ui/contact-form";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Alex Adekunle | Partnerships, Speaking and Press",
  description:
    "Get in touch with Alex Adekunle, founder of Vavinix, about partnerships, speaking, press and project conversations.",
  alternates: { canonical: "/contact" },
};

const ROUTES = [
  {
    index: "01",
    title: "Projects",
    body: "Tell me what you are trying to achieve, not what you think needs building. Those two are almost never the same sentence. Project work runs through Vavinix.",
    meta: "Via Vavinix",
  },
  {
    index: "02",
    title: "Partnerships, speaking and press",
    body: "A venture worth exploring, an event, an interview. Pick the closest option in the form.",
    meta: "Direct",
  },
  {
    index: "03",
    title: "Anything else",
    body: "If none of those fit, send it anyway. The options are for sorting, not for keeping people out.",
    meta: "Open",
    accent: true,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 lg:pt-44" aria-labelledby="contact-heading">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <Reveal><Availability /></Reveal>
            <Reveal delay={60}>
              <span className="pill">Lagos · <Availability variant="inline" /></span>
            </Reveal>
            <Reveal delay={120}><span className="pill">Remote worldwide</span></Reveal>
          </div>

          <TextReveal
            as="h1"
            id="contact-heading"
            className="display mt-10 max-w-[14ch]"
            lines={["Let us start a", "<em>conversation.</em>"]}
          />

          <Reveal>
            <p className="lede mt-10 max-w-2xl">
              Not every conversation has to become a project. Some of the best ones did not, and were
              still worth having.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="!py-20 sm:!py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="label">Routing</h2>

            <Reveal>
              <p className="lede mt-8">
                Building a business, a product, a website or a system? The gap between what someone
                asks for and what they are trying to achieve is where the useful conversation
                happens.
              </p>
              <p className="prose-body mt-4">
                Project work runs through{" "}
                <a className="text-ink underline underline-offset-4 hover:text-accent" href="https://vavinix.com" rel="noopener">
                  Vavinix
                </a>
                .
              </p>
            </Reveal>

            <ul className="mt-12">
              {ROUTES.map((route) => (
                <li key={route.index} className="drow">
                  <span className="tile-index">{route.index}</span>
                  <span className="text-xl font-medium tracking-editorial">{route.title}</span>
                  <span className="prose-body text-[15px]">{route.body}</span>
                  <span className={`label ${"accent" in route && route.accent ? "label-accent" : ""}`}>
                    {route.meta}
                  </span>
                </li>
              ))}
              <li className="border-t border-paper-200" />
            </ul>

            {/* A plain-text address matters: a form-only contact page cannot be
                verified by a journalist, a partner, or an entity system. */}
            <div className="mt-12 border-t border-paper-200 pt-8">
              <h3 className="label">Direct</h3>
              <ul className="mt-6 space-y-4 text-[15px]">
                {[
                  { label: "General", value: SITE.email, href: `mailto:${SITE.email}` },
                  { label: "Speaking", value: SITE.speakingEmail, href: `mailto:${SITE.speakingEmail}` },
                  { label: "Press", value: SITE.pressEmail, href: `mailto:${SITE.pressEmail}` },
                  { label: "Projects", value: "vavinix.com ↗", href: "https://vavinix.com" },
                ].map((row) => (
                  <li key={row.label} className="contact-route flex flex-wrap items-baseline justify-between gap-4">
                    <span className="label">{row.label}</span>
                    <a className="transition-colors hover:text-accent" href={row.href} rel="noopener">
                      {row.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />

            <div className="mt-8 border border-dashed border-line-strong bg-paper-50 p-6 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="label">Or book the conversation</h2>
                <span className="label label-accent">Embed slot</span>
              </div>
              <p className="prose-body mt-4 text-[15px]">
                Thirty minutes, no deck. Drop your scheduling embed here — Cal.com, Calendly or
                SavvyCal — and it inherits this frame.
              </p>
              <div className="mt-6 grid h-56 place-items-center border border-line-strong bg-paper text-center">
                <div>
                  <p className="label">Calendar embed</p>
                  <p className="mt-2 text-sm text-zinc-500">{"<!-- replace with scheduling iframe -->"}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="tag">30 minutes</span>
                <span className="tag">Local time <Availability variant="inline" /></span>
                <span className="tag">Zoom or Meet</span>
                <Availability />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ink" bordered className="grain relative">
        <TextReveal className="display max-w-[13ch] text-paper" lines={["Tell me what", "you are building."]} />
        <Reveal>
          <p className="lede mt-10 max-w-xl !text-paper-200">Let us see where the conversation goes.</p>
        </Reveal>
        <div className="mt-14 border-t border-white/15 pt-8">
          <p className="text-xl font-medium tracking-editorial">{SITE.name}</p>
          <p className="label-lg mt-3 text-zinc-400">Technology · Business · Ventures · Ideas</p>
          <p className="label-lg mt-2 text-zinc-400">{SITE.tagline}</p>
        </div>
        <p className="mt-10">
          <Link className="link-arrow !border-white/30 text-paper" href="/">
            Back to the homepage <i aria-hidden="true">→</i>
          </Link>
        </p>
      </Section>

      <JsonLd
        graph={[
          pageSchema("ContactPage", "/contact", "Contact Alex Adekunle", {
            contactPoint: [
              { "@type": "ContactPoint", contactType: "project enquiries", url: "https://vavinix.com" },
              { "@type": "ContactPoint", contactType: "speaking", email: SITE.speakingEmail },
              { "@type": "ContactPoint", contactType: "media", email: SITE.pressEmail },
              { "@type": "ContactPoint", contactType: "general", email: SITE.email },
            ],
          }),
        ]}
      />
    </>
  );
}
