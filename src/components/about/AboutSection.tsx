import Image from "next/image";

const GALLERY = [
  { src: "/about/car-sunglasses.jpg", position: "center 20%", offset: false },
  { src: "/about/suit-walk.jpg", position: "center 15%", offset: true },
  { src: "/about/suv-exit.jpg", position: "center 10%", offset: false },
  { src: "/about/audi-grille.jpg", position: "center 45%", offset: true },
];

export function AboutSection() {
  return (
    <section className="px-10 py-10 md:py-16">
      <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-medium tracking-[0.3em] text-neutral-400">
            ABOUT UTS
          </span>
          <h2 className="mt-4 text-[44px] leading-[1.15] tracking-[-0.02em] text-neutral-900">
            <span className="block font-normal">More than a journey.</span>
            <span className="block font-bold">An experience.</span>
          </h2>
        </div>

        <p className="max-w-md text-[15px] leading-[180%] text-neutral-500">
          We believe luxury is more than just reaching your destination. It&apos;s about
          enjoying every moment of the journey. Our premium chauffeur services are designed to
          provide exceptional comfort, reliability
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {GALLERY.map((item, i) => (
          <div
            key={i}
            className={`relative h-[480px] overflow-hidden rounded-3xl ${item.offset ? "md:mt-[86px]" : ""}`}
          >
            <Image
              src={item.src}
              alt="United Travel Services"
              fill
              className="object-cover"
              style={{ objectPosition: item.position }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
