import { NextRequest, NextResponse, connection } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { BookingModel } from '@/models/Booking'

// GET /api/bookings/:ref — look up a booking by its reference number
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ref: string }> },
) {
  await connection()

  const { ref } = await params

  if (!ref?.trim()) {
    return NextResponse.json({ error: 'Booking reference is required.' }, { status: 400 })
  }

  await connectDB()

  const booking = await BookingModel.findOne({ ref }).lean()
  if (!booking) {
    return NextResponse.json({ error: `Booking '${ref}' not found.` }, { status: 404 })
  }

  return NextResponse.json(booking)
}
