'use client';

import React from 'react';
import { User, Briefcase } from 'lucide-react';
import { Vehicle, VehicleTier, ServiceType } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';

const GRID_VEHICLE_IDS: VehicleTier[] = ['business', 'first', 'first-class-van'];

interface SimpleVehicleGridProps {
  vehicles: Vehicle[];
  selectedVehicleId: VehicleTier;
  onSelectVehicle: (id: VehicleTier) => void;
  serviceType: ServiceType;
  durationHours: number;
}

export const SimpleVehicleGrid: React.FC<SimpleVehicleGridProps> = ({
  vehicles, selectedVehicleId, onSelectVehicle, serviceType, durationHours,
}) => {
  const gridVehicles = GRID_VEHICLE_IDS
    .map((id) => vehicles.find((v) => v.id === id))
    .filter((v): v is Vehicle => Boolean(v));

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-light leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[28px]">Select Your <span className="font-semibold">Vehicle</span></h2>
        <span className="text-xs text-zinc-500 bg-zinc-100/80 px-3 py-1 rounded-full font-medium">
          Three vehicle classes · Illustrative estimates, not confirmed UTS fares
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {gridVehicles.map((vehicle) => {
          const isSelected = vehicle.id === selectedVehicleId;
          const priceCalc = calculatePrice(serviceType, vehicle, { durationHours });
          const extraHourRate = vehicle.dayRateHour ?? vehicle.hourlyRateHour;

          return (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => onSelectVehicle(vehicle.id)}
              className={`group text-left rounded-xl overflow-hidden bg-white transition-all duration-300 ${
                isSelected ? 'border-[1.5px] border-zinc-950 shadow-md' : 'border border-zinc-200/90 hover:border-zinc-400'
              }`}
            >
              <div className="relative aspect-[9/10] bg-zinc-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image.replace('-1.webp', '-1-card.webp')}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col px-4 pt-4 pb-4">
                <h3 className="font-bold text-base text-zinc-900 tracking-tight leading-snug">{vehicle.name}</h3>
                <p className="text-xs text-zinc-500 mt-1 font-normal">{vehicle.modelExample}</p>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed line-clamp-2 min-h-[3em]">{vehicle.description}</p>

                {priceCalc.ratePerUnit !== null && (
                  <p className="mt-4 min-h-[1.25rem] text-xs text-zinc-500">
                    {serviceType === 'day-booking'
                      ? `${priceCalc.unitCount}-hour estimate · Extra hour £${(extraHourRate ?? priceCalc.ratePerUnit).toFixed(0)}`
                      : `£${priceCalc.ratePerUnit.toFixed(2).replace(/\.00$/, '')}/hour × ${priceCalc.unitCount} hours`}
                  </p>
                )}

                <div className="flex items-center justify-between mt-2">
                  {priceCalc.total !== null ? (
                    <span className="text-xl font-bold tracking-tight text-zinc-950">£{priceCalc.total.toFixed(0)}</span>
                  ) : (
                    <span className="text-xs font-semibold text-zinc-700">Price to be confirmed</span>
                  )}
                  <div className="flex items-center gap-3 text-xs text-zinc-600 font-medium">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{vehicle.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{vehicle.luggage}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`mt-3.5 w-full py-2.5 px-4 rounded-full text-xs font-semibold border-[1.5px] text-center transition-colors ${
                    isSelected ? 'bg-zinc-950 text-white border-transparent' : 'bg-white text-zinc-950 border-zinc-300 group-hover:border-zinc-950'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select Vehicle'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-zinc-400 mt-4">
        Indicative capacity only: Business Class and First Class up to 3 passengers, with 2 carry-on OR 2 check-in OR 1 large check-in bag. First Class Van: 6 passengers / 5 bags. Illustrative and subject to vehicle. These are not confirmed fleet specifications.
      </p>
    </section>
  );
};
