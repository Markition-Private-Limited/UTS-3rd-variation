"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function FleetCTASection() {
  const router = useRouter();
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section className="bg-white p-4">
      <div className="relative w-full overflow-hidden rounded-[clamp(14px,1.5vw,20px)]">
        {/* Background image */}
        <Image
          src="/images/fleet/cta-mercedes-brutalist.jpg"
          alt="Mercedes E-Class at a brutalist architectural location"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />

        {/* Dark overlay — heavy left, fades right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.78) 25%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.20) 75%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 md:px-14 md:py-18 lg:px-16 lg:py-20">
          <div className="max-w-xl">
            <span className="mb-5 block text-[11px] font-medium tracking-[0.3em] text-white/60 uppercase">
              The Next Journey Starts With You
            </span>

            <h2 className="mb-5 text-[28px] font-extralight leading-[112%] tracking-[-0.04em] text-white sm:text-[38px] md:text-[44px] lg:text-[52px]">
              Your Next{" "}
              <span className="font-semibold">Journey Starts Here.</span>
            </h2>

            <p className="mb-8 text-[15px] font-light leading-[170%] text-white/70 max-w-md">
              Tell us about your travel plans and passenger requirements to discuss suitable vehicle options with United Travel Services.
            </p>

            <button
              onClick={() => router.push("/contact#enquiry")}
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
              <PillButtonContent fill="black">Enquire About a Vehicle</PillButtonContent>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
