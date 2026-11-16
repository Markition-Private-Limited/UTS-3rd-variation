"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const services = [
  {
    slug: "airport-transfers",
    image: "/images/fleet/services-airport-transfers.jpg",
    alt: "Executive saloon at airport departures",
    title: "Airport Transfers",
    description: "Consider your terminal, flight and luggage alongside your preferred vehicle category.",
  },
  {
    slug: "corporate-chauffeur",
    image: "/images/fleet/services-corporate-chauffeur.jpg",
    alt: "Businessman arriving at corporate office with chauffeur",
    title: "Corporate Chauffeur",
    description: "A professional journey to your next business engagement, with passenger needs in view.",
  },
  {
    slug: "city-to-city",
    image: "/images/fleet/services-city-to-city.jpg",
    alt: "Executive saloon on a country road between cities",
    title: "City to City",
    description: "Connect your chosen addresses with private chauffeur transportation between cities.",
  },
];

export function FleetServicesSection() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 sm:py-18 md:px-12 md:py-20 lg:px-16 lg:py-24">
      {/* Header */}
      <motion.div
        className="mb-10 md:mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="mb-5 block text-[11px] font-medium tracking-[0.3em] text-neutral-400 uppercase">
          Our Services
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end md:gap-16 lg:gap-20">
          <h2 className="text-[32px] font-extralight leading-[112%] tracking-[-0.04em] text-neutral-900 sm:text-[44px] md:text-[48px] lg:text-[56px]">
            A Vehicle{" "}
            <span className="font-semibold">for Every Occasion.</span>
          </h2>
          <p className="text-[15px] font-normal leading-[175%] tracking-[-0.01em] text-neutral-500 md:pb-2">
            Explore the service that reflects your plans, then discuss a vehicle category in the context of the complete journey.
          </p>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          >
            <Link href={`/services/${service.slug}`} className="group block">
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{ aspectRatio: "16/10" }}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-[20px] font-bold leading-snug tracking-[-0.02em] text-neutral-900">
                  {service.title}
                </h3>
                <p className="mb-4 text-[15px] leading-[170%] text-neutral-500">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-neutral-900">
                  EXPLORE SERVICE
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
