import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { BookingPanel } from "@/components/booking";

export function HeroSection() {
  return (
    <section className="relative h-[95vh] overflow-hidden rounded-[32px]">
      <Image
        src="/hero-bg.jpg"
        alt="Chauffeur opening car door"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 28%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/55" />

      <div className="relative z-10 flex h-full flex-col">
        <Navbar />

        <div className="flex flex-1 items-end justify-between gap-10 px-10 pb-64">
          <h1 className="max-w-[980px] shrink-0">
            <span className="block text-[72px] leading-[121%] tracking-[-0.06em] font-extralight text-white">
              Executive Chauffeur
            </span>
            <span className="block text-[72px] leading-[121%] tracking-[-0.06em] font-normal whitespace-nowrap text-white">
              Services Across the US
            </span>
          </h1>

          <p className="max-w-[640px] pb-2.5 text-[16px] font-light leading-[200%] tracking-[-0.03em] text-white/90">
            We believe luxury is more than just reaching your destination. It&apos;s about
            enjoying every moment of the journey. Our premium chauffeur services are designed to
            provide exceptional comfort, reliability
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 z-20 px-6">
        <BookingPanel />
      </div>
    </section>
  );
}
