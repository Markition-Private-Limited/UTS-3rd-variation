import { randomBytes } from 'crypto'

// Generates a unique, human-readable reference number.
// Format: UTS-YYYYMMDD-XXXXX  e.g. UTS-20261119-A3F8C
export function generateRef(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const suffix = randomBytes(3).toString('hex').toUpperCase().slice(0, 5)
  return `UTS-${dateStr}-${suffix}`
}
