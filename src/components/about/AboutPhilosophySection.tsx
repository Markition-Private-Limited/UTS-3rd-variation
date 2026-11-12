import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function AboutPhilosophySection() {
  return (
    <Reveal>
    <section style={{ background: "#212121" }} className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-8 flex flex-col gap-10 lg:mb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Left — label + heading */}
          <div className="lg:w-[44%]">
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              OUR PHILOSOPHY
            </span>
            <h2>
              <span className="block text-[42px] font-extralight leading-[115%] tracking-[-0.04em] text-white sm:text-[52px] lg:text-[56px]">
                Professional Service,
              </span>
              <span className="block whitespace-nowrap text-[42px] font-semibold leading-[115%] tracking-[-0.04em] text-white sm:text-[52px] lg:text-[56px]">
                Thoughtfully Delivered.
              </span>
            </h2>
          </div>

          {/* Right — body copy */}
          <div className="lg:w-[46%] lg:pt-[34px]">
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-400">
              We believe that executive travel should feel comfortable, dependable and carefully considered. Our approach centres on professional presentation, clear communication and attention to the details that shape a passenger&rsquo;s experience. From the initial enquiry to arrival at the destination, every interaction should reflect the standards expected from a premium chauffeur service.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-[24px]" style={{ aspectRatio: "1760/460" }}>
          <Image
            src="/about/uts-philosophy-interior.jpg"
            alt="Interior detail of a United Travel Services executive vehicle"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
    </Reveal>
  );
}
