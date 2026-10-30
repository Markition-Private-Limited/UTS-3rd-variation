"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookingPanel } from "@/components/booking";

const SLIDES = [
  {
    src: "/hero-bg.jpg",
    alt: "Chauffeur opening car door",
    heading1: "Executive Chauffeur",
    heading2: "Services Across the UK",
    body: "We believe luxury is more than just reaching your destination — it’s about the journey itself. Our chauffeurs are trained professionals dedicated to providing a seamless, comfortable, and refined experience from start to finish.",
  },
  {
    src: "/hero_img_2.webp",
    alt: "Chauffeur in central London",
    heading1: "Premium Chauffeur",
    heading2: "Services in London",
    body: "From the heart of London to the surrounding counties, our executive fleet and professional drivers ensure every journey is handled with the highest standard of care and discretion.",
  },
  {
    src: "/hero_img_3.webp",
    alt: "Chauffeur loading luggage at the airport",
    heading1: "Stress-Free Airport",
    heading2: "Transfers, Every Time",
    body: "Arrive relaxed and on time. Our meet-and-greet airport transfers are monitored against live flight data so your chauffeur is always ready when you are — no waiting, no rushing.",
  },
];

const SLIDE_MS = 5000;
const FADE_OUT_MS = 500;
const FADE_IN_MS = 700;

export function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);
  const [displaySlide, setDisplaySlide] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      // Fade content out
      setContentOpacity(0);
      setTimeout(() => {
        // Swap slide content and image together
        setDisplaySlide((i) => (i + 1) % SLIDES.length);
        setActiveImage((i) => (i + 1) % SLIDES.length);
        // Fade content back in
        setContentOpacity(1);
      }, FADE_OUT_MS);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[displaySlide];

  return (
    <section data-navbar-theme="dark" className="relative -mx-2 -mt-2 h-[98vh] overflow-hidden rounded-[32px]">
      {/* Rotating background images */}
      <div className="absolute inset-0 bg-black">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className="absolute -inset-[10%]"
            style={{
              opacity: i === activeImage ? 1 : 0,
              transition: "opacity 2000ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="120vw"
              className="object-cover"
              style={{ objectPosition: "center 40%" }}
            />
          </div>
        ))}
      </div>

      {/* Subtle gradient — only enough to keep text legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Fading hero text */}
        <div
          className="flex flex-1 items-end justify-between gap-10 px-10 pb-60"
          style={{
            opacity: contentOpacity,
            transition: `opacity ${contentOpacity === 0 ? FADE_OUT_MS : FADE_IN_MS}ms ease-in-out`,
          }}
        >
          <h1 className="max-w-[980px] shrink-0">
            <span className="block text-[72px] leading-[121%] tracking-[-0.06em] font-extralight text-white">
              {slide.heading1}
            </span>
            <span className="block text-[72px] leading-[121%] tracking-[-0.06em] font-normal whitespace-nowrap text-white">
              {slide.heading2}
            </span>
          </h1>
          <p className="max-w-[640px] pb-2.5 text-[16px] font-light leading-[200%] tracking-[-0.03em] text-white/90">
            {slide.body}
          </p>
        </div>
      </div>

      {/* Booking panel */}
      <div className="absolute inset-x-0 bottom-4 z-20 px-6">
        <BookingPanel />
      </div>
    </section>
  );
}
