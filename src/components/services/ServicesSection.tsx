"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { StatCounter } from "./StatCounter";
import { OriginButton } from "@/components/ui/origin-button";
import { ParallaxImage } from "@/components/ui/parallax-image";

const SERVICES = [
  {
    index: "01",
    label: "AIRPORT TRANSFERS",
    badge: "Airport Travel",
    title: "Arrive in Comfort. Travel in Style.",
    description:
      "Enjoy a seamless journey to or from the airport with private transportation planned around.",
    src: "/services/airport-transfer.jpg",
    position: "center 40%",
  },
  {
    index: "02",
    label: "CITY TO CITY",
    badge: "Point to Point",
    title: "A Better Way Between Cities.",
    description:
      "Travel between destinations in privacy and comfort, with a journey arranged around.",
    src: "/services/city-to-city.jpg",
    position: "center 50%",
  },
  {
    index: "03",
    label: "CORPORATE CHAUFFEUR",
    badge: "Business Travel",
    title: "Executive Travel, Seamlessly Managed.",
    description:
      "Professional transportation for business meetings, corporate events, and executive schedules.",
    src: "/services/corporate-chauffeur.jpg",
    position: "center 25%",
  },
  {
    index: "04",
    label: "HOURLY CHAUFFEUR",
    badge: "Flexible Travel",
    title: "Your Chauffeur. Your Schedule.",
    description:
      "Enjoy a dedicated chauffeur for appointments, events, multiple stops, or a day planned your way.",
    src: "/services/hourly-chauffeur.jpg",
    position: "center 35%",
  },
  {
    index: "05",
    label: "INTERCITY",
    badge: "Long-Distance",
    title: "Long-Distance Travel, Elevated.",
    description:
      "Make longer journeys more comfortable with private transportation and a route planned.",
    src: "/services/intercity.jpg",
    position: "center 40%",
  },
];

const STATS = [
  { value: "24/7", label: "Customer Support" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Chauffeurs & Vehicles" },
  { value: "10+", label: "Years of Experience" },
];

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ServiceCard({ item }: { item: (typeof SERVICES)[number] }) {
  return (
    <article className="relative h-[450px] w-[340px] flex-none overflow-hidden rounded-3xl md:w-[734px]">
      <ParallaxImage
        src={item.src}
        alt={item.title}
        sizes="(max-width: 768px) 340px, 734px"
        className="object-cover"
        style={{ objectPosition: item.position }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] tracking-[0.25em] text-white/80">
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

        <OriginButton
          className="mt-5 rounded-sm border border-white/50 px-4 py-3 text-xs tracking-[0.2em] text-white"
          fillColor="#ffffff"
          fillTextColor="#111111"
        >
          EXPLORE SERVICE
          <ArrowIcon className="h-4 w-4" />
        </OriginButton>
      </div>
    </article>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinHeight, setPinHeight] = useState(650);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const updatePinned = () => setIsPinned(mq.matches);
    updatePinned();
    mq.addEventListener("change", updatePinned);

    const measure = () => {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
      if (pinnedContentRef.current) {
        setPinHeight(pinnedContentRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      mq.removeEventListener("change", updatePinned);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      className="-mx-4 text-white"
      style={{ background: "linear-gradient(235.26deg, #595959 0%, #1F1F1F 17.5%)" }}
    >
      <div
        ref={sectionRef}
        className="relative"
        style={isPinned ? { height: `calc(${pinHeight}px + ${distance}px)` } : undefined}
      >
        <div
          ref={pinnedContentRef}
          className={isPinned ? "sticky top-0 overflow-hidden" : undefined}
        >
          <div className="mb-6 flex flex-col items-start justify-between gap-6 px-10 pt-8 md:flex-row md:items-end">
            <div>
              <span className="ml-2 block text-[13px] font-normal tracking-[0.35em] text-neutral-300">
                OUR SERVICES
              </span>
              <h2 className="mt-5 text-[50px] leading-[121%] tracking-[-0.06em]">
                <span className="block whitespace-nowrap font-extralight">Premium Chauffeur Services</span>
                <span className="block whitespace-nowrap font-medium">for Every Occasion.</span>
              </h2>
            </div>

            <p className="mb-1 max-w-[480px] text-[14px] font-light leading-[200%] tracking-[-0.02em] text-neutral-300">
              From airport transfers to executive travel, explore our luxury chauffeur services
              designed around your comfort, convenience, and schedule.
            </p>
          </div>

          <div
            className={
              isPinned
                ? "flex h-[450px] items-center overflow-hidden"
                : "overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            <motion.div
              ref={trackRef}
              style={isPinned ? { x } : undefined}
              className="flex w-max gap-10 px-10"
            >
              {SERVICES.map((item) => (
                <ServiceCard key={item.index} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-y border-white/15 bg-white/[0.04] py-10">
        <div className="grid grid-cols-2 gap-10 px-10 text-center md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/25 md:px-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="md:px-10">
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
