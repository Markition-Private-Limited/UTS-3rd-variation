import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function ContactAddressSection() {
  return (
    <Reveal>
    <section style={{ background: "#F6F6F6" }} className="px-4 pt-10 pb-10 sm:px-10 sm:pt-14 sm:pb-14 lg:px-16 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[700fr_465fr] lg:gap-x-[86px]">
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
            <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-neutral-400 sm:mb-6 sm:text-[11px]">
              UNITED TRAVEL SERVICES
            </span>
            <h2 className="mb-4 text-[28px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 sm:mb-6 sm:text-[36px] lg:text-[42px]">
              Our <span className="font-semibold">Contact Address.</span>
            </h2>
            <p className="text-[15px] font-normal leading-[165%] tracking-[-0.01em] text-neutral-500 sm:text-[18px] sm:leading-[170%]">
              450 Bath Road, Longford, Heathrow, UB7 0EB
            </p>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
