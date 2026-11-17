'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, PlaneTakeoff, Sun, Clock, ChevronDown, ChevronLeft } from 'lucide-react';
import { ServiceType, BookingState } from '@/types/booking';

interface BookingHeaderProps {
  currentService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
  pickupSummary: string;
  destinationSummary?: string;
  dateTimeSummary: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupDate: string;
  pickupTime: string;
  transferDirection: 'departure' | 'arrival';
  durationHours: number;
  onUpdateState: (updates: Partial<BookingState>) => void;
}


const SERVICE_LABELS: Record<ServiceType, string> = {
  'airport-transfer': 'AIRPORT TRANSFER',
  'day-booking': 'DAY BOOKING',
  'hourly-chauffeur': 'HOURLY CHAUFFEUR',
};

const SERVICE_ICONS = {
  'airport-transfer': PlaneTakeoff,
  'day-booking': Sun,
  'hourly-chauffeur': Clock,
} as const;

const PANEL_CLS = 'absolute left-1/2 top-full z-50 -translate-x-1/2 overflow-hidden rounded-b-2xl bg-[#0e0f12] border border-[#22242a] border-t-0 shadow-2xl transition-[max-height,opacity] duration-300 ease-out';
const INPUT_CLS = 'w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors';
const LABEL_CLS = 'text-[9px] uppercase tracking-[0.18em] text-zinc-500 font-bold block mb-1.5';

export const BookingHeader: React.FC<BookingHeaderProps> = ({
  currentService,
  onServiceChange,
  pickupSummary,
  destinationSummary,
  dateTimeSummary,
  pickupAddress,
  destinationAddress,
  pickupDate,
  pickupTime,
  transferDirection,
  durationHours,
  onUpdateState,
}) => {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<null | 'route' | 'datetime'>(null);
  const headerRef = useRef<HTMLElement>(null);

  const ServiceIcon = SERVICE_ICONS[currentService];
  const others = (['airport-transfer', 'day-booking', 'hourly-chauffeur'] as ServiceType[]).filter((s) => s !== currentService);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActivePanel(null);
        setServiceOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const togglePanel = (panel: 'route' | 'datetime') => {
    setActivePanel((p) => (p === panel ? null : panel));
    setServiceOpen(false);
  };

  const isAirport = currentService === 'airport-transfer';
  const isArrival = isAirport && transferDirection === 'arrival';

  const pickupLabel = isAirport ? (isArrival ? 'Arrival Airport' : 'Pickup Address') : 'Pickup Address';
  const destLabel = isAirport ? (isArrival ? 'Drop-off Address' : 'Airport & Terminal') : 'Destination';
  const pickupValue = isArrival ? destinationAddress : pickupAddress;
  const destValue = isArrival ? pickupAddress : destinationAddress;
  const handlePickupChange = (v: string) => onUpdateState(isArrival ? { destinationAddress: v } : { pickupAddress: v });
  const handleDestChange = (v: string) => onUpdateState(isArrival ? { pickupAddress: v } : { destinationAddress: v });

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-[#0e0f12] text-white border-b border-[#22242a] shadow-md">
      <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 h-[64px] flex items-center justify-between gap-2 sm:gap-4 lg:h-[64px]">

        {/* Back + Logo */}
        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/15 sm:h-9 sm:w-9"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/logo.png" alt="United Travel Services" width={200} height={70} className="h-8 w-auto object-contain sm:h-12" priority />
          </Link>
        </div>

        {/* Service badge + route/datetime — grouped so they sit together on the right, never overlapping the logo */}
        <div className="flex h-full min-w-0 items-center justify-end gap-2 sm:gap-4">

        {/* Service badge + dropdown */}
        <div className="relative flex h-full shrink-0 items-center self-stretch leading-none">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={serviceOpen}
            onClick={() => { setServiceOpen((v) => !v); setActivePanel(null); }}
            className="inline-flex items-center gap-1 leading-none hover:bg-white/10 text-white text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-1.5 rounded-full transition-colors sm:gap-1.5 sm:text-[11px] sm:tracking-[0.12em] sm:px-3.5 sm:py-2"
          >
            <ServiceIcon className="hidden h-3.5 w-3.5 text-zinc-400 sm:inline" />
            {SERVICE_LABELS[currentService]}
            <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''}`} />
          </button>

          <div
            role="menu"
            className={`${PANEL_CLS} w-64 ${serviceOpen ? 'max-h-40 opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}
          >
            <div className="p-1.5">
              {others.map((st) => {
                const Icon = SERVICE_ICONS[st];
                return (
                  <button
                    key={st}
                    type="button"
                    role="menuitem"
                    onClick={() => { onServiceChange(st); setServiceOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/80 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {SERVICE_LABELS[st]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Centre section: route + datetime — only once lg: width reliably fits both alongside the logo and badge */}
        <div className="hidden h-full min-w-0 items-center gap-4 lg:flex">

          <span className="text-zinc-700 text-base leading-none font-thin select-none">|</span>

          {/* Route button + panel */}
          <div className="relative h-full min-w-0 flex items-center self-stretch leading-none">
            <button
              type="button"
              onClick={() => togglePanel('route')}
              className={`flex items-center gap-1.5 text-[13px] min-w-0 px-2.5 py-1.5 rounded-lg transition-colors ${
                activePanel === 'route' ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="block max-w-[340px] truncate leading-none xl:max-w-[480px] 2xl:max-w-[600px]">
                <span className="text-white font-medium">{pickupSummary}</span>
                {destinationSummary && (
                  <>
                    <span className="text-zinc-600 mx-1.5">→</span>
                    <span className="text-zinc-300">{destinationSummary}</span>
                  </>
                )}
              </span>
              <ChevronDown className={`w-3 h-3 text-zinc-500 shrink-0 transition-transform duration-200 ${activePanel === 'route' ? 'rotate-180' : ''}`} />
            </button>

            <div className={`${PANEL_CLS} w-80 ${activePanel === 'route' ? 'max-h-[380px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-3.5">
                {isAirport && (
                  <div className="flex gap-1 p-0.5 bg-white/5 rounded-xl">
                    {(['departure', 'arrival'] as const).map((dir) => (
                      <button
                        key={dir}
                        type="button"
                        onClick={() => onUpdateState({ transferDirection: dir })}
                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] rounded-[10px] transition-all ${
                          transferDirection === dir ? 'bg-white text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {dir === 'departure' ? '↑ Departure' : '↓ Arrival'}
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <label className={LABEL_CLS}>{pickupLabel}</label>
                  <input
                    type="text"
                    value={pickupValue}
                    onChange={(e) => handlePickupChange(e.target.value)}
                    className={INPUT_CLS}
                    placeholder="e.g. The Langham, 1c Portland Place"
                  />
                </div>

                {isAirport && (
                  <div>
                    <label className={LABEL_CLS}>{destLabel}</label>
                    <input
                      type="text"
                      value={destValue}
                      onChange={(e) => handleDestChange(e.target.value)}
                      className={INPUT_CLS}
                      placeholder={isArrival ? 'e.g. The Langham, 1c Portland Place' : 'e.g. Heathrow Airport · Terminal 5'}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <span className="text-zinc-700 text-base leading-none font-thin select-none hidden lg:block">|</span>

          {/* DateTime button + panel */}
          <div className="relative h-full flex items-center self-stretch leading-none hidden lg:flex">
            <button
              type="button"
              onClick={() => togglePanel('datetime')}
              className={`flex items-center gap-1.5 text-[13px] whitespace-nowrap shrink-0 px-2.5 py-1.5 rounded-lg transition-colors ${
                activePanel === 'datetime' ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {dateTimeSummary}
              <ChevronDown className={`w-3 h-3 text-zinc-500 shrink-0 transition-transform duration-200 ${activePanel === 'datetime' ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute right-0 top-full z-50 w-72 overflow-hidden rounded-b-2xl bg-[#0e0f12] border border-[#22242a] border-t-0 shadow-2xl transition-[max-height,opacity] duration-300 ease-out ${activePanel === 'datetime' ? 'max-h-[380px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-3.5">
                <div>
                  <label className={LABEL_CLS}>Pickup Date</label>
                  <input
                    type="text"
                    value={pickupDate}
                    onChange={(e) => onUpdateState({ pickupDate: e.target.value })}
                    className={INPUT_CLS}
                    placeholder="e.g. 18 November 2026"
                  />
                </div>
                <div>
                  <label className={LABEL_CLS}>Pickup Time</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => onUpdateState({ pickupTime: e.target.value })}
                    style={{ colorScheme: 'dark' }}
                    className={INPUT_CLS}
                  />
                </div>
                {currentService !== 'airport-transfer' && (
                  <div>
                    <label className={LABEL_CLS}>Duration — {durationHours} hrs</label>
                    <input
                      type="range"
                      min={4}
                      max={currentService === 'day-booking' ? 14 : 12}
                      step={1}
                      value={durationHours}
                      onChange={(e) => onUpdateState({ durationHours: Number(e.target.value) })}
                      className="w-full accent-white cursor-pointer mt-0.5"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
                      <span>4 hrs min</span>
                      <span>{currentService === 'day-booking' ? '14' : '12'} hrs max</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>

      {/* Mobile summary bar — hidden on lg+ where the inline pills are shown */}
      <div className="lg:hidden border-t border-[#22242a] bg-[#0a0b0e] px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-zinc-500 pr-1 border-r border-zinc-700 mr-1">
          {SERVICE_LABELS[currentService].split(' ')[0]}
        </span>
        <span className="text-[11px] text-white font-medium truncate shrink-0 max-w-[130px]">{pickupSummary}</span>
        {destinationSummary && (
          <>
            <span className="text-zinc-600 text-[10px] shrink-0">→</span>
            <span className="text-[11px] text-zinc-300 truncate shrink-0 max-w-[110px]">{destinationSummary}</span>
          </>
        )}
        <span className="text-zinc-700 shrink-0">·</span>
        <span className="text-[11px] text-zinc-400 whitespace-nowrap shrink-0">{dateTimeSummary}</span>
      </div>
    </header>
  );
};
