"use client";

import { useState, useId, useEffect, useRef } from "react";
import PillButtonContent from "@/components/ui/PillButtonContent";

const ENQUIRY_TYPES = [
  "Airport Transfer",
  "City to City",
  "Hourly Chauffeur",
  "Day Service",
  "Sightseeing",
  "Corporate Travel",
  "Wedding & Special Events",
  "Other",
];

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  enquiryType: string;
  travelDate: string;
  pickupLocation: string;
  destination: string;
  passengers: string;
  message: string;
}

type TouchedFields = Partial<Record<keyof FormValues, boolean>>;

const EMPTY: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  enquiryType: "",
  travelDate: "",
  pickupLocation: "",
  destination: "",
  passengers: "",
  message: "",
};

const REQUIRED: (keyof FormValues)[] = [
  "firstName",
  "lastName",
  "email",
  "telephone",
  "enquiryType",
  "pickupLocation",
  "destination",
  "message",
];

function isEmailValid(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function fieldError(key: keyof FormValues, values: FormValues): string | null {
  const v = values[key].trim();
  if (REQUIRED.includes(key) && !v) return "This field is required";
  if (key === "email" && v && !isEmailValid(v)) return "Enter a valid email address";
  if (key === "telephone" && v && !/^[\d\s()+-]{7,}$/.test(v)) return "Enter a valid phone number";
  if (key === "passengers" && v && (isNaN(Number(v)) || Number(v) < 1)) return "Enter a valid number";
  return null;
}

/* ─── Design tokens ──────────────────────────────────────── */

const inputBase =
  "w-full bg-white text-[13.5px] font-light leading-tight outline-none transition-all duration-200 rounded-[10px] px-4 py-[11px]";
const borderIdle   = "border border-black/[0.1]";
const borderFocus  = "ring-1 ring-black/30 border-black/30";
const borderErr    = "border border-red-400/80 ring-1 ring-red-300";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-medium uppercase tracking-[0.12em] mb-1.5"
      style={{ color: "rgba(0,0,0,0.45)" }}
    >
      {children}
    </label>
  );
}

function FieldError({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[11px] font-medium text-red-500">{msg}</p>;
}

/* ─── Custom Dropdown ────────────────────────────────────── */

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      className="shrink-0 transition-transform duration-300"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path
        d="M1 1L5.5 6L10 1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CustomDropdown({
  id,
  value,
  onChange,
  onBlur,
  error,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error: string | null;
  options: string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
        onBlur();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur]);

  const border = error ? borderErr : focused ? borderFocus : borderIdle;

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger */}
      <button
        id={id}
        type="button"
        onClick={() => { setOpen((o) => !o); setFocused(true); }}
        className={`${inputBase} ${border} flex items-center justify-between text-left w-full`}
        style={{ color: value ? "#1a1a1a" : "rgba(0,0,0,0.3)" }}
      >
        <span className="truncate">{value || placeholder}</span>
        <span style={{ color: "rgba(0,0,0,0.4)" }}>
          <Chevron open={open} />
        </span>
      </button>

      {/* Panel */}
      <div
        className="absolute z-50 left-0 right-0 overflow-hidden rounded-[12px]"
        style={{
          top: "calc(100% + 6px)",
          background: "#141414",
          boxShadow: "0 16px 48px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      >
        <div className="py-1.5">
          {options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); setFocused(false); onBlur(); }}
              className="w-full text-left px-4 py-3 text-[13px] font-light transition-colors duration-150"
              style={{
                color: opt === value ? "#ffffff" : "rgba(255,255,255,0.6)",
                background: opt === value ? "rgba(255,255,255,0.1)" : "transparent",
                borderBottom:
                  i < options.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  opt === value ? "rgba(255,255,255,0.1)" : "transparent")
              }
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Custom Calendar Date Picker ───────────────────────── */

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CustomDatePicker({
  id,
  value,
  onChange,
  onBlur,
  error,
  minDate,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error: string | null;
  minDate: string;
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const today = minDate ? new Date(minDate + "T00:00:00") : new Date();
  const initYear  = value ? parseInt(value.slice(0,4)) : today.getFullYear();
  const initMonth = value ? parseInt(value.slice(5,7)) - 1 : today.getMonth();
  const [viewYear,  setViewYear]  = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
        onBlur();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur]);

  const formatted = value
    ? new Date(value + "T00:00:00")
        .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
        .replace(/\//g, " / ")
    : "";

  /* build calendar grid — Monday-first */
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const offset   = (firstDay === 0 ? 6 : firstDay - 1);      // shift to Mon-first
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const minTs = minDate ? new Date(minDate + "T00:00:00").getTime() : 0;
  const selTs = value   ? new Date(value   + "T00:00:00").getTime() : -1;
  const pad2  = (n: number) => String(n).padStart(2, "0");

  function pickDay(day: number) {
    const iso = `${viewYear}-${pad2(viewMonth + 1)}-${pad2(day)}`;
    onChange(iso);
    setOpen(false);
    setFocused(false);
    onBlur();
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const border = error ? borderErr : focused ? borderFocus : borderIdle;

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger */}
      <button
        id={id}
        type="button"
        onClick={() => {
          if (wrapRef.current) {
            const rect = wrapRef.current.getBoundingClientRect();
            setOpenUp(rect.bottom + 300 > window.innerHeight);
          }
          setOpen(o => !o);
          setFocused(true);
        }}
        className={`${inputBase} ${border} flex items-center justify-between text-left w-full`}
        style={{ color: value ? "#1a1a1a" : "rgba(0,0,0,0.3)" }}
      >
        <span>{formatted || "DD / MM / YYYY"}</span>
        <span style={{ color: "rgba(0,0,0,0.4)" }}><CalendarIcon /></span>
      </button>

      {/* Calendar panel */}
      <div
        className="absolute z-50 left-0 overflow-hidden rounded-[14px]"
        style={{
          bottom: "calc(100% + 6px)",
          width: "280px",
          background: "#141414",
          boxShadow: "0 16px 48px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.2)",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[12px] font-semibold tracking-[0.08em] text-white">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 px-3 pb-1">
          {DAYS.map(d => (
            <div key={d} className="flex items-center justify-center py-1 text-[10px] font-medium tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 px-3 pb-4 gap-y-0.5">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const ts  = new Date(viewYear, viewMonth, day).getTime();
            const disabled = ts < minTs;
            const selected = ts === selTs;
            const isToday  = ts === today.setHours(0,0,0,0);
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => pickDay(day)}
                className="flex h-8 w-full items-center justify-center rounded-full text-[12px] font-light transition-colors duration-100"
                style={{
                  color: disabled ? "rgba(255,255,255,0.18)"
                       : selected ? "#141414"
                       : isToday  ? "#ffffff"
                       : "rgba(255,255,255,0.72)",
                  background: selected ? "#ffffff"
                            : isToday && !selected ? "rgba(255,255,255,0.12)"
                            : "transparent",
                  cursor: disabled ? "not-allowed" : "pointer",
                  fontWeight: selected ? 600 : 300,
                }}
                onMouseEnter={e => { if (!disabled && !selected) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { if (!disabled && !selected) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Success banner ─────────────────────────────────────── */

function SuccessBanner({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "#1a1a1a" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5L10 17.5L19 7.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-[22px] font-semibold tracking-tight text-black mb-2">Enquiry Sent</h3>
        <p className="text-[15px] font-light text-black/55 max-w-sm">
          Thank you for getting in touch. A member of our team will be in contact with you shortly.
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-2 text-[12px] font-medium uppercase tracking-[0.18em] text-black/40 underline underline-offset-4 hover:text-black/70 transition-colors"
      >
        Send another enquiry
      </button>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────── */

export function ContactEnquirySection() {
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;

  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k: keyof FormValues) => (v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));
  const touch = (k: keyof FormValues) => () =>
    setTouched((prev) => ({ ...prev, [k]: true }));
  const err = (k: keyof FormValues) =>
    touched[k] || submitted ? fieldError(k, values) : null;
  const hasErrors = (Object.keys(EMPTY) as (keyof FormValues)[]).some(
    (k) => fieldError(k, values) !== null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  }

  const sectionCls =
    "flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-14";

  if (success) {
    return (
      <section id="enquiry" style={{ background: "#f4f4f4", height: "100svh" }} className={sectionCls}>
        <SuccessBanner
          onReset={() => {
            setValues(EMPTY);
            setTouched({});
            setSubmitted(false);
            setSuccess(false);
          }}
        />
      </section>
    );
  }

  return (
    <section id="enquiry" style={{ background: "#f4f4f4", height: "100svh" }} className={sectionCls}>
      {/* Full-width grid — space-between via column sizing */}
      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)]">

        {/* ── Left copy ─────────────────────────────────── */}
        <div className="flex flex-col justify-center">
          <span className="block text-[11px] font-medium uppercase tracking-[0.3em] text-black/35 mb-4">
            Send an Enquiry
          </span>

          <h2 className="mb-4 text-[32px] leading-[110%] tracking-[-0.04em] sm:text-[38px] lg:text-[42px]">
            <span className="font-extralight text-black/75">Tell Us </span>
            <span className="font-bold text-black">About Your</span>
            <br />
            <span className="font-bold text-black">Journey.</span>
          </h2>

          <p className="mb-5 max-w-[340px] text-[13.5px] font-light leading-[175%] text-black/50">
            Share a few details about your plans and requirements so our team can better understand
            your enquiry and help you discuss the next steps.
          </p>

          <div className="mb-4 h-px bg-black/[0.08]" style={{ maxWidth: 320 }} />

          <p className="mb-2 text-[13px] font-semibold text-black/80">
            A few things worth including
          </p>
          <p className="max-w-[320px] text-[13.5px] font-light leading-[190%] text-black/45">
            Your travel dates and preferred times, full pickup and destination addresses, passenger
            numbers, luggage and any particular requirements will help frame the conversation.
          </p>

          {/* Contact links */}
          <div className="mt-6 flex flex-col gap-2.5">
            <a href="tel:+441234567890" className="group inline-flex w-fit items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors group-hover:bg-black/10"
                style={{ background: "rgba(0,0,0,0.065)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[13px] font-light text-black/55 transition-colors group-hover:text-black">
                +44 (0) 123 456 7890
              </span>
            </a>
            <a
              href="mailto:enquiries@unitedtravelservices.co.uk"
              className="group inline-flex w-fit items-center gap-3"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors group-hover:bg-black/10"
                style={{ background: "rgba(0,0,0,0.065)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13 2 6"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[13px] font-light text-black/55 transition-colors group-hover:text-black">
                enquiries@unitedtravelservices.co.uk
              </span>
            </a>
          </div>
        </div>

        {/* ── Right form ────────────────────────────────── */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor={fid("firstName")}>First Name</Label>
              <input
                id={fid("firstName")}
                type="text"
                autoComplete="given-name"
                value={values.firstName}
                onChange={(e) => set("firstName")(e.target.value)}
                onBlur={touch("firstName")}
                placeholder="e.g. James"
                className={`${inputBase} ${err("firstName") ? borderErr : borderIdle} focus:${borderFocus}`}
                style={{ outlineOffset: 0 }}
                onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
              />
              <FieldError msg={err("firstName")} />
            </div>
            <div>
              <Label htmlFor={fid("lastName")}>Last Name</Label>
              <input
                id={fid("lastName")}
                type="text"
                autoComplete="family-name"
                value={values.lastName}
                onChange={(e) => set("lastName")(e.target.value)}
                onBlur={touch("lastName")}
                placeholder="e.g. Harrison"
                className={`${inputBase} ${err("lastName") ? borderErr : borderIdle} focus:${borderFocus}`}
                onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
              />
              <FieldError msg={err("lastName")} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor={fid("email")}>Email Address</Label>
              <input
                id={fid("email")}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set("email")(e.target.value)}
                onBlur={touch("email")}
                placeholder="e.g. james@example.com"
                className={`${inputBase} ${err("email") ? borderErr : borderIdle} focus:${borderFocus}`}
                onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
              />
              <FieldError msg={err("email")} />
            </div>
            <div>
              <Label htmlFor={fid("telephone")}>Telephone Number</Label>
              <input
                id={fid("telephone")}
                type="tel"
                autoComplete="tel"
                value={values.telephone}
                onChange={(e) => set("telephone")(e.target.value)}
                onBlur={touch("telephone")}
                placeholder="e.g. +44 7700 900000"
                className={`${inputBase} ${err("telephone") ? borderErr : borderIdle} focus:${borderFocus}`}
                onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
              />
              <FieldError msg={err("telephone")} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor={fid("enquiryType")}>Enquiry Type</Label>
              <CustomDropdown
                id={fid("enquiryType")}
                value={values.enquiryType}
                onChange={set("enquiryType")}
                onBlur={touch("enquiryType")}
                error={err("enquiryType")}
                options={ENQUIRY_TYPES}
                placeholder="Select an enquiry type"
              />
              <FieldError msg={err("enquiryType")} />
            </div>
            <div>
              <Label htmlFor={fid("travelDate")}>Preferred Travel Date</Label>
              <CustomDatePicker
                id={fid("travelDate")}
                value={values.travelDate}
                onChange={set("travelDate")}
                onBlur={touch("travelDate")}
                error={err("travelDate")}
                minDate={minDate}
              />
              <FieldError msg={err("travelDate")} />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor={fid("pickupLocation")}>Pickup Location</Label>
              <input
                id={fid("pickupLocation")}
                type="text"
                value={values.pickupLocation}
                onChange={(e) => set("pickupLocation")(e.target.value)}
                onBlur={touch("pickupLocation")}
                placeholder="e.g. Heathrow Terminal 5"
                className={`${inputBase} ${err("pickupLocation") ? borderErr : borderIdle} focus:${borderFocus}`}
                onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
              />
              <FieldError msg={err("pickupLocation")} />
            </div>
            <div>
              <Label htmlFor={fid("destination")}>Destination</Label>
              <input
                id={fid("destination")}
                type="text"
                value={values.destination}
                onChange={(e) => set("destination")(e.target.value)}
                onBlur={touch("destination")}
                placeholder="e.g. The Savoy, London"
                className={`${inputBase} ${err("destination") ? borderErr : borderIdle} focus:${borderFocus}`}
                onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
              />
              <FieldError msg={err("destination")} />
            </div>
          </div>

          {/* Row 5 */}
          <div>
            <Label htmlFor={fid("passengers")}>Number of Passengers</Label>
            <input
              id={fid("passengers")}
              type="number"
              min={1}
              max={50}
              value={values.passengers}
              onChange={(e) => set("passengers")(e.target.value)}
              onBlur={touch("passengers")}
              placeholder="e.g. 2"
              className={`${inputBase} ${err("passengers") ? borderErr : borderIdle} focus:${borderFocus}`}
              onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
            />
            <FieldError msg={err("passengers")} />
          </div>

          {/* Row 6 */}
          <div>
            <Label htmlFor={fid("message")}>Message</Label>
            <textarea
              id={fid("message")}
              rows={4}
              value={values.message}
              onChange={(e) => set("message")(e.target.value)}
              onBlur={touch("message")}
              placeholder="Tell us about any special requirements, preferred times, luggage details or anything else we should know…"
              className={`${inputBase} ${err("message") ? borderErr : borderIdle} focus:${borderFocus} resize-none`}
              onFocus={(e) => e.target.classList.add(...borderFocus.split(" "))}
            />
            <FieldError msg={err("message")} />
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="group relative inline-flex overflow-hidden whitespace-nowrap items-center justify-between gap-4 rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity duration-200 disabled:opacity-60"
              style={{ background: "#1a1a1a", color: "#fff" }}
            >
              {loading ? (
                <>
                  <svg className="relative animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 010 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className="relative">Sending…</span>
                </>
              ) : (
                <PillButtonContent fill="white">Send Your Enquiry</PillButtonContent>
              )}
            </button>

            {submitted && hasErrors && (
              <p className="mt-3 text-[11.5px] font-medium text-red-500">
                Please fill in all required fields before submitting.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
