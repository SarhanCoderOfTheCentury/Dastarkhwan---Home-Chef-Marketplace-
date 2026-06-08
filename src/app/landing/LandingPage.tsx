import { Link } from 'react-router-dom'
import { ChefHat, ArrowRight, ShieldCheck, Clock, MapPin, Heart } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { ThemeToggle } from '../../components/ThemeToggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary transition-colors duration-300 font-sans flex flex-col justify-between">
      
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
              <ChefHat className="w-5 h-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground-primary">
              Dastar<span className="text-primary">Khwan</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/auth/login">
              <Button variant="primary" size="sm" className="font-bold text-xs">
                Login / Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 py-16 flex flex-col justify-center gap-16">
        
        {/* Banner Hero */}
        <section className="text-center flex flex-col gap-6 max-w-3xl mx-auto py-8">
          <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-semibold mx-auto">
            <Heart className="w-3.5 h-3.5 animate-pulse" />
            Karachi's Homemade Food Network
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground-primary leading-tight">
            Fresh, Healthy Meals Cooked by <span className="text-primary">Neighboring Chefs</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-foreground-secondary leading-relaxed max-w-xl mx-auto">
            DastarKhwan connects busy Karachi professionals with local household kitchens. Experience authentic home-cooked meals through automated weekly subscription deliveries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <Link to="/discovery" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full font-bold shadow-md h-12 flex items-center justify-center gap-2">
                Order Homemade Food <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/auth/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full font-bold h-12 border-border/80 text-foreground-secondary hover:text-foreground-primary">
                Join as a Home Chef
              </Button>
            </Link>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-3.5 shadow-sm text-center items-center">
            <div className="p-3 bg-primary/10 text-primary rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground-primary">Verified Hygiene</h3>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Every kitchen undergoes strict household cleanliness audits, verification inspections, and periodic quality review audits.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-3.5 shadow-sm text-center items-center">
            <div className="p-3 bg-secondary/10 text-secondary rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground-primary">Flexible Subscriptions</h3>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Choose 5-day or 7-day lunch or dinner slots. Easily skip or pause days directly from your portal if schedules change.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-3.5 shadow-sm text-center items-center">
            <div className="p-3 bg-info/10 text-info rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground-primary">Hyper-local Proximity</h3>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Delivery is limited to a strict 3km radius from the chef's home, ensuring hot, piping fresh food reaches your doorstep.
            </p>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 text-center text-xs text-foreground-secondary bg-card/25 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-primary" />
            <span>© 2026 DastarKhwan. Handcrafted in Karachi, Pakistan.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground-primary transition-colors">Terms of Service</a>
            <Link to="/design-system" className="hover:text-foreground-primary transition-colors font-bold text-primary">Design System</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
