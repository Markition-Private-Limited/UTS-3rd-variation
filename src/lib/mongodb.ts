import 'server-only'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined
}

export async function connectDB() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not set')

  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI, {
      dbName: 'uts',
    })
  }

  return global._mongooseConn
}
