import { Reveal } from "@/components/ui/reveal";

const APPROACH = [
  {
    title: "Agreed Duration",
    body: "Discuss the period you need and your proposed start and finish so the basis of the hire is clear.",
  },
  {
    title: "Multiple Destinations",
    body: "Bring the addresses on your schedule into one conversation, including time expected at each stop.",
  },
  {
    title: "Itinerary Discussion",
    body: "Share the sequence of visits and any time-sensitive appointments before the arrangements are agreed.",
  },
  {
    title: "Vehicle Selection",
    body: "Consider your passengers, belongings and preferred travel category when discussing the hire.",
  },
];

export function HourlyChauffeurApproachSection() {
  return (
    <Reveal>
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          THE UTS APPROACH
        </span>
        <h2 className="max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[48px]">
          A Clear Plan <span className="font-semibold">for Your Time.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-10 lg:mt-16 lg:grid-cols-2">
          {APPROACH.map((item) => (
            <div key={item.title} className="border-t border-neutral-200 pt-6">
              <h3 className="text-[19px] font-bold tracking-[-0.02em] text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500">
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
