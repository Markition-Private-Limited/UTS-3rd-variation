import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = 'uts_admin_session'

async function importKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  )
}

async function isValidSession(token: string): Promise<boolean> {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    console.error('[proxy] SESSION_SECRET is not set — all admin sessions will be rejected')
    return false
  }
  if (!token) return false
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return false

    const key = await importKey(secret)
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      Buffer.from(sig, 'base64url'),
      new TextEncoder().encode(payload),
    )
    if (!valid) return false

    const data: { exp: number } = JSON.parse(
      Buffer.from(payload, 'base64url').toString(),
    )
    return Date.now() < data.exp
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Login page: redirect to dashboard if already authenticated
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value ?? ''
    const authenticated = await isValidSession(token)
    if (authenticated) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value ?? ''
  const authenticated = await isValidSession(token)

  if (!authenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Matches /admin and everything underneath it
  matcher: ['/admin(.*)'],
}
