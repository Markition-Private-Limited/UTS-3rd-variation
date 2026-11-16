const STEPS = [
  {
    index: "01",
    title: "Make Your Enquiry",
    body: "Tell us where you are staying, the date and the places or interests you would like the trip to reflect.",
  },
  {
    index: "02",
    title: "Discuss Your Arrangements",
    body: "Review the preferred stops, available time, existing reservations and vehicle requirements.",
  },
  {
    index: "03",
    title: "Confirm the Details",
    body: "Check the agreed pickup, itinerary and finish, along with what has been included in the arrangements.",
  },
  {
    index: "04",
    title: "Enjoy Your Journey",
    body: "Travel between the agreed destinations and enjoy seeing your chosen places from a different perspective.",
  },
];

export function SightseeingJourneySection() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          YOUR JOURNEY WITH UTS
        </span>
        <h2 className="max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[48px]">
          A Seamless Experience <span className="font-semibold">from Start to Finish.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.index}>
              <span className="block text-[48px] font-extralight leading-none tracking-[-0.06em] text-[#BDBDBD]">
                {step.index}
              </span>
              <div className="mt-6 border-t border-neutral-200" />
              <h3 className="mt-6 text-[19px] font-bold tracking-[-0.02em] text-neutral-900">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
