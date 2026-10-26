"use client";

import Image from "next/image";
import { useState } from "react";

const TABS = ["All", "Saloon and Executive", "S-Class", "V-Class & MPV", "Mini Van & Sprinter"];

const FLEET = [
  {
    id: "range-rover-1",
    category: "Saloon and Executive",
    name: "Range Rover",
    description: "Luxury SUV chauffeur travel delivering comfort, confidence, and a refined on-road experience.",
    image: "/fleet-1.png",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From $110" },
      { label: "Hourly hire (min 4 hr)", value: "From $50" },
      { label: "Waiting Charges", value: "From $35 per hr" },
    ],
  },
  {
    id: "range-rover-2",
    category: "S-Class",
    name: "Range Rover",
    description: "Luxury SUV chauffeur travel delivering comfort, confidence, and a refined on-road experience.",
    image: "/fleet-2.png",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From $110" },
      { label: "Hourly hire (min 4 hr)", value: "From $50" },
      { label: "Waiting Charges", value: "From $35 per hr" },
    ],
  },
  {
    id: "range-rover-3",
    category: "V-Class & MPV",
    name: "Range Rover",
    description: "Luxury SUV chauffeur travel delivering comfort, confidence, and a refined on-road experience.",
    image: "/fleet-3.png",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From $110" },
      { label: "Hourly hire (min 4 hr)", value: "From $50" },
      { label: "Waiting Charges", value: "From $35 per hr" },
    ],
  },
];

const AMENITIES = [
  {
    label: "Wifi Available",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
      </svg>
    ),
  },
  {
    label: "GPS Tracking",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: "Child seat",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 20l2-8 4 2 4-2 2 8" />
      </svg>
    ),
  },
  {
    label: "Water Available",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14z" />
      </svg>
    ),
  },
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
            <div className="relative h-[220px] w-full" style={{ background: "#f0f0f0" }}>
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-contain"
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
                    <span className="text-black/50">{a.icon}</span>
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
