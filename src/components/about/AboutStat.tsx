"use client";

import { useEffect, useRef, useState } from "react";

const SPIN_INTERVAL_MS = 50;
const FIRST_DIGIT_STOP_MS = 500;
const STAGGER_MS = 110;

function randomDigit(): string {
  return String(Math.floor(Math.random() * 10));
}

export function AboutStat({
  value,
  label,
  divider = true,
}: {
  value: string;
  label: string;
  divider?: boolean;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = value.split("");
    const digitPositions = chars.reduce<number[]>(
      (acc, c, i) => (/\d/.test(c) ? [...acc, i] : acc),
      []
    );
    const stopTimes = digitPositions.map((_, idx) => FIRST_DIGIT_STOP_MS + idx * STAGGER_MS);

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const runShuffle = () => {
      if (intervalId) clearInterval(intervalId);
      let elapsed = 0;
      intervalId = setInterval(() => {
        elapsed += SPIN_INTERVAL_MS;
        const next = chars.slice();
        let allDone = true;
        digitPositions.forEach((pos, idx) => {
          if (elapsed >= stopTimes[idx]) {
            next[pos] = chars[pos];
          } else {
            next[pos] = randomDigit();
            allDone = false;
          }
        });
        setDisplay(next.join(""));
        if (allDone && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, SPIN_INTERVAL_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runShuffle();
        } else if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      className={`px-6 text-center sm:px-10 ${divider ? "sm:border-r sm:border-neutral-200" : ""}`}
    >
      <div className="font-sans text-[32px] font-bold leading-none tracking-[-0.03em] text-neutral-900 sm:text-[38px] lg:text-[42px]">
        {display}
      </div>
      <div className="mt-3 text-[13px] text-neutral-500 sm:text-[14px]">{label}</div>
    </div>
  );
}
