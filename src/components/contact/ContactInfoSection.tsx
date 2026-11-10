export function ContactInfoSection() {
  return (
    <section
      className="flex flex-col gap-16 px-6 sm:px-10 lg:px-16 py-16 lg:py-24"
      style={{ background: "#ffffff" }}
    >
      {/* Top row — heading left, description right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="block text-[11px] font-medium uppercase tracking-[0.3em] text-black/35 mb-7">
            A Conversation About Your Plans
          </span>
          <h2 className="text-[42px] font-extralight leading-[108%] tracking-[-0.04em] text-black sm:text-[52px] lg:text-[62px]">
            We&apos;re Here{" "}
            <span className="font-bold">to Help.</span>
          </h2>
        </div>

        <div className="flex items-end lg:pb-2">
          <p className="max-w-[460px] text-[15px] font-light leading-[185%] text-black/55">
            Every journey begins with understanding your requirements. Share your plans with United
            Travel Services and our team can help you discuss the appropriate service and
            arrangements for your travel.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-black/[0.08]" />

      {/* Bottom row — label left, contact columns right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Left label block */}
        <div>
          <p className="mb-2.5 text-[16px] font-semibold tracking-tight text-black">
            Bookings and Enquiries
          </p>
          <p className="text-[13.5px] font-light text-black/45">
            For assistance discussing your next chauffeur journey.
          </p>
        </div>

        {/* Right contact grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.22em] text-black/35">
              Email
            </p>
            <a
              href="mailto:info@unitedtravelservices.co.uk"
              className="text-[14px] font-light text-black/80 transition-colors hover:text-black"
            >
              info@unitedtravelservices.co.uk
            </a>
          </div>

          <div>
            <p className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.22em] text-black/35">
              Telephone
            </p>
            <a
              href="tel:+441483343939"
              className="text-[14px] font-light text-black/80 transition-colors hover:text-black"
            >
              +44 1483 343939
            </a>
          </div>

          <div>
            <p className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.22em] text-black/35">
              London
            </p>
            <a
              href="tel:+442046286512"
              className="text-[14px] font-light text-black/80 transition-colors hover:text-black"
            >
              +44 20 4628 6512
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
