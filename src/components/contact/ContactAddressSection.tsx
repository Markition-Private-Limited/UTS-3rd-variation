import Image from "next/image";

export function ContactAddressSection() {
  return (
    <section
      className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16"
      style={{ background: "#f4f4f4" }}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
        {/* Left — building image */}
        <div className="relative overflow-hidden rounded-[clamp(14px,1.5vw,20px)]" style={{ aspectRatio: "16/10" }}>
          <Image
            src="/contact/contact-address.jpg"
            alt="United Travel Services office at 450 Bath Road, Heathrow"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>

        {/* Right — address text */}
        <div className="lg:pl-8">
          <span className="block text-[11px] font-medium uppercase tracking-[0.3em] text-black/35 mb-7">
            United Travel Services
          </span>
          <h2 className="mb-6 text-[36px] font-extralight leading-[112%] tracking-[-0.04em] text-black sm:text-[44px] lg:text-[52px]">
            Our <span className="font-bold">Contact Address.</span>
          </h2>
          <p className="text-[17px] font-light leading-[180%] text-black/60">
            450 Bath Road, Longford,<br />
            Heathrow, UB7 0EB
          </p>
        </div>
      </div>
    </section>
  );
}
