'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { Vehicle, ServiceType } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';

interface PriceBreakdownProps {
  serviceType: ServiceType;
  selectedVehicle: Vehicle;
  distanceKm: number;
  durationHours: number;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  serviceType,
  selectedVehicle,
  distanceKm,
  durationHours,
}) => {
  const calculation = calculatePrice(serviceType, selectedVehicle, { distanceKm, durationHours });

  return (
    <section className="mb-14 border-t border-zinc-200/80 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h2 className="text-[24px] font-light leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[28px]">Price <span className="font-semibold">Breakdown</span></h2>
        <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md">
          Illustrative prototype values — not UTS rates
        </span>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-sm mb-6 divide-y divide-zinc-100">
        {serviceType === 'airport-transfer' && (
          <>
            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">{selectedVehicle.name} base fare (illustrative)</span>
              <span className="font-semibold text-zinc-900">
                {calculation.baseFare !== null ? `£${calculation.baseFare.toFixed(2)}` : 'To be confirmed'}
              </span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Booking & administration fee (illustrative)</span>
              <span className="text-zinc-400 font-normal italic">Not configured (omitted per UTS schedule)</span>
            </div>

            <div className="pt-4 pb-1 flex items-baseline justify-between">
              <span className="text-base font-bold text-zinc-950">Illustrative estimated total</span>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                {calculation.total !== null ? `£${calculation.total.toFixed(2)}` : 'Price to be confirmed'}
              </span>
            </div>
          </>
        )}

        {(serviceType === 'day-booking' || serviceType === 'hourly-chauffeur') && (
          <>
            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">
                {serviceType === 'day-booking' ? 'Day Chauffeur' : 'Hourly Chauffeur'} Base Fare ({durationHours} hours)
              </span>
              <span className="font-semibold text-zinc-900">
                {calculation.baseFare !== null ? `£${calculation.baseFare.toFixed(2)}` : 'To be confirmed'}
              </span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Additional Duration Charge</span>
              <span className="font-semibold text-zinc-900">£0.00</span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Optional Add-ons · Not selected</span>
              <span className="font-semibold text-zinc-900">£0.00</span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Applicable Fees · Not configured</span>
              <span className="font-semibold text-zinc-900">£0.00</span>
            </div>

            <div className="pt-4 pb-1 flex items-baseline justify-between">
              <span className="text-base font-bold text-zinc-950">Illustrative Estimated Total · GBP</span>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                {calculation.total !== null ? `£${calculation.total.toFixed(2)}` : 'Price to be confirmed'}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="text-xs text-zinc-500 space-y-2 bg-zinc-50/70 p-4 rounded-xl border border-zinc-200/70">
        <p className="font-semibold text-zinc-700 text-xs">Please note:</p>
        {serviceType === 'airport-transfer' ? (
          <>
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
              <p>All prices shown are illustrative prototype values only and do not represent confirmed UTS fares, rates or fleet. Route details, vehicle models, fees and service inclusions are examples for demonstration purposes.</p>
            </div>
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
              <p>Please confirm route, airport, terminal, passenger and luggage details with UTS before completing your booking. Actual fare will be confirmed by UTS directly.</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
              <p>Prices shown in this prototype are illustrative and do not represent confirmed UTS fares. Final pricing and service inclusions are subject to confirmation by UTS.</p>
            </div>
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
              <p>Pricing policies, minimum duration, inclusions and capacities are configurable examples, not approved UTS terms. No mandatory fees have been assumed.</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
