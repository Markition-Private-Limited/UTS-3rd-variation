import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function CityToCityAddressSection() {
  return (
    <Reveal>
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[880fr_760fr] lg:gap-x-[86px]">
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "880/620" }}>
            <Image
              src="/services/city-to-city-address.webp"
              alt="Traveller with a holdall and rucksack climbing the steps to a townhouse front door"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              INTERCITY CHAUFFEUR TRAVEL
            </span>
            <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[48px]">
              Your Journey, from <span className="font-semibold">Address to Address.</span>
            </h2>
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              Some journeys need more than a connection between stations. City to City chauffeur travel brings the discussion back to the addresses, appointments and people involved. It can suit a business visit outside your usual base, a private trip to another town or an onward journey after a stay. Tell United Travel Services where you would like to begin and end, when you need to arrive and whether any stops are important. The route, passenger needs and vehicle preference can then be considered together as part of your enquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
