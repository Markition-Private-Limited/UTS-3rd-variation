"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";

type Rate = {
  service: string;
  amount: number | null;
  unit: string;
  notes: string;
};

type FleetVehicle = {
  id: string;
  tier: string;
  categories: string[];
  name: string;
  description: string;
  image: string;
  seats: number;
  luggage: number;
  rates: Rate[];
  showInAll: boolean;
};

export function FleetCollectionSection() {
  const router = useRouter();
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [tabs, setTabs] = useState<string[]>(["All Vehicles"]);
  const [activeTab, setActiveTab] = useState("All Vehicles");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fleet")
      .then((res) => res.json())
      .then((data: { categories: string[]; vehicles: FleetVehicle[] }) => {
        setTabs(data.categories.map((c) => (c === "All" ? "All Vehicles" : c)));
        setFleet(data.vehicles);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visible =
    activeTab === "All Vehicles"
      ? fleet.filter((v) => v.showInAll !== false)
      : fleet.filter((v) => v.categories.includes(activeTab));

  return (
    <section id="collection" className="bg-white px-6 py-10 sm:px-10 lg:px-16 lg:py-14">

      {/* Filter tabs */}
      <div className="mb-10 flex items-center gap-2 flex-wrap">
        {tabs.map((tab) => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`group relative overflow-hidden rounded-full px-5 py-2 text-[12px] font-medium tracking-wide border cursor-pointer transition-[border-color] duration-300 ${
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/20 hover:border-white"
              }`}
            >
              {!active && (
                <span
                  aria-hidden
                  className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full opacity-0 group-hover:w-[300px] group-hover:h-[300px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none"
                />
              )}
              <span className={`relative z-[1] transition-colors duration-500 ${!active ? "group-hover:text-white" : ""}`}>
                {tab}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vehicle list */}
      {loading ? (
        <div className="py-20 text-center text-sm text-neutral-400">Loading fleet…</div>
      ) : (
        <div className="flex flex-col divide-y divide-neutral-100">
          {visible.map((v) => (
            <div
              key={v.id}
              className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[57fr_43fr] lg:items-center lg:gap-16 first:pt-0 last:pb-0"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-[clamp(12px,1.2vw,18px)] bg-neutral-100">
                <Image
                  src={v.image}
                  alt={v.name}
                  width={0}
                  height={0}
                  sizes="(max-width: 1024px) 100vw, 57vw"
                  className="w-full h-auto"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-5">
                <span className="text-[11px] font-medium tracking-[0.3em] text-neutral-400">
                  {v.tier.toUpperCase()}
                </span>

                <h3 className="text-[36px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[44px]">
                  {v.name}
                </h3>

                <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
                  {v.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => router.push("/contact#enquiry")}
                    className="group relative inline-flex overflow-hidden whitespace-nowrap items-center justify-between gap-4 rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em]"
                    style={{ background: "#1a1a1a", color: "#fff" }}
                  >
                    <PillButtonContent fill="white">Enquire About a Vehicle</PillButtonContent>
                  </button>
                </div>

                <p className="text-[12px] text-neutral-400 tracking-[-0.01em]">
                  Vehicle category, suitability and availability to be discussed.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
