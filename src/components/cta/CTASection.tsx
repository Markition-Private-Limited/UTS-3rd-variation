"use client";
import Image from "next/image";
import { OriginButton } from "@/components/ui/origin-button";

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden bg-black"
      style={{ height: "560px", borderRadius: "30px" }}
    >
      <Image
        src="/cta-bg.jpg"
        alt="Luxury chauffeur car"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <div className="relative z-10 flex h-full flex-col justify-center px-14 py-16">
        <span
          className="uppercase text-white/90"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 400,
            fontSize: "17.9px",
            lineHeight: "100%",
            letterSpacing: "0.4em",
            marginBottom: "24px",
          }}
        >
          Your Journey Starts Here
        </span>

        <h2
          className="text-white"
          style={{
            fontSize: "52px",
            lineHeight: "1.21",
            letterSpacing: "-0.06em",
            marginBottom: "32px",
          }}
        >
          <span className="block font-light">Ready to Experience</span>
          <span className="block font-bold">Luxury Chauffeur Travel?</span>
        </h2>

        <p
          className="text-white/90"
          style={{
            fontSize: "17px",
            fontWeight: 300,
            lineHeight: "32px",
            letterSpacing: "-0.02em",
            maxWidth: "500px",
            marginBottom: "40px",
          }}
        >
          Wherever you&apos;re headed, enjoy a seamless journey with professional
          chauffeurs and exceptional comfort.
        </p>

        <OriginButton
          className="w-fit border border-white/30 px-8 py-5 text-[16px] font-light tracking-[0.15em] text-white uppercase"
          fillColor="#ffffff"
          fillTextColor="#111111"
        >
          Book Your Chauffeur
          <ArrowIcon className="h-5 w-5" />
        </OriginButton>
      </div>
    </section>
  );
}
