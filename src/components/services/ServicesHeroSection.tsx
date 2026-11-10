"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function ServicesHeroSection() {
  const router = useRouter();
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);

  return (
    <section
      data-navbar-theme="dark"
      className="relative -mx-2 -mt-2 -mb-2 overflow-hidden rounded-[clamp(14px,1.5vw,20px)]"
      style={{ height: "calc(100svh - 1rem)" }}
    >
      {/* Background image */}
      <Image
        src="/services/services-hero.jpg"
        alt="Chauffeur greeting clients beside a Mercedes-Benz at a hotel entrance in the evening"
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
            SERVICES
          </span>
          <h1 className="mb-5">
            <span className="block whitespace-nowrap text-[36px] font-extralight leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              Chauffeur Services <span className="font-semibold">Across</span>
            </span>
            <span className="block whitespace-nowrap text-[36px] font-semibold leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              the UK.
            </span>
          </h1>
          <p className="max-w-xl text-[15px] font-light leading-[180%] tracking-[-0.02em] text-white/80 mb-8">
            From airport arrivals to executive engagements and private journeys, United Travel Services offers professional chauffeur transportation designed around your schedule, comfort and destination.
          </p>

          {/* Pill buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => router.push("/services#services")}
              onMouseEnter={() => setBtn1Hovered(true)}
              onMouseLeave={() => setBtn1Hovered(false)}
              className="group relative inline-flex overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[11px] font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-full cursor-pointer"
              style={{
                background: "#F9F9F9",
                color: "#1a1a1a",
                border: `1px solid ${btn1Hovered ? "#F9F9F9" : "transparent"}`,
                transition: "border-color 300ms",
              }}
            >
              <PillButtonContent fill="black">Explore Our Services</PillButtonContent>
            </button>

            <button
              onClick={() => router.push("/#contact")}
              onMouseEnter={() => setBtn2Hovered(true)}
              onMouseLeave={() => setBtn2Hovered(false)}
              className="group relative inline-flex overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[11px] font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-full cursor-pointer"
              style={{
                background: "transparent",
                color: "#F9F9F9",
                border: `1px solid ${btn2Hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"}`,
                transition: "border-color 300ms",
              }}
            >
              <PillButtonContent fill="white">Make an Enquiry</PillButtonContent>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          <span>
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            {" / Services"}
          </span>
          <span>United Travel Services</span>
        </div>
      </div>
    </section>
  );
}
