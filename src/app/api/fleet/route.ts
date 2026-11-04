import { NextResponse, connection } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { FleetCategoryModel } from '@/models/FleetCategory'
import { FleetVehicleModel } from '@/models/FleetVehicle'
import { CATEGORIES, VEHICLES } from '@/data/fleet-seed'

type FleetPayload = {
  categories: string[]
  vehicles: Record<string, unknown>[]
}

function fallbackPayload(): FleetPayload {
  return {
    categories: CATEGORIES,
    vehicles: VEHICLES.map((v) => ({
      id: v.slug,
      tier: v.tier,
      categories: v.categories,
      name: v.name,
      description: v.description,
      image: v.image,
      seats: v.seats,
      luggage: v.luggage,
      rates: v.rates,
      showInAll: 'showInAll' in v ? v.showInAll : true,
    })),
  }
}

export async function GET() {
  // Mongoose isn't a Request-time API Next.js recognizes automatically, so
  // without this the DB query runs during the build's prerender pass.
  await connection()

  try {
    await connectDB()

    const [categories, vehicles] = await Promise.all([
      FleetCategoryModel.find({}).sort({ order: 1 }).lean(),
      FleetVehicleModel.find({ active: true }).sort({ order: 1 }).lean(),
    ])

    return NextResponse.json({
      categories: categories.map((c) => c.name),
      vehicles: vehicles.map((v) => ({
        id: v.slug,
        tier: v.tier,
        categories: v.categories,
        name: v.name,
        description: v.description,
        image: v.image,
        seats: v.seats,
        luggage: v.luggage,
        rates: v.rates,
        showInAll: v.showInAll,
      })),
    })
  } catch (err) {
    console.error('[api/fleet] DB unavailable, serving seed fallback:', err)
    return NextResponse.json(fallbackPayload(), {
      headers: { 'Cache-Control': 'no-store' },
    })
  }
}
