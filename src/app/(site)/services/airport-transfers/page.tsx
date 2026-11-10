import type { Metadata } from "next";
import { AirportTransfersHeroSection, AirportTransfersConnectionSection, AirportTransfersApproachSection, AirportTransfersExperienceSection, AirportTransfersGallerySection, AirportTransfersFleetSection, AirportTransfersFaqSection, AirportTransfersCTASection } from "@/components/services";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Airport Transfers — United Travel Services",
  description: "Professional chauffeur transportation for airport arrivals and departures with United Travel Services.",
};

export default function AirportTransfersPage() {
  return (
    <>
      <main className="bg-white p-4">
        <Reveal>
          <AirportTransfersHeroSection />
        </Reveal>
      </main>
      <Reveal>
        <AirportTransfersConnectionSection />
      </Reveal>
      <Reveal>
        <AirportTransfersApproachSection />
      </Reveal>
      <Reveal>
        <AirportTransfersExperienceSection />
      </Reveal>
      <Reveal>
        <AirportTransfersGallerySection />
      </Reveal>
      <Reveal>
        <AirportTransfersFleetSection />
      </Reveal>
      <Reveal>
        <AirportTransfersFaqSection />
      </Reveal>
      <Reveal>
        <AirportTransfersCTASection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
