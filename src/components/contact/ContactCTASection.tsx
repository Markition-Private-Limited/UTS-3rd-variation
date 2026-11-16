import Image from "next/image";
import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

export function ContactCTASection() {
  return (
    <Reveal>
    <section className="bg-white p-4 pb-8 sm:p-5 sm:pb-10 lg:p-6 lg:pb-14">
      <div className="relative flex min-h-[600px] w-full items-center overflow-hidden rounded-[32px] sm:min-h-[440px] lg:aspect-[1584/600] lg:min-h-0">
        <Image
          src="/contact/uts-cta-goring.jpg"
          alt="United Travel Services chauffeur beside a Bentley at The Goring hotel entrance"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Left-to-right dark gradient so the text reads against the photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 72%)",
          }}
        />

        <div className="relative z-10 w-full py-10 sm:py-12">
          <div className="max-w-2xl px-6 sm:px-12 lg:px-16">
            <span className="mb-4 block text-[10px] font-medium tracking-[0.18em] text-neutral-300 sm:mb-6 sm:text-[11px] sm:tracking-[0.3em]">
              THE NEXT JOURNEY STARTS WITH YOU
            </span>
            <h2 className="mb-4 sm:mb-6">
              <span className="block text-[26px] font-extralight leading-[120%] tracking-[-0.02em] text-white sm:whitespace-nowrap sm:text-[44px] sm:leading-[112%] sm:tracking-[-0.03em] lg:text-[56px]">
                Your Journey <span className="font-semibold">Starts Here.</span>
              </span>
            </h2>
            <p className="mb-6 text-[14px] font-normal leading-[165%] tracking-[-0.01em] text-neutral-300 sm:mb-8 sm:text-[15px] sm:leading-[170%]">
              Let us help you arrange a chauffeur experience built around your travel requirements.
            </p>
            <Link
              href="/services"
              className="group relative inline-flex w-fit items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full text-[11px] font-medium tracking-[0.18em] uppercase px-6 py-3"
              style={{ background: "#F9F9F9", color: "#1a1a1a" }}
            >
              <PillButtonContent fill="black">Explore Our Services</PillButtonContent>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
