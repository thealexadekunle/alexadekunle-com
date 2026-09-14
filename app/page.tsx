import type { Metadata } from "next";
import { ContactBanner } from "@/components/sections/contact-banner";
import { DisciplineTicker } from "@/components/sections/discipline-ticker";
import { Engagements } from "@/components/sections/engagements";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { VenturesGrid } from "@/components/sections/ventures-grid";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mt-24 sm:mt-32">
        <DisciplineTicker />
      </div>
      <VenturesGrid />
      <Philosophy />
      <Engagements />
      <ContactBanner />
    </>
  );
}
