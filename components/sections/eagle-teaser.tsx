import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { TextReveal } from "@/components/ui/text-reveal";
import { CLIENT_WORK } from "@/lib/content/home";
import { PRINCIPLES } from "@/lib/content/principles";

/** Client work goes outward; The Eagle goes inward. Both are doors. */
export function ClientWorkAndEagle() {
  return (
    <Section labelledBy="client-work-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label">03 — The client work</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <TextReveal
            id="client-work-heading"
            className="display-sm max-w-[13ch]"
            lines={["The portfolio", "lives there."]}
          />
          <Reveal>
            <p className="prose-body mt-8 max-w-2xl">{CLIENT_WORK.body}</p>
            <div className="mt-10">
              <ButtonLink href="https://vavinix.com" magnetic>{CLIENT_WORK.cta} ↗</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 grid gap-12 border-t border-paper-200 pt-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label">04 — The Eagle</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <TextReveal className="display-sm max-w-[16ch]" lines={["Seven principles I", "keep returning to."]} />
          <Reveal>
            <p className="prose-body mt-8 max-w-2xl">
              Mostly because I keep needing them.
            </p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {PRINCIPLES.map((principle) => (
                <li key={principle.id}>
                  <span className="tag">{principle.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/the-eagle" variant="ghost">Enter The Eagle</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
