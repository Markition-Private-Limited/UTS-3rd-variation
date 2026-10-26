"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    name: "Ashley Cole",
    title: "CEO of Runway",
    image: "/testimonial-1.jpg",
    review:
      "Discover what our valued clients have to say about their journeys with us. From exceptional comfort to professional chauffeur service.",
  },
  {
    name: "Ashley Cole",
    title: "CEO of Runway",
    image: "/testimonial-2.jpg",
    review:
      "Discover what our valued clients have to say about their journeys with us. From exceptional comfort to professional chauffeur service.",
  },
  {
    name: "Ashley Cole",
    title: "CEO of Runway",
    image: "/testimonial-3.jpg",
    review:
      "Discover what our valued clients have to say about their journeys with us. From exceptional comfort to professional chauffeur service.",
  },
  {
    name: "Ashley Cole",
    title: "CEO of Runway",
    image: "/testimonial-4.jpg",
    review:
      "Discover what our valued clients have to say about their journeys with us. From exceptional comfort to professional chauffeur service.",
  },
];

const TRACK = [...TESTIMONIALS, ...TESTIMONIALS];

const GAP = 16; // px gap between cards
const SPEED = 0.6; // px per frame — constant velocity

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#FBBF24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!pausedRef.current) {
        xRef.current -= SPEED;
        // Reset when first half (original set) has scrolled out
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(xRef.current) >= halfWidth) {
          xRef.current = 0;
        }
        track.style.transform = `translateX(${xRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="bg-white py-16">
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-8 px-8 md:flex-row md:items-end">
        <div>
          <span className="ml-3 block text-xs font-medium tracking-[0.3em] text-neutral-400">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="mt-4 text-[58px] leading-[121%] tracking-[-0.06em] text-neutral-900">
            <span className="block whitespace-nowrap font-extralight">Trusted by Those Who</span>
            <span className="block font-normal">Expect the Extraordinary.</span>
          </h2>
        </div>
        <p className="max-w-xl text-[16px] font-light leading-[200%] tracking-[-0.03em] text-neutral-500">
          Discover what our valued clients have to say about their journeys
          with us. From exceptional comfort to professional chauffeur service.
        </p>
      </div>

      {/* Marquee — shows 3.5 cards, px-4 side inset */}
      <div
        className="overflow-hidden"
        style={{ paddingLeft: "16px", paddingRight: "0px" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${GAP}px`, width: "max-content" }}
        >
          {TRACK.map((t, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden rounded-[20px] flex flex-col"
              style={{
                /* 3.5 cards fit viewport minus left padding */
                width: "calc((100vw - 16px - 3 * 16px) / 3.5)",
                backgroundColor: "#1c1c1e",
              }}
            >
              {/* Photo */}
              <div className="relative w-full" style={{ height: "320px" }}>
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10 text-center">
                  <p className="text-[15px] font-semibold text-white">{t.name}</p>
                  <p className="text-[12px] text-white/60">{t.title}</p>
                </div>
              </div>

              {/* Review */}
              <div className="flex flex-col gap-3 px-5 py-5">
                <StarRating />
                <p className="text-[13px] leading-relaxed text-white/55">
                  {t.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
