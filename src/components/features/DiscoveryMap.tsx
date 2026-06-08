import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { type MockChef } from '../../services/seedMockData'
import { Link } from 'react-router-dom'
import { Star, MapPin } from 'lucide-react'

// Custom Leaflet styling helper to recenter map when center changes
function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lon], 14)
  }, [lat, lon, map])
  return null
}

interface DiscoveryMapProps {
  userLat: number
  userLon: number
  chefs: MockChef[]
}

// Custom DivIcon for the customer location (pulsing dot)
const userLocationIcon = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center w-6 h-6">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-4.5 w-4.5 bg-primary border-2 border-white shadow-md"></span>
    </div>
  `,
  className: 'custom-user-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
})

// Custom DivIcon for the chefs (chef hat / orange pin)
const chefLocationIcon = L.divIcon({
  html: `
    <div class="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-white border-2 border-white shadow-lg hover:scale-110 hover:bg-secondary-hover transition-all duration-200">
      <span class="text-base leading-none">🍳</span>
    </div>
  `,
  className: 'custom-chef-icon',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18]
})

export default function DiscoveryMap({ userLat, userLon, chefs }: DiscoveryMapProps) {
  return (
    <div className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border border-border/60 shadow-inner relative z-10 bg-background-secondary/30">
      <MapContainer
        center={[userLat, userLon]}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Recenter helper */}
        <RecenterMap lat={userLat} lon={userLon} />

        {/* User Location Marker */}
        <Marker position={[userLat, userLon]} icon={userLocationIcon}>
          <Popup>
            <div className="p-1 font-sans text-xs">
              <p className="font-bold text-foreground-primary">You are here</p>
              <p className="text-[10px] text-foreground-secondary mt-0.5">Selected Neighborhood Hub</p>
            </div>
          </Popup>
        </Marker>

        {/* Chef Kitchen Markers */}
        {chefs.map((chef) => (
          <Marker
            key={chef.id}
            position={[chef.latitude, chef.longitude]}
            icon={chefLocationIcon}
          >
            <Popup>
              <div className="p-2 font-sans w-52 text-foreground-primary">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-start gap-1">
                    <p className="font-display font-bold text-xs leading-tight line-clamp-1">
                      {chef.kitchen_name}
                    </p>
                    <span className="flex items-center text-[10px] font-bold text-success shrink-0">
                      <Star className="w-3 h-3 fill-success stroke-success mr-0.5" />
                      {chef.trust_score.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-[10px] text-foreground-secondary flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span className="line-clamp-1">{chef.area}</span>
                  </p>

                  <p className="text-[10px] text-foreground-secondary leading-snug line-clamp-2 mt-0.5">
                    {chef.bio}
                  </p>

                  <div className="border-t border-border/40 mt-1.5 pt-1.5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-foreground-secondary uppercase font-semibold">Weekly plan</span>
                      <span className="text-xs font-bold text-primary">PKR 3,500</span>
                    </div>
                    <Link
                      to={`/chef/${chef.id}`}
                      className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-hover text-white text-[10px] font-bold px-2 py-1 rounded-md transition-all duration-200"
                    >
                      View Menu
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
