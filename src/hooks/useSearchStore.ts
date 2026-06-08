import { create } from 'zustand'

export interface HubLocation {
  name: string
  latitude: number
  longitude: number
}

export const KARACHI_HUBS: Record<string, HubLocation> = {
  'DHA Phase 6': {
    name: 'DHA Phase 6',
    latitude: 24.7938,
    longitude: 67.0675
  },
  'Clifton Block 4': {
    name: 'Clifton Block 4',
    latitude: 24.8138,
    longitude: 67.0281
  },
  'Gulshan-e-Iqbal': {
    name: 'Gulshan-e-Iqbal',
    latitude: 24.9180,
    longitude: 67.0970
  }
}

interface SearchState {
  selectedHub: string
  latitude: number
  longitude: number
  setHub: (hubName: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  selectedHub: 'DHA Phase 6',
  latitude: KARACHI_HUBS['DHA Phase 6'].latitude,
  longitude: KARACHI_HUBS['DHA Phase 6'].longitude,
  setHub: (hubName) => {
    const hub = KARACHI_HUBS[hubName]
    if (hub) {
      set({
        selectedHub: hub.name,
        latitude: hub.latitude,
        longitude: hub.longitude
      })
    }
  }
}))

/**
 * Calculates Haversine distance between two sets of GPS coordinates in kilometers.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
