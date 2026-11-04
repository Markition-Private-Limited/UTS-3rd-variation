import { logoutAction } from './login/actions'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">United Travel Services</p>
          <h1 className="text-sm font-light text-white mt-0.5">Admin Dashboard</h1>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </form>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <p className="text-neutral-600 text-sm">Dashboard content coming soon.</p>
      </main>
    </div>
  )
}
