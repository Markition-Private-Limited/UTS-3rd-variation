"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    src: "/services/occasion-airport-transfers.jpg",
    alt: "Mercedes-Benz saloon arriving at an airport terminal",
    title: "Airport Transfers",
    body: "A considered connection between your flight and your onward destination.",
  },
  {
    src: "/services/occasion-corporate-chauffeur.jpg",
    alt: "Chauffeur client walking to a Mercedes-Benz S-Class with luggage",
    title: "Hourly Chauffeur",
    body: "Flexible, private chauffeur service offering comfort and convenience for as long as you need.",
  },
  {
    src: "/services/occasion-city-to-city.jpg",
    alt: "Bentley Flying Spur driving through the English countryside",
    title: "City to City",
    body: "Private chauffeur journeys connecting your chosen towns, cities and addresses.",
  },
  {
    src: "/services/occasion-sightseeing-chauffeur-v2.webp",
    alt: "Chauffeur greeting a client beside a Mercedes-Benz S-Class in front of Big Ben",
    title: "Sightseeing Chauffeur",
    body: "A private driver to guide you through the city's landmarks in considered comfort.",
  },
  {
    src: "/services/occasion-day-service-v2.webp",
    alt: "Executive passenger seated in the rear cabin of a BMW i7 looking out the window",
    title: "Day Service",
    body: "A dedicated vehicle and driver at your disposal for the full day's engagements.",
  },
];

// Duplicated so the track can loop seamlessly.
const LOOP_SERVICES = [...SERVICES, ...SERVICES];

const SPEED_PX_PER_SEC = 40;

function ServiceCard({ item }: { item: (typeof SERVICES)[number] }) {
  return (
    <Link
      href="/#services"
      className="group block shrink-0 basis-[min(380px,calc((100%-40px)/3))]"
    >
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "3/2" }}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          draggable={false}
        />
      </div>
      <div className="mt-6">
        <h3 className="mb-3 text-[22px] font-bold tracking-[-0.02em] text-neutral-900">
          {item.title}
        </h3>
        <p className="mb-4 text-[15px] leading-[170%] text-neutral-500">
          {item.body}
        </p>
        <span className="inline-flex origin-left scale-100 items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-neutral-900 transition-transform duration-300 ease-out group-hover:scale-110">
          EXPLORE SERVICE
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function AboutServicesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      halfWidthRef.current = el.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const tick = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!pausedRef.current && halfWidthRef.current > 0) {
        let next = el.scrollLeft + SPEED_PX_PER_SEC * dt;
        if (next >= halfWidthRef.current) next -= halfWidthRef.current;
        el.scrollLeft = next;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="bg-white pt-6 pb-14 lg:pt-8 lg:pb-20">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-16 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
            <div>
              <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
                OUR SERVICES
              </span>
              <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
                Travel for <span className="font-semibold">Every Occasion.</span>
              </h2>
            </div>
            <div className="lg:pt-[37px]">
              <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
                From airport transfers to executive transportation, discover chauffeur services designed to support a variety of travel requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards marquee — continuous, edge-to-edge, no stopping */}
      <div
        ref={trackRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        className="flex gap-5 overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {LOOP_SERVICES.map((item, i) => (
          <ServiceCard key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}
