import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

const inputClasses =
  "w-full rounded-md border border-neutral-200 bg-white px-4 py-3.5 text-[15px] text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-3 block text-[15px] font-medium text-neutral-900">{label}</label>
      {children}
    </div>
  );
}

export function ContactFormSection() {
  return (
    <Reveal>
    <section style={{ background: "#F6F6F6" }} className="border-y border-neutral-200 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[440fr_780fr] lg:gap-x-[86px]">
          {/* Left — intro copy */}
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              SEND AN ENQUIRY
            </span>
            <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900">
              Tell Us <span className="font-semibold">About Your Journey.</span>
            </h2>
            <p className="mt-6 text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              Share a few details about your plans and requirements so our team can better understand your enquiry and help you discuss the next steps.
            </p>

            <div className="mt-10 border-t border-neutral-200 pt-10">
              <h3 className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-neutral-900">
                A few things worth including
              </h3>
              <p className="text-[15px] font-normal leading-[170%] tracking-[-0.01em] text-neutral-500">
                Your travel dates and preferred times, full pickup and destination addresses, passenger numbers, luggage and any particular requirements will help frame the conversation.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <form className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Field label="First Name">
                <input type="text" className={inputClasses} />
              </Field>
              <Field label="Last Name">
                <input type="text" className={inputClasses} />
              </Field>

              <Field label="Email Address">
                <input type="email" className={inputClasses} />
              </Field>
              <Field label="Telephone Number">
                <input type="tel" className={inputClasses} />
              </Field>

              <Field label="Preferred Travel Date">
                <div className="relative">
                  <input type="text" placeholder="DD / MM / YYYY" className={inputClasses} />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
                  </svg>
                </div>
              </Field>

              <Field label="Pickup Location">
                <input type="text" className={inputClasses} />
              </Field>
              <Field label="Destination">
                <input type="text" className={inputClasses} />
              </Field>

              <Field label="Number of Passengers">
                <input type="number" min={1} className={inputClasses} />
              </Field>

              <Field label="Message" className="sm:col-span-2">
                <textarea rows={6} className={`${inputClasses} resize-none`} />
              </Field>
            </div>

            <button
              type="submit"
              className="group relative inline-flex w-fit items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded-full border border-transparent bg-neutral-900 text-white transition-colors duration-300 hover:border-white/40"
              style={{ padding: "16px 28px", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
            >
              <PillButtonContent fill="white">Book a Chauffeur</PillButtonContent>
            </button>
          </form>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
