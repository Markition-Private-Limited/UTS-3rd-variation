import type { Metadata } from "next";
import { HourlyChauffeurHeroSection, HourlyChauffeurOverviewSection, HourlyChauffeurApproachSection, HourlyChauffeurExperienceSection, HourlyChauffeurScheduleSection, AirportTransfersFleetSection, FleetDiscoverCTA, HourlyChauffeurFaqSection, HourlyChauffeurCTASection } from "@/components/services";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Hourly Chauffeur — United Travel Services",
  description: "Chauffeur travel by the hour for a schedule with more than one destination, with United Travel Services.",
};

export default function HourlyChauffeurPage() {
  return (
    <>
      <main className="bg-white p-4">
        <Reveal>
          <HourlyChauffeurHeroSection />
        </Reveal>
      </main>
      <Reveal>
        <HourlyChauffeurOverviewSection />
      </Reveal>
      <Reveal>
        <HourlyChauffeurApproachSection />
      </Reveal>
      <Reveal>
        <HourlyChauffeurExperienceSection />
      </Reveal>
      <Reveal>
        <HourlyChauffeurScheduleSection />
      </Reveal>
      <Reveal>
        <AirportTransfersFleetSection />
      </Reveal>
      <Reveal>
        <FleetDiscoverCTA />
      </Reveal>
      <Reveal>
        <HourlyChauffeurFaqSection />
      </Reveal>
      <Reveal>
        <HourlyChauffeurCTASection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
