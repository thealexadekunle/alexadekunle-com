import type { Metadata } from "next";
import { ContactBanner } from "@/components/sections/contact-banner";
import { DisciplineTicker } from "@/components/sections/discipline-ticker";
import { ClientWorkAndEagle } from "@/components/sections/eagle-teaser";
import { Hero } from "@/components/sections/hero";
import { VenturesGrid } from "@/components/sections/ventures-grid";
import { WhatPeopleBring } from "@/components/sections/what-people-bring";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

/**
 * Home, v5: a set of doors, not the house. Every section either proves he is
 * real or sends the reader to the page that proves it in full.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mt-24 sm:mt-32">
        <DisciplineTicker />
      </div>
      <WhatPeopleBring />
      <VenturesGrid />
      <ClientWorkAndEagle />
      <ContactBanner />
    </>
  );
}
