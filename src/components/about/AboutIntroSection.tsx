export function AboutIntroSection() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
        {/* Left — heading */}
        <div className="flex-shrink-0 lg:w-[560px]">
          <span className="block text-[11px] font-medium tracking-[0.3em] text-neutral-400 mb-6">
            UNITED TRAVEL SERVICES
          </span>
          <h2>
            <span className="block text-[42px] font-extralight leading-[115%] tracking-[-0.04em] text-neutral-900 sm:text-[52px] lg:text-[58px]">
              Time well spent.
            </span>
            <span className="block text-[42px] font-normal leading-[115%] tracking-[-0.04em] text-neutral-900 sm:text-[52px] lg:text-[58px]">
              Even between places.
            </span>
          </h2>
        </div>

        {/* Right — body copy */}
        <div className="flex flex-col gap-5 lg:w-[592px]">
          <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-600">
            At United Travel Services, we believe the journey deserves as much care as the destination. It can be a quiet moment before a meeting, the start of a holiday or a chance to simply enjoy the view.
          </p>
          <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-600">
            Our approach brings together professional chauffeur service and practical, personal planning. We listen to what your day requires, then help arrange travel that feels composed rather than complicated.
          </p>
        </div>
      </div>
    </section>
  );
}
