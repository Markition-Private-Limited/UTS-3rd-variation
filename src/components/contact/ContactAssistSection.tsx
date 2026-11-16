import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

export function ContactAssistSection() {
  return (
    <Reveal>
    <section style={{ background: "#DEDEDE" }} className="px-4 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[568fr_597fr] lg:items-center lg:gap-x-[86px]">
          <div>
            <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-neutral-400 sm:mb-6 sm:text-[11px]">
              EXPLORE YOUR OPTIONS
            </span>
            <h2 className="mb-4 text-[28px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 sm:mb-6 sm:text-[36px] lg:text-[42px] lg:whitespace-nowrap">
              How Can <span className="font-semibold">We Assist?</span>
            </h2>
            <p className="max-w-xl text-[14px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500 sm:text-[15px] sm:leading-[180%]">
              From individual reservations to executive travel arrangements, we welcome enquiries about the chauffeur services offered by United Travel Services.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-start lg:flex-col lg:items-center lg:gap-5">
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full border border-transparent bg-neutral-900 text-white transition-colors duration-300 hover:border-white/40 sm:w-[228px]"
              style={{ padding: "16px 24px", fontSize: "0.68rem", letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}
            >
              <PillButtonContent fill="white">Services</PillButtonContent>
            </Link>
            <Link
              href="/#fleet"
              className="group relative inline-flex items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full border border-transparent bg-neutral-900 text-white transition-colors duration-300 hover:border-white/40 sm:w-[228px]"
              style={{ padding: "16px 24px", fontSize: "0.68rem", letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}
            >
              <PillButtonContent fill="white">Our Fleet</PillButtonContent>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
