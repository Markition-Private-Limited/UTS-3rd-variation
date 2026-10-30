"use client";
// hero
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    src: "/hero-bg.jpg",
    alt: "Chauffeur opening car door",
    heading1: "Executive Chauffeur",
    heading2: "Services Across the UK",
    body: "We believe luxury is more than just reaching your destination — it's about the journey itself. Our chauffeurs are trained professionals dedicated to providing a seamless, comfortable, and refined experience from start to finish.",
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

const SERVICE_CARDS = [
  {
    title: "Day Booking",
    desc: "Full-day vehicle block.",
    image: "/hero-cards/day-booking.png",
    href: "#services",
  },
  {
    title: "Airport Transfer",
    desc: "Airport pickups and drop-offs.",
    image: "/hero-cards/airport-transfer.png",
    href: "#services",
  },
  {
    title: "Hourly Chauffeur",
    desc: "Keep your chauffeur by the hour.",
    image: "/hero-cards/hourly-chauffeur.png",
    href: "#services",
  },
];

const SLIDE_MS = 5000;
const FADE_OUT_MS = 500;
const FADE_IN_MS = 700;

function ServiceCard({ title, desc, image, href }: (typeof SERVICE_CARDS)[number]) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setImgPos({ x: x * 10, y: y * 10 });
  };

  return (
    <div className="relative">
      <div className="rounded-2xl p-3 pointer-events-none select-none" style={{ visibility: "hidden" }} aria-hidden="true">
        <div className="mb-2 w-full" style={{ paddingBottom: "44%" }} />
        <p className="mb-1 text-sm leading-tight">&nbsp;</p>
        <p className="mb-2 text-xs leading-snug" style={{ minHeight: "2.4em" }}>&nbsp;</p>
        <span className="text-xs">&nbsp;</span>
      </div>
    <a
      href={href}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => { setActive(false); setImgPos({ x: 0, y: 0 }); }}
      className="absolute inset-x-0 bottom-0 flex flex-col rounded-2xl p-3 no-underline"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 45%), linear-gradient(135deg, rgba(52,51,59,0.82) 0%, rgba(52,51,59,0.68) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.30)",
        boxShadow: active
          ? "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)"
          : "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)",
        transition: "box-shadow 0.4s ease",
        cursor: "pointer",
        zIndex: active ? 10 : 1,
      }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl mb-2 relative w-full" style={{ paddingBottom: active ? "56%" : "44%", transition: "padding-bottom 0.55s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 33vw, 25vw"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate(${imgPos.x}px, ${imgPos.y}px) scale(1.1)`,
            filter: active ? "grayscale(0%)" : "grayscale(80%)",
            transition: active
              ? "transform 0.08s linear, filter 0.4s ease"
              : "transform 0.5s ease, filter 0.6s ease",
          }}
        />
      </div>

      {/* Text */}
      <p
        className="mb-1 text-sm font-semibold leading-tight"
        style={{ color: "#ffffff", transition: "color 0.4s ease" }}
      >
        {title}
      </p>
      <p
        className="mb-2 text-xs leading-snug"
        style={{ color: active ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.55)", transition: "color 0.4s ease" }}
      >
        {desc}
      </p>
      <span
        className="inline-flex items-center gap-1 text-xs font-medium mt-1"
        style={{
          color: "#E3E3E3",
          opacity: active ? 1 : 0.85,
          letterSpacing: active ? "0.04em" : "0",
          transition: "opacity 0.4s ease, letter-spacing 0.4s ease",
        }}
      >
        Book Now <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </a>
    </div>
  );
}

export function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);
  const [displaySlide, setDisplaySlide] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setContentOpacity(0);
      setTimeout(() => {
        setDisplaySlide((i) => (i + 1) % SLIDES.length);
        setActiveImage((i) => (i + 1) % SLIDES.length);
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

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-10 pb-4 gap-6">
        {/* Heading + body — fades with slide */}
        <div
          className="flex items-end justify-between gap-10 mb-[61px]"
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

        {/* Service cards */}
        <div className="grid grid-cols-3 gap-4">
          {SERVICE_CARDS.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </div>
      </div>

    </section>
  );
}
