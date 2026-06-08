import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { 
  ChefHat, 
  MapPin, 
  ChevronDown, 
  Compass, 
  Calendar, 
  BrainCircuit, 
  LogOut, 
  User,
  Check
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useSearchStore, KARACHI_HUBS } from '../../hooks/useSearchStore'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

export default function CustomerLayout() {
  const { profile, signOut } = useAuthStore()
  const { selectedHub, setHub } = useSearchStore()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/auth/login')
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-primary text-foreground-primary transition-colors duration-300 font-sans pb-16 sm:pb-0">
      
      {/* Global Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/60 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo & Desktop Nav Links */}
          <div className="flex items-center gap-6">
            <Link to="/discovery" className="flex items-center gap-2 select-none">
              <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-foreground-primary">
                Dastar<span className="text-primary">Khwan</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden sm:flex items-center gap-1">
              <Link 
                to="/discovery" 
                className={`text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                  isActive('/discovery') 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary/50'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Discover</span>
              </Link>
              <Link 
                to="/subscriptions" 
                className={`text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                  isActive('/subscriptions') 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary/50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Subscriptions</span>
              </Link>
              <Link 
                to="/planner" 
                className={`text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                  isActive('/planner') 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary/50'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>AI Planner</span>
              </Link>
            </nav>
          </div>

          {/* Location Picker & Profile Options */}
          <div className="flex items-center gap-3">
            
            {/* Hub Delivery Picker */}
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 bg-background-secondary/60 hover:bg-background-secondary border border-border/60 hover:border-foreground-secondary/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-foreground-primary cursor-pointer max-w-[130px] sm:max-w-none"
            >
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{selectedHub}</span>
              <ChevronDown className="w-3 h-3 text-foreground-secondary shrink-0" />
            </button>

            {/* Theme Switcher */}
            <ThemeToggle />

            {/* User Profile Dropdown / Actions */}
            <div className="flex items-center gap-2 pl-1 border-l border-border/60">
              <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shadow-sm ring-1 ring-border select-none">
                {profile?.name ? getInitials(profile.name) : <User className="w-4 h-4" />}
              </div>
              <div className="hidden md:flex flex-col text-left mr-1">
                <span className="text-[11px] font-bold leading-none text-foreground-primary">{profile?.name || 'Guest'}</span>
                <span className="text-[9px] text-foreground-secondary mt-0.5">{profile?.phone}</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-foreground-secondary hover:text-danger hover:bg-danger/5 transition-all duration-200"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Outlet Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (Viewport < 640px) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border/80 px-6 py-2.5 flex items-center justify-around shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.06)] transition-colors duration-300">
        <Link 
          to="/discovery" 
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive('/discovery') ? 'text-primary scale-105' : 'text-foreground-secondary hover:text-foreground-primary'
          }`}
        >
          <Compass className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Discover</span>
        </Link>
        <Link 
          to="/subscriptions" 
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive('/subscriptions') ? 'text-primary scale-105' : 'text-foreground-secondary hover:text-foreground-primary'
          }`}
        >
          <Calendar className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">Subscriptions</span>
        </Link>
        <Link 
          to="/planner" 
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive('/planner') ? 'text-primary scale-105' : 'text-foreground-secondary hover:text-foreground-primary'
          }`}
        >
          <BrainCircuit className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold">AI Planner</span>
        </Link>
      </nav>

      {/* Location Hub Selection Modal */}
      <Modal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        title="Select Karachi Delivery Hub"
        size="sm"
      >
        <div className="flex flex-col gap-4 font-sans text-foreground-primary">
          <p className="text-xs text-foreground-secondary leading-relaxed">
            DastarKhwan chefs serve active 3km hyper-local boundaries. Choose your location to list kitchen options in your proximity.
          </p>

          <div className="flex flex-col gap-2.5 py-1">
            {Object.values(KARACHI_HUBS).map(hub => {
              const selected = selectedHub === hub.name
              return (
                <button
                  key={hub.name}
                  onClick={() => {
                    setHub(hub.name)
                    setIsLocationModalOpen(false)
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    selected
                      ? 'border-primary bg-primary/5 shadow-sm font-bold text-primary'
                      : 'border-border bg-card text-foreground-secondary hover:border-foreground-secondary/40 hover:bg-background-secondary/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className={`w-4 h-4 ${selected ? 'text-primary' : 'text-foreground-secondary'}`} />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-foreground-primary">{hub.name}</span>
                      <span className="text-[9px] text-foreground-secondary font-mono mt-0.5">
                        Coords: {hub.latitude.toFixed(4)}, {hub.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  {selected && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              )
            })}
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsLocationModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}
