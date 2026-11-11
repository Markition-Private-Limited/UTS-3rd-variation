import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/reveal";

export function HourlyChauffeurScheduleSection() {
  return (
    <Reveal>
    <section style={{ background: "#F6F6F6" }} className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          BETWEEN APPOINTMENTS
        </span>
        <h2 className="mb-12 max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:mb-16 lg:text-[48px]">
          A Little Space <span className="font-semibold">in a Busy Schedule.</span>
        </h2>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[640fr_1088fr] lg:gap-x-8">
          <div>
            <ParallaxImage src="/services/hourly-chauffeur-first-appointment.webp" alt="Black Jaguar XJ parked outside a townhouse with a briefcase and newspaper on the pavement" sizes="(max-width: 1024px) 100vw, 35vw" aspectRatio="640/480" />
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              THE FIRST APPOINTMENT — A considered starting point.
            </p>
          </div>

          <div>
            <ParallaxImage src="/services/hourly-chauffeur-next-destination.webp" alt="Two businessmen beside a Bentley Continental outside a glass office building" sizes="(max-width: 1024px) 100vw, 60vw" aspectRatio="1088/600" />
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              THE NEXT DESTINATION — Travel that follows the agreed itinerary.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
