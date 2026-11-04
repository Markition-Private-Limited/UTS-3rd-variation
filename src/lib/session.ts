import 'server-only'
import { cookies, headers } from 'next/headers'

const SESSION_COOKIE = 'uts_admin_session'
const SESSION_TTL_MS = 8 * 60 * 60 * 1000 // 8 hours

async function shouldUseSecureCookie(): Promise<boolean> {
  if (process.env.NODE_ENV !== 'production') return false
  // In production, don't set Secure on localhost (e.g. `next start` smoke-tests)
  const host = (await headers()).get('host') ?? ''
  const isLocalhost = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)
  return !isLocalhost
}

async function importKey() {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not set')
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

function toBase64url(buf: ArrayBuffer) {
  return Buffer.from(buf).toString('base64url')
}

function fromBase64url(str: string) {
  return Buffer.from(str, 'base64url')
}

export async function createSession() {
  const exp = Date.now() + SESSION_TTL_MS
  const payload = toBase64url(new TextEncoder().encode(JSON.stringify({ exp })))
  const key = await importKey()
  const sig = toBase64url(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)))
  const token = `${payload}.${sig}`

  const secure = await shouldUseSecureCookie()
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
    expires: new Date(exp),
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<{ exp: number } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  return verifyToken(token ?? '')
}

export async function verifyToken(token: string): Promise<{ exp: number } | null> {
  if (!token) return null
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return null

    const key = await importKey()
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64url(sig),
      new TextEncoder().encode(payload),
    )
    if (!valid) return null

    const data: { exp: number } = JSON.parse(fromBase64url(payload).toString())
    if (Date.now() >= data.exp) return null

    return data
  } catch {
    return null
  }
}
