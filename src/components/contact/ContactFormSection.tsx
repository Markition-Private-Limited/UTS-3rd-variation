"use client";

import { useState } from "react";
import PillButtonContent from "@/components/ui/PillButtonContent";
import { Reveal } from "@/components/ui/reveal";

const inputBase =
  "w-full rounded-md border border-neutral-200 bg-white px-4 py-3.5 text-[15px] text-neutral-900 placeholder-neutral-400 outline-none transition-colors duration-200 focus:border-neutral-800 hover:border-neutral-300";

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

const DIAL_CODES = [
  { code: "+44", iso: "GB", label: "UK" },
  { code: "+1",  iso: "US", label: "US" },
  { code: "+33", iso: "FR", label: "FR" },
  { code: "+49", iso: "DE", label: "DE" },
  { code: "+39", iso: "IT", label: "IT" },
  { code: "+34", iso: "ES", label: "ES" },
  { code: "+31", iso: "NL", label: "NL" },
  { code: "+971",iso: "AE", label: "UAE" },
  { code: "+61", iso: "AU", label: "AU" },
  { code: "+91", iso: "IN", label: "IN" },
];

function PhoneField() {
  const [dial, setDial] = useState("+44");
  return (
    <Field label="Telephone Number">
      <div className="flex overflow-hidden rounded-md border border-neutral-200 bg-white transition-colors duration-200 hover:border-neutral-300 focus-within:border-neutral-800">
        <select
          value={dial}
          onChange={(e) => setDial(e.target.value)}
          className="shrink-0 cursor-pointer border-r border-neutral-200 bg-transparent px-3 py-3.5 text-[15px] text-neutral-900 outline-none"
          aria-label="Country dial code"
        >
          {DIAL_CODES.map((d) => (
            <option key={d.iso} value={d.code}>
              {d.code} {d.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[15px] text-neutral-900 placeholder-neutral-400 outline-none"
          placeholder="Phone number"
        />
      </div>
    </Field>
  );
}

function DateField() {
  return (
    <Field label="Preferred Travel Date">
      <div className="relative">
        <input
          type="date"
          className={`${inputBase} cursor-pointer pr-10 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`}
          style={{ colorScheme: "light" }}
        />
        {/* Calendar icon — pointer-events-none so clicks fall through to the input */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
          aria-hidden
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      </div>
    </Field>
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
                <input type="text" className={inputBase} placeholder="e.g. James" />
              </Field>
              <Field label="Last Name">
                <input type="text" className={inputBase} placeholder="e.g. Harrison" />
              </Field>

              <Field label="Email Address">
                <input type="email" className={inputBase} placeholder="you@example.com" />
              </Field>
              <PhoneField />

              <DateField />

              <Field label="Pickup Location">
                <input type="text" className={inputBase} placeholder="Address or postcode" />
              </Field>

              <Field label="Destination">
                <input type="text" className={inputBase} placeholder="Address or postcode" />
              </Field>

              <Field label="Number of Passengers">
                <div className="relative">
                  <select
                    className={`${inputBase} cursor-pointer appearance-none pr-10`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select passengers</option>
                    {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Field>

              <Field label="Message" className="sm:col-span-2">
                <textarea
                  rows={6}
                  className={`${inputBase} resize-none`}
                  placeholder="Any additional information about your journey…"
                />
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
