import { config } from 'dotenv'
config({ path: '.env.local' })
import mongoose, { Schema } from 'mongoose'

// Standalone schema copies for this script — the ones in src/models are
// guarded by `import 'server-only'`, which throws outside Next's bundler.
const FleetCategorySchema = new Schema(
  { name: { type: String, required: true, unique: true }, order: { type: Number, required: true, default: 0 } },
  { timestamps: true },
)
const FleetCategoryModel = mongoose.model('FleetCategory', FleetCategorySchema)

const RateSchema = new Schema(
  {
    service: { type: String, required: true, enum: ['Airport Transfer', 'Day Booking', 'Hourly Chauffeur', 'City to City'] },
    amount: { type: Number, default: null },
    unit: { type: String, required: true, enum: ['per_km', 'per_hour', 'per_hour_min_4hr', 'tbd'] },
    notes: { type: String, default: '' },
  },
  { _id: false },
)
const FleetVehicleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
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
    showInAll: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
)
const FleetVehicleModel = mongoose.model('FleetVehicle', FleetVehicleSchema)

import { CATEGORIES, VEHICLES } from '../src/data/fleet-seed'


async function seed() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set in .env.local')

  await mongoose.connect(uri, { dbName: 'uts' })
  console.log('Connected to MongoDB')

  await FleetCategoryModel.deleteMany({})
  await FleetCategoryModel.insertMany(
    CATEGORIES.map((name, i) => ({ name, order: i })),
  )
  console.log(`Seeded ${CATEGORIES.length} categories`)

  await FleetVehicleModel.deleteMany({})
  await FleetVehicleModel.insertMany(
    VEHICLES.map((v, i) => ({ ...v, order: i, active: true })),
  )
  console.log(`Seeded ${VEHICLES.length} vehicles`)

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
