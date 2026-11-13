"use client";

import Image from "next/image";
import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import PillButtonContent from "@/components/ui/PillButtonContent";

function CardButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="group relative overflow-hidden whitespace-nowrap inline-flex items-center justify-between gap-4 w-fit rounded-full bg-white text-black cursor-pointer"
      style={{
        fontSize: "0.68rem",
        letterSpacing: "0.2em",
        padding: "14px 28px",
        fontWeight: 600,
        textTransform: "uppercase",
        border: `1px solid ${hovered ? "#ffffff" : "transparent"}`,
        transition: "border-color 300ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <PillButtonContent fill="black">{label}</PillButtonContent>
    </button>
  );
}

const CARDS = [
  {
    eyebrow: "Arrive with a sense of calm",
    title: "Airport Transfers",
    desc: "Enjoy a smoother airport journey with professional chauffeur service, comfortable vehicles, and coordinated pickup arrangements.",
    cta: "Explore Service",
    image: "/stacking-cards/airport-transfers-v2.webp",
    imagePosition: "80% center",
  },
  {
    eyebrow: "Discover the city in comfort",
    title: "Sightseeing Chauffeur",
    desc: "Explore every destination with professional chauffeur service, comfortable vehicles, and seamless journeys across the city.",
    cta: "Explore Service",
    image: "/stacking-cards/city-trip.webp",
  },
  {
    eyebrow: "Your time, your journey",
    title: "Hourly Chauffeur",
    desc: "Travel on your own schedule with a dedicated chauffeur, flexible bookings, and premium comfort throughout the day.",
    cta: "Explore Service",
    image: "/stacking-cards/hourly-chauffeur.webp",
  },
  {
    eyebrow: "Your day, travelled in style",
    title: "Day Service",
    desc: "Enjoy a full day of effortless travel with professional chauffeur service, flexible schedules, and exceptional comfort.",
    cta: "Explore Service",
    image: "/stacking-cards/day-service.webp",
  },
  {
    eyebrow: "Go further in comfort",
    title: "City to City",
    desc: "Travel between cities with professional chauffeur service, comfortable vehicles, and seamless long-distance journeys.",
    cta: "Explore Service",
    image: "/stacking-cards/sightseeing-chauffeur.webp",
  },
];

export function StackingCardsSection() {
  return (
    <section data-navbar-theme="light" className="w-full bg-white px-2 md:px-6 lg:px-10 pt-[96px] pb-[60px]">
      <ScrollStack
        useWindowScroll
        itemDistance={120}
        itemStackDistance={6}
        stackPosition="100px"
        itemScale={0.035}
        baseScale={0.8}
        dimAmount={0.25}
        blurAmount={0}
        rotationAmount={0}
        tiltAmount={0}
        holdDistance={200}
      >
        {CARDS.map((card, i) => (
          <ScrollStackItem
            key={i}
            style={{
              height: "clamp(500px, 75vh, 860px)",
              padding: 0,
              borderRadius: "1.5rem",
              overflow: "hidden",
              background: "#000",
            }}
          >
            <div data-navbar-theme="dark" className="relative w-full h-full">
              {/* Background image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover object-center md:[object-position:var(--img-pos)]"
                style={{ "--img-pos": card.imagePosition ?? "center" } as React.CSSProperties}
                priority={i === 0}
              />

              {/* Left-to-right gradient — desktop */}
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  background:
                    "linear-gradient(to right, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.78) 32%, rgba(8,8,8,0.42) 58%, rgba(8,8,8,0.04) 100%)",
                }}
              />

              {/* Bottom-to-top gradient — mobile */}
              <div
                className="absolute inset-0 block md:hidden"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.80) 35%, rgba(8,8,8,0.30) 65%, rgba(8,8,8,0.0) 100%)",
                }}
              />

              {/* Card number badge */}
              <div
                className="absolute top-0 right-0 flex items-center justify-center"
                style={{
                  width: "clamp(72px, 6.25vw, 120px)",
                  height: "clamp(52px, 4.6875vw, 90px)",
                  borderRadius: "1.5rem 0 0 0",
                }}
              >
                <span
                  className="font-bold select-none"
                  style={{
                    fontSize: "clamp(38px, 2.1875vw, 42px)",
                    color: "#fffdfb9a",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text content — bottom on mobile, left-centre on desktop */}
              <div className="absolute inset-0 flex items-end md:items-center">
                <div
                  className="flex flex-col justify-center pl-6 pr-6 pb-10 md:pb-0 sm:pl-10 sm:pr-10 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20 min-[1500px]:box-content min-[1500px]:!pl-[8.3333vw] min-[1500px]:!pr-0"
                  style={{ width: "100%", maxWidth: "740px", gap: "clamp(14px, 3vw, 32px)" }}
                >
                  <div>
                    <p
                      className="text-gray-400 font-semibold uppercase mb-4"
                      style={{ fontSize: "0.68rem", letterSpacing: "0.3em" }}
                    >
                      {card.eyebrow}
                    </p>
                    <h2
                      style={{
                        fontFamily: 'Inter, "Inter Fallback", sans-serif',
                        fontSize: "clamp(28px, 4vw, 50px)",
                        fontWeight: 500,
                        lineHeight: "clamp(34px, 5vw, 61px)",
                        letterSpacing: "clamp(-1.5px, -0.2vw, -3px)",
                        color: "#fff",
                      }}
                    >
                      {card.title}
                    </h2>
                  </div>

                  <p
                    className="text-gray-300 leading-relaxed min-[1500px]:!max-w-[520px]"
                    style={{ fontSize: "clamp(13px, 1.0417vw, 18px)", maxWidth: "400px" }}
                  >
                    {card.desc}
                  </p>

                  <CardButton label={card.cta} />
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
