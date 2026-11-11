import { Reveal } from "@/components/ui/reveal";
const STEPS = [
  {
    index: "01",
    title: "Share Your Requirements",
    body: "Tell us the service you have in mind, where you need to travel and your preferred dates.",
  },
  {
    index: "02",
    title: "Discuss Your Journey",
    body: "Review timings, passenger needs, luggage and the vehicle options appropriate to your plans.",
  },
  {
    index: "03",
    title: "Confirm Your Booking",
    body: "Agree the journey arrangements and check the details provided with your booking confirmation.",
  },
  {
    index: "04",
    title: "Travel with Confidence",
    body: "With your arrangements understood, enjoy professional chauffeur transportation for your journey.",
  },
];

export function ServicesAdvantageSection() {
  return (
    <Reveal>
    <section className="bg-[#1B1B1B] px-12 py-14 sm:px-[68px] lg:px-[88px] lg:py-20">
      <div className="mx-auto max-w-[1800px]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          YOUR JOURNEY WITH UTS
        </span>
        <h2 className="max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-white">
          From Enquiry <span className="font-semibold">to Arrival.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((item) => (
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
