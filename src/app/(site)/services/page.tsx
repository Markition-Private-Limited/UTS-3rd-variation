import type { Metadata } from "next";
import { ServicesHeroSection, ServicesIntroSection, ServicesExploreSection, ServicesAdvantageSection, ServicesJourneySection, ServicesFleetSection, ServicesFaqSection, ServicesCTASection } from "@/components/services";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Services — United Travel Services",
  description: "Chauffeur services across the UK with United Travel Services.",
};

export default function ServicesPage() {
  return (
    <>
      <main className="bg-white p-4">
        <Reveal>
          <ServicesHeroSection />
        </Reveal>
      </main>
      <Reveal>
        <ServicesIntroSection />
      </Reveal>
      <Reveal>
        <ServicesExploreSection />
      </Reveal>
      <Reveal>
        <ServicesAdvantageSection />
      </Reveal>
      <Reveal>
        <ServicesJourneySection />
      </Reveal>
      <Reveal>
        <ServicesFleetSection />
      </Reveal>
      <Reveal>
        <ServicesFaqSection />
      </Reveal>
      <Reveal>
        <ServicesCTASection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
