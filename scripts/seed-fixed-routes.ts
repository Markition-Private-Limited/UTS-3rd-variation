import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import mongoose, { Schema } from 'mongoose'
import { FIXED_ROUTES } from '../src/data/fixed-route-seed'

// Inline schema copy — src/models/FixedRoute.ts uses `import 'server-only'`
// which throws outside Next's bundler; we re-declare here for the seed script.
const TierRateSchema = new Schema(
  {
    tier: { type: String, required: true },
    amount: { type: Number, default: null },
    available: { type: Boolean, required: true, default: false },
  },
  { _id: false },
)
const FixedRouteSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    tierRates: { type: [TierRateSchema], required: true, default: [] },
    active: { type: Boolean, required: true, default: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)
const FixedRouteModel = mongoose.model('FixedRoute', FixedRouteSchema)

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set in .env.local')

  await mongoose.connect(uri, { dbName: 'uts' })
  console.log('Connected to MongoDB')

  await FixedRouteModel.deleteMany({})
  console.log('Cleared existing fixed routes')

  const inserted = await FixedRouteModel.insertMany(
    FIXED_ROUTES.map((r) => ({ ...r, active: true })),
  )
  console.log(`Inserted ${inserted.length} fixed routes`)

  for (const doc of inserted) {
    const priced = doc.tierRates.filter((t: { available: boolean }) => t.available).length
    const unavailable = doc.tierRates.filter((t: { available: boolean }) => !t.available).length
    console.log(`  [${doc.slug}] ${doc.label} — ${priced} priced, ${unavailable} unavailable`)
  }

  await mongoose.disconnect()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
