"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import PillButtonContent from "@/components/ui/PillButtonContent";

const VEHICLES = [
  {
    id: "first-class",
    category: "FIRST CLASS",
    name: "Mercedes-Benz S-Class",
    suffix: "or similar",
    description:
      "Explore a First Class option for executive engagements, private occasions and journeys where your preferred travel environment is part of the plan. Share your passenger and luggage requirements when discussing this category.",
    image: "/fleet/s-class.jpg",
    alt: "Mercedes-Benz S-Class luxury sedan in architectural setting",
  },
  {
    id: "business-class",
    category: "BUSINESS CLASS",
    name: "Mercedes-Benz E-Class",
    suffix: "or similar",
    description:
      "A refined choice for corporate transfers, airport journeys and everyday executive travel. The E-Class balances comfort and practicality, making it well suited to a wide range of professional and private journey types.",
    image: "/fleet/e-class.jpg",
    alt: "Mercedes-Benz E-Class executive saloon in architectural setting",
  },
  {
    id: "executive-mpv",
    category: "EXECUTIVE MPV",
    name: "Mercedes-Benz V-Class",
    suffix: "or similar",
    description:
      "Suited to group travel, family airport transfers and occasions where additional passenger space or luggage capacity is required. The V-Class offers a premium cabin environment across up to seven seats.",
    image: "/fleet/v-class.jpg",
    alt: "Mercedes-Benz V-Class executive MPV in architectural setting",
  },
  {
    id: "business-suv",
    category: "BUSINESS SUV",
    name: "Range Rover",
    suffix: "or similar",
    description:
      "For journeys where a commanding presence and elevated driving position are preferred. The Range Rover provides a premium SUV environment for both urban transfers and longer distance private travel.",
    image: "/fleet/range-rover.jpg",
    alt: "Range Rover luxury SUV in architectural setting",
  },
];

export function FleetCollectionSection() {
  const router = useRouter();

  return (
    <section id="collection" className="bg-white px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
      <div className="flex flex-col divide-y divide-neutral-100">
        {VEHICLES.map((v) => (
          <div
            key={v.id}
            className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[57fr_43fr] lg:items-center lg:gap-16 first:pt-0 last:pb-0"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(12px,1.2vw,18px)] bg-neutral-100">
              <Image
                src={v.image}
                alt={v.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 57vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5">
              <span className="text-[11px] font-medium tracking-[0.3em] text-neutral-400">
                {v.category}
              </span>

              <h3 className="text-[36px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[44px]">
                {v.name}{" "}
                <span className="font-semibold">
                  {v.suffix}
                </span>
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
    </section>
  );
}
