export function FleetIntroSection() {
  return (
    <section className="bg-white px-6 pt-14 pb-6 sm:px-10 lg:px-16 lg:pt-20 lg:pb-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
        <div>
          <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
            OUR FLEET
          </span>
          <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
            The Right Vehicle{" "}
            <span className="font-semibold">for Every Journey.</span>
          </h2>
        </div>
        <div className="lg:pt-[37px]">
          <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
            Different journeys call for different vehicle requirements. Explore the vehicles available through United Travel Services to find an option that suits your destination, passenger needs and preferred travel experience.
          </p>
        </div>
      </div>
    </section>
  );
}
