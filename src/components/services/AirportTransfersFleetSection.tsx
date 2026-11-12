"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FLEET_VEHICLES } from "@/components/fleet-data";
import { Reveal } from "@/components/ui/reveal";

const AUTO_SPEED = 25; // idle drift speed, px/sec — slow and steady
const MAX_SPIN_SPEED = 3000;
const SPIN_FRICTION = 0.94;

function FleetCard({ car }: { car: (typeof FLEET_VEHICLES)[number] }) {
  return (
    <Link
      href="/#fleet"
      className="group block w-[340px] shrink-0 overflow-hidden rounded-2xl transition-all duration-500 ease-in-out md:w-[380px]"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "380/220" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          draggable={false}
        />
      </div>
      <div className="px-6 py-6" style={{ background: "#F5F5F5" }}>
        <span className="mb-3 block text-[11px] font-medium tracking-[0.2em] text-neutral-400">
          {car.tier.toUpperCase()}
        </span>
        <h3 className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-neutral-900">
          {car.name}
        </h3>
        <p className="mb-5 text-[14px] leading-[170%] text-neutral-500">
          {car.description}
        </p>
        <span className="flex items-center justify-between border-t border-neutral-200 pt-5 text-[11px] font-medium tracking-[0.15em] text-neutral-900">
          BOOK A CHAUFFEUR
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function AirportTransfersFleetSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  const velocityRef = useRef(AUTO_SPEED);
  const recentSamplesRef = useRef<{ x: number; t: number }[]>([]);
  // Sub-pixel accumulator: el.scrollLeft rounds to whole pixels on readback,
  // so at this slow a speed (<1px/frame) reading it back each tick would
  // round the increment away and freeze the drift. Track position ourselves.
  const positionRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const el = trackRef.current;
      if (el && !pausedRef.current && !draggingRef.current) {
        const half = el.scrollWidth / 2;
        if (half > 0) {
          const decay = Math.pow(SPIN_FRICTION, dt * 60);
          velocityRef.current = AUTO_SPEED + (velocityRef.current - AUTO_SPEED) * decay;
          if (Math.abs(velocityRef.current - AUTO_SPEED) < 0.5) velocityRef.current = AUTO_SPEED;

          let next = positionRef.current + velocityRef.current * dt;
          next = ((next % half) + half) % half;
          positionRef.current = next;
          el.scrollLeft = next;
        }
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
    const half = el.scrollWidth / 2;
    let next = dragStartScrollRef.current - dx;
    next = ((next % half) + half) % half;
    el.scrollLeft = next;
    positionRef.current = next;

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
    <Reveal>
    <section className="overflow-hidden bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-16 lg:grid-cols-[568fr_597fr] lg:items-end lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              THE UTS COLLECTION
            </span>
            <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
              Travel in <span className="font-semibold">the Right Vehicle.</span>
            </h2>
          </div>
          <div>
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              Share your passenger, luggage and journey requirements to discuss a suitable category and the options available for your booking.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        className={`flex gap-8 overflow-x-auto px-6 pb-2 select-none sm:px-10 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {[...FLEET_VEHICLES, ...FLEET_VEHICLES].map((car, i) => (
          <FleetCard key={`${car.slug}-${i}`} car={car} />
        ))}
      </div>
    </section>
    </Reveal>
  );
}
