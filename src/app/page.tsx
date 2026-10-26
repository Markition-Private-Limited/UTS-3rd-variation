import { HeroSection } from "@/components/hero";
import { AboutSection } from "@/components/about";
import { ServicesSection } from "@/components/services";
import { WhySection } from "@/components/why";
import { CtaSection } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-white p-4">
      <HeroSection />
      <div className="h-16 md:h-24" />
      <AboutSection />
      <div className="h-16 md:h-24" />
      <ServicesSection />
      <div className="h-16 md:h-24" />
      <WhySection />
      {/* <div className="h-16 md:h-24" />
      <CtaSection />
      <div className="h-24 md:h-32" />
      <Footer /> */}
    </main>
  );
}
