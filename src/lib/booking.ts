export type ServiceType = "transfer" | "day" | "hourly";

/** Data the hero "Find Your Ride" bar hands over to the /book page. */
export interface BookingDraft {
  service?: ServiceType;
  pickup: string;
  dropoff?: string;
  date: string;
  time?: string;
  name?: string;
  phone?: string;
  passengers?: number;
  duration?: number;
}

export const DRAFT_KEY = "uts-booking-draft";
