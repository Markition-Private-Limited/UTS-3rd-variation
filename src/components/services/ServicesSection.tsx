import Image from "next/image";
import { StatCounter } from "./StatCounter";

const SERVICES = [
  {
    index: "01",
    label: "AIRPORT TRANSFERS",
    badge: "Airport Travel",
    title: "Arrive in Comfort. Travel in Style.",
    description:
      "Enjoy a seamless journey to or from the airport with private transportation planned around.",
    src: "/services/airport-transfer.jpg",
    position: "center 40%",
  },
  {
    index: "02",
    label: "CITY TO CITY",
    badge: "Intercity",
    title: "A Better Way Between Cities.",
    description:
      "Travel between destinations in privacy and comfort, with a journey arranged around.",
    src: "/services/city-to-city.jpg",
    position: "center 50%",
  },
];

const STATS = [
  { value: "24/7", label: "Customer Support" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Chauffeurs & Vehicles" },
  { value: "10+", label: "Years of Experience" },
];

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ServicesSection() {
  return (
    <section
      className="-mx-4 overflow-hidden pt-20 text-white"
      style={{ background: "linear-gradient(235.26deg, #595959 0%, #1F1F1F 17.5%)" }}
    >
      <div className="mb-20 flex flex-col items-start justify-between gap-8 px-10 md:flex-row md:items-end">
        <div>
          <span className="ml-2 block text-[13px] font-normal tracking-[0.35em] text-neutral-300">
            OUR SERVICES
          </span>
          <h2 className="mt-5 text-[50px] leading-[121%] tracking-[-0.06em]">
            <span className="block whitespace-nowrap font-extralight">Premium Chauffeur Services</span>
            <span className="block whitespace-nowrap font-medium">for Every Occasion.</span>
          </h2>
        </div>

        <p className="mb-1 max-w-[480px] text-[14px] font-light leading-[200%] tracking-[-0.02em] text-neutral-300">
          From airport transfers to executive travel, explore our luxury chauffeur services
          designed around your comfort, convenience, and schedule.
        </p>
      </div>

      <div className="overflow-x-auto px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-10">
          {SERVICES.map((item) => (
            <article
              key={item.index}
              className="relative h-[450px] w-[340px] flex-none overflow-hidden rounded-3xl md:w-[734px]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 340px, 734px"
                className="object-cover"
                style={{ objectPosition: item.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.25em] text-white/80">
                    {item.index} / {item.label}
                  </span>
                  <span className="rounded-sm border border-white/60 px-2 py-0.5 text-[11px] text-white">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-[22px] font-normal leading-tight tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[640px] text-[15px] font-light tracking-[-0.02em] text-white/90">
                  {item.description}
                </p>

                <button className="mt-5 flex items-center gap-3 rounded-sm border border-white/50 px-4 py-3 text-xs tracking-[0.2em] text-white transition-colors hover:bg-white/10">
                  EXPLORE SERVICE
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mb-14 mt-16 border-y border-white/15 bg-white/[0.04] py-10">
        <div className="grid grid-cols-2 gap-10 px-10 text-center md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/25 md:px-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="md:px-10">
              <StatCounter
                value={stat.value}
                className="font-sans text-[44px] font-semibold leading-none tracking-[-0.04em] text-white"
              />
              <div className="mt-2 text-base font-medium text-neutral-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
