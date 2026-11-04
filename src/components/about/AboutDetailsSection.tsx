import Image from "next/image";
import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function AboutDetailsSection() {
  return (
    <section className="bg-white px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

        {/* Left — image grid */}
        <div className="flex-shrink-0 lg:w-[52%]">
          {/* Top image — full width */}
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src="/about/details-handle.webp"
              alt="Chauffeur opening car door on a London street"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
          {/* Bottom two images */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/about/details-interior.webp"
                alt="Luxury car interior with cream leather seats"
                fill
                sizes="(max-width: 1024px) 50vw, 26vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/about/details-chauffeur.webp"
                alt="Premium car door handle detail"
                fill
                sizes="(max-width: 1024px) 50vw, 26vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right — text */}
        <div className="lg:flex-1">
          <span className="block text-[11px] font-medium tracking-[0.3em] text-neutral-400 mb-6">
            THE ART OF PERSONAL SERVICE
          </span>
          <h2 className="mb-8">
            <span className="block text-[36px] font-extralight leading-[115%] tracking-[-0.04em] text-neutral-900 sm:text-[44px] lg:text-[58px]">
              Where every journey
            </span>
            <span className="block text-[36px] font-normal leading-[115%] tracking-[-0.04em] text-neutral-900 sm:text-[44px] lg:text-[58px]">
              feels Effortless.
            </span>
          </h2>
          <div className="flex flex-col gap-5 mb-10 max-w-lg">
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-600">
              A chauffeur journey should feel easy from the moment you step outside. A thoughtful welcome, help with your bags and a calm cabin set the tone for what follows.
            </p>
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-600">
              Whether you prefer to catch up on work or switch off for a while, the experience is shaped around you. Let us know about child seats, extra luggage or any other requirements when you enquire, so they can be discussed in advance.
            </p>
          </div>
          <Link
            href="/#fleet"
            className="group relative inline-flex overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[11px] font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-full"
            style={{ background: "#1a1a1a", color: "#F9F9F9", border: "1px solid transparent" }}
          >
            <PillButtonContent fill="white">Explore Our Fleet</PillButtonContent>
          </Link>
        </div>

      </div>
    </section>
  );
}
