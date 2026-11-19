import { NextRequest, NextResponse, connection } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { BookingModel } from '@/models/Booking'

// PATCH /api/bookings/:ref/confirm — transition Pending → Confirmed
// Called by the payment module once payment succeeds.
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ ref: string }> },
) {
  await connection()

  const { ref } = await params

  if (!ref?.trim()) {
    return NextResponse.json({ error: 'Booking reference is required.' }, { status: 400 })
  }

  await connectDB()

  const booking = await BookingModel.findOne({ ref })
  if (!booking) {
    return NextResponse.json({ error: `Booking '${ref}' not found.` }, { status: 404 })
  }

  if (booking.status === 'Confirmed') {
    return NextResponse.json({ error: 'Booking is already confirmed.' }, { status: 409 })
  }

  if (booking.status === 'Cancelled') {
    return NextResponse.json({ error: 'Cancelled bookings cannot be confirmed.' }, { status: 409 })
  }

  booking.status = 'Confirmed'
  await booking.save()

  return NextResponse.json({
    ref: booking.ref,
    status: booking.status,
    price: booking.price,
    currency: booking.currency,
    vehicleName: booking.vehicleName,
    passengerName: booking.passengerName,
    updatedAt: booking.updatedAt,
  })
}
