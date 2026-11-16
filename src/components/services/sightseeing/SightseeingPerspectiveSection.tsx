import Image from "next/image";

export function SightseeingPerspectiveSection() {
  return (
    <section style={{ background: "#F6F6F6" }} className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
          A BRITISH PERSPECTIVE
        </span>
        <h2 className="mb-12 max-w-3xl text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:mb-16 lg:text-[48px]">
          Landmarks. Landscapes.{" "}
          <span className="font-semibold">Your Own Pace.</span>
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[2fr_3fr] md:gap-8">
          <div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/services/sightseeing-perspective-cotswolds.jpg"
                alt="Woman walking past a stone gate on a historic English village street"
                fill
                sizes="(max-width: 768px) 100vw, 37vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[12px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              <span className="font-semibold tracking-[0.1em] text-neutral-700">BEYOND THE FAMILIAR</span>
              {" — "}Discuss the places that interest you.
            </p>
          </div>

          <div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: 0, paddingBottom: "calc(66.6667% - 15px)" }}>
              <Image
                src="/services/sightseeing-perspective-westminster.jpg"
                alt="Classic car crossing Westminster Bridge with the Houses of Parliament and Big Ben behind"
                fill
                sizes="(max-width: 768px) 100vw, 56vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[12px] font-normal leading-[160%] tracking-[-0.01em] text-neutral-500">
              <span className="font-semibold tracking-[0.1em] text-neutral-700">TIME TO LOOK AROUND</span>
              {" — "}Preferred stops form part of the itinerary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
