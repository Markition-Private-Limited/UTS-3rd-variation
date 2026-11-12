import type { Metadata } from "next";
import { DayServiceHeroSection, DayServiceOverviewSection, DayServiceApproachSection, DayServicePerspectiveSection, DayServiceExperienceSection, AirportTransfersFleetSection, DayServiceFaqSection, DayServiceCTASection } from "@/components/services";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Day Service — United Travel Services",
  description: "Full-day chauffeur hire for a complete itinerary of appointments and private visits, with United Travel Services.",
};

export default function DayServicePage() {
  return (
    <>
      <main className="bg-white p-4">
        <DayServiceHeroSection />
      </main>
      <DayServiceOverviewSection />
      <DayServiceApproachSection />
      <DayServicePerspectiveSection />
      <DayServiceExperienceSection />
      <AirportTransfersFleetSection />
      <DayServiceFaqSection />
      <DayServiceCTASection />
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
