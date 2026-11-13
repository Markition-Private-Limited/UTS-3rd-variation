"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function ServicesCTASection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="bg-white p-4 pb-8 sm:p-5 sm:pb-10 lg:p-6 lg:pb-14">
      <motion.div
        className="relative flex min-h-[600px] w-full items-center overflow-hidden rounded-[32px] sm:min-h-[440px] lg:aspect-[1584/600] lg:min-h-0"
        initial={reduceMotion ? false : { y: 170 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px 160px 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.55 }}
      >
        <Image
          src="/services/uts-cta-chauffeur-door.jpg"
          alt="United Travel Services chauffeur opening a Bentley door outside a London hotel"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Left-to-right dark gradient so the text reads against the photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 72%)",
          }}
        />

        <div className="relative z-10 w-full py-10 sm:py-12">
          <div className="max-w-2xl px-6 sm:px-12 lg:px-16">
            <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-neutral-300 sm:mb-6 sm:text-[11px]">
              THE NEXT JOURNEY STARTS WITH YOU
            </span>
            <h2 className="mb-4 sm:mb-6">
              <span className="block text-[26px] font-extralight leading-[120%] tracking-[-0.02em] text-white sm:whitespace-nowrap sm:text-[44px] sm:leading-[115%] sm:tracking-[-0.03em] lg:text-[56px]">
                Let&apos;s Plan <span className="font-semibold">Your Next Journey.</span>
              </span>
            </h2>
            <p className="mb-6 text-[14px] font-normal leading-[165%] tracking-[-0.01em] text-neutral-300 sm:mb-8 sm:text-[15px] sm:leading-[170%]">
              Tell us about your travel requirements and let United Travel Services help you explore the available chauffeur options.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex w-fit items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full border border-white bg-white text-black"
              style={{ padding: "16px 28px", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
            >
              <PillButtonContent fill="black">Book a Chauffeur</PillButtonContent>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
