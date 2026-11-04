import 'server-only'
import { Schema, model, models, type InferSchemaType } from 'mongoose'

// One row per Service (Airport Transfer / Day Booking / Hourly Chauffeur / City to City)
// for this vehicle's tier, matching the UTS Fleet & Rate Card.
const RateSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
      enum: ['Airport Transfer', 'Day Booking', 'Hourly Chauffeur', 'City to City'],
    },
    // Null amount = not yet priced (e.g. City to City is TBD on the source rate card).
    amount: { type: Number, default: null },
    unit: {
      type: String,
      required: true,
      enum: ['per_km', 'per_hour', 'per_hour_min_4hr', 'tbd'],
    },
    notes: { type: String, default: '' },
  },
  { _id: false },
)

const FleetVehicleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    // Rate-card tier this vehicle belongs to: Economy, Business, Business Van,
    // First, MPV, 1st Class Van, Standard Van.
    tier: { type: String, required: true },
    categories: { type: [String], required: true, default: [] },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    seats: { type: Number, required: true },
    luggage: { type: Number, required: true },
    rates: { type: [RateSchema], required: true, default: [] },
    order: { type: Number, required: true, default: 0 },
    active: { type: Boolean, required: true, default: true },
    // false = hidden from the "All" tab, still shown under its own category tab
    showInAll: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
)

export type FleetVehicle = InferSchemaType<typeof FleetVehicleSchema>

export const FleetVehicleModel =
  models.FleetVehicle || model('FleetVehicle', FleetVehicleSchema)
