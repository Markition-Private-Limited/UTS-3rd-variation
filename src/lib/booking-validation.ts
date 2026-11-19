export type ServiceType =
  | 'airport-transfer'
  | 'day-booking'
  | 'hourly-chauffeur'
  | 'fixed-route'
  | 'city-to-city'
  | 'sightseeing-chauffeur'

function containsLondon(addr: string): boolean {
  return /\blondon\b/i.test(addr)
}

export function validateLocationRules(
  serviceType: ServiceType,
  pickup: string,
  dropoff: string,
): { ok: true } | { ok: false; reason: string } {
  if (serviceType === 'fixed-route' || serviceType === 'city-to-city') {
    if (!containsLondon(pickup) && !containsLondon(dropoff)) {
      return {
        ok: false,
        reason:
          'Fixed-route and city-to-city bookings require London as either the pickup or drop-off location.',
      }
    }
  }

  if (serviceType === 'sightseeing-chauffeur') {
    if (!containsLondon(pickup) || !containsLondon(dropoff)) {
      return {
        ok: false,
        reason:
          'Sightseeing chauffeur bookings require both the pickup and drop-off to be within London.',
      }
    }
  }

  return { ok: true }
}
