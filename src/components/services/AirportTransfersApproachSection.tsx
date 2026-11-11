import { Reveal } from "@/components/ui/reveal";
const APPROACH = [
  {
    index: "01",
    title: "Journey Coordination",
    body: "Flight information, terminal details and your onward address help inform the arrangements discussed before travel.",
  },
  {
    index: "02",
    title: "Passenger Comfort",
    body: "A composed vehicle environment makes the road journey a welcome transition before or after a flight.",
  },
  {
    index: "03",
    title: "Chauffeur Assistance",
    body: "Discuss the assistance your party may need, including luggage and any particular pickup requirements.",
  },
  {
    index: "04",
    title: "Vehicle Choice",
    body: "Share passenger numbers, luggage and preferred category to explore an appropriate vehicle option.",
  },
];

export function AirportTransfersApproachSection() {
  return (
    <Reveal>
    <section className="bg-[#1B1B1B] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          THE UTS APPROACH
        </span>
        <h2 className="max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-white">
          The Details <span className="font-semibold">Around Your Flight.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {APPROACH.map((item) => (
            <div key={item.index} className="border-t border-white/15 pt-6">
              <span className="block text-[12px] font-medium tracking-[0.2em] text-neutral-500">
                {item.index}
              </span>
              <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.02em] text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Reveal>
  );
}
