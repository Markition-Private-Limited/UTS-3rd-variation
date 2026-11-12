import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    index: "01",
    title: "Make Your Enquiry",
    body: "Share the travel date, proposed start and finish and an outline of the full day's itinerary.",
  },
  {
    index: "02",
    title: "Discuss Your Arrangements",
    body: "Review the stops, fixed appointments, passenger needs and preferred vehicle category.",
  },
  {
    index: "03",
    title: "Confirm the Details",
    body: "Check the agreed schedule and addresses, together with the arrangements discussed for the day.",
  },
  {
    index: "04",
    title: "Enjoy Your Journey",
    body: "Begin at the confirmed pickup point and travel through your planned itinerary with a professional chauffeur.",
  },
];

export function DayServiceExperienceSection() {
  return (
    <Reveal>
    <section className="bg-white px-6 pt-4 pb-14 sm:px-10 lg:px-16 lg:pt-4 lg:pb-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          YOUR JOURNEY WITH UTS
        </span>
        <h2 className="max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[48px]">
          A Seamless Experience <span className="font-semibold">from Start to Finish.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((item) => (
            <div key={item.index}>
              <span className="block text-[40px] font-light leading-none tracking-[-0.02em] text-neutral-300">
                {item.index}
              </span>
              <div className="mt-4 border-t border-neutral-200 pt-6">
                <h3 className="text-[19px] font-bold tracking-[-0.02em] text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500">
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
