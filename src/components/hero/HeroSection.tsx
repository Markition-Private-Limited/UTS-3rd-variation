"use client";
// hero
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SLIDES = [
  {
    src: "/hero_img_4.webp",
    alt: "Chauffeur opening car door at hotel entrance",
    heading1: "Executive Chauffeur",
    heading2: "Services Across the UK",
    body: "We believe luxury is more than just reaching your destination — it's about the journey itself. Our chauffeurs are trained professionals dedicated to providing a seamless, comfortable, and refined experience from start to finish.",
    inset: "0%",
    position: "100% 35%",
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
    title: "Airport Transfer",
    desc: "Airport pickups and drop-offs.",
    image: "/hero-cards/airport-transfer.png",
    href: "#services",
  },
  {
    title: "Sightseeing Chauffeur",
    desc: "Sightseeing trips within London",
    image: "/hero-cards/sightseeing-london-v3.webp",
    href: "#services",
  },
  {
    title: "Hourly Chauffeur",
    desc: "Keep your chauffeur by the hour.",
    image: "/hero-cards/hourly-chauffeur-v3.webp",
    href: "#services",
  },
  {
    title: "Day Service",
    desc: "Full-day vehicle block.",
    image: "/hero-cards/day-service-v3.webp",
    href: "#services",
  },
  {
    title: "City to City",
    desc: "Intercity travel between major cities.",
    image: "/hero-cards/city-to-city-v3.webp",
    href: "#services",
  },
];

const SLIDE_MS = 5000;

const CARD_BG = "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)";
const CARD_BORDER = "1px solid rgba(255,255,255,0.35)";
const CARD_SHADOW = "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)";

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
      {/* Mobile: direct flow — matches whiteline ParallaxCard style */}
      <div className="sm:hidden rounded-2xl p-3 flex flex-col" style={{
        background: CARD_BG,
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: CARD_BORDER,
        boxShadow: CARD_SHADOW,
      }}>
        <div className="overflow-hidden rounded-lg mb-2.5 relative w-full">
          <div style={{ paddingBottom: "70%" }} />
          <Image
            src={image}
            alt={title}
            fill
            sizes="50vw"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scale(1.1)" }}
          />
        </div>
        <p className="mb-0.5 text-sm font-semibold leading-tight line-clamp-1 text-white">{title}</p>
        <p className="mb-2.5 text-xs leading-tight line-clamp-2 text-white/50" style={{ minHeight: "2.5em" }}>{desc}</p>
        <a
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2 mt-auto self-start no-underline"
          style={{ color: "rgba(255,255,255,0.75)", textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          Book Now <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/* Desktop sm+: ghost sizes the cell; card expands upward on hover */}
      <div className="hidden sm:block">
        <div className="rounded-2xl p-3 pointer-events-none select-none" style={{ visibility: "hidden" }} aria-hidden="true">
          <div className="mb-2 w-full" style={{ paddingBottom: "44%" }} />
          <p className="mb-0.5 text-sm leading-tight line-clamp-1">&nbsp;</p>
          <p className="mb-2.5 text-xs leading-tight line-clamp-2" style={{ minHeight: "2.5em" }}>&nbsp;<br />&nbsp;</p>
          <span className="text-sm">&nbsp;</span>
        </div>
        <a
          href={href}
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => { setActive(false); setImgPos({ x: 0, y: 0 }); }}
          className="absolute inset-x-0 bottom-0 flex flex-col rounded-2xl p-3 no-underline"
          style={{
            background: CARD_BG,
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: CARD_BORDER,
            boxShadow: active
              ? "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)"
              : CARD_SHADOW,
            transition: "box-shadow 0.4s ease",
            cursor: "pointer",
            zIndex: active ? 10 : 1,
          }}
        >
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
          <p className="mb-0.5 text-sm font-semibold leading-tight line-clamp-1" style={{ color: active ? "#D4FBFF" : "#ffffff", transition: "color 0.4s ease" }}>{title}</p>
          <p className="mb-2.5 text-xs leading-tight line-clamp-2" style={{ color: active ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.50)", transition: "color 0.4s ease", minHeight: "2.5em" }}>{desc}</p>
          <span className="inline-flex items-center gap-1 text-xs font-medium mt-auto self-start" style={{ color: active ? "#D4FBFF" : "rgba(255,255,255,0.7)", letterSpacing: active ? "0.01em" : "0", transition: "color 0.4s ease, letter-spacing 0.4s ease", textDecoration: "underline", textUnderlineOffset: "2px" }}>
            Book Now <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section data-navbar-theme="dark" className="relative -mx-2 -mt-2 min-h-[calc(100vh-16px)] overflow-hidden rounded-[clamp(14px,1.5vw,20px)]">
      {/* Rotating background images */}
      <div className="absolute inset-0 bg-black">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className="absolute"
            style={{
              inset: `-${s.inset ?? "10%"}`,
              opacity: i === index ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
            }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority
              sizes="120vw"
              className="object-cover"
              style={{ objectPosition: s.position ?? "center 40%" }}
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
      <div className="relative z-10 flex min-h-[calc(100vh-16px)] flex-col justify-start sm:justify-between px-6 pb-16 pt-28 sm:pt-[146px] sm:px-10 lg:px-16">
        {/* Heading + body — body is line-clamped on mobile so height is stable across slides */}
        <div className="max-w-xl pt-0 sm:pt-10 lg:max-w-3xl min-h-[200px] sm:min-h-[330px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="mb-4">
                <span className="block text-[38px] sm:text-[52px] lg:text-[72px] leading-[121%] tracking-[-0.06em] font-extralight text-white">
                  {slide.heading1}
                </span>
                <span className="block text-[38px] sm:text-[52px] lg:text-[72px] leading-[121%] tracking-[-0.06em] font-semibold text-white">
                  {slide.heading2}
                </span>
              </h1>
              <p className="max-w-xl lg:max-w-3xl text-[16px] font-light leading-[200%] tracking-[-0.03em] text-white/90 line-clamp-4 sm:line-clamp-none">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Service cards — 2-col mobile, 3-col sm, 5-col lg */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICE_CARDS.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </div>
      </div>

    </section>
  );
}
