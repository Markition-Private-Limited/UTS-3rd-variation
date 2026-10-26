import { ParallaxImage } from "@/components/ui/parallax-image";

const GALLERY = [
  { src: "/about/car-sunglasses.jpg", position: "center 20%", offset: false },
  { src: "/about/suit-walk.jpg", position: "center 10%", offset: true },
  { src: "/about/suv-exit.jpg", position: "center 10%", offset: false },
  { src: "/about/audi-grille.jpg", position: "center 45%", offset: true },
];

export function AboutSection() {
  return (
    <section className="overflow-hidden pt-2 pb-10 md:pb-16">
      <div className="mb-14 flex flex-col items-start justify-between gap-8 px-10 md:flex-row md:items-end">
        <div>
          <span className="ml-3 block text-xs font-medium tracking-[0.3em] text-neutral-400">
            ABOUT UTS
          </span>
          <h2 className="mt-4 text-[58px] leading-[121%] tracking-[-0.06em] text-neutral-900">
            <span className="block whitespace-nowrap font-extralight">More than a journey.</span>
            <span className="block font-normal">An experience.</span>
          </h2>
        </div>

        <p className="max-w-xl text-[16px] font-light leading-[200%] tracking-[-0.03em] text-neutral-500">
          We believe luxury is more than just reaching your destination. It&apos;s about
          enjoying every moment of the journey. Our premium chauffeur services are designed to
          provide exceptional comfort, reliability
        </p>
      </div>

      <div className="overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-6">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className={`relative h-[480px] w-[300px] flex-none overflow-hidden rounded-3xl md:w-[360px] ${
                item.offset ? "md:mt-[86px]" : ""
              }`}
              style={{ boxShadow: "0px 0px 81.7px 0px #00000040" }}
            >
              <ParallaxImage
                src={item.src}
                alt="United Travel Services"
                sizes="(max-width: 768px) 80vw, 360px"
                className="object-cover"
                style={{ objectPosition: item.position }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
