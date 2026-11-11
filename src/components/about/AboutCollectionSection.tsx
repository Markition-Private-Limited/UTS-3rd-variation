"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import DotsNav from "@/components/ui/DotsNav";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { FLEET_VEHICLES } from "@/components/fleet-data";

export function AboutCollectionSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false, page: 0, pages: 1 });

  const updateEdge = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const max = el.scrollWidth - el.clientWidth;
    const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
    const page = max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages - 1));
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, page, pages });
  };

  useEffect(() => {
    updateEdge();
    window.addEventListener("resize", updateEdge);
    return () => window.removeEventListener("resize", updateEdge);
  }, []);

  const pausedRef = useRef(false);
  const animRef = useRef(0);
  const holdUntilRef = useRef(0);

  const glideTo = (target: number, duration = 900) => {
    const el = trackRef.current;
    if (!el) return;
    cancelAnimationFrame(animRef.current);
    const from = el.scrollLeft;
    const t0 = performance.now();
    el.style.scrollSnapType = "none";
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      el.scrollLeft = from + (target - from) * e;
      if (p < 1) animRef.current = requestAnimationFrame(tick);
      else el.style.scrollSnapType = "";
    };
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current || Date.now() < holdUntilRef.current) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 2) return;
      if (el.scrollLeft >= max - 2) glideTo(0, 1200);
      else slide(1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const goToPage = (page: number) => {
    const el = trackRef.current;
    if (!el) return;
    holdUntilRef.current = Date.now() + 6000;
    const max = el.scrollWidth - el.clientWidth;
    const target = edge.pages > 1 ? (page / (edge.pages - 1)) * max : 0;
    glideTo(Math.max(0, Math.min(max, target)));
  };

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    glideTo(Math.max(0, Math.min(max, el.scrollLeft + dir * step)));
  };

  return (
    <section ref={ref} className="bg-white pt-14 pb-6 lg:pt-20 lg:pb-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-16 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              THE UTS COLLECTION
            </span>
            <h2>
              <span className="block text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
                Discover Our Collection of
              </span>
              <span className="block whitespace-nowrap text-[42px] font-semibold leading-[115%] tracking-[-0.03em] text-neutral-900">
                Luxury Vehicles.
              </span>
            </h2>
          </div>
          <div className="lg:pt-[37px]">
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              Explore the executive vehicles available through United Travel Services and find an option suited to your journey, passenger requirements and preferred travel experience.
            </p>
          </div>
        </div>
      </div>

      {/* Carousel — full-bleed, edge-to-edge, no side padding, no arrows */}
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={updateEdge}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="mx-auto flex max-w-[1220px] gap-10 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            {FLEET_VEHICLES.map((car, i) => (
              <motion.div
                key={car.slug}
                className="snap-start shrink-0"
                style={{ flexBasis: "calc((100% - 80px) / 3)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href="/#fleet"
                  className="group/card block overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "571/330" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={car.image}
                      alt={car.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover/card:scale-105"
                      draggable={false}
                    />
                  </div>
                  <div className="px-6 py-6" style={{ background: "#F5F5F5" }}>
                    <span className="mb-3 block text-[11px] font-medium tracking-[0.2em] text-neutral-400">
                      {car.tier.toUpperCase()}
                    </span>
                    <h3 className="mb-3 truncate text-[16px] font-bold tracking-[-0.02em] text-neutral-900">
                      {car.name}
                    </h3>
                    <p className="mb-5 text-[14px] leading-[160%] text-neutral-500">
                      {car.description}
                    </p>
                    <span
                      className="group relative inline-flex w-full items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full border border-transparent bg-black text-white transition-colors duration-300 hover:border-white/40"
                      style={{ padding: "16px 28px", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
                    >
                      <PillButtonContent fill="white">View Vehicle</PillButtonContent>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <DotsNav count={edge.pages} activeIndex={edge.page} onDotClick={goToPage} className="mt-8" />
        </div>
      </div>
    </section>
  );
}
