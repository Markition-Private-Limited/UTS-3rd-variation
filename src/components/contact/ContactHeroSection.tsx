"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function ContactHeroSection() {
  const router = useRouter();
  const [btn1Hovered, setBtn1Hovered] = useState(false);

  return (
    <section
      data-navbar-theme="dark"
      className="relative -mx-2 -mt-2 -mb-2 overflow-hidden rounded-[clamp(14px,1.5vw,20px)]"
      style={{ height: "calc(100svh - 1rem)" }}
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
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-[120px] sm:px-10 sm:pt-[150px] sm:pb-10 lg:px-16">
        <div className="max-w-xl lg:max-w-2xl">
          <span className="block text-xs font-medium tracking-[0.3em] text-white/60 mb-6">
            GET IN TOUCH
          </span>
          <h1 className="mb-5">
            <span className="block whitespace-nowrap text-[36px] font-extralight leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              Let&apos;s Plan <span className="font-semibold">Your Next</span>
            </span>
            <span className="block whitespace-nowrap text-[36px] font-semibold leading-[121%] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[72px]">
              Journey.
            </span>
          </h1>
          <p className="max-w-md text-[15px] font-light leading-[180%] tracking-[-0.02em] text-white/80 mb-8">
            Whether you are arranging an airport transfer, planning executive travel or enquiring about a private journey, United Travel Services is here to help you explore the available options.
          </p>

          {/* Pill button + text link */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => router.push("#enquiry-form")}
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
              <PillButtonContent fill="black">Send an Enquiry</PillButtonContent>
            </button>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
            >
              Our Services
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          <span>
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            {" / Contact"}
          </span>
          <span>United Travel Services</span>
        </div>
      </div>
    </section>
  );
}
