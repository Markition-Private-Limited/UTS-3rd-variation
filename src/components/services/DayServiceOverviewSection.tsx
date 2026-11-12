import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function DayServiceOverviewSection() {
  return (
    <Reveal>
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[530fr_635fr] lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              YOUR DAY, CONSIDERED AS A WHOLE
            </span>
            <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900">
              <span className="block">From the First Pickup <span className="font-semibold">to the</span></span>
              <span className="block font-semibold">Final Stop.</span>
            </h2>
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              A full day away can combine business, personal commitments and several different destinations. Full-Day Chauffeur Hire allows you to discuss those journeys as a complete itinerary, rather than viewing each movement in isolation. United Travel Services can help you explore arrangements for a day of appointments, visits or private travel. Share the planned start and finish, the addresses involved and any fixed commitments. Passenger requirements, luggage and vehicle preferences are also important to the discussion. With the proposed day clearly outlined, the available options and booking details can be considered together.
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "880/590" }}>
            <Image
              src="/services/day-service-interior.jpg"
              alt="Leather briefcase and notebook on the rear seat of a chauffeur car, with a country manor visible through the window"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
