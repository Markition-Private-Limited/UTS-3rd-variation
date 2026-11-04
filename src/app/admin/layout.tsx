import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — United Travel Services',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 text-white font-sans min-h-screen">
      {children}
    </div>
  )
}
