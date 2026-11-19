import { NextRequest, NextResponse, connection } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { BookingModel } from '@/models/Booking'
import { validateLocationRules, type ServiceType } from '@/lib/booking-validation'
import { calculateBookingPrice } from '@/lib/booking-price'
import { generateRef } from '@/lib/booking-ref'

// ─── Input shape ────────────────────────────────────────────────────────────

type CreateBookingBody = {
  serviceType: ServiceType
  vehicleSlug: string
  pickup: string
  dropoff: string
  date: string
  time: string
  flightNumber?: string
  tripType?: 'departure' | 'arrival'
  durationHours?: number
  routeSlug?: string
  passengerName: string
  passengerEmail: string
  passengerPhone: string
  passengerCount: number
  luggageCount: number
  notes?: string
}

const VALID_SERVICE_TYPES: ServiceType[] = [
  'airport-transfer',
  'day-booking',
  'hourly-chauffeur',
  'fixed-route',
  'city-to-city',
  'sightseeing-chauffeur',
]

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

// ─── POST /api/bookings ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  await connection()

  let body: CreateBookingBody
  try {
    body = (await req.json()) as CreateBookingBody
  } catch {
    return bad('Invalid JSON body.')
  }

  // Basic required-field validation
  const {
    serviceType, vehicleSlug, pickup, dropoff, date, time,
    passengerName, passengerEmail, passengerPhone, passengerCount, luggageCount,
  } = body

  if (!VALID_SERVICE_TYPES.includes(serviceType)) return bad(`Unknown serviceType '${serviceType}'.`)
  if (!vehicleSlug?.trim()) return bad('vehicleSlug is required.')
  if (!pickup?.trim()) return bad('pickup is required.')
  if (!dropoff?.trim()) return bad('dropoff is required.')
  if (!date?.trim()) return bad('date is required.')
  if (!time?.trim()) return bad('time is required.')
  if (!passengerName?.trim()) return bad('passengerName is required.')
  if (!passengerEmail?.trim()) return bad('passengerEmail is required.')
  if (!passengerPhone?.trim()) return bad('passengerPhone is required.')
  if (typeof passengerCount !== 'number' || passengerCount < 1) return bad('passengerCount must be ≥ 1.')
  if (typeof luggageCount !== 'number' || luggageCount < 0) return bad('luggageCount must be ≥ 0.')

  // Service-specific required fields
  if (
    (serviceType === 'day-booking' || serviceType === 'hourly-chauffeur' || serviceType === 'sightseeing-chauffeur') &&
    (typeof body.durationHours !== 'number' || body.durationHours < 1)
  ) {
    return bad('durationHours is required for time-based services.')
  }

  if ((serviceType === 'fixed-route' || serviceType === 'city-to-city') && !body.routeSlug?.trim()) {
    return bad('routeSlug is required for fixed-route bookings.')
  }

  // Location validation (hard reject — no warn-and-allow)
  const locationCheck = validateLocationRules(serviceType, pickup, dropoff)
  if (!locationCheck.ok) return bad(locationCheck.reason, 422)

  // Server-side price calculation — the only source of truth for price
  const priceResult = await calculateBookingPrice({
    serviceType,
    vehicleSlug,
    pickup,
    dropoff,
    durationHours: body.durationHours,
    routeSlug: body.routeSlug,
  })

  if (!priceResult.ok) return bad(priceResult.reason, 422)

  // Persist the booking
  await connectDB()

  const ref = generateRef()

  const booking = await BookingModel.create({
    ref,
    serviceType,
    vehicleSlug,
    vehicleTier: priceResult.vehicleTier,
    vehicleName: priceResult.vehicleName,
    pickup,
    dropoff,
    date,
    time,
    flightNumber: body.flightNumber ?? '',
    tripType: body.tripType ?? '',
    durationHours: body.durationHours ?? null,
    routeSlug: body.routeSlug ?? '',
    distanceKm: priceResult.distanceKm ?? null,
    passengerName,
    passengerEmail,
    passengerPhone,
    passengerCount,
    luggageCount,
    notes: body.notes ?? '',
    price: priceResult.price,
    currency: 'GBP',
    priceBreakdown: priceResult.breakdown,
    status: 'Pending',
  })

  return NextResponse.json(
    {
      ref: booking.ref,
      status: booking.status,
      price: booking.price,
      currency: booking.currency,
      priceBreakdown: booking.priceBreakdown,
      vehicleName: booking.vehicleName,
      vehicleTier: booking.vehicleTier,
      serviceType: booking.serviceType,
      pickup: booking.pickup,
      dropoff: booking.dropoff,
      date: booking.date,
      time: booking.time,
      passengerName: booking.passengerName,
      createdAt: booking.createdAt,
    },
    { status: 201 },
  )
}
