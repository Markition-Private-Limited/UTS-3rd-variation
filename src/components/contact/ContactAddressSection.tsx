import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function ContactAddressSection() {
  return (
    <Reveal>
    <section style={{ background: "#F6F6F6" }} className="px-6 pt-[104px] pb-14 sm:px-10 sm:pb-14 lg:px-16 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[700fr_465fr] lg:gap-x-[86px]">
          <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src="/contact/uts-office-building.jpg"
              alt="United Travel Services office building on Bath Road, Longford, Heathrow"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              UNITED TRAVEL SERVICES
            </span>
            <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900">
              Our <span className="font-semibold">Contact Address.</span>
            </h2>
            <p className="text-[18px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500">
              450 Bath Road, Longford, Heathrow, UB7 0EB
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
