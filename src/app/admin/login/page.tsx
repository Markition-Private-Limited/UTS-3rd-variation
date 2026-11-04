'use client'

import { useActionState } from 'react'
import { loginAction, type LoginState } from './actions'

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined,
  )

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-2">
            United Travel Services
          </p>
          <h1 className="text-xl font-light text-white tracking-wide">
            Admin Access
          </h1>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs tracking-widest uppercase text-neutral-500 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm outline-none focus:border-neutral-600 transition-colors placeholder:text-neutral-700"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs tracking-widest uppercase text-neutral-500 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm outline-none focus:border-neutral-600 transition-colors placeholder:text-neutral-700"
              placeholder="Enter password"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-400 text-center">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-white text-neutral-950 text-xs tracking-[0.2em] uppercase font-medium py-3 px-6 rounded-sm hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
