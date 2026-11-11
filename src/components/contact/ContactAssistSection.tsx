import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function ContactAssistSection() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[568fr_597fr] lg:items-center lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              EXPLORE YOUR OPTIONS
            </span>
            <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 lg:whitespace-nowrap">
              How Can <span className="font-semibold">We Assist?</span>
            </h2>
            <p className="max-w-xl text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              From individual reservations to executive travel arrangements, we welcome enquiries about the chauffeur services offered by United Travel Services.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-center">
            <Link
              href="/services"
              className="group relative inline-flex w-[228px] items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full bg-neutral-900 text-white"
              style={{ padding: "18px 28px", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
            >
              <PillButtonContent fill="white">Services</PillButtonContent>
            </Link>
            <Link
              href="/#fleet"
              className="group relative inline-flex w-[228px] items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full bg-neutral-900 text-white"
              style={{ padding: "18px 28px", fontSize: "0.72rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
            >
              <PillButtonContent fill="white">Our Fleet</PillButtonContent>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
