import Image from "next/image";

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function CtaSection() {
  return (
    <section className="relative mx-auto h-[480px] overflow-hidden rounded-[32px] bg-black md:mx-[1.5%]">
      <Image
        src="/cta/chauffeur-car.jpg"
        alt="Luxury chauffeur car"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-20">
        <span className="text-[17px] font-light leading-none tracking-[0.35em] text-white/90">
          YOUR JOURNEY STARTS HERE
        </span>
        <h2 className="mt-6 text-[38px] leading-[1.25] tracking-[-0.06em] text-white md:text-[50px] md:leading-[62px]">
          <span className="block font-extralight">Ready to Experience</span>
          <span className="block font-medium">Luxury Chauffeur Travel?</span>
        </h2>
        <p className="mt-6 max-w-[500px] text-[17px] font-light leading-[32px] tracking-[-0.02em] text-white/90">
          Wherever you&apos;re headed, enjoy a seamless journey with professional chauffeurs and
          exceptional comfort.
        </p>
        <button className="mt-6 flex h-[58px] w-fit items-center gap-4 border border-white/50 px-6 text-[16px] font-light tracking-[0.15em] text-white transition-colors hover:bg-white/10">
          BOOK YOUR CHAUFFEUR
          <ArrowIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
