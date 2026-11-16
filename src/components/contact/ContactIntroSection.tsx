import { Reveal } from "@/components/ui/reveal";
const DETAILS = [
  { label: "EMAIL", value: "info@unitedtravelservices.co.uk" },
  { label: "TELEPHONE", value: "+44 1483 343939" },
  { label: "LONDON", value: "+44 20 4628 6512" },
];

export function ContactIntroSection() {
  return (
    <Reveal>
    <section className="bg-white px-4 pt-10 pb-6 sm:px-10 sm:pt-14 sm:pb-10 lg:px-16 lg:pt-20 lg:pb-14">
      <div className="mx-auto max-w-7xl">
        {/* We're Here to Help */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
          <div>
            <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-neutral-400 sm:mb-6 sm:text-[11px]">
              A CONVERSATION ABOUT YOUR PLANS
            </span>
            <h2 className="text-[30px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[36px] lg:text-[42px] lg:whitespace-nowrap">
              We&apos;re Here <span className="font-semibold">to Help.</span>
            </h2>
          </div>
          <div className="lg:pt-[37px]">
            <p className="text-[14px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500 sm:text-[15px] sm:leading-[180%]">
              Every journey begins with understanding your requirements. Share your plans with United Travel Services and our team can help you discuss the appropriate service and arrangements for your travel.
            </p>
          </div>
        </div>

        {/* Bookings and Enquiries */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 lg:mt-20 lg:grid-cols-[480fr_380fr_380fr_380fr] lg:items-start lg:gap-x-10">
          <div className="border-t border-neutral-200 pt-6 sm:col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-[20px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[24px]">
              Bookings <span className="font-semibold">and Enquiries</span>
            </h3>
            <p className="text-[14px] font-normal leading-[165%] tracking-[-0.01em] text-neutral-500 sm:text-[15px] sm:leading-[170%]">
              For assistance discussing your next chauffeur journey.
            </p>
          </div>

          {DETAILS.map((item) => (
            <div key={item.label} className="border-t border-neutral-200 pt-6">
              <span className="mb-3 block text-[10px] font-medium tracking-[0.2em] text-neutral-400 sm:mb-4 sm:text-[11px]">
                {item.label}
              </span>
              <p className="text-[16px] font-semibold tracking-[-0.02em] text-neutral-900 sm:text-[18px]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Reveal>
  );
}
