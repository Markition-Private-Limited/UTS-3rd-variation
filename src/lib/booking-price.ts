import 'server-only'
import { connectDB } from '@/lib/mongodb'
import { FleetVehicleModel } from '@/models/FleetVehicle'
import { FixedRouteModel } from '@/models/FixedRoute'
import { getDistanceKm } from '@/lib/distance'
import type { ServiceType } from '@/lib/booking-validation'

export type PriceBreakdown = {
  ratePerUnit?: number
  unitCount?: number
  unit?: string
  distanceKm?: number
  minimumApplied?: boolean
  routeSlug?: string
  routeLabel?: string
}

export type PriceResult =
  | {
      ok: true
      price: number
      breakdown: PriceBreakdown
      distanceKm?: number
      vehicleTier: string
      vehicleName: string
    }
  | { ok: false; reason: string }

type VehicleRate = { service: string; amount: number | null; unit: string }
type TierRate = { tier: string; amount: number | null; available: boolean }

export async function calculateBookingPrice(params: {
  serviceType: ServiceType
  vehicleSlug: string
  pickup: string
  dropoff: string
  durationHours?: number
  routeSlug?: string
}): Promise<PriceResult> {
  await connectDB()

  const vehicle = await FleetVehicleModel.findOne(
    { slug: params.vehicleSlug, active: true },
  ).lean()

  if (!vehicle) {
    return {
      ok: false,
      reason: `Vehicle '${params.vehicleSlug}' not found or not available.`,
    }
  }

  const rates = vehicle.rates as VehicleRate[]

  switch (params.serviceType) {
    case 'airport-transfer': {
      const rate = rates.find((r) => r.service === 'Airport Transfer')
      if (!rate || rate.amount === null) {
        return {
          ok: false,
          reason: `No Airport Transfer rate is configured for vehicle '${params.vehicleSlug}'.`,
        }
      }
      const { km } = await getDistanceKm(params.pickup, params.dropoff)
      const price = Math.round(rate.amount * km * 100) / 100
      return {
        ok: true,
        price,
        distanceKm: km,
        breakdown: { ratePerUnit: rate.amount, unitCount: km, unit: 'km', distanceKm: km },
        vehicleTier: vehicle.tier,
        vehicleName: vehicle.name,
      }
    }

    case 'day-booking': {
      const rate = rates.find((r) => r.service === 'Day Booking')
      if (!rate || rate.amount === null) {
        return {
          ok: false,
          reason: `No Day Booking rate is configured for vehicle '${params.vehicleSlug}'.`,
        }
      }
      const requested = params.durationHours ?? 4
      const hours = Math.max(requested, 4)
      return {
        ok: true,
        price: Math.round(rate.amount * hours * 100) / 100,
        breakdown: { ratePerUnit: rate.amount, unitCount: hours, unit: 'hours', minimumApplied: requested < 4 },
        vehicleTier: vehicle.tier,
        vehicleName: vehicle.name,
      }
    }

    case 'hourly-chauffeur':
    case 'sightseeing-chauffeur': {
      // Sightseeing uses the same per-hour rate as Hourly Chauffeur.
      const rate = rates.find((r) => r.service === 'Hourly Chauffeur')
      if (!rate || rate.amount === null) {
        return {
          ok: false,
          reason: `No Hourly Chauffeur rate is configured for vehicle '${params.vehicleSlug}'.`,
        }
      }
      const requested = params.durationHours ?? 4
      const hours = Math.max(requested, 4)
      return {
        ok: true,
        price: Math.round(rate.amount * hours * 100) / 100,
        breakdown: { ratePerUnit: rate.amount, unitCount: hours, unit: 'hours', minimumApplied: requested < 4 },
        vehicleTier: vehicle.tier,
        vehicleName: vehicle.name,
      }
    }

    case 'fixed-route':
    case 'city-to-city': {
      if (!params.routeSlug) {
        return { ok: false, reason: 'A route must be selected for fixed-route bookings.' }
      }
      const route = await FixedRouteModel.findOne(
        { slug: params.routeSlug, active: true },
      ).lean()
      if (!route) {
        return {
          ok: false,
          reason: `Route '${params.routeSlug}' not found or not currently active.`,
        }
      }
      const tierRates = route.tierRates as TierRate[]
      const tierRate = tierRates.find((tr) => tr.tier === vehicle.tier)
      if (!tierRate) {
        return {
          ok: false,
          reason: `No rate is defined for tier '${vehicle.tier}' on route '${route.label}'.`,
        }
      }
      if (!tierRate.available || tierRate.amount === null) {
        return {
          ok: false,
          reason: `The '${vehicle.tier}' tier is not priced for route '${route.label}'. Please contact us for a quote.`,
        }
      }
      return {
        ok: true,
        price: tierRate.amount,
        breakdown: { routeSlug: params.routeSlug, routeLabel: route.label as string },
        vehicleTier: vehicle.tier,
        vehicleName: vehicle.name,
      }
    }

    default:
      return { ok: false, reason: 'Unknown service type.' }
  }
}
