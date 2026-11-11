import Link from "next/link";
import { FLEET_VEHICLES } from "@/components/fleet-data";
import PillButtonContent from "@/components/ui/PillButtonContent";

const FEATURED_SLUGS = ["first-class", "business-class", "economy-saloon"];

const CARS = FEATURED_SLUGS.map((slug) => FLEET_VEHICLES.find((v) => v.slug === slug)!);

export function ServicesFleetSection() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-16 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              THE UTS COLLECTION
            </span>
            <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
              The Right Vehicle <span className="font-semibold">for Your Journey.</span>
            </h2>
          </div>
          <div className="lg:pt-1">
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              Share your passenger, luggage and journey requirements to discuss a suitable category and the options available for your booking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {CARS.map((car) => (
            <div key={car.slug} className="overflow-hidden rounded-2xl">
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "571/330" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="px-6 py-6" style={{ background: "#F5F5F5" }}>
                <span className="mb-3 block text-[11px] font-medium tracking-[0.2em] text-neutral-400">
                  {car.tier.toUpperCase()}
                </span>
                <h3 className="mb-3 text-[20px] font-bold tracking-[-0.02em] text-neutral-900">
                  {car.name}
                </h3>
                <p className="mb-5 text-[15px] leading-[170%] text-neutral-500">
                  {car.description}
                </p>
                <Link
                  href="/#fleet"
                  className="group flex items-center justify-between border-t border-neutral-200 pt-5 text-[11px] font-medium tracking-[0.15em] text-neutral-900"
                >
                  BOOK A CHAUFFEUR
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/#fleet"
          className="group mt-10 relative inline-flex items-center justify-between gap-6 overflow-hidden whitespace-nowrap rounded-full bg-black text-white"
          style={{ padding: "16px 28px", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
        >
          <PillButtonContent fill="white">Discover Our Fleet</PillButtonContent>
        </Link>
      </div>
    </section>
  );
}
