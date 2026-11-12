import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function DayServicePerspectiveSection() {
  return (
    <Reveal>
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(95vw,1900px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          A DIFFERENT PERSPECTIVE
        </span>
        <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:mb-8">
          Different Places. <span className="font-semibold">One Considered Day.</span>
        </h2>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1196fr_704fr] lg:gap-x-8">
          <div>
            <div
              className="relative w-full overflow-hidden rounded-[18px]"
              style={{ aspectRatio: "1087/596" }}
            >
              <Image
                src="/services/day-service-morning.jpg"
                alt="Executive passenger walking with a duffel bag toward a glass office entrance"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              THE MORNING — A professional beginning.
            </p>
          </div>

          <div>
            <div
              className="relative w-full overflow-hidden rounded-[18px]"
              style={{ aspectRatio: "640/476" }}
            >
              <Image
                src="/services/day-service-later.jpg"
                alt="Jaguar parked on a gravel driveway outside a countryside inn in the evening"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[13px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              LATER IN THE DAY — Your next stop, already part of the conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
