import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const REASONS = [
  {
    src: "/about/why-uts-interior.jpg",
    alt: "Cream leather rear seats of a United Travel Services executive vehicle",
    title: "Personal Attention",
    body: "A considerate approach that recognises the requirements of each booking and the purpose of every journey.",
  },
  {
    src: "/about/why-uts-door-handle.jpg",
    alt: "Detail of a United Travel Services vehicle door handle and interior trim",
    title: "Professional Standards",
    body: "A commitment to courteous service, appropriate presentation and a consistently professional passenger experience.",
  },
  {
    src: "/about/why-uts-luggage.jpg",
    alt: "United Travel Services chauffeur loading luggage into the car boot",
    title: "Comfort and Convenience",
    body: "Thoughtful transportation arrangements designed to make business travel, airport transfers and private journeys easier to manage.",
  },
];

export function AboutWhyUTSSection() {
  return (
    <Reveal>
    <section style={{ background: "#F6F6F6" }} className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-16 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
          {/* Left — label + heading */}
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              WHY UNITED TRAVEL SERVICES
            </span>
            <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
              The Difference Is <span className="font-semibold">in Every Detail.</span>
            </h2>
          </div>

          {/* Right — body copy */}
          <div className="lg:pt-1">
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              A premium chauffeur experience is shaped by the details passengers notice throughout their journey. From professional presentation to the comfort of the vehicle, we focus on delivering a service that feels considered, composed and appropriate to each travel requirement.
            </p>
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {REASONS.map((item) => (
            <div key={item.title}>
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "566/310" }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="mt-6 border-t border-neutral-200 pt-6">
                <h3 className="mb-3 text-[20px] font-semibold tracking-[-0.02em] text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-[15px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Reveal>
  );
}
