"use client";

import { motion } from "motion/react";

const items = [
  {
    title: "Passengers and Luggage",
    description:
      "Share the number of passengers and describe every bag, larger item and any access requirement. Do not assume suitability from a model name alone.",
  },
  {
    title: "Journey Type and Preferred Category",
    description:
      "Tell us whether you are planning an airport transfer, business travel or a private itinerary, and which travel category you would like to explore.",
  },
  {
    title: "Options and Availability",
    description:
      "Ask about appropriate vehicle options for your date and requirements. A preferred model or category should be discussed before the booking is confirmed.",
  },
];

export function FleetChoosingSection() {
  return (
    <section className="bg-white px-6 pt-10 pb-6 sm:px-10 sm:pt-12 sm:pb-8 md:px-12 lg:px-16 lg:pt-14 lg:pb-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:gap-16 lg:gap-20">
        {/* Left — heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-5 block text-[11px] font-medium tracking-[0.3em] text-neutral-400 uppercase">
            Choosing Your Vehicle
          </span>
          <h2 className="mb-6 text-[32px] font-extralight leading-[112%] tracking-[-0.04em] text-neutral-900 sm:text-[40px] md:text-[44px] lg:text-[52px]">
            Find the Right{" "}
            <span className="font-semibold">Fit for Your Journey.</span>
          </h2>
          <p className="text-[15px] font-normal leading-[175%] tracking-[-0.01em] text-neutral-500">
            Start with the people and the journey. A few practical details help make the vehicle conversation more useful.
          </p>
        </motion.div>

        {/* Right — items */}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="border-t border-neutral-200 py-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <h3 className="mb-3 text-[16px] font-semibold leading-snug tracking-[-0.01em] text-neutral-900">
                {item.title}
              </h3>
              <p className="text-[15px] font-normal leading-[175%] tracking-[-0.01em] text-neutral-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
