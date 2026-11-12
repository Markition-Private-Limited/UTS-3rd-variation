import Image from "next/image";
import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

export function AboutCTASection() {
  return (
    <Reveal>
    <section className="bg-white p-4 pb-8 sm:p-5 sm:pb-10 lg:p-6 lg:pb-14">
        <div className="relative flex min-h-[600px] w-full items-center overflow-hidden rounded-[32px] sm:min-h-[440px] lg:aspect-[1584/600] lg:min-h-0">
          <Image
            src="/about/uts-cta-mansion.jpg"
            alt="United Travel Services chauffeur beside a Mercedes-Benz S-Class at a country house"
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* Left-to-right dark gradient so the text reads against the photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 72%)",
            }}
          />

          <div className="relative z-10 py-12">
            <div className="max-w-2xl px-8 sm:px-12 lg:px-16">
              <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-300">
                THE NEXT JOURNEY STARTS WITH YOU
              </span>
              <h2 className="mb-6">
                <span className="block whitespace-nowrap text-[32px] font-extralight leading-[115%] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[56px]">
                  Your Journey <span className="font-semibold">Deserves</span>
                </span>
                <span className="block whitespace-nowrap text-[32px] font-semibold leading-[115%] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[56px]">
                  Exceptional Service.
                </span>
              </h2>
              <p className="mb-8 text-[15px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-300">
                Whether you are arranging an airport transfer, planning business travel or organising a private journey, United Travel Services is ready to help you explore the available options.
              </p>
              <Link
                href="/book"
                className="group relative inline-flex w-fit items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full bg-white text-black"
                style={{ padding: "16px 28px", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
              >
                <PillButtonContent fill="black">Book Your Chauffeur</PillButtonContent>
              </Link>
            </div>
          </div>
        </div>
    </section>
    </Reveal>
  );
}
