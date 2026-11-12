"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StatCounter } from "./StatCounter";
import PillButtonContent from "@/components/ui/PillButtonContent";

const SERVICES = [
  {
    index: "01",
    label: "AIRPORT TRANSFERS",
    badge: "Airport Travel",
    title: "Arrive in Comfort. Travel in Style.",
    description:
      "Enjoy a seamless journey to or from the airport with private transportation planned around your schedule.",
    src: "/services/airport-transfer.jpg",
  },
  {
    index: "02",
    label: "CITY TO CITY",
    badge: "Point to Point",
    title: "A Better Way Between Cities.",
    description:
      "Travel between destinations in privacy and comfort, with a journey arranged around your timeline.",
    src: "/services/city-to-city.jpg",
  },
  {
    index: "03",
    label: "INTER CITY",
    badge: "Inter City",
    title: "Seamless Travel Across Every Mile.",
    description:
      "From suburb to city center, our inter-city service ensures you travel without compromise.",
    src: "/services/inter-city.jpg",
  },
  {
    index: "04",
    label: "HOURLY CHAUFFEUR",
    badge: "Hourly",
    title: "Your Time, Your Terms.",
    description:
      "Book a dedicated chauffeur by the hour for meetings, events, or wherever the day takes you.",
    src: "/services/hourly-chauffer.jpg",
  },
  {
    index: "05",
    label: "CORPORATE CHAUFFEUR",
    badge: "Corporate",
    title: "Executive Travel, Refined.",
    description:
      "Reliable, discreet, and professional — our corporate chauffeur service keeps your business moving.",
    src: "/services/co-operate-chauffer.jpg",
  },
];

const STATS = [
  { value: "24/7", label: "Customer Support" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Chauffeurs & Vehicles" },
  { value: "10+", label: "Years of Experience" },
];

function ServiceCard({
  item,
  popped,
  onPillEnter,
  onPillLeave,
}: {
  item: (typeof SERVICES)[number];
  popped: boolean;
  onPillEnter: () => void;
  onPillLeave: () => void;
}) {
  return (
    <article
      className="relative h-[450px] w-[calc(100vw-48px)] sm:w-[340px] flex-none overflow-hidden rounded-3xl md:w-[734px]"
      style={{
        transform: popped ? "scale(1.04)" : "scale(1)",
        boxShadow: popped ? "0 20px 50px rgba(0,0,0,0.45)" : "none",
        transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease",
        zIndex: popped ? 10 : 1,
      }}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        unoptimized
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center justify-between">
          <span
            className="rounded-md px-3 py-1.5 text-[11px] tracking-[0.25em] text-white/90"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {item.index} / {item.label}
          </span>
          <span className="rounded-sm border border-white/60 px-2 py-0.5 text-[11px] text-white">
            {item.badge}
          </span>
        </div>

        <h3 className="mt-6 text-[22px] font-normal leading-tight tracking-[-0.03em]">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[640px] text-[15px] font-light tracking-[-0.02em] text-white/90">
          {item.description}
        </p>

        <button
          className="group mt-5 relative overflow-hidden whitespace-nowrap inline-flex items-center justify-between gap-4 rounded-full border border-white/50 px-4 py-3 text-xs tracking-[0.2em] text-white cursor-pointer"
          onMouseEnter={onPillEnter}
          onMouseLeave={onPillLeave}
        >
          <PillButtonContent fill="white">
            EXPLORE SERVICE
          </PillButtonContent>
        </button>
      </div>
    </article>
  );
}

const AUTO_SPEED = 40; // idle drift speed, px/sec
const MAX_SPIN_SPEED = 4500; // px/sec cap so a hard flick doesn't fly off-screen
const SPIN_FRICTION = 0.94; // per-frame-at-60fps velocity retention while spinning down

export function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const movedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  // Velocity-driven track, like a flicked wheel: dragging samples pointer
  // speed, releasing hands that speed to a momentum spin-down that eases
  // back into the idle auto-drift rather than stopping dead.
  const velocityRef = useRef(AUTO_SPEED); // px/sec, +ve = scrolling forward
  const recentSamplesRef = useRef<{ x: number; t: number }[]>([]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const el = trackRef.current;
      if (el && !pausedRef.current && !draggingRef.current) {
        const half = el.scrollWidth / 2;

        // Ease current velocity toward the idle drift speed (spin-down).
        const decay = Math.pow(SPIN_FRICTION, dt * 60);
        velocityRef.current = AUTO_SPEED + (velocityRef.current - AUTO_SPEED) * decay;
        if (Math.abs(velocityRef.current - AUTO_SPEED) < 0.5) velocityRef.current = AUTO_SPEED;

        let next = el.scrollLeft + velocityRef.current * dt;
        next = ((next % half) + half) % half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    draggingRef.current = true;
    movedRef.current = false;
    setDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    recentSamplesRef.current = [{ x: e.clientX, t: performance.now() }];
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 3) movedRef.current = true;
    const half = el.scrollWidth / 2;
    let next = dragStartScrollRef.current - dx;
    next = ((next % half) + half) % half;
    el.scrollLeft = next;

    // Keep a short rolling window (~120ms) of recent samples so release
    // velocity reflects the final flick speed, not the whole drag's average.
    const now = performance.now();
    const samples = recentSamplesRef.current;
    samples.push({ x: e.clientX, t: now });
    while (samples.length > 1 && now - samples[0].t > 120) samples.shift();
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);

    const samples = recentSamplesRef.current;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = (last.t - first.t) / 1000;
      velocityRef.current = dt > 0.005 ? -(last.x - first.x) / dt : AUTO_SPEED;
    } else {
      velocityRef.current = AUTO_SPEED;
    }
    velocityRef.current = Math.max(-MAX_SPIN_SPEED, Math.min(MAX_SPIN_SPEED, velocityRef.current));
    el?.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      id="services"
      className="-mx-4 overflow-hidden text-white"
      style={{ background: "linear-gradient(235.26deg, #595959 0%, #1F1F1F 17.5%)" }}
    >
      <div className="relative">
        <div className="relative mb-6 flex flex-col items-start justify-between gap-6 px-5 sm:px-10 pt-14 md:flex-row md:items-end">
          <div>
            <span className="ml-2 block text-[13px] font-normal tracking-[0.35em] text-neutral-300">
              OUR SERVICES
            </span>
            <h2 className="mt-5 text-[32px] sm:text-[42px] lg:text-[50px] leading-[121%] tracking-[-0.06em]">
              <span className="block font-extralight">Premium Chauffeur Services</span>
              <span className="block font-medium">for Every Occasion.</span>
            </h2>
          </div>

          <p className="relative z-10 mb-1 max-w-[480px] text-[14px] font-light leading-[200%] tracking-[-0.02em] text-neutral-300">
            From airport transfers to executive travel, explore our luxury chauffeur services
            designed around your comfort, convenience, and schedule.
          </p>

          <div className="pointer-events-none absolute right-16 top-0 h-[260px] w-[260px] opacity-40 md:h-[320px] md:w-[320px]">
            <Image src="/uts-mark.png" alt="" fill className="object-contain brightness-0 invert" aria-hidden />
          </div>
        </div>

        <div className="flex h-[450px] items-center overflow-hidden">
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className={`flex w-max gap-5 sm:gap-10 overflow-x-auto px-5 sm:px-10 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {[...SERVICES, ...SERVICES].map((item, i) => (
              <ServiceCard
                key={`${item.index}-${i}`}
                item={item}
                popped={hoveredIdx === i}
                onPillEnter={() => {
                  setHoveredIdx(i);
                  pausedRef.current = true;
                }}
                onPillLeave={() => {
                  setHoveredIdx(null);
                  pausedRef.current = false;
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 pb-14 pt-10">
        <div className="flex flex-wrap justify-around gap-8 px-5 sm:px-10 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <StatCounter
                value={stat.value}
                className="font-sans text-[44px] font-semibold leading-none tracking-[-0.04em] text-white"
              />
              <div className="mt-2 text-base font-medium text-neutral-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
