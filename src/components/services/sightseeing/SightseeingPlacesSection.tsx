import Image from "next/image";

export function SightseeingPlacesSection() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[880fr_760fr] lg:gap-x-[86px]">
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "880/660" }}>
            <Image
              src="/services/sightseeing-places.jpg"
              alt="Group of visitors exploring a historic English countryside courtyard with a classic car"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "center center" }}
            />
          </div>

          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              A VISIT SHAPED BY YOUR INTERESTS
            </span>
            <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:text-[48px]">
              The Places You{" "}
              <span className="font-semibold">Came to Discover.</span>
            </h2>
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              A memorable visit begins with knowing what you would like to see. Sightseeing Chauffeur travel offers a private transport arrangement to discuss around your preferred landmarks, neighbourhoods or countryside destinations. It may suit a first visit, time with family or a day spent discovering somewhere new. Tell United Travel Services your interests, starting point and the time available, together with any reservations you have already made. Preferred stops, the sequence of travel and vehicle requirements can then be considered. Attraction admission, opening times and any guiding requirements should be discussed separately rather than assumed to be included.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
