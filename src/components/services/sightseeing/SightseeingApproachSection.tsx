const ITEMS = [
  [
    {
      title: "Itinerary Interests",
      body: "Begin with the places, architecture or landscapes you would most like to experience during your visit.",
    },
    {
      title: "Relaxed Travel",
      body: "Private road travel creates a quieter connection between the places on your agreed itinerary.",
    },
  ],
  [
    {
      title: "Stops Discussed",
      body: "Share your preferred stops and any booked visits so the proposed sequence can be reviewed.",
    },
    {
      title: "Vehicle Choice",
      body: "Consider passengers, belongings and your preferred category when discussing the day's travel.",
    },
  ],
];

export function SightseeingApproachSection() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          THE UTS APPROACH
        </span>
        <h2 className="mb-12 max-w-2xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:mb-16 lg:text-[48px]">
          Your Interests <span className="font-semibold">Lead the Conversation.</span>
        </h2>

        <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2">
          {ITEMS.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              {column.map((item) => (
                <div key={item.title} className="border-t border-neutral-200 py-7">
                  <h3 className="mb-3 text-[20px] font-bold tracking-[-0.02em] text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-[15px] font-normal leading-[175%] tracking-[-0.01em] text-neutral-500">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
