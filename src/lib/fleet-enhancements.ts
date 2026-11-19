import type { Vehicle } from '@/types/booking'

// Shape returned by /api/fleet per vehicle.
export type ApiVehicle = {
  id: string
  tier: string
  categories: string[]
  name: string
  description: string
  image: string
  seats: number
  luggage: number
  showInAll: boolean
  airportRateKm: number | null
  dayRateHour: number | null
  hourlyRateHour: number | null
}

type Enhancement = {
  categoryName?: string
  modelExample?: string
  features?: string[]
  image2?: string
  luggageFolder?: string
}

const ENHANCEMENTS: Record<string, Enhancement> = {
  'economy-saloon': {
    categoryName: 'Economy Saloon',
    modelExample: 'Volkswagen Passat / Kia Niro or similar',
    features: [
      'Comfortable modern saloon seating',
      'Air conditioning and USB charging',
      'Punctual professional driver',
      'Direct routing with luggage assistance',
    ],
    image2: '/images/fleet-cards/economy-saloon-2.webp',
    luggageFolder: 'economy-saloon',
  },
  'business-class': {
    categoryName: 'Business Class',
    modelExample: 'Mercedes-Benz E-Class or similar',
    features: [
      'Complimentary Wi-Fi & chilled mineral water',
      'Rear climate control and device charging ports',
      'Immaculately maintained executive saloon',
      'Discreet and courteous professional chauffeur',
    ],
    image2: '/images/fleet-cards/business-class-2.webp',
    luggageFolder: 'business-class',
  },
  'business-class-bmw-5-series': {
    categoryName: 'Business Class',
    modelExample: 'BMW 5 Series or similar',
    features: [
      'Complimentary Wi-Fi & chilled mineral water',
      'Rear climate control and device charging ports',
      'Immaculately maintained executive saloon',
      'Discreet and courteous professional chauffeur',
    ],
    image2: '/images/fleet-cards/business-class-2.webp',
    luggageFolder: 'business-class',
  },
  'first-class': {
    categoryName: 'First Class',
    modelExample: 'Mercedes-Benz S-Class or similar',
    features: [
      'Reclining Nappa leather executive rear seats',
      'Burmester® 3D surround sound & active noise isolation',
      'Chauffeur protocol with umbrella service',
      'Premium refreshments and hot towel service',
    ],
    image2: '/images/fleet-cards/first-class-2.webp',
    luggageFolder: 'first-class',
  },
  'first-class-bmw-i7': {
    categoryName: 'First Class',
    modelExample: 'BMW i7 or similar',
    features: [
      'Reclining Nappa leather executive rear seats',
      'Burmester® 3D surround sound & active noise isolation',
      'Chauffeur protocol with umbrella service',
      'Premium refreshments and hot towel service',
    ],
    image2: '/images/fleet-cards/first-class-2.webp',
    luggageFolder: 'first-class',
  },
  mpv: {
    categoryName: 'MPV',
    modelExample: 'Volkswagen Sharan / Ford Galaxy or similar',
    features: [
      'Elevated seating position with enhanced visibility',
      'Flexible modular luggage storage space',
      'Sliding passenger side doors for easy access',
      'Professional chauffeur and route coordination',
    ],
    image2: '/images/fleet-cards/mpv-2.webp',
    luggageFolder: 'mpv',
  },
  'first-class-van': {
    categoryName: 'First Class Van',
    modelExample: 'Mercedes-Benz V-Class or similar',
    features: [
      'Conference-style luxury leather seating',
      'Panoramic roof and ambient cabin lighting',
      'Generous luggage compartment for up to 6 cases',
      'Privacy glass and dedicated rear passenger climate',
    ],
    image2: '/images/fleet-cards/first-class-van-2.webp',
    luggageFolder: 'first-class-van',
  },
  'business-class-van': {
    categoryName: 'Business Class Van',
    modelExample: 'Mercedes-Benz Vito or similar',
    features: [
      'Accommodates up to 9 passengers comfortably',
      'Deep rear luggage bay for oversized bags',
      'Dual-zone rear heating and cooling',
      'Professional certified commercial chauffeur',
    ],
    image2: '/images/fleet-cards/standard-van-2.webp',
    luggageFolder: 'van',
  },
  'standard-van': {
    categoryName: 'Standard Van',
    modelExample: 'Hyundai i800 / Volkswagen Transporter or similar',
    features: [
      'Seating for up to 8 passengers',
      'Substantial boot capacity for standard suitcases',
      'Clean, comfortable passenger cabin',
      'Experienced London chauffeur',
    ],
    image2: '/images/fleet-cards/standard-van-2.webp',
    luggageFolder: 'standard-van',
  },
}

export function buildBookingVehicle(v: ApiVehicle): Vehicle {
  const enh = ENHANCEMENTS[v.id] ?? {}
  return {
    id: v.id,
    name: v.name,
    categoryName: enh.categoryName ?? v.categories[0] ?? v.tier,
    modelExample: enh.modelExample ?? v.name,
    passengers: v.seats,
    luggage: v.luggage,
    image: v.image,
    image2: enh.image2 ?? v.image,
    description: v.description,
    features: enh.features ?? [],
    airportRateKm: v.airportRateKm,
    dayRateHour: v.dayRateHour,
    hourlyRateHour: v.hourlyRateHour,
  }
}

const SLUG_LUGGAGE_FOLDER: Record<string, string> = Object.fromEntries(
  Object.entries(ENHANCEMENTS)
    .filter(([, e]) => e.luggageFolder)
    .map(([slug, e]) => [slug, e.luggageFolder!]),
)

export function getLuggageImageBySlug(
  slug: string,
  luggageType: 'carry-on' | 'check-in' | 'large',
): string {
  const folder = SLUG_LUGGAGE_FOLDER[slug] ?? slug
  return `/luggage/${folder}/${luggageType}.png`
}
