export function ServicesIntroSection() {
  return (
    <section className="bg-white px-6 pt-14 pb-6 sm:px-10 lg:px-16 lg:pt-20 lg:pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              OUR SERVICES
            </span>
            <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
              Every Journey, <span className="font-semibold">Thoughtfully</span>
              <br />
              <span className="font-semibold">Delivered.</span>
            </h2>
          </div>
          <div className="lg:pt-[37px]">
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              Every journey has its own purpose. Whether you need reliable airport transportation, professional business travel or a more flexible chauffeur arrangement, our services are designed to help you travel comfortably and organise your journey with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
