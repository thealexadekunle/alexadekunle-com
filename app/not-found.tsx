import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className="pt-40">
      <p className="label">Error 404</p>
      <h1 className="display mt-8 max-w-[16ch]">This page does not exist. That happens.</h1>
      <p className="lede mt-10 max-w-xl">Here is everything that does.</p>
      <div className="mt-12 flex flex-wrap gap-4">
        <ButtonLink href="/" magnetic>Back to the homepage</ButtonLink>
        <ButtonLink href="/ventures" variant="ghost">Explore the ventures</ButtonLink>
      </div>
    </Section>
  );
}
