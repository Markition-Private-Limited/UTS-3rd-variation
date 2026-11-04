import { config } from 'dotenv'
config({ path: '.env.local' })
import mongoose, { Schema } from 'mongoose'

const FleetCategorySchema = new Schema(
  { name: { type: String, required: true, unique: true }, order: { type: Number, required: true, default: 0 } },
  { timestamps: true },
)
const FleetCategoryModel = mongoose.model('FleetCategory', FleetCategorySchema)

const PricingItemSchema = new Schema(
  { label: { type: String, required: true }, value: { type: String, required: true } },
  { _id: false },
)
const FleetVehicleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    categories: { type: [String], required: true, default: [] },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    seats: { type: Number, required: true },
    luggage: { type: Number, required: true },
    pricing: { type: [PricingItemSchema], required: true, default: [] },
    order: { type: Number, required: true, default: 0 },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
)
const FleetVehicleModel = mongoose.model('FleetVehicle', FleetVehicleSchema)

async function run() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set in .env.local')

  await mongoose.connect(uri, { dbName: 'uts' })
  console.log('Connected to MongoDB')

  const existingCount = await FleetCategoryModel.countDocuments({})
  await FleetCategoryModel.updateOne(
    { name: 'Economy Saloon' },
    { $setOnInsert: { name: 'Economy Saloon', order: existingCount } },
    { upsert: true },
  )
  console.log('Ensured "Economy Saloon" category exists')

  const maxOrderVehicle = await FleetVehicleModel.findOne({}).sort({ order: -1 }).lean()
  const nextOrder = maxOrderVehicle ? (maxOrderVehicle.order ?? 0) + 1 : 0

  await FleetVehicleModel.updateOne(
    { slug: 'economy-saloon' },
    {
      $setOnInsert: {
        slug: 'economy-saloon',
        categories: ['Economy Saloon'],
        name: 'VW Passat / Kia Niro or similar',
        description: 'A comfortable and reliable saloon ideal for everyday executive transfers and airport runs.',
        image: '/images/fleet/economy-saloon-vw-passat.webp',
        seats: 4,
        luggage: 3,
        pricing: [
          { label: 'Heathrow', value: 'From £65' },
          { label: 'Hourly hire (min 4 hr)', value: 'From £35' },
          { label: 'Waiting Charges', value: 'From £25 per hr' },
        ],
        order: nextOrder,
        active: true,
      },
    },
    { upsert: true },
  )
  console.log('Ensured "economy-saloon" vehicle exists')

  await mongoose.disconnect()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
