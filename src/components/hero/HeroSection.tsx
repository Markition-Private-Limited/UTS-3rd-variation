import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { BookingPanel } from "@/components/booking";

export function HeroSection() {
  return (
    <section className="relative h-[95vh] overflow-hidden rounded-[32px]">
      <div className="absolute -inset-[10%]">
        <Image
          src="/hero-bg.jpg"
          alt="Chauffeur opening car door"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <Navbar />

        <div className="flex flex-1 items-end justify-between gap-10 px-10 pb-60">
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
