import { HeroSection } from "@/components/hero";
import { AboutSection } from "@/components/about";

export default function Home() {
  return (
    <main className="bg-white p-4">
      <HeroSection />
      <div className="h-16 md:h-24" />
      <AboutSection />
    </main>
  );
}
