"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const FAQS = [
  {
    question: "How long can I arrange an hourly chauffeur for?",
    answer:
      "Tell us the duration you have in mind and the date of travel. The available arrangements and any applicable hire terms should be discussed with the team before you confirm.",
  },
  {
    question: "Can I include several stops?",
    answer:
      "Provide each destination and an estimate of how long you expect to spend there. The complete sequence helps establish the proposed itinerary and period of hire.",
  },
  {
    question: "What if my schedule may change?",
    answer:
      "Mention any uncertainty when enquiring. If plans develop later, contact the team to discuss the change; revised timings or destinations should not be assumed to be included.",
  },
  {
    question: "Can I express a vehicle preference?",
    answer:
      "Yes. Share the category you would like alongside passenger and luggage information. Suitable vehicle options and availability can be reviewed for the proposed hire period.",
  },
];

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-neutral-300">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-[19px] font-bold tracking-[-0.02em] text-neutral-900">
          {question}
        </span>
        <span className="relative h-4 w-4 flex-none text-neutral-900">
          <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
          <span
            className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-current transition-transform duration-300"
            style={{ transform: `translateY(-50%) rotate(${open ? 0 : 90}deg)` }}
          />
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="max-w-3xl pb-6 text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HourlyChauffeurFaqSection() {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  const toggleIndex = (i: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <Reveal>
    <section style={{ background: "#F6F6F6" }} className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[568fr_597fr] lg:items-start lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              USEFUL TO KNOW
            </span>
            <h2 className="text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900">
              Questions Before <span className="font-semibold">You Travel?</span>
            </h2>
            <p className="mt-6 text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              A few details worth considering before you make your enquiry.
            </p>
          </div>

          <div className="border-b border-neutral-300">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                open={openIndexes.has(i)}
                onToggle={() => toggleIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
