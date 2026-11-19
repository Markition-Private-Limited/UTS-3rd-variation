'use client'

import { useEffect, useState } from 'react'
import type { Vehicle } from '@/types/booking'
import { buildBookingVehicle, type ApiVehicle } from '@/lib/fleet-enhancements'

export type FleetState = {
  vehicles: Vehicle[]
  loading: boolean
  error: string | null
}

export function useFleet(): FleetState {
  const [state, setState] = useState<FleetState>({ vehicles: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    fetch('/api/fleet', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<{ vehicles: ApiVehicle[] }>
      })
      .then(({ vehicles }) => {
        if (cancelled) return
        setState({ vehicles: vehicles.map(buildBookingVehicle), loading: false, error: null })
      })
      .catch((err: Error) => {
        if (cancelled || err.name === 'AbortError') return
        setState({ vehicles: [], loading: false, error: 'Could not load fleet data.' })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  return state
}
