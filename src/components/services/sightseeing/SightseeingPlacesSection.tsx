"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function SightseeingPlacesSection() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 sm:py-18 md:px-12 md:py-20 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">

        {/* Left — image */}
        <motion.div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: "3/4" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/services/sightseeing-places.jpg"
            alt="Group of visitors exploring a historic English countryside courtyard with a classic car"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: "center center" }}
          />
        </motion.div>

        {/* Right — content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          <span className="mb-5 block text-[11px] font-medium tracking-[0.3em] text-neutral-400 uppercase">
            A Visit Shaped by Your Interests
          </span>

          <h2 className="mb-7 text-[32px] font-extralight leading-[112%] tracking-[-0.04em] text-neutral-900 sm:text-[44px] lg:text-[52px]">
            The Places You{" "}
            <span className="font-semibold">Came to Discover.</span>
          </h2>

          <p className="text-[15px] font-normal leading-[185%] tracking-[-0.01em] text-neutral-500">
            A memorable visit begins with knowing what you would like to see. Sightseeing Chauffeur travel offers a private transport arrangement to discuss around your preferred landmarks, neighbourhoods or countryside destinations. It may suit a first visit, time with family or a day spent discovering somewhere new. Tell United Travel Services your interests, starting point and the time available, together with any reservations you have already made. Preferred stops, the sequence of travel and vehicle requirements can then be considered. Attraction admission, opening times and any guiding requirements should be discussed separately rather than assumed to be included.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
