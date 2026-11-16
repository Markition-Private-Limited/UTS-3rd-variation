"use client";

import { useState, useRef, useEffect } from "react";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
} from "react-international-phone";

const ALL_COUNTRIES = defaultCountries.map(parseCountry);

function FlagImg({ iso2 }: { iso2: string }) {
  const code = iso2.toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w20/${code}.png`}
      srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
      width={20}
      height={15}
      alt={iso2.toUpperCase()}
      style={{ display: "inline-block", flexShrink: 0, borderRadius: 2 }}
    />
  );
}

export function PhoneFieldClient() {
  const [phoneVal, setPhoneVal] = useState("+44");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } =
    usePhoneInput({
      defaultCountry: "gb",
      value: phoneVal,
      onChange: ({ phone }) => setPhoneVal(phone),
    });

  const filtered = ALL_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search.replace("+", ""))
  );

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => searchRef.current?.focus());
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      {/* Input row */}
      <div className="uts-phone-input">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Select country"
          aria-expanded={open}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 12px",
            height: "100%",
            background: "transparent",
            border: "none",
            borderRight: "1px solid #e5e7eb",
            borderRadius: "0.375rem 0 0 0.375rem",
            cursor: "pointer",
            transition: "background 150ms",
            flexShrink: 0,
          }}
        >
          <FlagImg iso2={country.iso2} />
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            style={{ opacity: 0.45, flexShrink: 0 }}
          >
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handlePhoneValueChange}
          placeholder="Phone number"
          type="tel"
          className="react-international-phone-input"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: 200,
            top: "calc(100% + 4px)",
            left: 0,
            width: 300,
            maxHeight: 300,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            boxShadow: "0 10px 40px rgba(0,0,0,0.14)",
            overflow: "hidden",
          }}
        >
          {/* Search */}
          <div
            style={{
              padding: "8px 10px",
              borderBottom: "1px solid #f3f4f6",
              flexShrink: 0,
            }}
          >
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code…"
              style={{
                width: "100%",
                padding: "7px 11px",
                fontSize: 14,
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                outline: "none",
                background: "#f9fafb",
                color: "#111827",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* List */}
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "4px 0",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {filtered.length === 0 && (
              <li style={{ padding: "12px 14px", fontSize: 14, color: "#9ca3af" }}>
                No results
              </li>
            )}
            {filtered.map((c) => (
              <li
                key={c.iso2}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setCountry(c.iso2, { focusOnInput: true });
                  setOpen(false);
                  setSearch("");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 14px",
                  fontSize: 14,
                  color: c.iso2 === country.iso2 ? "#111827" : "#374151",
                  background: c.iso2 === country.iso2 ? "#f3f4f6" : "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLLIElement).style.background = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLLIElement).style.background =
                    c.iso2 === country.iso2 ? "#f3f4f6" : "transparent";
                }}
              >
                <FlagImg iso2={c.iso2} />
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {c.name}
                </span>
                <span style={{ fontSize: 13, color: "#9ca3af", flexShrink: 0 }}>
                  +{c.dialCode}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
