import type { Metadata } from "next";
import { CityToCityHeroSection, CityToCityAddressSection, CityToCityPerspectiveSection, CityToCityExperienceSection, AirportTransfersFleetSection, FleetDiscoverCTA, CityToCityFaqSection, CityToCityCTASection } from "@/components/services";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "City to City — United Travel Services",
  description: "Private chauffeur travel between towns and cities with United Travel Services.",
};

export default function CityToCityPage() {
  return (
    <>
      <main className="bg-white p-4">
        <Reveal>
          <CityToCityHeroSection />
        </Reveal>
      </main>
      <Reveal>
        <CityToCityAddressSection />
      </Reveal>
      <Reveal>
        <CityToCityPerspectiveSection />
      </Reveal>
      <Reveal>
        <CityToCityExperienceSection />
      </Reveal>
      <Reveal>
        <AirportTransfersFleetSection />
      </Reveal>
      <Reveal>
        <FleetDiscoverCTA />
      </Reveal>
      <Reveal>
        <CityToCityFaqSection />
      </Reveal>
      <Reveal>
        <CityToCityCTASection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
