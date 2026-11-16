"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

export function ContactHeroSection() {
  const router = useRouter();
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);

  return (
    <Reveal>
    <section
      data-navbar-theme="dark"
      className="relative -mx-2 -mt-2 -mb-2 h-[82svh] min-h-[560px] overflow-hidden rounded-[clamp(14px,1.5vw,20px)] sm:h-[calc(100svh-1rem)] sm:min-h-0"
    >
      {/* Background image */}
      <Image
        src="/contact/contact-hero.jpg"
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
      <div className="relative z-10 flex h-full flex-col justify-start px-5 pb-6 pt-[96px] sm:justify-between sm:px-10 sm:pb-10 sm:pt-[150px] lg:px-16">
        <div className="max-w-xl lg:max-w-2xl">
          <span className="mb-4 block text-[11px] font-medium tracking-[0.3em] text-white/60 sm:mb-6 sm:text-xs">
            GET IN TOUCH
          </span>
          <h1 className="mb-4 sm:mb-5">
            <span className="block text-[28px] font-extralight leading-[118%] tracking-[-0.04em] text-white sm:whitespace-nowrap sm:text-[52px] sm:leading-[121%] sm:tracking-[-0.06em] lg:text-[72px]">
              Let&apos;s Plan <span className="font-semibold">Your Next</span>
            </span>
            <span className="block text-[28px] font-semibold leading-[118%] tracking-[-0.04em] text-white sm:whitespace-nowrap sm:text-[52px] sm:leading-[121%] sm:tracking-[-0.06em] lg:text-[72px]">
              Journey.
            </span>
          </h1>
          <p className="mb-6 max-w-3xl font-light text-white/80 sm:mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: '24px', letterSpacing: 0 }}>
            <span className="hidden sm:inline" style={{ fontSize: '18px', lineHeight: '32px' }}>
              Whether you are arranging an airport transfer, planning executive travel or enquiring about a private journey, United Travel Services is here to help you explore the available options.
            </span>
            <span className="sm:hidden">
              Whether it&apos;s an airport transfer, executive travel or a private journey, we&apos;re here to help you explore the options.
            </span>
          </p>

          {/* Pill button + text link */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <button
              onClick={() => router.push("#enquiry-form")}
              onMouseEnter={() => setBtn1Hovered(true)}
              onMouseLeave={() => setBtn1Hovered(false)}
              className="group relative inline-flex w-fit overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[10px] font-medium tracking-[0.18em] uppercase px-5 py-2.5 rounded-full cursor-pointer sm:text-[11px] sm:px-6 sm:py-3"
              style={{
                background: "#F9F9F9",
                color: "#1a1a1a",
                border: `1px solid ${btn1Hovered ? "#F9F9F9" : "transparent"}`,
                transition: "border-color 300ms",
              }}
            >
              <PillButtonContent fill="black">Book a Chauffeur</PillButtonContent>
            </button>

            <button
              onClick={() => router.push("/services")}
              onMouseEnter={() => setBtn2Hovered(true)}
              onMouseLeave={() => setBtn2Hovered(false)}
              className="group relative inline-flex w-fit overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[10px] font-medium tracking-[0.18em] uppercase px-5 py-2.5 rounded-full cursor-pointer sm:text-[11px] sm:px-6 sm:py-3"
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

        <div className="absolute bottom-6 left-5 right-5 flex flex-col gap-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white/50 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-0 sm:text-[11px] sm:tracking-[0.2em]">
          <span className="whitespace-nowrap">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            {" / Contact"}
          </span>
          <span className="whitespace-nowrap">United Travel Services</span>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
