// Swappable distance-lookup abstraction.
// Downstream code (booking-price.ts) only depends on this interface —
// swapping the provider requires no changes outside this file.

export type DistanceResult = {
  km: number
  source: 'mock' | 'google-maps' | 'osrm'
}

export async function getDistanceKm(
  _pickup: string,
  _dropoff: string,
): Promise<DistanceResult> {
  // Placeholder: returns a typical London-to-airport distance.
  // Replace this function body with a real provider call when ready.
  return { km: 28, source: 'mock' }
}
