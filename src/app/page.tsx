import { HeroSection } from "@/components/hero";
import { AboutSection } from "@/components/about";
import { ServicesSection } from "@/components/services";
import { WhySection } from "@/components/why";
import { FleetSection } from "@/components/fleet/FleetSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { CTASection } from "@/components/cta/CTASection";
import { FooterSection } from "@/components/footer/FooterSection";

export default function Home() {
  return (
    <>
      <main className="bg-white p-4">
        <HeroSection />
        <div className="h-16 md:h-24" />
        <AboutSection />
        <div className="h-16 md:h-24" />
        <ServicesSection />
        <div className="h-16 md:h-24" />
        <WhySection />
      </main>
      <FleetSection />
      <TestimonialsSection />
      <div className="bg-white px-4 pb-4">
        <CTASection />
      </div>
      <div className="bg-white p-4">
        <FooterSection />
      </div>
    </>
  );
}
