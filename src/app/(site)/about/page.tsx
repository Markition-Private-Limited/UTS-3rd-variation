import type { Metadata } from "next";
import { AboutHeroSection, AboutIntroSection, AboutPhilosophySection, AboutStandardSection, AboutWhyUTSSection, AboutCollectionSection, AboutServicesSection, AboutCTASection } from "@/components/about";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About UTS — United Travel Services",
  description: "More than a journey. A considered experience with United Travel Services.",
};

export default function AboutPage() {
  return (
    <>
      <main className="bg-white p-4">
        <AboutHeroSection />
      </main>
      <AboutIntroSection />
      <AboutPhilosophySection />
      <AboutStandardSection />
      <AboutWhyUTSSection />
      <AboutCollectionSection />
      <AboutServicesSection />
      <AboutCTASection />
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
