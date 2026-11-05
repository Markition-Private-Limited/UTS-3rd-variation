import Image from "next/image";

const STANDARDS = [
  {
    index: "01",
    title: "Professional Chauffeurs",
    body: "Courteous, professional service and attention to presentation help create a comfortable experience from pickup to arrival.",
  },
  {
    index: "02",
    title: "Comfort Without Compromise",
    body: "Executive transportation should offer a welcoming environment where passengers can relax, prepare for a meeting or simply enjoy the journey.",
  },
  {
    index: "03",
    title: "Thoughtful Journey Planning",
    body: "Clear communication and carefully coordinated arrangements help make travel feel more organised and straightforward.",
  },
];

export function AboutStandardSection() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px] lg:gap-y-0">
        {/* Left — label, heading, image */}
        <div>
          <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
            THE UTS STANDARD
          </span>
          <h2 className="mb-8 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
            Excellence in <span className="font-semibold">Every Detail.</span>
          </h2>
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "5/3" }}>
            <Image
              src="/about/uts-standard-chauffeur.webp"
              alt="United Travel Services chauffeur standing beside a Mercedes-Benz S-Class"
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right — numbered list */}
        <div className="flex flex-col gap-5">
          {STANDARDS.map((item) => (
            <div key={item.index} className="border-t border-neutral-200 pt-5">
              <span className="mb-3 block text-[12px] text-neutral-400">{item.index}</span>
              <h3 className="mb-2 text-[18px] font-semibold tracking-[-0.02em] text-neutral-900 sm:text-[19px]">
                {item.title}
              </h3>
              <p className="text-[14px] font-normal leading-[165%] tracking-[-0.01em] text-neutral-500">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
