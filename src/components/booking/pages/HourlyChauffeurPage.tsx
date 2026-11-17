'use client';

import React from 'react';
import { BookingState, Vehicle, VehicleTier } from '@/types/booking';
import { VehicleSelector } from '@/components/booking/VehicleSelector';
import { ShowcaseCarousel } from '@/components/booking/ShowcaseCarousel';
import { WhatsIncluded } from '@/components/booking/WhatsIncluded';
import { CapacityLuggage } from '@/components/booking/CapacityLuggage';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';

interface HourlyChauffeurPageProps {
  state: BookingState;
  fleet: Vehicle[];
  selectedVehicle: Vehicle;
  onSelectVehicle: (id: VehicleTier) => void;
  onUpdateState: (updates: Partial<BookingState>) => void;
}

export const HourlyChauffeurPage: React.FC<HourlyChauffeurPageProps> = ({
  state, fleet, selectedVehicle, onSelectVehicle, onUpdateState,
}) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
          <span>UTS Flexible Hire</span><span>·</span><span>By The Hour</span>
        </div>
        <h1 className="mb-3 text-[30px] font-light leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[36px] lg:text-[42px]">
          Your Chauffeur, <span className="font-semibold">On Your Schedule.</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
          Book a private chauffeur by the hour and travel across London with the flexibility, comfort, and professionalism your day deserves.
        </p>
      </div>

      <VehicleSelector vehicles={fleet} selectedVehicleId={state.selectedVehicleId} onSelectVehicle={onSelectVehicle}
        serviceType="hourly-chauffeur" distanceKm={state.sampleDistanceKm} durationHours={state.durationHours} />

      <ShowcaseCarousel serviceType="hourly-chauffeur" selectedVehicle={selectedVehicle} />
      <WhatsIncluded serviceType="hourly-chauffeur" />
      <CapacityLuggage selectedVehicle={selectedVehicle} currentLuggageType={state.luggageType}
        onLuggageTypeChange={(t) => onUpdateState({ luggageType: t })} serviceType="hourly-chauffeur" />
      <PriceBreakdown serviceType="hourly-chauffeur" selectedVehicle={selectedVehicle}
        distanceKm={state.sampleDistanceKm} durationHours={state.durationHours} />
    </div>
  );
};
