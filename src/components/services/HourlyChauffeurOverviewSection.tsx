import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function HourlyChauffeurOverviewSection() {
  return (
    <Reveal>
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[880fr_760fr] lg:gap-x-[86px]">
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "880/620" }}>
            <Image
              src="/services/hourly-chauffeur-overview.webp"
              alt="Businessman reviewing papers and writing in a notebook in the back of a chauffeur car"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              TIME FOR WHAT MATTERS
            </span>
            <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[48px]">
              More Than <span className="font-semibold">a Single Destination.</span>
            </h2>
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              An afternoon of appointments or a series of visits can involve more than one straightforward transfer. Hourly Chauffeur hire offers a way to discuss a period of travel around the destinations you have in mind. It may suit business meetings, personal appointments or a visit with several planned stops. Begin with your proposed start time, expected duration and outline itinerary. United Travel Services can then discuss the journey requirements, passenger needs and vehicle options with you. Any changes or additional time should be raised for discussion rather than treated as already included.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
