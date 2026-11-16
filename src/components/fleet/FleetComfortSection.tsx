"use client";

import Image from "next/image";
import { motion } from "motion/react";

const cards = [
  {
    image: "/images/fleet/comfort-refined-interiors.webp",
    alt: "Refined leather rear cabin interior",
    title: "Refined Interiors",
    description:
      "A welcoming passenger environment makes room to relax, prepare or enjoy the journey. Discuss your preferences when considering a vehicle category.",
  },
  {
    image: "/images/fleet/comfort-executive-presentation.webp",
    alt: "Chauffeur standing beside executive saloon",
    title: "Executive Presentation",
    description:
      "The presentation of a vehicle is part of the wider travel experience, complementing courteous chauffeur service and a considered arrival.",
  },
  {
    image: "/images/fleet/comfort-journey-options.webp",
    alt: "Luxury door panel detail",
    title: "Options for Your Journey",
    description:
      "Different journeys bring different requirements. Passenger details, luggage and travel purpose help inform the category you discuss.",
  },
];

export function FleetComfortSection() {
  return (
    <section className="bg-[#1a1a1a] px-6 py-14 sm:px-10 sm:py-18 md:px-12 md:py-20 lg:px-16 lg:py-24">
      {/* Header */}
      <motion.div
        className="mb-10 md:mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="mb-5 block text-[11px] font-medium tracking-[0.3em] uppercase"
          style={{ color: "#D4D4D4" }}
        >
          A Considered Environment
        </span>
        <h2 className="text-[32px] font-extralight leading-[112%] tracking-[-0.04em] text-white sm:text-[44px] md:text-[52px] lg:text-[62px]">
          Comfort in{" "}
          <span className="font-semibold">Every Detail.</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                style={{ objectPosition: "center center" }}
              />
            </div>

            <div className="mt-7 mb-5 h-px w-full bg-white/10" />

            <h3 className="mb-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-white">
              {card.title}
            </h3>
            <p className="text-[14px] font-light leading-[175%] tracking-[-0.01em] text-white/55">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
