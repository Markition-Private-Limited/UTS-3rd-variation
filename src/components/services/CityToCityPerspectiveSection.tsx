import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function CityToCityPerspectiveSection() {
  return (
    <Reveal>
    <section style={{ background: "#F6F6F6" }} className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          A DIFFERENT PERSPECTIVE
        </span>
        <h2 className="mb-12 max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:mb-16 lg:text-[48px]">
          A Change of <span className="font-semibold">Scene. The Same Composure.</span>
        </h2>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[640fr_1088fr] lg:gap-x-8">
          <div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "640/480" }}>
              <Image
                src="/services/city-to-city-landscape.webp"
                alt="View from the rear of a chauffeur car across a rain-speckled window to a winding road through hills"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              BETWEEN DESTINATIONS — Space to watch the landscape change.
            </p>
          </div>

          <div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "1088/600" }}>
              <Image
                src="/services/city-to-city-destination.webp"
                alt="Black Mercedes-Benz saloon parked on a cobbled square lined with stone buildings"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              AT YOUR DESTINATION — The address at the end of the road.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
