"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

type ServiceCard = {
  slug: string;
  index: string;
  src: string;
  alt: string;
  title: string;
  body: string;
  zoomOut?: boolean;
};

const SERVICES: ServiceCard[] = [
  {
    slug: "airport-transfers",
    index: "01",
    src: "/services/explore-airport-transfers.jpg",
    alt: "Mercedes-Benz S-Class with chauffeur at Heathrow Terminal 5 departures",
    title: "Airport Transfers",
    body: "Professional journeys to and from the airport, with pickup and onward travel discussed around your flight.",
  },
  {
    slug: "city-to-city",
    index: "02",
    src: "/services/explore-city-to-city.webp",
    alt: "Mercedes-Benz S-Class travelling on the M25 motorway toward Heathrow and London",
    title: "City to City",
    body: "Private travel between towns and cities, connecting the addresses that matter to your itinerary.",
    zoomOut: true,
  },
  {
    slug: "sightseeing-chauffeur",
    index: "03",
    src: "/services/explore-sightseeing-chauffeur.webp",
    alt: "Chauffeur holding open the rear door of a Mercedes-Benz S-Class beside a lakeside promenade at golden hour",
    title: "Sightseeing Chauffeur",
    body: "Explore the city in comfort, with a dedicated chauffeur guiding you between landmarks, attractions and hidden gems at an unhurried pace.",
  },
  {
    slug: "hourly-chauffeur",
    index: "04",
    src: "/services/explore-hourly-chauffeur.jpg",
    alt: "Businessman checking his phone beside a Jaguar XJ in Belgravia",
    title: "Hourly Chauffeur",
    body: "An agreed period of chauffeur travel for a schedule with more than one destination.",
  },
  {
    slug: "day-service",
    index: "05",
    src: "/services/explore-full-day-chauffeur-hire.jpg",
    alt: "Jaguar XJ parked outside a country manor house",
    title: "Full-Day Chauffeur Hire",
    body: "A planned day of travel shaped around successive appointments and your chosen itinerary.",
  },
];

function ServiceCardImage({
  src,
  alt,
  reduceMotion,
  zoomOut,
}: {
  src: string;
  alt: string;
  reduceMotion: boolean;
  zoomOut?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 22, mass: 0.6 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const translateX = useTransform(sx, [0, 1], [-6, 6]);
  const translateY = useTransform(sy, [0, 1], [-5, 5]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden rounded-2xl bg-white"
      style={{ aspectRatio: "2 / 1" }}
    >
      <motion.div
        className="absolute inset-[-4%]"
        style={reduceMotion ? undefined : { x: translateX, y: translateY }}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.6 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover grayscale-[35%] transition-[filter] duration-500 ease-out group-hover:grayscale-0"
          style={zoomOut ? { transform: "scale(0.92)" } : undefined}
        />
      </motion.div>
    </div>
  );
}

function ExploreLink() {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-[#202020] opacity-80 transition-opacity duration-300 group-hover:opacity-100">
      <span className="underline decoration-[#EAEAEA] decoration-1 underline-offset-4 transition-colors duration-300 group-hover:decoration-[#202020]">
        EXPLORE SERVICE
      </span>
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[5px]"
      >
        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ServiceCardItem({ item, index }: { item: ServiceCard; index: number }) {
  const reduceMotion = useReducedMotion() ?? false;

  // Rises up and in from the left as it scrolls into view — triggers early
  // (while still mostly below the fold) so it's clearly visible playing out
  // rather than finishing before it's ever seen.
  const reveal = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -140, y: 48 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: (index % 2) * 0.08,
          },
        },
      };

  return (
    <motion.div
      className="h-full"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px 120px 0px" }}
    >
      <Link href={`/services/${item.slug}`} className="group flex h-full flex-col">
        <ServiceCardImage src={item.src} alt={item.alt} reduceMotion={reduceMotion} zoomOut={item.zoomOut} />

        <div className="mt-5 flex items-center gap-4">
          <span className="text-[36px] font-extralight leading-none tracking-[-0.06em] text-[#BDBDBD] sm:text-[48px] lg:text-[60px]">
            {item.index}
          </span>
          <h3 className="text-[18px] font-semibold uppercase leading-[121%] tracking-[-0.06em] text-[#242424] transition-transform duration-300 group-hover:-translate-y-[2px] sm:text-[22px] lg:text-[26px]">
            {item.title}
          </h3>
        </div>

        <p className="mt-3 text-[13px] leading-[160%] text-[#858585] sm:text-[14px] sm:leading-[165%]">
          {item.body}
        </p>

        <div className="mt-3">
          <ExploreLink />
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesExploreSection() {
  return (
    <section className="bg-white px-4 pt-0 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
          {SERVICES.map((item, i) => (
            <ServiceCardItem key={item.slug} item={item} index={i} />
          ))}

          {/* Empty slot beside the 5th card — filled with the brand watermark, same as the homepage services section */}
          <div
            className="relative hidden h-full min-h-[260px] items-center justify-center overflow-hidden sm:flex"
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            <div className="pointer-events-none relative h-[70%] w-[70%] max-h-[320px] max-w-[320px]">
              <Image src="/uts-mark.png" alt="" fill sizes="320px" loading="eager" className="object-contain" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
