import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function AirportTransfersGallerySection() {
  return (
    <Reveal>
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          BEFORE DEPARTURE. AFTER ARRIVAL.
        </span>
        <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:mb-8">
          Room to Ease <span className="font-semibold">into the Journey.</span>
        </h2>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1100fr_640fr] lg:gap-x-10">
          <div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "1037/620" }}>
              <Image
                src="/services/airport-transfers-car-window.jpg"
                alt="View from inside a chauffeur car looking out at airport arrivals through the window"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              THE AIRPORT CONNECTION — A transition between air and road.
            </p>
          </div>

          <div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "640/460" }}>
              <Image
                src="/services/airport-transfers-chauffeur-goring.jpg"
                alt="Chauffeur with a Bentley Mulsanne outside The Goring hotel entrance"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              YOUR ONWARD DESTINATION — From terminal to a considered arrival.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
