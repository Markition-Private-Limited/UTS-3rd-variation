'use client';

import LocationInput from '@/components/ui/LocationInput';
import React, { useState } from 'react';
import {
  MapPin, Plane, Plus, Trash2, AlertCircle,
} from 'lucide-react';
import { BookingState, ServiceType, Vehicle } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';
import { addHours } from '@/lib/booking';
import PillButtonContent from '@/components/ui/PillButtonContent';

interface BookingSidebarProps {
  state: BookingState;
  selectedVehicle: Vehicle;
  onUpdateState: (updates: Partial<BookingState>) => void;
  onServiceChange: (service: ServiceType) => void;
  onContinue: () => void;
  onSave: () => void;
}

const SERVICE_TABS: { id: ServiceType; label: string }[] = [
  { id: 'airport-transfer', label: 'Airport Transfer' },
  { id: 'day-booking', label: 'Day Chauffeur' },
  { id: 'hourly-chauffeur', label: 'Hourly Chauffeur' },
];

const LUGGAGE_TYPE_LABEL: Record<BookingState['luggageType'], string> = {
  'carry-on': 'carry-on bag',
  'check-in': 'check-in bag',
  large: 'large bag',
};

export const BookingSidebar: React.FC<BookingSidebarProps> = ({
  state,
  selectedVehicle,
  onUpdateState,
  onServiceChange,
  onContinue,
  onSave,
}) => {
  const [editingPickup, setEditingPickup] = useState(false);
  const [editingDestination, setEditingDestination] = useState(false);
  const [newStopAddress, setNewStopAddress] = useState('');
  const [showAddStopInput, setShowAddStopInput] = useState(false);

  const priceCalc = calculatePrice(state.serviceType, selectedVehicle, {
    distanceKm: state.sampleDistanceKm,
    durationHours: state.durationHours,
  });

  const isMinHoursValid = state.serviceType === 'airport-transfer' || state.durationHours >= 4;
  const isAirport = state.serviceType === 'airport-transfer';

  const handleAddStop = () => {
    if (!newStopAddress.trim()) return;
    onUpdateState({ stops: [...state.stops, { id: `stop-${Date.now()}`, address: newStopAddress.trim() }] });
    setNewStopAddress('');
    setShowAddStopInput(false);
  };

  const handleRemoveStop = (stopId: string) => {
    onUpdateState({ stops: state.stops.filter((s) => s.id !== stopId) });
  };

  const passengerOptions = Array.from({ length: selectedVehicle.passengers + 2 }, (_, i) => i + 1);
  const luggageOptions = Array.from({ length: selectedVehicle.luggage + 4 }, (_, i) => i);
  const luggageLabel = LUGGAGE_TYPE_LABEL[state.luggageType];

  const passengersLuggageSelects = (
    <div className="space-y-3">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Passengers &amp; Luggage</span>
        <span className="text-[10px] text-zinc-400 block leading-tight mt-0.5">Requested values. Actual capacity depends on the assigned vehicle and UTS confirmation.</span>
      </div>
      <div>
        <label className="text-[11px] font-semibold text-zinc-700 block mb-1">Passengers</label>
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
        <label className="text-[11px] font-semibold text-zinc-700 block mb-1">Luggage</label>
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

  const disclaimer = (
    <p className="text-[10px] text-zinc-400 leading-relaxed">
      Prices shown in this prototype are illustrative and do not represent confirmed UTS fares. Final pricing and service inclusions are subject to confirmation by UTS.
    </p>
  );

  const actions = (
    <>
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
      <button type="button" onClick={onSave}
        className="group relative overflow-hidden w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-200/70 border-[1.5px] border-transparent transition-all duration-500 hover:border-black/10 flex items-center justify-center">
        <PillButtonContent fill="black">Save Journey Details</PillButtonContent>
      </button>
      <p className="text-center text-[10px] text-zinc-400 pt-0.5">Static design only · No booking submitted</p>
    </>
  );

  return (
    <aside data-lenis-prevent className="no-scrollbar overscroll-contain w-full shrink-0 lg:sticky lg:top-[72px] lg:max-h-[calc(100vh-88px)] lg:w-[360px] lg:self-start lg:overflow-y-auto xl:w-[390px]">
      <div className="overflow-hidden bg-white border border-zinc-200/90 rounded-2xl shadow-sm divide-y divide-zinc-100">

        {/* Service switcher */}
        <div className="p-3">
          <div className="grid grid-cols-3 gap-1 bg-zinc-100 p-1 rounded-xl text-[10px] sm:text-[11px] font-bold">
            {SERVICE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onServiceChange(tab.id)}
                className={`py-2 px-1.5 rounded-lg transition-all leading-tight ${
                  state.serviceType === tab.id ? 'bg-zinc-950 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {isAirport ? (
          <>
            {/* Route Graphic */}
            <div className="relative bg-[#f4f4f7] p-4 border-b border-zinc-200/70">
              <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 border border-zinc-300/60 p-3 flex flex-col justify-between">
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

            {/* Departure / Arrival + price */}
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-1.5 bg-zinc-100 p-1 rounded-xl mb-4 text-xs font-semibold">
                <button
                  onClick={() => onUpdateState({ transferDirection: 'departure' })}
                  className={`py-2 px-3 rounded-lg transition-all ${state.transferDirection === 'departure' ? 'bg-zinc-950 text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-zinc-950'}`}
                >
                  Airport Departure
                </button>
                <button
                  onClick={() => onUpdateState({ transferDirection: 'arrival' })}
                  className={`py-2 px-3 rounded-lg transition-all ${state.transferDirection === 'arrival' ? 'bg-zinc-950 text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-zinc-950'}`}
                >
                  Airport Arrival
                </button>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    Airport {state.transferDirection === 'departure' ? 'Departure Drop-Off' : 'Arrival Pickup'}
                  </span>
                  <h4 className="text-base font-bold text-zinc-950 capitalize">{state.transferDirection}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{selectedVehicle.name} · One-way · Illustrative price only</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block">Illustrative est.</span>
                  <span className="text-xl font-extrabold text-zinc-950">
                    {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'To be confirmed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-4 sm:p-5">
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
            <div className="p-4 sm:p-5 space-y-3.5">
              <span className="text-[11px] font-bold text-zinc-800 block">Pickup / Drop-off</span>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-950" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Pickup address (hotel, home or office)</span>
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
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Airport &amp; terminal (e.g. LHR T5, LGW North, STN, LTN, LCY)</span>
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

            {/* Date & Time */}
            <div className="p-4 sm:p-5 space-y-3">
              <span className="text-[11px] font-bold text-zinc-800 block">Date &amp; Pickup Time</span>
              <p className="text-xs font-semibold text-zinc-900">{state.pickupDate} · {state.pickupTime}</p>
              <div className="flex items-center gap-2.5 pt-1 text-xs text-zinc-600">
                <Plane className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-400 block">Flight number — optional, for airport arrival pickup only</span>
                  <input type="text" placeholder="Not provided" value={state.flightNumber}
                    onChange={(e) => onUpdateState({ flightNumber: e.target.value })}
                    className="w-full text-[16px] sm:text-xs text-zinc-900 border-b border-zinc-200 py-0.5 focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400" />
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div className="p-4 sm:p-5">
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
            <div className="p-4 sm:p-5 space-y-4">
              {passengersLuggageSelects}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">Additional pickup instructions (optional)</label>
                <input type="text" placeholder="e.g. entrance or luggage details" value={state.specialInstructions}
                  onChange={(e) => onUpdateState({ specialInstructions: e.target.value })}
                  className="w-full text-[16px] sm:text-xs bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400" />
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-2.5 bg-zinc-50/50">
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
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Pickup address</span>
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
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Date &amp; Pickup Time</span>
                <p className="text-xs font-medium text-zinc-900">{state.pickupDate} · {state.pickupTime}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{state.durationHours} hours · Estimated end {addHours(state.pickupTime, state.durationHours)}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{state.pickupDate} · Same day</p>
              </div>

              <div>
                {state.stops.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Optional Stops · {state.stops.length}</span>
                      <button type="button" onClick={() => setShowAddStopInput(true)} className="text-[11px] text-zinc-900 font-semibold inline-flex items-center gap-1 hover:underline">
                        <Plus className="w-3 h-3" /><span>Add Stop</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {state.stops.map((stop, idx) => (
                        <div key={stop.id} className="flex items-center justify-between text-xs bg-zinc-50 p-2 rounded-lg border border-zinc-200/80">
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-4 h-4 rounded-full bg-zinc-200 text-zinc-700 text-[10px] flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                            <span className="truncate font-medium text-zinc-800">{stop.address}</span>
                          </div>
                          <button onClick={() => handleRemoveStop(stop.id)} className="text-zinc-400 hover:text-red-600 p-1 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">Final destination · Optional</span>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-zinc-900">Flexible itinerary — not specified</p>
                      <button type="button" onClick={() => setShowAddStopInput(true)} className="text-[11px] text-zinc-900 font-semibold inline-flex items-center gap-1 hover:underline shrink-0">
                        <Plus className="w-3 h-3" /><span>Add Stop</span>
                      </button>
                    </div>
                  </>
                )}
                <p className="text-[11px] text-zinc-400 mt-1.5">Multiple stops possible within the booked period.</p>
                {showAddStopInput && (
                  <div className="mt-2 flex gap-1.5">
                    <input type="text" placeholder="Enter stop address" value={newStopAddress} onChange={(e) => setNewStopAddress(e.target.value)}
                      className="flex-1 text-[16px] sm:text-xs border border-zinc-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-zinc-950" />
                    <button onClick={handleAddStop} className="bg-zinc-950 text-white text-xs px-3 py-1.5 rounded font-medium">Save</button>
                  </div>
                )}
              </div>
            </div>

            {/* Duration stepper */}
            <div className="p-4 sm:p-5 bg-zinc-50/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-zinc-800">Booking Duration (Hours)</label>
                <span className="text-[11px] text-zinc-500">Minimum: 4 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => onUpdateState({ durationHours: Math.max(1, state.durationHours - 1) })}
                  className="w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm">-</button>
                <div className="flex-1 text-center py-1.5 px-3 bg-white border border-zinc-200 rounded-lg">
                  <span className="text-base font-bold text-zinc-950">{state.durationHours} Hours</span>
                </div>
                <button type="button" onClick={() => onUpdateState({ durationHours: Math.min(16, state.durationHours + 1) })}
                  className="w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm">+</button>
              </div>
              {!isMinHoursValid && (
                <div className="mt-2.5 p-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>UTS policy enforces a strict <strong>4-hour minimum</strong> for {state.serviceType === 'day-booking' ? 'Day Booking' : 'Hourly Chauffeur'}.</span>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="p-4 sm:p-5">
              <div className="bg-zinc-50 rounded-xl border border-zinc-200/80 p-3.5 text-xs text-zinc-600 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>
                    {priceCalc.ratePerUnit !== null
                      ? `£${priceCalc.ratePerUnit.toFixed(2)} × ${state.durationHours} hours`
                      : `Base fare · ${state.durationHours} hours`}
                  </span>
                  <span className="font-semibold text-zinc-900">{priceCalc.baseFare !== null ? `£${priceCalc.baseFare.toFixed(2)}` : 'To be confirmed'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Additional duration</span>
                  <span className="font-semibold text-zinc-900">£0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Optional add-ons · Not selected</span>
                  <span className="font-semibold text-zinc-900">£0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fees · Not configured</span>
                  <span className="font-semibold text-zinc-900">£0.00</span>
                </div>
                <div className="pt-1.5 mt-1 border-t border-zinc-200 flex items-center justify-between">
                  <span className="font-bold text-zinc-950">Illustrative total · GBP</span>
                  <span className="font-extrabold text-zinc-950 text-sm">
                    {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'To be confirmed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Passengers & Luggage + accessibility */}
            <div className="p-4 sm:p-5 space-y-4">
              {passengersLuggageSelects}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">Accessibility / additional requirements (optional)</label>
                <textarea rows={2} placeholder="Tell us how we can assist" value={state.specialInstructions}
                  onChange={(e) => onUpdateState({ specialInstructions: e.target.value })}
                  className="w-full text-[16px] sm:text-xs bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400 resize-none" />
              </div>
              {disclaimer}
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
