import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sun, 
  Moon, 
  Sparkles, 
  ChefHat, 
  Clock, 
  Heart, 
  ArrowRight,
  Info,
  CheckCircle2,
  MapPin,
  UtensilsCrossed
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'

export default function DesignSystemShowcase() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleValidateInput = () => {
    if (!inputValue.trim()) {
      setInputError(true)
    } else {
      setInputError(false)
      alert(`Entered value: ${inputValue}`)
    }
  }

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary transition-colors duration-300 font-sans pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/60 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground-primary">
                Dastar<span className="text-primary">Khwan</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] bg-secondary-hover/10 text-secondary px-2 py-0.5 rounded-full font-semibold">
                DESIGN SYSTEM v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="outline" size="sm" className="font-bold text-xs">
                Go to Login Page
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground-secondary hover:text-foreground-primary transition-all duration-200 border-border/80"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => setIsModalOpen(true)}
              className="font-semibold"
            >
              Launch Demo Modal
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* Hero Section */}
        <section className="mb-12 text-center max-w-2xl mx-auto py-8">
          <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Karachi Home Chef Marketplace
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground-primary mb-4 leading-tight">
            Crafting the <span className="text-primary">Culinary Heritage</span> Design
          </h1>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed max-w-xl mx-auto">
            A premium, high-performance UI kit built with warm appetizing tones, custom CSS variables, and touch-optimized primitives. Responsive for Karachi's busy kitchens.
          </p>
        </section>

        {/* Section: Tokens */}
        <section className="mb-12">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground-primary mb-6 border-b border-border/40 pb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-2 h-6 rounded-full inline-block" />
            1. Design Tokens & Color Swatches
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            
            {/* Spice Red */}
            <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2 shadow-sm">
              <div className="h-16 rounded-md bg-primary" />
              <div>
                <p className="text-xs font-bold text-foreground-primary">Terracotta Spice</p>
                <p className="text-[10px] text-foreground-secondary">#e05a36</p>
                <p className="text-[9px] bg-primary-light text-primary px-1.5 py-0.5 rounded font-mono mt-1 inline-block">--color-primary</p>
              </div>
            </div>

            {/* Sage Green */}
            <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2 shadow-sm">
              <div className="h-16 rounded-md bg-secondary" />
              <div>
                <p className="text-xs font-bold text-foreground-primary">Sage Green</p>
                <p className="text-[10px] text-foreground-secondary">#4a7c59</p>
                <p className="text-[9px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded font-mono mt-1 inline-block">--color-secondary</p>
              </div>
            </div>

            {/* Success Green */}
            <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2 shadow-sm">
              <div className="h-16 rounded-md bg-success" />
              <div>
                <p className="text-xs font-bold text-foreground-primary">Success</p>
                <p className="text-[10px] text-foreground-secondary">#2e7d32</p>
                <p className="text-[9px] bg-success/10 text-success px-1.5 py-0.5 rounded font-mono mt-1 inline-block">--color-success</p>
              </div>
            </div>

            {/* Info Blue */}
            <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2 shadow-sm">
              <div className="h-16 rounded-md bg-info" />
              <div>
                <p className="text-xs font-bold text-foreground-primary">Info</p>
                <p className="text-[10px] text-foreground-secondary">#0288d1</p>
                <p className="text-[9px] bg-info/10 text-info px-1.5 py-0.5 rounded font-mono mt-1 inline-block">--color-info</p>
              </div>
            </div>

            {/* Warning Amber */}
            <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2 shadow-sm">
              <div className="h-16 rounded-md bg-warning" />
              <div>
                <p className="text-xs font-bold text-foreground-primary">Warning</p>
                <p className="text-[10px] text-foreground-secondary">#ed6c02</p>
                <p className="text-[9px] bg-warning/10 text-warning px-1.5 py-0.5 rounded font-mono mt-1 inline-block">--color-warning</p>
              </div>
            </div>

            {/* Danger Red */}
            <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2 shadow-sm">
              <div className="h-16 rounded-md bg-danger" />
              <div>
                <p className="text-xs font-bold text-foreground-primary">Danger</p>
                <p className="text-[10px] text-foreground-secondary">#d32f2f</p>
                <p className="text-[9px] bg-danger/10 text-danger px-1.5 py-0.5 rounded font-mono mt-1 inline-block">--color-danger</p>
              </div>
            </div>

          </div>
        </section>

        {/* Grid Section for Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Column: Buttons & Badges */}
          <section className="bg-card border border-border p-6 rounded-lg shadow-sm">
            <h2 className="font-display text-lg sm:text-xl font-bold text-foreground-primary mb-6 flex items-center gap-2">
              <span className="bg-primary/15 text-primary p-1 rounded-md"><Sparkles className="w-4 h-4" /></span>
              2. Button & Badge Primitives
            </h2>
            
            {/* Buttons Showcase */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-foreground-secondary uppercase tracking-wider mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-foreground-secondary uppercase tracking-wider mb-4">Button Sizes (Min 44px touch target)</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large Viewport</Button>
                <Button variant="outline" size="icon" aria-label="Heart icon button" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`w-5 h-5 transition-colors duration-200 ${isFavorite ? "fill-danger text-danger" : "text-foreground-secondary"}`} />
                </Button>
              </div>
            </div>

            {/* Badges Showcase */}
            <div>
              <h3 className="text-xs font-bold text-foreground-secondary uppercase tracking-wider mb-4">Badge Variants</h3>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="primary">Karachi Desi</Badge>
                <Badge variant="secondary">Gulshan Area</Badge>
                <Badge variant="success">★ 4.9 High Rating</Badge>
                <Badge variant="warning">★ 4.2 Mid Rating</Badge>
                <Badge variant="info">OTP Verified</Badge>
                <Badge variant="danger">High Spicy</Badge>
                <Badge variant="outline">Weekly Menu</Badge>
                <Badge variant="pro">PRO Chef Sana</Badge>
              </div>
            </div>
          </section>

          {/* Column: Inputs & Forms */}
          <section className="bg-card border border-border p-6 rounded-lg shadow-sm">
            <h2 className="font-display text-lg sm:text-xl font-bold text-foreground-primary mb-6 flex items-center gap-2">
              <span className="bg-secondary/15 text-secondary p-1 rounded-md"><Info className="w-4 h-4" /></span>
              3. Input & Validation Primitives
            </h2>

            <div className="flex flex-col gap-6">
              
              {/* Default Input */}
              <Input 
                label="Kitchen Address (Karachi Neighborhood)"
                placeholder="e.g., Block 4, Clifton, Karachi"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  if (e.target.value.trim()) setInputError(false)
                }}
                error={inputError}
                errorMessage="This address is required to calculate hyper-local chef distance."
              />

              {/* Readonly/Disabled Input */}
              <Input 
                label="Registered Mobile Number (OTP Verified)"
                value="+92 300 1234567"
                disabled
              />

              {/* Status & Validation Button */}
              <div className="flex items-center gap-4 mt-2">
                <Button variant="secondary" onClick={handleValidateInput} className="w-full sm:w-auto">
                  Validate Address Input
                </Button>
                {inputValue && (
                  <span className="text-xs text-success flex items-center gap-1 font-medium animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4" /> Input Validated!
                  </span>
                )}
              </div>

            </div>
          </section>

        </div>

        {/* Section: Chef Cards Grid */}
        <section className="mb-12">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground-primary mb-6 border-b border-border/40 pb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-2 h-6 rounded-full inline-block" />
            4. Component Assemblage: Hyper-local Chef Cards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Chef Card 1 */}
            <Card hoverable className="flex flex-col h-full overflow-hidden bg-card">
              <div className="h-48 bg-background-secondary relative overflow-hidden flex items-center justify-center text-foreground-secondary/40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-16 h-16 text-primary/20" />
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  <Badge variant="pro">PRO Chef</Badge>
                  <Badge variant="success">★ 4.8</Badge>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" /> DHA Phase 6, Karachi
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Sana's Gourmet Kitchen</CardTitle>
                </div>
                <CardDescription>
                  Traditional Karachi biryani, rich kormas, and fresh homemade chapatis cooked with cold-pressed canola oil.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline">Biryani</Badge>
                  <Badge variant="outline">Desi Curry</Badge>
                  <Badge variant="outline">Diabetic Friendly</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border/40 mt-auto pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground-secondary uppercase tracking-wider font-semibold">WEEKLY PLAN STARTING</span>
                  <span className="text-sm font-bold text-primary">PKR 3,500 <span className="text-xs font-normal text-foreground-secondary">/wk</span></span>
                </div>
                <Button size="sm" onClick={() => setIsModalOpen(true)}>
                  View Menu <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Chef Card 2 */}
            <Card hoverable className="flex flex-col h-full overflow-hidden bg-card">
              <div className="h-48 bg-background-secondary relative overflow-hidden flex items-center justify-center text-foreground-secondary/40">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/15 to-primary/5 flex items-center justify-center">
                  <ChefHat className="w-16 h-16 text-secondary/20" />
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  <Badge variant="success">★ 4.9</Badge>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-secondary" /> Clifton Block 4, Karachi
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Amma's Handcrafted Spices</CardTitle>
                </div>
                <CardDescription>
                  Authentic Memoni dishes, Dhoklas, Khatri Paya, and homemade pickles. 100% spice quality guarantee.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline">Memon Style</Badge>
                  <Badge variant="outline">Khatri Specialties</Badge>
                  <Badge variant="outline">Clean Ingredients</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border/40 mt-auto pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground-secondary uppercase tracking-wider font-semibold">WEEKLY PLAN STARTING</span>
                  <span className="text-sm font-bold text-primary">PKR 4,200 <span className="text-xs font-normal text-foreground-secondary">/wk</span></span>
                </div>
                <Button size="sm" onClick={() => setIsModalOpen(true)}>
                  View Menu <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Chef Card 3 */}
            <Card hoverable className="flex flex-col h-full overflow-hidden bg-card">
              <div className="h-48 bg-background-secondary relative overflow-hidden flex items-center justify-center text-foreground-secondary/40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/15 flex items-center justify-center">
                  <UtensilsCrossed className="w-16 h-16 text-secondary/20" />
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  <Badge variant="success">★ 4.6</Badge>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" /> Gulshan-e-Iqbal Block 13, Karachi
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>The Healthy Plate (Nutritionist Chef)</CardTitle>
                </div>
                <CardDescription>
                  Low-carb, high-protein daily subscriptions designed by certified nutritionists. Perfect for working professionals.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline">Keto Friendly</Badge>
                  <Badge variant="outline">High Protein</Badge>
                  <Badge variant="outline">Salads & Bowls</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border/40 mt-auto pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground-secondary uppercase tracking-wider font-semibold">WEEKLY PLAN STARTING</span>
                  <span className="text-sm font-bold text-primary">PKR 5,000 <span className="text-xs font-normal text-foreground-secondary">/wk</span></span>
                </div>
                <Button size="sm" onClick={() => setIsModalOpen(true)}>
                  View Menu <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </CardFooter>
            </Card>

          </div>
        </section>

        {/* Stepper Status Preview */}
        <section className="mb-12 bg-card border border-border p-6 rounded-lg shadow-sm">
          <h2 className="font-display text-lg sm:text-xl font-bold text-foreground-primary mb-6 flex items-center gap-2">
            <span className="bg-primary/15 text-primary p-1 rounded-md"><Clock className="w-4 h-4" /></span>
            5. Delivery Tracker Stepper Preview (Supabase Realtime Ready)
          </h2>
          <p className="text-xs text-foreground-secondary mb-6 leading-relaxed">
            Horizontal step nodes showing delivery milestones. Swapping statuses advances active node highlights and scales colors.
          </p>

          <div className="w-full relative py-4 px-2">
            <div className="absolute top-[40px] left-[10%] right-[10%] h-[3px] bg-border/80 -translate-y-1/2 z-0" />
            <div className="absolute top-[40px] left-[10%] w-[53%] h-[3px] bg-secondary -translate-y-1/2 z-0 transition-all duration-500" />
            
            <div className="grid grid-cols-4 relative z-10">
              
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-md font-bold text-xs ring-4 ring-background-primary transition-all duration-300">
                  ✓
                </div>
                <span className="text-xs font-bold text-foreground-primary mt-2">Preparing</span>
                <span className="text-[10px] text-foreground-secondary mt-0.5">Order Accepted</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-md font-bold text-xs ring-4 ring-background-primary transition-all duration-300">
                  ✓
                </div>
                <span className="text-xs font-bold text-foreground-primary mt-2">Packed & Ready</span>
                <span className="text-[10px] text-foreground-secondary mt-0.5">Kitchen Dispatch</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md font-bold text-xs ring-4 ring-primary-light animate-pulse transition-all duration-300 scale-110">
                  3
                </div>
                <span className="text-xs font-bold text-primary mt-2">Out for Delivery</span>
                <span className="text-[10px] text-primary font-medium mt-0.5">Rider: Shahzad (0332...)</span>
              </div>

              <div className="flex flex-col items-center text-center opacity-50">
                <div className="w-10 h-10 rounded-full bg-border text-foreground-secondary flex items-center justify-center font-bold text-xs ring-4 ring-background-primary transition-all duration-300">
                  4
                </div>
                <span className="text-xs font-medium text-foreground-secondary mt-2">Delivered</span>
                <span className="text-[10px] text-foreground-secondary mt-0.5">Handoff Complete</span>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Demo Modal Component Wrapper */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="DastarKhwan Weekly Meal Subscription Checkout"
        size="md"
      >
        <div className="flex flex-col gap-4 font-sans text-foreground-primary">
          <div className="bg-primary-light border border-primary/20 p-4 rounded-lg flex gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-primary">Karachi Delivery Window</p>
              <p className="text-[11px] text-primary/80 mt-0.5">
                Subscriptions run from Monday to Friday. Pausing or skipping days requires a 24-hour advance notice before midnight cutoff.
              </p>
            </div>
          </div>

          <div className="py-2">
            <h4 className="text-xs font-bold text-foreground-secondary uppercase tracking-wider mb-2">Order Summary</h4>
            <div className="border border-border rounded-lg p-4 flex flex-col gap-2 bg-background-secondary/30">
              <div className="flex justify-between text-xs">
                <span>5-Day Lunch Subscription (Sana's Kitchen)</span>
                <span className="font-bold">PKR 3,500</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Delivery (DHA neighborhood rate)</span>
                <span className="font-bold">PKR 500</span>
              </div>
              <div className="border-t border-border/60 my-2 pt-2 flex justify-between text-sm font-bold">
                <span>Total Weekly Billing</span>
                <span className="text-primary">PKR 4,000</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Input 
              label="Delivery Instructions for Rider" 
              placeholder="e.g. Leave with guard at Gate 2, block A" 
            />
            <div className="flex items-center gap-2 mt-1">
              <input type="checkbox" id="easypaisa" defaultChecked className="rounded border-border text-primary focus:ring-primary w-4 h-4" />
              <label htmlFor="easypaisa" className="text-xs text-foreground-secondary font-medium">
                Pay using Easypaisa / JazzCash Mobile Wallet
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              setIsModalOpen(false)
              alert("Mock payment processed! Subscription created.")
            }}>
              Confirm PKR 4,000 Payment
            </Button>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 mt-16 border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-secondary">
        <div className="flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-primary" />
          <span>© 2026 DastarKhwan Inc. Karachi, Pakistan.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground-primary transition-colors">Chef Onboarding Portal</a>
        </div>
      </footer>
    </div>
  )
}
