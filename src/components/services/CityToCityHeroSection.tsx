"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

export function CityToCityHeroSection() {
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
        src="/services/city-to-city-hero.webp"
        alt="Chauffeur-driven Mercedes-Benz travelling a winding countryside road between cities at dusk"
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
            CITY TO CITY
          </span>
          <h1 className="mb-5">
            <span className="block whitespace-nowrap text-[36px] font-extralight leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              Between Cities.
            </span>
            <span className="block whitespace-nowrap text-[36px] font-semibold leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              Beyond the Ordinary.
            </span>
          </h1>
          <p className="max-w-xl text-[15px] font-light leading-[180%] tracking-[-0.02em] text-white/80 mb-8">
            Connect your chosen addresses with private chauffeur travel. From a business appointment in another city to a personal visit further afield, let the road journey become a comfortable part of your plans.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-6">
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
              <PillButtonContent fill="black">Enquire About City to City Travel</PillButtonContent>
            </button>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-white/80 transition-colors duration-300 hover:text-white"
            >
              <span className="underline decoration-white/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-white">
                Our Services
              </span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          <span>United Travel Services</span>
          <span>City to City</span>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
