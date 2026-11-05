import Image from "next/image";

export function AboutIntroSection() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left — label, heading, body */}
        <div className="flex-shrink-0 lg:w-[44%]">
          <span className="block text-[11px] font-medium tracking-[0.3em] text-neutral-400 mb-6">
            THE UTS EXPERIENCE
          </span>
          <h2 className="mb-8">
            <span className="block text-[42px] font-extralight leading-[115%] tracking-[-0.04em] text-neutral-900 sm:text-[52px] lg:text-[56px]">
              More Than a <span className="font-semibold">Journey.</span>
            </span>
            <span className="block whitespace-nowrap text-[42px] font-semibold leading-[115%] tracking-[-0.04em] text-neutral-900 sm:text-[52px] lg:text-[56px]">
              An Experience.
            </span>
          </h2>
          <p className="max-w-lg text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
            At United Travel Services, a quality journey is about more than reaching your destination. It is about feeling comfortable, knowing your arrangements have been considered and receiving professional service throughout the experience. We bring together executive vehicles, courteous chauffeurs and thoughtful journey planning to make every booking feel straightforward and every journey more enjoyable.
          </p>
        </div>

        {/* Right — image */}
        <div className="relative w-full overflow-hidden rounded-2xl lg:w-[56%]" style={{ aspectRatio: "16/10" }}>
          <Image
            src="/about/uts-experience-reading.jpg"
            alt="Passenger reading in the back seat of a United Travel Services chauffeur car"
            fill
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
