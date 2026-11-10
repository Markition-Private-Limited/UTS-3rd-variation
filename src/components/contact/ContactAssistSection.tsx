"use client";

import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function ContactAssistSection() {
  return (
    <section
      className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24"
      style={{ background: "#ffffff" }}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
        {/* Left — caption, heading, description */}
        <div>
          <span className="block text-[11px] font-medium uppercase tracking-[0.3em] text-black/35 mb-7">
            Explore Your Options
          </span>
          <h2 className="mb-6 text-[42px] font-extralight leading-[108%] tracking-[-0.04em] text-black sm:text-[52px] lg:text-[62px]">
            How Can <span className="font-bold">We Assist?</span>
          </h2>
          <p className="max-w-[520px] text-[15px] font-light leading-[185%] text-black/50">
            From individual reservations to executive travel arrangements, we welcome enquiries
            about the chauffeur services offered by United Travel Services.
          </p>
        </div>

        {/* Right — two dark buttons */}
        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            href="/services"
            className="group relative inline-flex w-full overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[11px] font-medium tracking-[0.18em] uppercase px-6 py-3.5 rounded-full lg:max-w-[280px]"
            style={{ background: "#141414", color: "#ffffff" }}
          >
            <PillButtonContent fill="white">Services</PillButtonContent>
          </Link>

          <Link
            href="/fleet"
            className="group relative inline-flex w-full overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[11px] font-medium tracking-[0.18em] uppercase px-6 py-3.5 rounded-full lg:max-w-[280px]"
            style={{ background: "#141414", color: "#ffffff" }}
          >
            <PillButtonContent fill="white">Our Fleet</PillButtonContent>
          </Link>
        </div>
      </div>
    </section>
  );
}
