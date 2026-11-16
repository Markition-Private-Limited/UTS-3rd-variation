import type { Metadata } from "next";
import { SightseeingHeroSection } from "@/components/services/sightseeing/SightseeingHeroSection";
import { SightseeingPlacesSection } from "@/components/services/sightseeing/SightseeingPlacesSection";
import { SightseeingPerspectiveSection } from "@/components/services/sightseeing/SightseeingPerspectiveSection";
import { SightseeingApproachSection } from "@/components/services/sightseeing/SightseeingApproachSection";
import { SightseeingJourneySection } from "@/components/services/sightseeing/SightseeingJourneySection";
import { AirportTransfersFleetSection } from "@/components/services/AirportTransfersFleetSection";
import { FleetDiscoverCTA } from "@/components/services/FleetDiscoverCTA";
import { SightseeingFaqSection } from "@/components/services/sightseeing/SightseeingFaqSection";
import { SightseeingCTASection } from "@/components/services/sightseeing/SightseeingCTASection";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Sightseeing Chauffeur — United Travel Services",
  description: "Discover a different perspective on your visit with a private sightseeing chauffeur itinerary from United Travel Services.",
};

export default function SightseeingChauffeurPage() {
  return (
    <>
      <main className="bg-white p-4">
        <Reveal>
          <SightseeingHeroSection />
        </Reveal>
      </main>
      <Reveal>
        <SightseeingPlacesSection />
      </Reveal>
      <Reveal>
        <SightseeingPerspectiveSection />
      </Reveal>
      <Reveal>
        <SightseeingApproachSection />
      </Reveal>
      <Reveal>
        <SightseeingJourneySection />
      </Reveal>
      <Reveal>
        <AirportTransfersFleetSection />
      </Reveal>
      <Reveal>
        <FleetDiscoverCTA />
      </Reveal>
      <Reveal>
        <SightseeingFaqSection />
      </Reveal>
      <Reveal>
        <SightseeingCTASection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
