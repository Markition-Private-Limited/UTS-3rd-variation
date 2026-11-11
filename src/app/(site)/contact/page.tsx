import type { Metadata } from "next";
import { ContactHeroSection, ContactIntroSection, ContactFormSection, ContactAssistSection, ContactAddressSection, ContactCTASection } from "@/components/contact";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact — United Travel Services",
  description: "Get in touch with United Travel Services to plan your next journey.",
};

export default function ContactPage() {
  return (
    <>
      <main className="bg-white p-4">
        <Reveal>
          <ContactHeroSection />
        </Reveal>
      </main>
      <Reveal>
        <ContactIntroSection />
      </Reveal>
      <Reveal>
        <ContactFormSection />
      </Reveal>
      <Reveal>
        <ContactAssistSection />
      </Reveal>
      <Reveal>
        <ContactAddressSection />
      </Reveal>
      <Reveal>
        <ContactCTASection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
