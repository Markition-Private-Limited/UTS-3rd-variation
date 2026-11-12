"use client";

import { useEffect, useRef, useState } from "react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  // 0=Sun…6=Sat → convert to Mon-first (0=Mon…6=Sun)
  return (new Date(year, month, 1).getDay() + 6) % 7;
}
function formatDisplay(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

interface DatePickerProps {
  value?: Date | null;
  onChange?: (d: Date) => void;
  inputClassName?: string;
}

export function DatePicker({ value, onChange, inputClassName }: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({
    year: (value ?? today).getFullYear(),
    month: (value ?? today).getMonth(),
  });
  const [selected, setSelected] = useState<Date | null>(value ?? null);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function prevMonth() {
    setCursor(c => {
      const m = c.month === 0 ? 11 : c.month - 1;
      const y = c.month === 0 ? c.year - 1 : c.year;
      return { year: y, month: m };
    });
  }
  function nextMonth() {
    setCursor(c => {
      const m = c.month === 11 ? 0 : c.month + 1;
      const y = c.month === 11 ? c.year + 1 : c.year;
      return { year: y, month: m };
    });
  }
  function pick(day: number) {
    const d = new Date(cursor.year, cursor.month, day);
    setSelected(d);
    onChange?.(d);
    setOpen(false);
  }

  const daysInMonth = getDaysInMonth(cursor.year, cursor.month);
  const firstDow = getFirstDayOfWeek(cursor.year, cursor.month);
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (day: number) =>
    today.getFullYear() === cursor.year &&
    today.getMonth() === cursor.month &&
    today.getDate() === day;

  const isSelected = (day: number) =>
    selected?.getFullYear() === cursor.year &&
    selected?.getMonth() === cursor.month &&
    selected?.getDate() === day;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`group flex w-full items-center justify-between gap-3 ${inputClassName}`}
      >
        <span className={selected ? "text-neutral-900" : "text-neutral-400"}>
          {selected ? formatDisplay(selected) : "Select a date"}
        </span>
        {/* Calendar icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" className="shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-600" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-[320px] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 shadow-[0_16px_48px_rgba(0,0,0,0.22)]">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <button type="button" onClick={prevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-[14px] font-semibold tracking-[-0.01em] text-white">
              {MONTHS[cursor.month]} {cursor.year}
            </span>
            <button type="button" onClick={nextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-t border-white/10 px-3 pb-1 pt-3">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[11px] font-medium tracking-[0.08em] text-neutral-500">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-0.5 px-3 pb-4">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const sel = isSelected(day);
              const tod = isToday(day);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(day)}
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium transition-colors
                    ${sel
                      ? "bg-white text-neutral-900"
                      : tod
                      ? "border border-white/30 text-white hover:bg-white/15"
                      : "text-neutral-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer — today shortcut */}
          <div className="border-t border-white/10 px-5 py-3">
            <button
              type="button"
              onClick={() => {
                setCursor({ year: today.getFullYear(), month: today.getMonth() });
                pick(today.getDate());
              }}
              className="text-[12px] font-medium tracking-[0.04em] text-neutral-400 transition-colors hover:text-white"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
