'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'

export type LoginState = { error?: string } | undefined

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = (formData.get('username') as string | null) ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  const expectedUsername = process.env.ADMIN_USERNAME ?? ''
  const expectedPassword = process.env.ADMIN_PASSWORD ?? ''

  // Constant-time comparison via HMAC to avoid timing attacks
  async function safeEqual(a: string, b: string) {
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode('compare'),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
    )
    const [sigA, sigB] = await Promise.all([
      crypto.subtle.sign('HMAC', key, new TextEncoder().encode(a)),
      crypto.subtle.sign('HMAC', key, new TextEncoder().encode(b)),
    ])
    if (sigA.byteLength !== sigB.byteLength) return false
    const va = new Uint8Array(sigA), vb = new Uint8Array(sigB)
    let diff = 0
    for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i]
    return diff === 0
  }

  const [usernameMatch, passwordMatch] = await Promise.all([
    safeEqual(username, expectedUsername),
    safeEqual(password, expectedPassword),
  ])

  if (!usernameMatch || !passwordMatch) {
    return { error: 'Invalid credentials.' }
  }

  await createSession()
  redirect('/admin')
}

export async function logoutAction() {
  await deleteSession()
  redirect('/admin/login')
}
