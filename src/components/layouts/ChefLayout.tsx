import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { 
  ChefHat, 
  ClipboardList, 
  Store, 
  TrendingUp, 
  LogOut, 
  Menu, 
  X, 
  Power
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { ThemeToggle } from '../ThemeToggle'

export default function ChefLayout() {
  const { profile, signOut } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Load online status from localStorage if present
  useEffect(() => {
    const savedStatus = localStorage.getItem('dastarkhwan_chef_online')
    if (savedStatus !== null) {
      setIsOnline(savedStatus === 'true')
    }
  }, [])

  const handleToggleStatus = () => {
    const nextStatus = !isOnline
    setIsOnline(nextStatus)
    localStorage.setItem('dastarkhwan_chef_online', String(nextStatus))
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/auth/login')
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navItems = [
    { label: 'Active Orders', path: '/chef/dashboard', icon: ClipboardList },
    { label: 'Kitchen Profile', path: '/onboarding/chef-wizard', icon: Store },
    { label: 'Earnings Roster', path: '/chef/earnings', icon: TrendingUp }
  ]

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  return (
    <div className="min-h-screen flex bg-background-primary text-foreground-primary transition-colors duration-300 font-sans">
      
      {/* 1. Permanent Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border/60 shrink-0 sticky top-0 h-screen transition-colors duration-300">
        
        {/* Logo and Brand */}
        <div className="h-16 border-b border-border/60 px-6 flex items-center gap-2 select-none">
          <div className="bg-primary text-white p-1.5 rounded-lg shadow-sm">
            <ChefHat className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-foreground-primary">
              Dastar<span className="text-primary">Khwan</span>
            </span>
            <span className="text-[9px] text-secondary font-bold uppercase tracking-wider leading-none mt-0.5">Chef Admin Portal</span>
          </div>
        </div>

        {/* Chef Profile & Active Kitchen Status */}
        <div className="p-4 border-b border-border/60 bg-background-secondary/30 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs select-none">
              {profile?.name ? getInitials(profile.name) : 'CH'}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-none text-foreground-primary">{profile?.name || 'Chef Partner'}</span>
              <span className="text-[9px] text-foreground-secondary mt-1">{profile?.phone}</span>
            </div>
          </div>

          {/* Kitchen Online Switcher */}
          <button 
            onClick={handleToggleStatus}
            className={`w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer ${
              isOnline 
                ? 'bg-success/5 border-success/30 text-success hover:bg-success/10' 
                : 'bg-background-secondary border-border text-foreground-secondary hover:bg-background-secondary-hover'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Power className={`w-3.5 h-3.5 ${isOnline ? 'animate-pulse' : ''}`} />
              <span>{isOnline ? 'Kitchen Online' : 'Kitchen Offline'}</span>
            </div>
            <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-success' : 'bg-foreground-secondary/40'}`} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-grow p-4 flex flex-col gap-1">
          {navItems.map(item => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-border/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-foreground-secondary font-bold">THEME</span>
            <ThemeToggle />
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-lg border border-border/60 text-xs font-semibold text-foreground-secondary hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* 2. Main Dashboard Layout Area */}
      <div className="flex-grow flex flex-col min-h-screen">
        
        {/* Mobile Top Navigation Header */}
        <header className="lg:hidden h-16 bg-card border-b border-border/60 sticky top-0 z-40 flex items-center justify-between px-4 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="text-foreground-secondary hover:text-foreground-primary p-1 rounded-lg border border-border/60 bg-background-secondary/40"
              aria-label="Open menu drawer"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>
            <div className="flex items-center gap-1.5 select-none">
              <div className="bg-primary text-white p-1 rounded-md">
                <ChefHat className="w-4 h-4" />
              </div>
              <span className="font-display text-sm font-bold tracking-tight text-foreground-primary">
                Dastar<span className="text-primary">Khwan</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Mobile Status */}
            <button 
              onClick={handleToggleStatus}
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                isOnline ? 'bg-success/10 border-success/30 text-success' : 'bg-border/60 border-border text-foreground-secondary'
              }`}
              title={isOnline ? 'Kitchen is Online' : 'Kitchen is Offline'}
            >
              <Power className="w-3.5 h-3.5" />
            </button>
            
            <ThemeToggle />
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-grow p-4 sm:p-8">
          <Outlet />
        </main>
      </div>

      {/* 3. Mobile Slide-out Drawer Panel */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative w-64 max-w-sm bg-card border-r border-border/80 flex flex-col h-full z-10 transition-transform duration-300 animate-slideRight">
            
            <div className="h-16 border-b border-border/60 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="bg-primary text-white p-1 rounded-md">
                  <ChefHat className="w-4 h-4" />
                </div>
                <span className="font-display text-xs font-bold tracking-tight text-foreground-primary">
                  Dastar<span className="text-primary">Khwan</span> Chef
                </span>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-foreground-secondary hover:text-foreground-primary p-1"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chef Info block */}
            <div className="p-4 border-b border-border/60 bg-background-secondary/20 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs select-none">
                  {profile?.name ? getInitials(profile.name) : 'CH'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-foreground-primary leading-none">{profile?.name || 'Chef Partner'}</span>
                  <span className="text-[9px] text-foreground-secondary mt-0.5">{profile?.phone}</span>
                </div>
              </div>

              {/* Status Row */}
              <button 
                onClick={handleToggleStatus}
                className={`w-full py-1.5 px-3 rounded-lg border text-[11px] font-bold flex items-center justify-between transition-all duration-200 ${
                  isOnline 
                    ? 'bg-success/5 border-success/30 text-success' 
                    : 'bg-background-secondary border-border text-foreground-secondary'
                }`}
              >
                <span>Status: {isOnline ? 'Online' : 'Offline'}</span>
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-foreground-secondary/40'}`} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex-grow p-4 flex flex-col gap-1">
              {navItems.map(item => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      active 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Drawer Logout operations */}
            <div className="p-4 border-t border-border/60">
              <button 
                onClick={() => {
                  setIsDrawerOpen(false)
                  handleLogout()
                }}
                className="w-full py-2 px-3 rounded-lg border border-border/60 text-xs font-bold text-foreground-secondary hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-all flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
