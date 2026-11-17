'use client';

import React from 'react';
import { BookingState, Vehicle, VehicleTier } from '@/types/booking';
import { JourneyPlanner } from '@/components/booking/JourneyPlanner';
import { SimpleVehicleGrid } from '@/components/booking/SimpleVehicleGrid';
import { ShowcaseCarousel } from '@/components/booking/ShowcaseCarousel';
import { WhatsIncluded } from '@/components/booking/WhatsIncluded';
import { CapacityLuggage } from '@/components/booking/CapacityLuggage';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';

interface DayBookingPageProps {
  state: BookingState;
  fleet: Vehicle[];
  selectedVehicle: Vehicle;
  onSelectVehicle: (id: VehicleTier) => void;
  onUpdateState: (updates: Partial<BookingState>) => void;
}

export const DayBookingPage: React.FC<DayBookingPageProps> = ({
  state, fleet, selectedVehicle, onSelectVehicle, onUpdateState,
}) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
          <span>UTS Executive Service</span><span>·</span><span>London Day Chauffeur</span>
        </div>
        <h1 className="mb-3 text-[30px] font-light leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[36px] lg:text-[42px]">
          Your Day, <span className="font-semibold">Driven Around You.</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
          Enjoy a dedicated private chauffeur in London, with the freedom to move between meetings, appointments and destinations at your own pace.
        </p>
      </div>

      <JourneyPlanner
        state={state}
        onUpdateState={onUpdateState}
        minHours={4}
        hourOptions={[4, 6, 8, 10, 12, 14]}
        heading="Select Your Chauffeur Schedule"
        durationLabel="Duration"
        stopsMode="single"
        stopsNote="You do not need to plan every stop. Multiple stops are possible during your booked period."
        notesPlaceholder="Add meeting locations, itinerary details or special requests."
      />

      <SimpleVehicleGrid vehicles={fleet} selectedVehicleId={state.selectedVehicleId} onSelectVehicle={onSelectVehicle}
        serviceType="day-booking" durationHours={state.durationHours} />

      <ShowcaseCarousel serviceType="day-booking" selectedVehicle={selectedVehicle} />
      <WhatsIncluded serviceType="day-booking" />
      <CapacityLuggage selectedVehicle={selectedVehicle} currentLuggageType={state.luggageType}
        onLuggageTypeChange={(t) => onUpdateState({ luggageType: t })} />
      <PriceBreakdown serviceType="day-booking" selectedVehicle={selectedVehicle}
        distanceKm={state.sampleDistanceKm} durationHours={state.durationHours} />
    </div>
  );
};
