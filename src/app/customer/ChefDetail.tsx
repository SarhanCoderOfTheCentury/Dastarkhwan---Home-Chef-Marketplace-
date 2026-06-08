import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ChefHat, 
  Star, 
  MapPin, 
  ArrowLeft, 
  Heart, 
  Play, 
  Volume2, 
  VolumeX, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Info, 
  ShieldCheck, 
  Check, 
  Sparkles 
} from 'lucide-react'
import { mockChefs, type MockChef, type MockMenu } from '../../services/seedMockData'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { useCartStore } from '../../hooks/useCartStore'

// Mock reel videos mapping for the chefs
const CHEF_REELS: Record<string, string> = {
  'chef-sana-dha-6': 'https://assets.mixkit.co/videos/preview/mixkit-cooking-in-a-modern-kitchen-40546-large.mp4',
  'chef-amma-clifton-4': 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-a-fresh-vegetable-dish-40552-large.mp4',
  'chef-healthy-gulshan-13': 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-fresh-salad-40551-large.mp4',
  'chef-zareen-dha-6': 'https://assets.mixkit.co/videos/preview/mixkit-woman-chopping-vegetables-in-kitchen-40536-large.mp4',
  'chef-khatri-clifton-9': 'https://assets.mixkit.co/videos/preview/mixkit-cooking-in-a-modern-kitchen-40546-large.mp4',
  'chef-tadka-gulshan-5': 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-a-fresh-vegetable-dish-40552-large.mp4'
}

export default function ChefDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Zustand Store
  const cart = useCartStore()

  // Component State
  const [chef, setChef] = useState<MockChef | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'bio'>('menu')
  
  // Reels Modal State
  const [isReelOpen, setIsReelOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Chef Conflict Modal State
  const [pendingItem, setPendingItem] = useState<{ item: MockMenu; chefId: string } | null>(null)
  const [isConflictOpen, setIsConflictOpen] = useState(false)

  // Subscription Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutPlan, setCheckoutPlan] = useState<'5-day' | '7-day'>('5-day')
  const [checkoutSlot, setCheckoutSlot] = useState<'lunch' | 'dinner'>('lunch')
  const [checkoutAddress, setCheckoutAddress] = useState('')
  const [checkoutNotes, setCheckoutNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load Chef
  useEffect(() => {
    if (id) {
      const matched = mockChefs.find(c => c.id === id)
      if (matched) {
        setChef(matched)
        // Check if previously favorited
        const savedFavorites = localStorage.getItem('dastarkhwan_favorites')
        if (savedFavorites) {
          const list = JSON.parse(savedFavorites) as string[]
          setIsFavorite(list.includes(matched.id))
        }
      }
    }
  }, [id])

  // Sync favorites to localStorage
  const toggleFavorite = () => {
    if (!chef) return
    const savedFavorites = localStorage.getItem('dastarkhwan_favorites')
    let list: string[] = savedFavorites ? JSON.parse(savedFavorites) : []
    
    if (isFavorite) {
      list = list.filter(item => item !== chef.id)
      setIsFavorite(false)
    } else {
      list.push(chef.id)
      setIsFavorite(true)
    }
    localStorage.setItem('dastarkhwan_favorites', JSON.stringify(list))
  }

  // Handle Add To Plan
  const handleAddItem = (item: MockMenu) => {
    if (!chef) return
    const result = cart.addItem(item, chef.id)
    if (!result.success && result.conflict) {
      setPendingItem({ item, chefId: chef.id })
      setIsConflictOpen(true)
    }
  }

  // Resolve Cart Chef Conflict
  const handleConfirmConflict = () => {
    if (pendingItem) {
      cart.forceAddItem(pendingItem.item, pendingItem.chefId)
      setIsConflictOpen(false)
      setPendingItem(null)
    }
  }

  // Reels Video Controls
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(err => console.log('Video play error:', err))
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setVideoProgress(isNaN(progress) ? 0 : progress)
  }

  // Sound & play state reset when Reel modal opens/closes
  useEffect(() => {
    if (isReelOpen) {
      setIsPlaying(true)
      setIsMuted(true)
      setVideoProgress(0)
    }
  }, [isReelOpen])

  // Checkout process
  const handleStartCheckout = () => {
    if (!chef) return
    setCheckoutPlan(cart.wizardDetails.plan)
    setCheckoutSlot(cart.wizardDetails.slot)
    setCheckoutAddress(cart.wizardDetails.deliveryAddress)
    setCheckoutNotes(cart.wizardDetails.notes)
    setIsCheckoutOpen(true)
  }

  const handleConfirmCheckout = () => {
    if (!checkoutAddress.trim()) {
      alert('Please enter a delivery address.')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      cart.updateWizardDetails({
        plan: checkoutPlan,
        slot: checkoutSlot,
        deliveryAddress: checkoutAddress,
        notes: checkoutNotes
      })

      // Calculate total final amount
      const dailySubtotal = cart.totalPrice
      const daysCount = checkoutPlan === '5-day' ? 5 : 7
      const weeklyBase = dailySubtotal * daysCount
      const deliveryFee = 500
      const totalAmount = weeklyBase + deliveryFee

      alert(`🎉 Subscription created successfully with ${chef?.kitchen_name}!\n\nDetails:\n- Plan: ${checkoutPlan} (${daysCount} days)\n- Slot: ${checkoutSlot.toUpperCase()}\n- Weekly Total: PKR ${totalAmount.toLocaleString()}\n\nStatus-based tracking will begin on your start date.`)
      
      cart.clearCart()
      setIsCheckoutOpen(false)
      setIsSubmitting(false)
      navigate('/subscriptions')
    }, 1200)
  }

  if (!chef) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <ChefHat className="w-16 h-16 text-foreground-secondary/25 animate-bounce" />
        <h2 className="text-xl font-bold text-foreground-primary">Chef Profile Not Found</h2>
        <p className="text-sm text-foreground-secondary max-w-sm">
          The requested chef listing does not exist in Karachi hubs. Try picking another kitchen.
        </p>
        <Link to="/discovery" className="mt-2">
          <Button variant="primary">Return to Discovery Feed</Button>
        </Link>
      </div>
    )
  }

  const reelUrl = CHEF_REELS[chef.id] || 'https://assets.mixkit.co/videos/preview/mixkit-cooking-in-a-modern-kitchen-40546-large.mp4'
  const isCurrentChefCart = cart.chefId === chef.id
  const totalMealsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const isCartNotEmpty = cart.items.length > 0 && isCurrentChefCart

  // Review statistics calculation
  const totalReviews = chef.reviews.length
  const avgRating = chef.trust_score
  const fiveStars = chef.reviews.filter(r => r.rating === 5).length
  const fourStars = chef.reviews.filter(r => r.rating === 4).length
  const otherStars = totalReviews - fiveStars - fourStars

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 py-4 pb-28 animate-[fade-in_0.3s_ease-out_forwards]">
      
      {/* Back to discovery navigation bar */}
      <div className="flex items-center justify-between px-1">
        <Link to="/discovery" className="flex items-center gap-1.5 text-xs font-bold text-foreground-secondary hover:text-primary transition-all duration-200">
          <ArrowLeft className="w-4 h-4" /> Back to Home Kitchens
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleFavorite}
          className="flex items-center gap-1.5 text-xs font-bold hover:border-danger/40 hover:bg-danger/5"
        >
          <Heart className={`w-4 h-4 transition-all duration-300 ${isFavorite ? 'fill-danger text-danger scale-110' : 'text-foreground-secondary'}`} />
          {isFavorite ? 'Saved Kitchen' : 'Favorite'}
        </Button>
      </div>

      {/* Hero Header Card */}
      <section className="bg-card border border-border/80 rounded-2xl relative overflow-hidden shadow-sm transition-colors duration-300">
        {/* Colorful backdrop overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/15 via-secondary/15 to-primary-light dark:from-primary/20 dark:via-secondary/10 dark:to-primary-light/5 pointer-events-none" />
        
        <div className="p-6 sm:p-8 pt-16 sm:pt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground-primary tracking-tight">
                {chef.kitchen_name}
              </h1>
              {chef.is_verified && <Badge variant="pro">Verified Kitchen</Badge>}
            </div>
            
            <p className="text-xs text-foreground-secondary font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-primary" /> Kitchen Head: {chef.name}
            </p>
            
            <p className="text-xs sm:text-sm text-foreground-secondary max-w-xl leading-relaxed mt-1">
              {chef.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-1.5">
              <span className="text-xs text-foreground-secondary flex items-center gap-1.5 font-medium bg-background-secondary/50 px-2.5 py-1 rounded-full border border-border/40">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {chef.area}
              </span>
              <span className="text-xs text-foreground-secondary flex items-center gap-1.5 font-medium bg-background-secondary/50 px-2.5 py-1 rounded-full border border-border/40">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" /> {chef.trust_score.toFixed(1)} / 5.0 Rating
              </span>
            </div>
          </div>

          {/* Action Area (Watch reel & Details) */}
          <div className="flex flex-col items-start md:items-end gap-3.5 shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-border/60 pt-6 md:pt-0 md:pl-6">
            <div className="flex flex-col gap-1 w-full text-left md:text-right">
              <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">Kitchen Health Video</span>
              
              {/* Watch Reel Button */}
              <button 
                onClick={() => setIsReelOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer min-h-[44px] w-full md:w-auto animate-pulse"
              >
                <Play className="w-4 h-4 fill-white animate-pulse" /> 
                <span>📺 Watch Prep Reel</span>
              </button>
            </div>

            <div className="flex flex-col w-full text-left md:text-right mt-1.5">
              <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">Weekly Plans From</span>
              <span className="text-lg font-black text-primary">PKR 3,500 <span className="text-xs font-normal text-foreground-secondary">/wk</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation Switcher */}
      <section className="border-b border-border/60">
        <div className="flex gap-2">
          {(['menu', 'reviews', 'bio'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-bold pb-3 px-4 relative transition-all duration-200 capitalize cursor-pointer ${
                activeTab === tab
                  ? 'text-primary'
                  : 'text-foreground-secondary hover:text-foreground-primary'
              }`}
            >
              {tab === 'menu' ? 'Menu Catalog' : tab === 'reviews' ? 'Neighbor Reviews' : 'Kitchen Bio'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-[fade-in_0.2s_ease-out_forwards]" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Panels */}
      <div className="min-h-[350px]">
        {/* Tab 1: Menu List */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fade-in_0.2s_ease-out_forwards]">
            {chef.menus.map(item => {
              // Find item quantity in current cart
              const cartItem = isCurrentChefCart ? cart.items.find(i => i.id === item.id) : null
              const quantity = cartItem?.quantity || 0

              return (
                <Card 
                  key={item.id} 
                  className={`border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    quantity > 0 
                      ? 'border-primary bg-primary-light/10 shadow-xs' 
                      : 'border-border/60 hover:border-primary/20 shadow-xs hover:shadow-sm'
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base font-bold text-foreground-primary">{item.name}</CardTitle>
                      <span className="text-sm font-black text-primary bg-primary-light dark:bg-primary/15 px-2.5 py-1 rounded-md shrink-0">
                        PKR {item.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-foreground-secondary leading-relaxed mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.dietary_tags.map(t => (
                          <Badge key={t} variant="outline" className="capitalize text-[9px] px-2 py-0.5">
                            {t.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Add / Quantity Buttons */}
                    <div className="mt-5 pt-3 border-t border-border/40 flex justify-end items-center min-h-[44px]">
                      {quantity > 0 ? (
                        <div className="flex items-center bg-primary text-white rounded-full p-1 shadow-sm transition-all duration-200">
                          <button 
                            onClick={() => cart.updateQuantity(item.id, quantity - 1)}
                            className="text-white hover:bg-primary-hover p-1.5 rounded-full min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold font-mono min-w-[20px] text-center">
                            {quantity}
                          </span>
                          <button 
                            onClick={() => cart.updateQuantity(item.id, quantity + 1)}
                            className="text-white hover:bg-primary-hover p-1.5 rounded-full min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleAddItem(item)}
                          variant="outline" 
                          size="sm"
                          className="text-xs font-bold hover:bg-primary hover:text-white hover:border-primary border-border flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add to Plan
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Tab 2: Neighborhood Feedback */}
        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-6 animate-[fade-in_0.2s_ease-out_forwards]">
            {/* Rating breakdown summary */}
            <div className="bg-card border border-border/60 p-5 rounded-2xl flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">Trust Score</span>
                <span className="text-4xl font-black text-foreground-primary">{avgRating.toFixed(1)}</span>
                <div className="flex items-center gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(avgRating) ? 'fill-warning text-warning' : 'text-border'}`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] text-foreground-secondary mt-1">{totalReviews} neighborhood reviews verified</span>
              </div>

              {/* Progress bars */}
              <div className="flex-grow max-w-sm flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground-secondary min-w-[40px]">5 Stars</span>
                  <div className="flex-grow h-2 bg-background-secondary rounded-full overflow-hidden">
                    <div 
                      className="bg-warning h-full rounded-full" 
                      style={{ width: `${totalReviews > 0 ? (fiveStars / totalReviews) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground-secondary min-w-[24px] text-right">
                    {fiveStars}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground-secondary min-w-[40px]">4 Stars</span>
                  <div className="flex-grow h-2 bg-background-secondary rounded-full overflow-hidden">
                    <div 
                      className="bg-warning h-full rounded-full" 
                      style={{ width: `${totalReviews > 0 ? (fourStars / totalReviews) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground-secondary min-w-[24px] text-right">
                    {fourStars}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground-secondary min-w-[40px]">Other</span>
                  <div className="flex-grow h-2 bg-background-secondary rounded-full overflow-hidden">
                    <div 
                      className="bg-warning/50 h-full rounded-full" 
                      style={{ width: `${totalReviews > 0 ? (otherStars / totalReviews) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground-secondary min-w-[24px] text-right">
                    {otherStars}
                  </span>
                </div>
              </div>
            </div>

            {/* List of comments */}
            <div className="flex flex-col gap-4">
              {chef.reviews.map(rev => (
                <div key={rev.id} className="bg-card border border-border/50 p-5 rounded-2xl flex flex-col gap-3 shadow-xs hover:border-border transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-foreground-primary">{rev.customer_name}</span>
                      <span className="text-[9px] text-foreground-secondary mt-0.5">Verified Neighbor Customer</span>
                    </div>
                    
                    <div className="flex items-center gap-0.5 text-warning">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-warning text-warning' : 'text-border'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-foreground-secondary leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <div className="text-[9px] text-foreground-secondary font-mono text-right mt-1">
                    Reviewed on {new Date(rev.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Bio */}
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fade-in_0.2s_ease-out_forwards]">
            {/* Story & address */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <Card className="border border-border/50 shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-primary" /> The Kitchen Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                    {chef.bio} Every dish is prepared by hand in my family kitchen using traditional recipes handed down through generations. We take immense pride in ensuring a clean preparation counter, raw vegetables are thoroughly sanitized, and premium Grade-A meats are cooked under strict supervision.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed mt-4">
                    Our weekly subscription plans are built around offering healthy, rotating comfort foods that do not rely on excessive oil, commercial colorings, or artificial preservatives.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border/50 shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-primary" /> Delivery Area & Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center py-2 border-b border-border/40 text-xs">
                      <span className="text-foreground-secondary">Serving Area</span>
                      <span className="font-bold text-foreground-primary">{chef.area}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/40 text-xs">
                      <span className="text-foreground-secondary">Delivery Threshold Limit</span>
                      <span className="font-bold text-foreground-primary">3.0 km from hub coordinate</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-xs">
                      <span className="text-foreground-secondary">Active Operating Days</span>
                      <span className="font-bold text-primary">{chef.operating_days.join(', ')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Checklist / Sourced Ingredients */}
            <div className="flex flex-col gap-4">
              <Card className="border border-border/50 shadow-xs bg-primary-light/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-primary">
                    <ShieldCheck className="w-4.5 h-4.5 text-primary" /> Safety & Sourcing
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col gap-3.5">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground-primary">Pure Ingredients</h4>
                      <p className="text-[10px] text-foreground-secondary mt-0.5">We source from trusted local stores; no artificial tenderizers or trans-fats are used.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground-primary">Filtered Prep Water</h4>
                      <p className="text-[10px] text-foreground-secondary mt-0.5">All vegetable washing and gravy slow-boiling is conducted using clean mineral/RO filter water.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground-primary">Daily Kitchen Sanitizing</h4>
                      <p className="text-[10px] text-foreground-secondary mt-0.5">Kitchen prep slabs are wiped down with food-safe disinfectant multiple times a day.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground-primary">Sustainable Packaging</h4>
                      <p className="text-[10px] text-foreground-secondary mt-0.5">Food is delivered in heat-retaining microwave-safe recyclable boxes.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Cart Banner (Only rendered if cart not empty and items belong to this chef) */}
      {isCartNotEmpty && (
        <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
          <div className="w-full max-w-xl bg-[#e05a36] text-white rounded-full py-2.5 px-5 shadow-lg flex items-center justify-between pointer-events-auto border border-white/10 hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center gap-3.5 pl-2">
              <div className="bg-white/20 p-2 rounded-full">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold">{totalMealsCount} meal{totalMealsCount > 1 ? 's' : ''} selected</span>
                <span className="text-[10px] text-white/80 font-medium">Daily Cost: PKR {cart.totalPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleStartCheckout}
              variant="secondary"
              className="bg-white hover:bg-slate-50 text-primary hover:text-primary-hover font-black text-xs min-h-[38px] px-5 py-1.5 rounded-full select-none"
            >
              Customize Plan & Checkout
            </Button>
          </div>
        </div>
      )}

      {/* 1. Reels Player Modal */}
      <Modal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
        title="Kitchen Transparency Prep Reel"
        size="sm"
      >
        <div className="flex flex-col items-center gap-4 py-1">
          {/* Vertical Video Box */}
          <div className="relative w-full max-w-[320px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl group">
            
            {/* Video Element */}
            <video
              ref={videoRef}
              src={reelUrl}
              loop
              playsInline
              autoPlay
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Top informational badge overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
              <span className="bg-black/50 backdrop-blur-xs text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> Sterile Kitchen
              </span>
              <span className="bg-primary/95 text-white text-[8px] px-2 py-0.5 rounded font-black tracking-wide">
                LIVE REEL
              </span>
            </div>

            {/* Play/Pause Center Indicator (shows on pause) */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer z-10"
              >
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20 scale-110 transition-transform duration-200">
                  <Play className="w-8 h-8 fill-white text-white translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-2 z-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-left text-white max-w-[200px]">
                  <span className="text-xs font-bold">{chef.kitchen_name}</span>
                  <span className="text-[9px] text-white/70 mt-0.5 line-clamp-1">Prep reels show cleaning, cooking, and raw inspections.</span>
                </div>

                {/* Sound Toggle */}
                <button
                  onClick={toggleMute}
                  className="bg-white/15 hover:bg-white/25 text-white p-2 rounded-full backdrop-blur-xs cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Progress Bar scrubber */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-1">
                <div 
                  className="bg-primary h-full transition-all duration-100 ease-linear"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
            </div>

          </div>

          <div className="text-center px-2">
            <h4 className="text-xs font-bold text-foreground-primary">Prep Transparency Loop</h4>
            <p className="text-[10px] text-foreground-secondary mt-1 max-w-[280px]">
              Tap the video to play/pause. Use the speaker button to toggle cooking sounds. Reels confirm standard hygiene compliance guidelines.
            </p>
          </div>

          <div className="w-full flex justify-end border-t border-border pt-3 mt-1">
            <Button variant="ghost" size="sm" onClick={() => setIsReelOpen(false)}>
              Close Player
            </Button>
          </div>
        </div>
      </Modal>

      {/* 2. Cart Chef Conflict Modal */}
      <Modal
        isOpen={isConflictOpen}
        onClose={() => {
          setIsConflictOpen(false)
          setPendingItem(null)
        }}
        title="Start New Order?"
        size="sm"
      >
        <div className="flex flex-col gap-4 py-1 font-sans text-foreground-primary">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-warning/20 p-4 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-warning">Cart Chef Conflict</p>
              <p className="text-[10px] text-foreground-secondary mt-1 leading-relaxed">
                Your cart currently contains food items from another home kitchen. DastarKhwan orders are restricted to one chef at a time to ensure simple hyper-local delivery.
              </p>
            </div>
          </div>

          <p className="text-xs text-foreground-primary leading-relaxed px-1">
            Clear your current cart to order from <span className="font-bold text-primary">{chef.kitchen_name}</span> instead?
          </p>

          <div className="flex items-center gap-3 justify-end mt-2 pt-3 border-t border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setIsConflictOpen(false)
                setPendingItem(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              className="font-bold text-xs"
              onClick={handleConfirmConflict}
            >
              Clear Cart & Add Item
            </Button>
          </div>
        </div>
      </Modal>

      {/* 3. Subscription Checkout Modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Weekly Meal Plan Subscription"
        size="md"
      >
        <div className="flex flex-col gap-4 font-sans text-foreground-primary">
          
          <div className="bg-primary-light dark:bg-primary/10 border border-primary/20 p-4 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-primary">Karachi Hub Service Window</p>
              <p className="text-[10px] text-foreground-secondary leading-relaxed mt-0.5">
                Subscriptions run from Monday. Meals are fresh cooked daily. You can pause or reschedule specific days on your Subscriptions panel.
              </p>
            </div>
          </div>

          {/* Configuration selections */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground-secondary">Delivery Plan Schedule</label>
              <select 
                value={checkoutPlan}
                onChange={(e) => setCheckoutPlan(e.target.value as any)}
                className="w-full bg-background-secondary border border-border rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-foreground-primary"
              >
                <option value="5-day">5-Day Week (Mon - Fri)</option>
                <option value="7-day">Full 7-Day Week (Mon - Sun)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground-secondary">Preferred Time Slot</label>
              <select 
                value={checkoutSlot}
                onChange={(e) => setCheckoutSlot(e.target.value as any)}
                className="w-full bg-background-secondary border border-border rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-foreground-primary"
              >
                <option value="lunch">Lunch Slot (12:00 PM - 2:00 PM)</option>
                <option value="dinner">Dinner Slot (7:00 PM - 9:00 PM)</option>
              </select>
            </div>
          </div>

          {/* User details inputs */}
          <div className="flex flex-col gap-3">
            <Input 
              label="Delivery Address in Hub" 
              placeholder="e.g. Apartment 4-C, Clifton Regency, Clifton Block 4" 
              value={checkoutAddress}
              onChange={(e) => setCheckoutAddress(e.target.value)}
              required
            />
            <Input 
              label="Kitchen Instructions (e.g. less oil, low spice)" 
              placeholder="No preferences" 
              value={checkoutNotes}
              onChange={(e) => setCheckoutNotes(e.target.value)}
            />
          </div>

          {/* Pricing calculations details */}
          <div className="py-1">
            <h4 className="text-xs font-bold text-foreground-secondary uppercase tracking-wider mb-2">Weekly Pricing Breakdown</h4>
            <div className="border border-border rounded-xl p-4 flex flex-col gap-2.5 bg-background-secondary/30">
              <div className="flex justify-between text-xs">
                <span className="text-foreground-secondary">Selected Menu Items (Daily Cost)</span>
                <span className="font-semibold text-foreground-primary">PKR {cart.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground-secondary">Plan Duration ({checkoutPlan === '5-day' ? '5 Days' : '7 Days'})</span>
                <span className="font-semibold text-foreground-primary">x {checkoutPlan === '5-day' ? 5 : 7}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground-secondary">Base Weekly Plan Subtotal</span>
                <span className="font-semibold text-foreground-primary">PKR {(cart.totalPrice * (checkoutPlan === '5-day' ? 5 : 7)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground-secondary">Weekly Proximity Rider Delivery Charge</span>
                <span className="font-semibold text-foreground-primary">PKR 500</span>
              </div>
              <div className="border-t border-border/50 my-1 pt-2.5 flex justify-between text-sm font-bold text-foreground-primary">
                <span>Total Weekly Charges (COD / Mobile Wallet)</span>
                <span className="text-primary font-black">
                  PKR {((cart.totalPrice * (checkoutPlan === '5-day' ? 5 : 7)) + 500).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Checkbox payment */}
          <div className="flex items-center gap-2 px-1">
            <input type="checkbox" id="cod-checkout" defaultChecked className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
            <label htmlFor="cod-checkout" className="text-xs text-foreground-secondary font-medium cursor-pointer select-none">
              Easypaisa / JazzCash / Cash on Delivery on first weekly dropoff
            </label>
          </div>

          {/* Final controls */}
          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={() => setIsCheckoutOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="font-bold flex items-center gap-1.5"
              onClick={handleConfirmCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Confirm Subscription</span>
                </>
              )}
            </Button>
          </div>

        </div>
      </Modal>

    </div>
  )
}
