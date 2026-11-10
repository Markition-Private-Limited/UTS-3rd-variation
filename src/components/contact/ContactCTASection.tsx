"use client";

import Image from "next/image";
import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function ContactCTASection() {
  return (
    <div className="bg-white px-4 py-4">
      <div
        className="relative overflow-hidden rounded-[clamp(14px,1.5vw,20px)]"
        style={{ aspectRatio: "1584 / 672" }}
      >
        {/* Background image */}
        <Image
          src="/contact/contact-cta-bg.jpg"
          alt="Chauffeur opening car door outside The Goring hotel"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 45%" }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.42) 65%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        {/* Content — vertically centered */}
        <div className="absolute inset-0 z-10 flex items-center px-10 sm:px-14 lg:px-20">
          <div className="max-w-xl">
            <span className="block text-[11px] font-medium uppercase tracking-[0.3em] text-white/50 mb-7">
              The Next Journey Starts With You
            </span>

            <h2
              className="mb-5 font-extralight leading-[112%] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(28px, 3.8vw, 56px)" }}
            >
              Your Journey{" "}
              <span className="font-bold">Starts Here.</span>
            </h2>

            <p className="mb-10 max-w-[420px] text-[15px] font-light leading-[180%] text-white/65">
              Let us help you arrange a chauffeur experience built around your travel requirements.
            </p>

            <Link
              href="/services"
              className="group relative inline-flex overflow-hidden whitespace-nowrap items-center justify-between gap-4 rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ background: "#F9F9F9", color: "#1a1a1a" }}
            >
              <PillButtonContent fill="black">Explore Our Services</PillButtonContent>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
