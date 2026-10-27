"use client";

import { useState } from "react";

const TABS = ["All", "Economy Saloon", "Business Class", "First Class", "First Class Van", "Van", "MPV", "Standard Van"];

const FLEET = [
  {
    id: "economy-saloon",
    category: "Economy Saloon",
    name: "VW Passat / Kia Niro or similar",
    description: "A comfortable and reliable saloon ideal for everyday executive transfers and airport runs.",
    image: "/images/fleet/economy-saloon-vw-passat.webp",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From £65" },
      { label: "Hourly hire (min 4 hr)", value: "From £35" },
      { label: "Waiting Charges", value: "From £25 per hr" },
    ],
  },
  {
    id: "business-class",
    category: "Business Class",
    name: "Mercedes-Benz E-Class or similar",
    description: "Premium business travel in refined comfort, perfect for corporate clients and professional journeys.",
    image: "/images/fleet/business-class-mercedes-e-class.webp",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From £85" },
      { label: "Hourly hire (min 4 hr)", value: "From £45" },
      { label: "Waiting Charges", value: "From £30 per hr" },
    ],
  },
  {
    id: "first-class",
    category: "First Class",
    name: "Mercedes-Benz S-Class or similar",
    description: "The pinnacle of luxury chauffeur travel — effortless elegance and superior comfort for every occasion.",
    image: "/images/fleet/first-class-mercedes-s-class.webp",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From £110" },
      { label: "Hourly hire (min 4 hr)", value: "From £60" },
      { label: "Waiting Charges", value: "From £40 per hr" },
    ],
  },
  {
    id: "first-class-van",
    category: "First Class Van",
    name: "Mercedes-Benz V-Class or similar",
    description: "Spacious first-class van travel for groups seeking luxury, privacy, and ample luggage capacity.",
    image: "/images/fleet/first-class-van-mercedes-v-class.webp",
    seats: 6,
    luggage: 6,
    pricing: [
      { label: "Heathrow", value: "From £130" },
      { label: "Hourly hire (min 4 hr)", value: "From £70" },
      { label: "Waiting Charges", value: "From £45 per hr" },
    ],
  },
  {
    id: "van-8-9",
    category: "Van",
    name: "8/9 - Seater Van",
    description: "Large group transfers in a well-appointed van — ideal for families, teams, and events.",
    image: "/images/fleet/van-8-9-seater.webp",
    seats: 9,
    luggage: 8,
    pricing: [
      { label: "Heathrow", value: "From £150" },
      { label: "Hourly hire (min 4 hr)", value: "From £80" },
      { label: "Waiting Charges", value: "From £50 per hr" },
    ],
  },
  {
    id: "mpv",
    category: "MPV",
    name: "VW Sharan / Ford Galaxy or similar",
    description: "Versatile multi-purpose vehicle combining flexibility and comfort for groups of up to 7 passengers.",
    image: "/images/fleet/mpv-vw-sharan.webp",
    seats: 7,
    luggage: 5,
    pricing: [
      { label: "Heathrow", value: "From £100" },
      { label: "Hourly hire (min 4 hr)", value: "From £55" },
      { label: "Waiting Charges", value: "From £35 per hr" },
    ],
  },
  {
    id: "standard-van",
    category: "Standard Van",
    name: "Hyundai i800 / VW Transporter or similar",
    description: "Reliable and spacious standard van for larger groups and extended luggage requirements.",
    image: "/images/fleet/standard-van-hyundai-i800.webp",
    seats: 8,
    luggage: 8,
    pricing: [
      { label: "Heathrow", value: "From £120" },
      { label: "Hourly hire (min 4 hr)", value: "From £65" },
      { label: "Waiting Charges", value: "From £40 per hr" },
    ],
  },
];

const AMENITIES = [
  { label: "Wifi Available", icon: "/images/card icons/wifi-available.png" },
  { label: "GPS Tracking", icon: "/images/card icons/gps-tracking.png" },
  { label: "Water Available", icon: "/images/card icons/water-available.png" },
  { label: "Child Seat Available", icon: "/images/card icons/child-seat-available.png" },
];

export function FleetSection() {
  const [activeTab, setActiveTab] = useState("All");

  const visible = activeTab === "All" ? FLEET : FLEET.filter((c) => c.category === activeTab);

  return (
    <section className="bg-white px-8 py-16">
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <span className="ml-3 block text-xs font-medium tracking-[0.3em] text-neutral-400">
            OUR FLEET
          </span>
          <h2 className="mt-4 text-[58px] leading-[121%] tracking-[-0.06em] text-neutral-900">
            <span className="block whitespace-nowrap font-extralight">Discover Our Collection</span>
            <span className="block font-normal">of Luxury Vehicles.</span>
          </h2>
        </div>
        <p className="max-w-xl text-[16px] font-light leading-[200%] tracking-[-0.03em] text-neutral-500">
          Explore our carefully selected fleet of premium vehicles, designed to deliver exceptional comfort, style, and sophistication for every journey.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-8 flex items-center gap-2 flex-wrap">
        {TABS.map((tab) => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-[12px] font-medium tracking-wide transition-colors border ${
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/20 hover:border-black"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div key={activeTab} className="grid grid-cols-3 gap-5">
        {visible.map((car, i) => (
          <div
            key={`${car.id}-${activeTab}`}
            className="fleet-card rounded-[20px] overflow-hidden flex flex-col"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* Car image — top of card */}
            <div className="relative h-[220px] w-full overflow-hidden" style={{ background: "#f0f0f0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Content block */}
            <div className="flex flex-col flex-1 px-5 py-5" style={{ background: "#EFEFEF" }}>
              {/* Name + seat/luggage */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[17px] font-bold text-black">{car.name}</h3>
                <div className="flex items-center gap-3 text-black/40">
                  <span className="flex items-center gap-1 text-[12px]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    {car.seats}
                  </span>
                  <span className="flex items-center gap-1 text-[12px]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    </svg>
                    {car.luggage}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 text-[12px] leading-relaxed text-black/50">
                {car.description}
              </p>

              {/* Amenities */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {AMENITIES.map((a) => (
                  <div key={a.label} className="flex flex-col items-center gap-1.5 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.icon} alt={a.label} className="w-5 h-5 object-contain" draggable={false} />
                    <span className="text-[10px] leading-tight text-black/40">{a.label}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-black/10 mb-4" />

              {/* Pricing */}
              <div className="flex flex-col gap-2">
                {car.pricing.map((p) => (
                  <div key={p.label} className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-black">{p.label}</span>
                    <span className="text-[12px] text-black/60">{p.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
