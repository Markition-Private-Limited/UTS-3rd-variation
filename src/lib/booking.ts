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

/** "08:00" + 8 -> "16:00" (wraps past midnight; no booking in this prototype exceeds 24 hrs). */
export function addHours(time: string, hours: number): string {
  const [h, m] = time.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return time;
  const total = (h * 60 + m + hours * 60) % (24 * 60);
  const endH = Math.floor(total / 60);
  const endM = total % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}
