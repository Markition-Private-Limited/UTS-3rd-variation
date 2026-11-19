import 'server-only'
import { Schema, model, models, type InferSchemaType } from 'mongoose'

const PriceBreakdownSchema = new Schema(
  {
    ratePerUnit: { type: Number, default: null },
    unitCount:   { type: Number, default: null },
    unit:        { type: String, default: '' },
    distanceKm:  { type: Number, default: null },
    minimumApplied: { type: Boolean, default: false },
    routeSlug:   { type: String, default: '' },
    routeLabel:  { type: String, default: '' },
  },
  { _id: false },
)

const BookingSchema = new Schema(
  {
    ref: { type: String, required: true, unique: true },

    serviceType: {
      type: String,
      required: true,
      enum: [
        'airport-transfer',
        'day-booking',
        'hourly-chauffeur',
        'fixed-route',
        'city-to-city',
        'sightseeing-chauffeur',
      ],
    },

    // Vehicle snapshot captured at booking time — not a foreign key,
    // so the booking is self-contained even if the vehicle record changes.
    vehicleSlug: { type: String, required: true },
    vehicleTier: { type: String, required: true },
    vehicleName: { type: String, required: true },

    // Journey
    pickup:       { type: String, required: true },
    dropoff:      { type: String, required: true },
    date:         { type: String, required: true },   // 'YYYY-MM-DD'
    time:         { type: String, required: true },   // 'HH:MM'
    flightNumber: { type: String, default: '' },
    tripType:     { type: String, enum: ['departure', 'arrival', ''], default: '' },
    durationHours: { type: Number, default: null },   // time-based services
    routeSlug:    { type: String, default: '' },      // fixed-route/city-to-city
    distanceKm:   { type: Number, default: null },    // airport-transfer

    // Passenger
    passengerName:  { type: String, required: true },
    passengerEmail: { type: String, required: true },
    passengerPhone: { type: String, required: true },
    passengerCount: { type: Number, required: true, min: 1 },
    luggageCount:   { type: Number, required: true, min: 0 },
    notes:          { type: String, default: '' },

    // Server-calculated pricing — never accepted from the client
    price:         { type: Number, required: true },
    currency:      { type: String, required: true, default: 'GBP' },
    priceBreakdown: { type: PriceBreakdownSchema, default: {} },

    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true },
)

export type Booking = InferSchemaType<typeof BookingSchema>

export const BookingModel =
  models.Booking || model('Booking', BookingSchema)
