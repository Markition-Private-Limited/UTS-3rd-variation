import type { Metadata } from "next";

import { FleetHeroSection, FleetIntroSection, FleetCollectionSection } from "@/components/fleet";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Our Fleet — United Travel Services",
  description: "Explore the UTS Collection of luxury executive vehicles for airport transfers, corporate travel and private journeys.",
};

export default function FleetPage() {
  return (
    <>
      <main className="bg-white p-4">
        <Reveal>
          <FleetHeroSection />
        </Reveal>
      </main>
      <Reveal>
        <FleetIntroSection />
      </Reveal>
      <Reveal>
        <FleetCollectionSection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
