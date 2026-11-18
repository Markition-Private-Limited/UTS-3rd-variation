"use client";

import { useLayoutEffect, useRef, useState } from "react";

export const TABS = ["Airport Transfer", "Sightseeing Chauffeur", "Hourly Chauffeur", "Day Service", "City to City"] as const;
export type Tab = (typeof TABS)[number];

export default function BookingTabs({
  value,
  onChange,
}: {
  value?: Tab;
  onChange?: (tab: Tab) => void;
} = {}) {
  const [innerTab, setInnerTab] = useState<Tab>("Airport Transfer");
  const activeTab = value ?? innerTab;
  const setActiveTab = (tab: Tab) => {
    setInnerTab(tab);
    onChange?.(tab);
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const maxTilt = 4;
    setTilt({
      rx: (0.5 - py) * 2 * maxTilt,
      ry: (px - 0.5) * 2 * maxTilt,
      mx: px * 100,
      my: py * 100,
    });
  };

  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  const activeIdx = TABS.indexOf(activeTab);

  useLayoutEffect(() => {
    const measure = () => {
      const btn = buttonRefs.current[activeIdx];
      const container = cardRef.current;
      if (!btn || !container) return;
      setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIdx]);

  return (
    <div className="w-full overflow-x-auto px-2 py-2 -mx-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative inline-flex overflow-hidden mx-auto"
        style={{
          borderRadius: "20px",
          padding: "4px",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.4)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.08), inset 0 0 30px rgba(255,255,255,0.02)",
          transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Cursor-following glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle 160px at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.16), transparent 70%)`,
            transition: "background 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        {/* Sliding active pill */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "4px",
            bottom: "4px",
            left: 0,
            width: pill.width,
            borderRadius: "14px",
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transform: `translateX(${pill.left}px)`,
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        {/* Tab buttons */}
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => { buttonRefs.current[i] = el; }}
            onClick={() => setActiveTab(tab)}
            className="relative z-10 px-3 whitespace-nowrap shrink-0"
            style={{
              paddingTop: "8px",
              paddingBottom: "8px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: activeTab === tab ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
              transition: "color 0.25s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
