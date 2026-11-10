const ADVANTAGES = [
  {
    index: "01",
    title: "Professional Chauffeurs",
    body: "Courteous service and appropriate presentation set a composed tone for your journey.",
  },
  {
    index: "02",
    title: "Executive Comfort",
    body: "A welcoming vehicle environment offers space to relax or prepare for what comes next.",
  },
  {
    index: "03",
    title: "Thoughtful Coordination",
    body: "Pickup points, destinations and timings are considered together when discussing your booking.",
  },
  {
    index: "04",
    title: "Personal Attention",
    body: "Your travel purpose and passenger requirements help shape the arrangements you discuss.",
  },
];

export function ServicesAdvantageSection() {
  return (
    <section className="bg-[#1B1B1B] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          UTS ADVANTAGE
        </span>
        <h2 className="max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-white">
          A More Considered <span className="font-semibold">Way to Travel.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {ADVANTAGES.map((item) => (
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
  );
}
