'use client';

import LocationInput from '@/components/ui/LocationInput';
import React, { useState } from 'react';
import { MapPin, Plus, Trash2, ChevronUp, ChevronDown, Calendar, Clock } from 'lucide-react';
import { BookingState } from '@/types/booking';
import { addHours } from '@/lib/booking';

interface JourneyPlannerProps {
  state: BookingState;
  onUpdateState: (updates: Partial<BookingState>) => void;
  hourOptions: number[];
  minHours: number;
  heading: string;
  durationLabel: string;
  stopsMode: 'list' | 'single';
  stopsNote: string;
  notesPlaceholder: string;
}

export const JourneyPlanner: React.FC<JourneyPlannerProps> = ({
  state, onUpdateState, hourOptions, minHours, heading, durationLabel, stopsMode, stopsNote, notesPlaceholder,
}) => {
  const [newStop, setNewStop] = useState('');

  const handleAddStop = () => {
    if (!newStop.trim()) return;
    onUpdateState({ stops: [...state.stops, { id: `stop-${Date.now()}`, address: newStop.trim() }] });
    setNewStop('');
  };

  const handleRemoveStop = (stopId: string) => {
    onUpdateState({ stops: state.stops.filter((s) => s.id !== stopId) });
  };

  const moveStop = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= state.stops.length) return;
    const next = [...state.stops];
    [next[index], next[target]] = [next[target], next[index]];
    onUpdateState({ stops: next });
  };

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-[24px] font-light leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[28px]">{heading}</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm">
        <div className="mb-4">
          <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Pickup Location</label>
          <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <MapPin className="w-4 h-4 text-zinc-700 shrink-0" />
            <LocationInput value={state.pickupAddress} onChange={(v) => onUpdateState({ pickupAddress: v })}
              className="w-full text-[16px] sm:text-sm bg-transparent focus:outline-none text-zinc-900 font-medium"
              placeholder="e.g. The Langham, 1c Portland Place, London" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Pickup Date</label>
            <div className="flex items-center gap-2 p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
              <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
              <input type="text" value={state.pickupDate} onChange={(e) => onUpdateState({ pickupDate: e.target.value })}
                className="w-full min-w-0 bg-transparent text-[16px] sm:text-sm font-semibold text-zinc-800 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Pickup Time · 24-hour</label>
            <div className="flex items-center gap-2 p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
              <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
              <input type="time" value={state.pickupTime} onChange={(e) => onUpdateState({ pickupTime: e.target.value })}
                className="w-full min-w-0 bg-transparent text-[16px] sm:text-sm font-semibold text-zinc-800 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-2">{durationLabel}</label>
          <div className="flex flex-wrap gap-2">
            {hourOptions.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => onUpdateState({ durationHours: h })}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  state.durationHours === h
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {h} Hours
              </button>
            ))}
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Estimated end: {state.pickupDate} · {addHours(state.pickupTime, state.durationHours)} · Same day
          </p>
          {state.durationHours < minHours && (
            <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 mt-2">
              UTS policy enforces a {minHours}-hour minimum booking for this service.
            </p>
          )}
        </div>

        {stopsMode === 'single' ? (
          <div className="mb-2 pt-3 border-t border-zinc-100">
            <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Final Destination (optional)</label>
            <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
              <MapPin className="w-4 h-4 text-zinc-700 shrink-0" />
              <LocationInput value={state.destinationAddress} onChange={(v) => onUpdateState({ destinationAddress: v })}
                className="w-full text-[16px] sm:text-sm bg-transparent focus:outline-none text-zinc-900 font-medium"
                placeholder="Leave open for a flexible itinerary" />
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">{stopsNote}</p>
          </div>
        ) : (
          <div className="space-y-2.5 mb-2 pt-3 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase font-bold text-zinc-500 block">Optional Stops</label>
            </div>
            {state.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center justify-between gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs sm:text-sm">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold shrink-0">{index + 1}</span>
                  <span className="font-medium text-zinc-900 truncate">{stop.address}</span>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <div className="flex flex-col">
                    <button type="button" onClick={() => moveStop(index, -1)} disabled={index === 0}
                      className="text-zinc-400 hover:text-zinc-900 disabled:opacity-25 disabled:hover:text-zinc-400 p-0.5" aria-label="Move stop up">
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => moveStop(index, 1)} disabled={index === state.stops.length - 1}
                      className="text-zinc-400 hover:text-zinc-900 disabled:opacity-25 disabled:hover:text-zinc-400 p-0.5" aria-label="Move stop down">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button onClick={() => handleRemoveStop(stop.id)} className="text-zinc-400 hover:text-red-600 p-1" aria-label="Remove stop">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <input type="text" placeholder="Add a stop (e.g. Bond Street Boutiques, Scott's Restaurant)" value={newStop}
                onChange={(e) => setNewStop(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddStop(); } }}
                className="flex-1 text-[16px] sm:text-sm border border-zinc-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950" />
              <button type="button" onClick={handleAddStop}
                className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors shrink-0">
                <Plus className="w-3.5 h-3.5" /><span>Add Stop</span>
              </button>
            </div>
            <p className="text-[11px] text-zinc-400">{stopsNote}</p>
          </div>
        )}

        <div className="pt-3 border-t border-zinc-100">
          <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Journey Notes (optional)</label>
          <textarea rows={2} placeholder={notesPlaceholder} value={state.specialInstructions}
            onChange={(e) => onUpdateState({ specialInstructions: e.target.value })}
            className="w-full text-[16px] sm:text-sm bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400 resize-none" />
        </div>

        <p className="text-[11px] text-zinc-400 mt-3">Duration choices, minimum booking periods and pricing policies are configurable prototype examples, not approved UTS terms.</p>
      </div>
    </section>
  );
};
