import { Schema, model, models, type InferSchemaType } from 'mongoose'

// Per-tier rate for a fixed route. available:false means the tier is explicitly
// unpriced for this route — a booking attempt must be blocked, never quoted £0.
const TierRateSchema = new Schema(
  {
    tier: { type: String, required: true },
    // null + available:false = explicitly unpriced. Never treat null as £0.
    amount: { type: Number, default: null },
    available: { type: Boolean, required: true, default: false },
  },
  { _id: false },
)

const FixedRouteSchema = new Schema(
  {
    // machine key, e.g. 'london-manchester'
    slug: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    tierRates: { type: [TierRateSchema], required: true, default: [] },
    active: { type: Boolean, required: true, default: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

export type FixedRoute = InferSchemaType<typeof FixedRouteSchema>

export const FixedRouteModel =
  models.FixedRoute || model('FixedRoute', FixedRouteSchema)
