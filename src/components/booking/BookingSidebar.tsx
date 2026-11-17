'use client';

import LocationInput from '@/components/ui/LocationInput';
import React, { useState } from 'react';
import {
  MapPin, Plane, User, Briefcase,
} from 'lucide-react';
import { BookingState, Vehicle } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';
import { addHours } from '@/lib/booking';
import PillButtonContent from '@/components/ui/PillButtonContent';

interface BookingSidebarProps {
  state: BookingState;
  selectedVehicle: Vehicle;
  onUpdateState: (updates: Partial<BookingState>) => void;
  onContinue: () => void;
}

const LUGGAGE_TYPE_LABEL: Record<BookingState['luggageType'], string> = {
  'carry-on': 'carry-on bag',
  'check-in': 'check-in bag',
  large: 'large bag',
};

export const BookingSidebar: React.FC<BookingSidebarProps> = ({
  state,
  selectedVehicle,
  onUpdateState,
  onContinue,
}) => {
  const [editingPickup, setEditingPickup] = useState(false);
  const [editingDestination, setEditingDestination] = useState(false);

  const priceCalc = calculatePrice(state.serviceType, selectedVehicle, {
    distanceKm: state.sampleDistanceKm,
    durationHours: state.durationHours,
  });

  const isMinHoursValid = state.serviceType === 'airport-transfer' || state.durationHours >= 4;
  const isAirport = state.serviceType === 'airport-transfer';

  const passengerOptions = Array.from({ length: selectedVehicle.passengers + 2 }, (_, i) => i + 1);
  const luggageOptions = Array.from({ length: selectedVehicle.luggage + 4 }, (_, i) => i);
  const luggageLabel = LUGGAGE_TYPE_LABEL[state.luggageType];

  const renderPassengersLuggage = (boldHeading: boolean) => (
    <div className="space-y-3">
      <div>
        {boldHeading ? (
          <span className="text-[11px] font-bold text-zinc-800 block">Passengers &amp; Luggage</span>
        ) : (
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Passengers &amp; Luggage</span>
        )}
      </div>
      <div>
        <label className={`block mb-1 ${boldHeading ? 'text-[11px] text-zinc-500' : 'text-[11px] font-semibold text-zinc-700'}`}>Passengers</label>
        <select
          value={state.passengers}
          onChange={(e) => onUpdateState({ passengers: Number(e.target.value) })}
          className="w-full text-[16px] sm:text-sm font-medium text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-950"
        >
          {passengerOptions.map((n) => (
            <option key={n} value={n}>{n} passenger{n === 1 ? '' : 's'}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={`block mb-1 ${boldHeading ? 'text-[11px] text-zinc-500' : 'text-[11px] font-semibold text-zinc-700'}`}>Luggage</label>
        <select
          value={state.luggageCount}
          onChange={(e) => onUpdateState({ luggageCount: Number(e.target.value) })}
          className="w-full text-[16px] sm:text-sm font-medium text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-950"
        >
          {luggageOptions.map((n) => (
            <option key={n} value={n}>{n} {luggageLabel}{n === 1 ? '' : 's'}</option>
          ))}
        </select>
      </div>
      {state.passengers > selectedVehicle.passengers && (
        <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
          Note: Requested {state.passengers} passengers exceeds standard {selectedVehicle.name} seating ({selectedVehicle.passengers}).
        </p>
      )}
    </div>
  );

  const actions = (
    <button type="button" disabled={!isMinHoursValid} onClick={onContinue}
      className={`group relative overflow-hidden w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide shadow-md flex items-center justify-center border-[1.5px] border-transparent transition-all duration-500 disabled:pointer-events-none ${
        isMinHoursValid ? 'bg-zinc-950 hover:border-white/30 text-white cursor-pointer' : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
      }`}>
      {isMinHoursValid ? (
        <PillButtonContent fill="white">Continue to Booking</PillButtonContent>
      ) : (
        <span>Continue to Booking</span>
      )}
    </button>
  );

  return (
    <aside data-lenis-prevent className="no-scrollbar overscroll-contain w-full shrink-0 lg:sticky lg:top-[72px] lg:h-[calc(100vh-88px)] lg:w-[360px] lg:self-start lg:overflow-hidden xl:w-[390px]">
      <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-sm divide-y divide-zinc-100 lg:flex lg:flex-col lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">

        {isAirport ? (
          <>
            {/* Route Graphic */}
            <div className="relative bg-[#f4f4f7] p-4 border-b border-zinc-200/70 lg:shrink-0">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 border border-zinc-300/60 p-3 flex flex-col justify-between" style={{minHeight: '8rem'}}>
                <svg className="absolute inset-0 w-full h-full text-zinc-300/60" viewBox="0 0 300 180" fill="currentColor" preserveAspectRatio="none">
                  <polygon points="20,40 80,20 160,25 240,15 280,60 260,130 190,165 110,160 40,120" />
                </svg>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round">
                  <path d="M 10 110 Q 70 80, 140 100 T 290 85" />
                </svg>
                <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 300 180" fill="none" stroke="#090a0c" strokeWidth="3.5" strokeLinecap="round">
                  <path d="M 210 35 C 190 70, 160 90, 140 145" />
                </svg>
                <div className="relative z-20 flex justify-between items-start">
                  <div className="bg-white/95 backdrop-blur-xs border border-zinc-300 shadow-sm rounded-lg p-1.5 text-[10px] max-w-[130px]">
                    <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">Drop-off</span>
                    <span className="font-semibold text-zinc-900 truncate block">Heathrow - T5</span>
                  </div>
                  <div className="bg-zinc-950 text-white border border-zinc-800 shadow-sm rounded-lg p-1.5 text-[10px] max-w-[130px] text-right">
                    <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">Pickup</span>
                    <span className="font-semibold text-white truncate block">The Langham, W1</span>
                  </div>
                </div>
                <div className="relative z-20 self-center bg-zinc-950 text-white px-3 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                  <Plane className="w-3 h-3 text-zinc-300" />
                  <span>LHR Terminal 5</span>
                </div>
                <div className="relative z-20 flex items-center justify-between text-[9px] text-zinc-500 font-medium">
                  <span>Route overview · Not to scale</span>
                  <span>Indicative only</span>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-4 sm:p-5 lg:shrink-0">
              <div className="bg-zinc-50 rounded-xl border border-zinc-200/80 p-3.5 text-xs text-zinc-600 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Base fare (illustrative)</span>
                  <span className="font-semibold text-zinc-900">{priceCalc.baseFare !== null ? `£${priceCalc.baseFare.toFixed(2)}` : 'To be confirmed'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Booking fee (illustrative)</span>
                  <span className="font-semibold text-zinc-900">£{priceCalc.bookingFee.toFixed(2)}{priceCalc.bookingFee === 0 ? ' (not configured)' : ''}</span>
                </div>
                <div className="pt-1.5 mt-1 border-t border-zinc-200 flex items-center justify-between">
                  <span className="font-bold text-zinc-950">Illustrative total</span>
                  <span className="font-extrabold text-zinc-950 text-sm">
                    {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'To be confirmed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Pickup / Drop-off */}
            <div className="p-4 sm:p-5 space-y-3.5 lg:shrink-0">
              <span className="text-[11px] font-bold text-zinc-800 block">Pickup / Drop-off</span>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-950" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Pickup address</span>
                  {editingPickup ? (
                    <div className="mt-1 flex gap-2">
                      <LocationInput value={state.pickupAddress} onChange={(v) => onUpdateState({ pickupAddress: v })} popClassName="!bg-zinc-900/95"
                        className="w-full text-[16px] sm:text-xs border border-zinc-300 rounded px-2 py-1" />
                      <button onClick={() => setEditingPickup(false)} className="text-[11px] bg-zinc-950 text-white px-2 py-1 rounded">Done</button>
                    </div>
                  ) : (
                    <p onClick={() => setEditingPickup(true)} className="text-xs font-medium text-zinc-900 truncate hover:underline cursor-pointer">{state.pickupAddress}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Airport &amp; terminal</span>
                  {editingDestination ? (
                    <div className="mt-1 flex gap-2">
                      <LocationInput value={state.destinationAddress} onChange={(v) => onUpdateState({ destinationAddress: v })} popClassName="!bg-zinc-900/95"
                        className="w-full text-[16px] sm:text-xs border border-zinc-300 rounded px-2 py-1" />
                      <button onClick={() => setEditingDestination(false)} className="text-[11px] bg-zinc-950 text-white px-2 py-1 rounded">Done</button>
                    </div>
                  ) : (
                    <p onClick={() => setEditingDestination(true)} className="text-xs font-medium text-zinc-900 truncate hover:underline cursor-pointer">{state.destinationAddress}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div className="p-4 sm:p-5 lg:shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Selected Vehicle</span>
                <span className="text-xs font-bold text-zinc-950">
                  {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)} est.` : 'Price to be confirmed'}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedVehicle.image.replace('-1.webp', '-1-thumb.webp')} alt={selectedVehicle.name} className="w-16 h-12 rounded-lg object-cover border border-zinc-200 shrink-0" />
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-xs text-zinc-950 truncate">{selectedVehicle.name}</h5>
                  <p className="text-[11px] text-zinc-500 truncate">{selectedVehicle.modelExample}</p>
                </div>
              </div>
            </div>

            {/* Passengers & Luggage + instructions */}
            <div className="p-4 sm:p-5 space-y-4 lg:shrink-0">
              <div>
                <span className="text-[11px] font-bold text-zinc-800 block mb-3">Passengers &amp; Luggage</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-zinc-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Passengers</span>
                      <span className="text-xs font-semibold text-zinc-900">{state.passengers}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-zinc-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Luggage</span>
                      <span className="text-xs font-semibold text-zinc-900">{state.luggageCount} {luggageLabel}{state.luggageCount === 1 ? '' : 's'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">Additional pickup instructions (optional)</label>
                <input type="text" placeholder="e.g. entrance or luggage details" value={state.specialInstructions}
                  onChange={(e) => onUpdateState({ specialInstructions: e.target.value })}
                  className="w-full text-[16px] sm:text-xs bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400" />
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-zinc-50/50 lg:shrink-0">
              {actions}
            </div>
          </>
        ) : (
          <>
            {/* Service heading + price */}
            <div className="p-4 sm:p-5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                {state.serviceType === 'day-booking' ? 'Day Chauffeur' : 'Hourly Chauffeur'}
              </span>
              <div className="flex items-start justify-between mt-1">
                <h4 className="text-xl font-bold text-zinc-950">{state.serviceType === 'day-booking' ? 'At your disposal' : 'By the hour'}</h4>
                <span className="text-xl font-extrabold text-zinc-950 shrink-0">
                  {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'To be confirmed'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">Illustrative estimate · GBP · Not UTS rates</p>
            </div>

            {/* Vehicle */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedVehicle.image.replace('-1.webp', '-1-thumb.webp')} alt={selectedVehicle.name} className="w-16 h-12 rounded-lg object-cover border border-zinc-200 shrink-0" />
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-xs text-zinc-950 truncate">{selectedVehicle.name}</h5>
                  <p className="text-[11px] text-zinc-500 truncate">{selectedVehicle.modelExample}</p>
                  <p className="text-[10px] text-zinc-400 truncate">Indicative: {selectedVehicle.passengers} passengers · {selectedVehicle.luggage} bags</p>
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-800">Pickup Details</span>
                <button type="button" onClick={() => setEditingPickup((v) => !v)} className="text-[11px] font-semibold text-zinc-600 underline hover:text-zinc-950">Edit</button>
              </div>

              <div>
                <span className="text-[11px] text-zinc-500 block">Pickup address</span>
                {editingPickup ? (
                  <div className="mt-1 flex gap-2">
                    <LocationInput value={state.pickupAddress} onChange={(v) => onUpdateState({ pickupAddress: v })} popClassName="!bg-zinc-900/95"
                      className="w-full text-[16px] sm:text-xs border border-zinc-300 rounded px-2 py-1" />
                    <button onClick={() => setEditingPickup(false)} className="text-[11px] bg-zinc-950 text-white px-2 py-1 rounded">Done</button>
                  </div>
                ) : (
                  <p className="text-xs font-medium text-zinc-900">{state.pickupAddress}</p>
                )}
              </div>

              <div>
                <span className="text-[11px] text-zinc-500 block">Date &amp; Pickup Time</span>
                <p className="text-xs font-medium text-zinc-900">{state.pickupDate} · {state.pickupTime}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{state.durationHours} hours · Estimated end {addHours(state.pickupTime, state.durationHours)}</p>
              </div>

              <div>
                {state.serviceType === 'day-booking' ? (
                  <>
                    <span className="text-[11px] text-zinc-500 block mb-1">Final destination · Optional</span>
                    <p className="text-xs font-bold text-zinc-900">{state.destinationAddress || 'Flexible itinerary — not specified'}</p>
                  </>
                ) : state.stops.length > 0 ? (
                  <>
                    <span className="text-[11px] text-zinc-500 block mb-1.5">Optional Stops · {state.stops.length}</span>
                    <div className="space-y-1">
                      {state.stops.map((stop, idx) => (
                        <p key={stop.id} className="text-xs font-medium text-zinc-900">
                          <span className="font-bold">{idx + 1}</span>&nbsp;&nbsp;{stop.address}
                        </p>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] text-zinc-500 block mb-1">Final destination · Optional</span>
                    <p className="text-xs font-bold text-zinc-900">Flexible itinerary — not specified</p>
                  </>
                )}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <div className="bg-zinc-50 rounded-xl border border-zinc-200/80 p-3.5 text-xs text-zinc-600 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>
                    {state.serviceType === 'hourly-chauffeur' && priceCalc.ratePerUnit !== null
                      ? `£${priceCalc.ratePerUnit.toFixed(2)} × ${state.durationHours} hrs`
                      : `Base fare · ${state.durationHours} hrs`}
                  </span>
                  <span className="font-semibold text-zinc-900">{priceCalc.baseFare !== null ? `£${priceCalc.baseFare.toFixed(2)}` : 'TBC'}</span>
                </div>
                <div className="pt-1.5 mt-1 border-t border-zinc-200 flex items-center justify-between">
                  <span className="font-bold text-zinc-950">Illustrative total</span>
                  <span className="font-extrabold text-zinc-950 text-sm">
                    {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'To be confirmed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Passengers & Luggage */}
            <div className="p-4 sm:p-5">
              {renderPassengersLuggage(true)}
            </div>

            <div className="p-4 sm:p-5 space-y-2.5 bg-zinc-50/50">
              {actions}
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
