import { HeroSection } from "@/components/hero";
import { AboutSection } from "@/components/about";
import { ServicesSection } from "@/components/services";
import { WhySection } from "@/components/why";
import { FleetSection } from "@/components/fleet/FleetSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { CTASection } from "@/components/cta/CTASection";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  return (
    <>
      <main className="bg-white p-4">
        <HeroSection />
        <div className="h-16 md:h-24" />
        <Reveal className="-mx-4">
          <AboutSection />
        </Reveal>
        <div className="h-16 md:h-24" />
        <ServicesSection />
        <div className="h-16 md:h-24" />
        <Reveal>
          <WhySection />
        </Reveal>
      </main>
      <Reveal>
        <FleetSection />
      </Reveal>
      <Reveal>
        <TestimonialsSection />
      </Reveal>
      <div className="bg-white px-4 pt-16 pb-[96px]">
        <Reveal>
          <CTASection />
        </Reveal>
      </div>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
