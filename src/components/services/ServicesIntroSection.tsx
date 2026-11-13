import { Reveal } from "@/components/ui/reveal";
export function ServicesIntroSection() {
  return (
    <Reveal>
    <section className="bg-white px-4 pt-10 pb-5 sm:px-10 sm:pt-14 sm:pb-6 lg:px-16 lg:pt-20 lg:pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
          <div>
            <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-neutral-400 sm:mb-6 sm:text-[11px]">
              OUR SERVICES
            </span>
            <h2 className="text-[30px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[36px] lg:text-[42px] lg:whitespace-nowrap">
              Every Journey, <span className="font-semibold">Thoughtfully</span>
              <br />
              <span className="font-semibold">Delivered.</span>
            </h2>
          </div>
          <div className="lg:pt-[37px]">
            <p className="text-[14px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500 sm:text-[15px] sm:leading-[180%]">
              Every journey has its own purpose. Whether you need reliable airport transportation, professional business travel or a more flexible chauffeur arrangement, our services are designed to help you travel comfortably and organise your journey with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
