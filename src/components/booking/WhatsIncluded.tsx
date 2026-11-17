'use client';

import React from 'react';
import { UserCheck, Clock, ShieldCheck, MapPin, Briefcase, Navigation, CalendarCheck, Compass, Sparkles, Building2 } from 'lucide-react';
import { ServiceType } from '@/types/booking';

interface WhatsIncludedProps {
  serviceType: ServiceType;
}

export const WhatsIncluded: React.FC<WhatsIncludedProps> = ({ serviceType }) => {
  const airportItems = [
    { title: 'Professional chauffeur service', icon: UserCheck },
    { title: 'Airport pickup coordination', icon: Clock },
    { title: 'Comfortable travel to and from the airport', icon: ShieldCheck },
    { title: 'All major London airports covered', icon: Navigation },
    { title: 'Luggage assistance at pickup and drop-off', icon: Briefcase },
    { title: 'Direct routing to your terminal or destination', icon: MapPin },
  ];

  const dayBookingItems = [
    { title: 'Professional Private Chauffeur', icon: UserCheck },
    { title: 'Dedicated Vehicle for the Booked Period', icon: Building2 },
    { title: 'Flexible Journey Planning', icon: Compass },
    { title: 'Assistance with Personal Belongings', icon: Briefcase },
    { title: 'Comfortable Executive Travel', icon: ShieldCheck },
    { title: 'Convenient Travel Between Multiple Stops', icon: CalendarCheck },
  ];

  const hourlyItems = [
    { title: 'Private chauffeur for the booked period', icon: UserCheck },
    { title: 'Flexible journey planning on your schedule', icon: Clock },
    { title: 'Multiple-stop coordination and standby', icon: MapPin },
    { title: 'Executive travel convenience and privacy', icon: Sparkles },
    { title: 'Professional certified chauffeur standards', icon: ShieldCheck },
    { title: 'Comfortable luxury travel across London', icon: Navigation },
  ];

  const items =
    serviceType === 'airport-transfer'
      ? airportItems
      : serviceType === 'day-booking'
      ? dayBookingItems
      : hourlyItems;

  return (
    <section className="mb-14 border-t border-zinc-200/80 pt-10">
      <h2 className="mb-8 text-[24px] font-light leading-[115%] tracking-[-0.03em] text-neutral-900 sm:text-[28px]">What&apos;s <span className="font-semibold">Included</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-8">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700">
                <Icon className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-zinc-800 leading-snug pt-1">{item.title}</p>
            </div>
          );
        })}
      </div>
      {serviceType !== 'airport-transfer' && (
        <p className="text-[11px] text-zinc-500 mt-6 bg-zinc-50 p-3 rounded-lg border border-zinc-200/60">
          Service inclusions are illustrative and configurable, subject to UTS configuration and confirmation. No guaranteed extensions are implied.
        </p>
      )}
    </section>
  );
};
