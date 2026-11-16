'use client';

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Vehicle } from '@/types/booking';
import { getLuggageImage } from '@/data/fleet';

interface CapacityLuggageProps {
  selectedVehicle: Vehicle;
  currentLuggageType: 'carry-on' | 'check-in' | 'large';
  onLuggageTypeChange: (type: 'carry-on' | 'check-in' | 'large') => void;
}

export const CapacityLuggage: React.FC<CapacityLuggageProps> = ({
  selectedVehicle,
  currentLuggageType,
  onLuggageTypeChange,
}) => {
  const [activeTab, setActiveTab] = useState<'seating' | 'luggage'>('luggage');

  const luggageOptions = [
    {
      id: 'carry-on' as const,
      label: '2 × Carry-on',
      subtitle: 'Cabin bags (up to 55 × 40 × 20 cm)',
      fitNotice: 'Comfortably fits into all UTS saloons and vans with spare compartment space.',
    },
    {
      id: 'check-in' as const,
      label: '2 × Check-in',
      subtitle: 'Standard checked suitcases (up to 23 kg)',
      fitNotice: selectedVehicle.luggage >= 2
        ? `Fits into ${selectedVehicle.name} luggage compartment as shown.`
        : `Vehicle capacity is limited to ${selectedVehicle.luggage} bags. Consider upgrading to First Class Van.`,
    },
    {
      id: 'large' as const,
      label: '1 × Large Check-in',
      subtitle: 'Oversized / heavy luggage (up to 32 kg)',
      fitNotice: 'Accommodated in boot compartment. For multiple oversized bags, First Class Van is recommended.',
    },
  ];

  return (
    <section className="mb-14 border-t border-zinc-200/80 pt-10">
      <div className="flex items-end justify-between gap-4 mb-4">
        <h2 className="text-[24px] font-light leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[28px]">Capacity & <span className="font-semibold">Luggage</span></h2>
        <div className="flex gap-5 border-b border-zinc-200 shrink-0 pb-0">
          {(['seating', 'luggage'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 text-xs sm:text-sm font-semibold capitalize tracking-wide transition-colors duration-150 ${
                activeTab === tab
                  ? 'border-b-2 border-zinc-950 text-zinc-950 -mb-px'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-zinc-500 mb-6 leading-relaxed max-w-3xl">
        Select a luggage configuration to visualise how your bags may fit. All passenger and luggage capacities shown are indicative only and subject to confirmation with UTS before booking.
      </p>

      {activeTab === 'luggage' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {luggageOptions.map((opt) => {
              const isSelected = currentLuggageType === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onLuggageTypeChange(opt.id)}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border text-center ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                      : 'bg-zinc-100/90 text-zinc-800 border-zinc-200/60 hover:bg-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="relative aspect-[3/2] sm:aspect-[2075/758] rounded-2xl overflow-hidden bg-zinc-900 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`${selectedVehicle.id}-${currentLuggageType}`}
              src={getLuggageImage(selectedVehicle.id, currentLuggageType)}
              alt={`${selectedVehicle.name} luggage capacity — ${luggageOptions.find((o) => o.id === currentLuggageType)?.label}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/45 backdrop-blur-md backdrop-saturate-150 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] text-white px-5 py-3.5 rounded-xl text-sm font-sans flex items-center justify-between">
              <div>
                <span className="font-normal">{selectedVehicle.name} Luggage Volume</span>
                <p className="text-xs font-light text-zinc-300">
                  {luggageOptions.find((o) => o.id === currentLuggageType)?.subtitle}
                </p>
              </div>
              <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-md font-light">
                Max {selectedVehicle.luggage} Standard Bags
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-base">{selectedVehicle.name} Seating Arrangement</h3>
              <p className="text-xs text-zinc-500">Maximum comfortable capacity: {selectedVehicle.passengers} passengers</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-700 mt-4">
            <div className="p-3 bg-white rounded-xl border border-zinc-200/80">
              <span className="font-bold text-zinc-900 block mb-1">Cabin Configuration</span>
              <p className="text-zinc-600">
                {selectedVehicle.id === 'first-class-van' || selectedVehicle.id === 'van'
                  ? 'Conference or forward-facing club seating with generous legroom.'
                  : 'Individual executive rear seats with armrest controls and footwells.'}
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-zinc-200/80">
              <span className="font-bold text-zinc-900 block mb-1">Child Seats & Boosters</span>
              <p className="text-zinc-600">ISOFIX points available upon request. Please specify requirements in booking notes.</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-zinc-200/80">
              <span className="font-bold text-zinc-900 block mb-1">Accessibility</span>
              <p className="text-zinc-600">Wide-opening doors and kerb-level step coordination provided by chauffeur.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
