"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function SightseeingHeroSection() {
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
        src="/services/sightseeing-chauffeur-hero.jpg"
        alt="Luxury Mercedes-Benz parked at Bath's Royal Crescent at night"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "60% center" }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.78) 20%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.28) 65%, rgba(0,0,0,0.10) 85%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl lg:max-w-4xl">
          <span className="block text-xs font-medium tracking-[0.3em] text-white/60 mb-6">
            SIGHTSEEING CHAUFFEUR
          </span>

          <h1 className="mb-5">
            <span className="block text-[36px] font-extralight leading-[112%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[68px]">
              See More. Take{" "}
              <span className="font-semibold">the Journey</span>
            </span>
            <span className="block text-[36px] font-semibold leading-[112%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[68px]">
              Personally.
            </span>
          </h1>

          <p className="max-w-xl text-[15px] font-light leading-[180%] tracking-[-0.02em] text-white/80 mb-8">
            Discover a different perspective on your visit with a private chauffeur itinerary. Share the landmarks, places and interests that matter to you, and discuss a journey with room to enjoy the road between them.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => router.push("/contact#enquiry")}
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
              <PillButtonContent fill="black">Enquire About Sightseeing Travel</PillButtonContent>
            </button>

            <button
              onClick={() => router.push("/services")}
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
              <PillButtonContent fill="white">Our Services</PillButtonContent>
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          <span>United Travel Services</span>
          <span>
            <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
            {" / "}
            <Link href="/services" className="transition-colors hover:text-white/80">Services</Link>
            {" / Sightseeing Chauffeur"}
          </span>
        </div>
      </div>
    </section>
  );
}
