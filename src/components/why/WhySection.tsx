import { OriginButton } from "@/components/ui/origin-button";
import { ParallaxImage } from "@/components/ui/parallax-image";

const FACTS = [
  { label: "Chauffeurs", value: "Professional" },
  { label: "Vehicles", value: "Luxury Fleet" },
  { label: "Experience", value: "Privacy" },
  { label: "Service", value: "Personalised" },
];

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function WhySection() {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-[1280px] rounded-3xl bg-[#f4f4f4] p-3 md:p-4">
      <div className="grid grid-cols-1 gap-[10px] md:h-[540px] md:grid-cols-3 md:grid-rows-[244px_286px]">
        <div className="flex flex-col rounded-[10px] bg-white px-[16px] pb-[14px] pt-[16px] md:row-span-2">
          <span className="text-[12px] font-light leading-none tracking-[0.32em] text-neutral-500">
            WHY CHOOSE US
          </span>
          <h2 className="mt-[14px] text-[46px] font-medium leading-[52px] tracking-[-0.05em] text-neutral-950">
            <span className="block">More Than a Ride.</span>
            <span className="block">A Standard of</span>
            <span className="block">Excellence.</span>
          </h2>
          <p className="mt-[14px] max-w-[290px] text-[14px] font-light leading-[26px] tracking-[-0.02em] text-neutral-500">
            Exceptional travel begins with attention to every detail.
          </p>

          <dl className="mt-auto">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex h-12 items-center justify-between border-b border-neutral-200"
              >
                <dt className="text-[14px] font-light tracking-[-0.01em] text-neutral-500">
                  {fact.label}
                </dt>
                <dd className="text-[14px] font-normal tracking-[-0.01em] text-neutral-950">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[300px] md:min-h-0 overflow-hidden rounded-[10px] md:row-span-2">
          <ParallaxImage
            src="/why/seated-client.jpg"
            alt="Passenger seated in a chauffeured car"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="relative min-h-[200px] md:min-h-0 overflow-hidden rounded-[10px]">
          <ParallaxImage
            src="/why/audi-front.jpg"
            alt="Luxury sedan front grille"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
        </div>

        <div className="flex flex-col rounded-[10px] bg-[#111] px-[16px] pb-[14px] pt-[16px] text-white">
          <span className="text-[12px] font-light leading-none tracking-[0.32em] text-neutral-300">
            A PERSONAL TOUCH
          </span>
          <div className="mt-[56px]">
            <h3 className="text-[22px] font-normal leading-tight tracking-[-0.045em]">
              Your Journey. Our Priority.
            </h3>
            <p className="mt-1 text-[15px] font-light tracking-[-0.02em] text-neutral-200">
              Comfort, privacy and thoughtful service.
            </p>
          </div>
          <OriginButton
            className="mt-auto h-[40px] w-fit gap-[11px] border border-white/45 px-[11px] text-[10px] font-normal tracking-[0.2em] text-white"
            fillColor="#ffffff"
            fillTextColor="#111111"
          >
            EXPLORE OUR SERVICES
            <ArrowIcon className="h-[14px] w-[14px]" />
          </OriginButton>
        </div>
      </div>
      </div>
    </section>
  );
}
