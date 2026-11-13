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
    <section className="bg-[#1B1B1B] px-5 py-10 sm:px-[68px] sm:py-14 lg:px-[88px] lg:py-20">
      <div className="mx-auto max-w-[1800px]">
        <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-neutral-400 sm:mb-6 sm:text-[11px]">
          YOUR JOURNEY WITH UTS
        </span>
        <h2 className="max-w-3xl text-[30px] font-extralight leading-[115%] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[42px]">
          From Enquiry <span className="font-semibold">to Arrival.</span>
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((item) => (
            <div key={item.index} className="border-t border-white/15 pt-6">
              <span className="block text-[11px] font-medium tracking-[0.2em] text-neutral-500 sm:text-[12px]">
                {item.index}
              </span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-white sm:text-[19px]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] font-normal leading-[165%] tracking-[-0.01em] text-neutral-400 sm:text-[15px] sm:leading-[170%]">
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
