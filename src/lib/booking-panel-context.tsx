"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { type Tab } from "@/components/ui/BookingTabs";
import HeroBookingPanel, {
  DURATION_OPTIONS,
  type HeroForm,
  type Direction,
} from "@/components/booking/HeroBookingPanel";
import { DRAFT_KEY, type BookingDraft, type ServiceType } from "@/lib/booking";
import { scrollToPageTop } from "@/lib/lenis-singleton";

const TAB_TO_SERVICE: Record<Tab, ServiceType> = {
  "Airport Transfer": "transfer",
  "Sightseeing Chauffeur": "hourly",
  "Hourly Chauffeur": "hourly",
  "Day Service": "day",
  "City to City": "transfer",
};

const EMPTY_FORM: HeroForm = { pickup: "", destination: "", date: "", time: "" };

function getDefaultDuration(t: Tab) {
  if (t === "Day Service") return DURATION_OPTIONS["Day Service"][1].value;
  if (t === "Sightseeing Chauffeur") return DURATION_OPTIONS["Sightseeing Chauffeur"][2].value;
  return DURATION_OPTIONS["Hourly Chauffeur"][4].value;
}

type BookingPanelCtx = {
  openBookingPanel: (tab?: Tab, showTabs?: boolean) => void;
  _panelOpen: boolean;
  _closePanel: () => void;
  _tab: Tab;
  _setTab: (t: Tab) => void;
  _showTabs: boolean;
  _direction: Direction;
  _setDirection: (d: Direction) => void;
  _duration: number;
  _setDuration: (d: number) => void;
  _form: HeroForm;
  _onField: (key: keyof HeroForm) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  _onValue: (k: keyof HeroForm, v: string) => void;
  _passengers: number;
  _setPassengers: (n: number) => void;
  _touched: boolean;
  _handleSubmit: (e: React.FormEvent) => void;
};

const BookingPanelContext = createContext<BookingPanelCtx>({
  openBookingPanel: () => {},
  _panelOpen: false,
  _closePanel: () => {},
  _tab: "Airport Transfer",
  _setTab: () => {},
  _showTabs: false,
  _direction: "departure",
  _setDirection: () => {},
  _duration: 8,
  _setDuration: () => {},
  _form: EMPTY_FORM,
  _onField: () => () => {},
  _onValue: () => {},
  _passengers: 1,
  _setPassengers: () => {},
  _touched: false,
  _handleSubmit: () => {},
});

export function useBookingPanel() {
  const { openBookingPanel } = useContext(BookingPanelContext);
  return { openBookingPanel };
}

export function BookingPanelProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [panelOpen, setPanelOpen] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [tab, setTab] = useState<Tab>("Airport Transfer");
  const [direction, setDirection] = useState<Direction>("departure");
  const [form, setForm] = useState<HeroForm>(EMPTY_FORM);
  const [touched, setTouched] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [duration, setDuration] = useState(8);

  const openBookingPanel = (nextTab: Tab = "Airport Transfer", showAllTabs = false) => {
    setTab(nextTab);
    setShowTabs(showAllTabs);
    setDirection("departure");
    setDuration(getDefaultDuration(nextTab));
    setTouched(false);
    setForm(EMPTY_FORM);
    setPassengers(1);
    setPanelOpen(true);
    scrollToPageTop();
  };

  const closePanel = () => setPanelOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const needsDestination = tab === "Airport Transfer" || tab === "City to City";
    const required: (keyof HeroForm)[] = needsDestination
      ? ["pickup", "destination", "date", "time"]
      : ["pickup", "date", "time"];
    if (required.some((k) => !form[k].trim())) return;

    const draft: BookingDraft = {
      service: TAB_TO_SERVICE[tab],
      pickup: form.pickup,
      dropoff: needsDestination ? form.destination : undefined,
      date: form.date,
      time: form.time,
      passengers,
      duration: tab === "Airport Transfer" ? undefined : duration,
    };
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* storage unavailable */
    }

    setForm(EMPTY_FORM);
    setTouched(false);
    setPanelOpen(false);
    setPassengers(1);
    router.push("/book");
  };

  return (
    <BookingPanelContext.Provider
      value={{
        openBookingPanel,
        _panelOpen: panelOpen,
        _closePanel: closePanel,
        _tab: tab,
        _setTab: setTab,
        _showTabs: showTabs,
        _direction: direction,
        _setDirection: setDirection,
        _duration: duration,
        _setDuration: setDuration,
        _form: form,
        _onField: (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
        _onValue: (k, v) => setForm((f) => ({ ...f, [k]: v })),
        _passengers: passengers,
        _setPassengers: setPassengers,
        _touched: touched,
        _handleSubmit: handleSubmit,
      }}
    >
      {children}
    </BookingPanelContext.Provider>
  );
}

export function BookingPanelOverlay() {
  const {
    _panelOpen,
    _closePanel,
    _tab,
    _setTab,
    _showTabs,
    _direction,
    _setDirection,
    _duration,
    _setDuration,
    _form,
    _onField,
    _onValue,
    _passengers,
    _setPassengers,
    _touched,
    _handleSubmit,
  } = useContext(BookingPanelContext);

  const [overlayH, setOverlayH] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const hero = document.querySelector<HTMLElement>("[data-navbar-theme='dark']");
      if (!hero) { setOverlayH(null); return; }
      const { bottom } = hero.getBoundingClientRect();
      setOverlayH(Math.round(bottom + window.scrollY));
    };
    measure();
    const hero = document.querySelector("[data-navbar-theme='dark']");
    const ro = new ResizeObserver(measure);
    if (hero) ro.observe(hero);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <AnimatePresence>
      {_panelOpen && (
        <motion.div
          className="absolute top-0 left-0 w-full z-[200] bg-black/60 backdrop-blur-sm pointer-events-auto"
          style={{ height: overlayH != null ? `${overlayH}px` : "calc(100svh - 8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex h-full items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <button
              type="button"
              onClick={_closePanel}
              aria-label="Close booking panel"
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 sm:-top-12"
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <HeroBookingPanel
              tab={_tab}
              onTab={(t) => {
                _setTab(t);
                _setDirection("departure");
                _setDuration(getDefaultDuration(t));
              }}
              showTabs={_showTabs}
              direction={_direction}
              onDirection={_setDirection}
              duration={_duration}
              onDuration={_setDuration}
              form={_form}
              onField={_onField}
              onValue={_onValue}
              passengers={_passengers}
              onPassengers={_setPassengers}
              touched={_touched}
              onSubmit={_handleSubmit}
            />
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
