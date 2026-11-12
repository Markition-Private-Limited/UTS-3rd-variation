"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

export function AirportTransfersHeroSection() {
  const router = useRouter();
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <Reveal>
    <section
      data-navbar-theme="dark"
      className="relative -mx-2 -mt-2 -mb-2 overflow-hidden rounded-[clamp(14px,1.5vw,20px)]"
      style={{ height: "calc(100svh - 1rem)" }}
    >
      {/* Background image */}
      <Image
        src="/services/airport-transfers-hero.jpg"
        alt="Chauffeur standing beside a Mercedes-Benz S-Class outside an airport terminal at night"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "60% center" }}
      />

      {/* Gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.10) 85%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 24%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-[120px] sm:px-10 sm:pt-[150px] sm:pb-10 lg:px-16">
        <div className="max-w-xl lg:max-w-2xl">
          <span className="block text-xs font-medium tracking-[0.3em] text-white/60 mb-6">
            AIRPORT TRANSFERS
          </span>
          <h1 className="mb-5">
            <span className="block whitespace-nowrap text-[36px] font-extralight leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              Arrive in Comfort.
            </span>
            <span className="block whitespace-nowrap text-[36px] font-semibold leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              Travel in Style.
            </span>
          </h1>
          <p className="max-w-xl text-[15px] font-light leading-[180%] tracking-[-0.02em] text-white/80 mb-8">
            Begin or conclude your journey with professional chauffeur transportation arranged around your travel requirements. United Travel Services helps make airport journeys more comfortable, organised and straightforward, with attention to the details that matter before and after your flight.
          </p>

          {/* Pill button */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => router.push("/contact")}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              className="group relative inline-flex overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[11px] font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-full cursor-pointer"
              style={{
                background: "#F9F9F9",
                color: "#1a1a1a",
                border: `1px solid ${btnHovered ? "#F9F9F9" : "transparent"}`,
                transition: "border-color 300ms",
              }}
            >
              <PillButtonContent fill="black">Aquire the Airport Transfer service</PillButtonContent>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          <span>Airport Transfers</span>
          <span>United Travel Services</span>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
