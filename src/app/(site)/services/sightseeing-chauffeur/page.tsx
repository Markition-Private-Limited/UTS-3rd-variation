import type { Metadata } from "next";
import { SightseeingHeroSection } from "@/components/services/sightseeing/SightseeingHeroSection";
import { SightseeingPlacesSection } from "@/components/services/sightseeing/SightseeingPlacesSection";
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
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
