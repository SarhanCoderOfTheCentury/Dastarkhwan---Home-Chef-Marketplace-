import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChefHat, Search, MapPin, Star, Heart, Info, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { useSearchStore, calculateDistance } from '../../hooks/useSearchStore'
import { mockChefs, type MockChef } from '../../services/seedMockData'
import DiscoveryMap from '../../components/features/DiscoveryMap'

export default function DiscoveryFeed() {
  const { latitude: userLat, longitude: userLon, selectedHub } = useSearchStore()
  const navigate = useNavigate()

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  
  // Checkout modal mock state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'5-day' | '7-day'>('5-day')
  const [selectedSlot, setSelectedSlot] = useState<'lunch' | 'dinner'>('lunch')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [checkoutChef, setCheckoutChef] = useState<MockChef | null>(null)

  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleStartCheckout = (chef: MockChef, e: React.MouseEvent) => {
    e.stopPropagation()
    setCheckoutChef(chef)
    setDeliveryAddress('')
    setNotes('')
    setIsCheckoutOpen(true)
  }

  const handleProcessSubscription = () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address.')
      return
    }
    alert(`🎉 Subscription created successfully with ${checkoutChef?.kitchen_name}! Status-based tracking will begin on your start date.`)
    setIsCheckoutOpen(false)
    navigate('/subscriptions')
  }

  // Calculate distances, filter by search & selected tag, and check if chef is within range
  const annotatedChefs = mockChefs.map(chef => {
    const distance = calculateDistance(userLat, userLon, chef.latitude, chef.longitude)
    const inRange = distance <= chef.radius_limit
    return { ...chef, distance, inRange }
  })

  const filteredChefs = annotatedChefs.filter(chef => {
    // Only display chefs within their delivery radius to the active user hub
    if (!chef.inRange) return false

    const matchesSearch = 
      chef.kitchen_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.bio.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTag = 
      !selectedTag || 
      chef.menus.some(item => item.dietary_tags.includes(selectedTag))
    
    return matchesSearch && matchesTag
  })

  // Get all unique tags from menus of in-range chefs
  const allTags = Array.from(
    new Set(annotatedChefs.filter(c => c.inRange).flatMap(c => c.menus.flatMap(m => m.dietary_tags)))
  )

  return (
    <div className="flex flex-col gap-6 py-2">
      
      {/* Search & Hero Panel */}
      <section className="bg-gradient-to-br from-primary-light to-background-secondary border border-border/60 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-sm transition-colors duration-300">
        {/* Decorative shapes */}
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-10 top-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl pointer-events-none" />

        <div className="max-w-xl flex flex-col gap-4 relative z-10">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground-primary">
            Find Cooking Neighbors in <span className="text-primary">{selectedHub}</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
            Order fresh daily meals prepared under high-hygiene household supervision. Listing only chefs delivering within 3km of your active location.
          </p>

          {/* Search Input Box */}
          <div className="relative flex items-center mt-1">
            <Search className="w-5 h-5 text-foreground-secondary absolute left-3.5 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search by kitchen name, specialty, or dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-foreground-secondary shadow-sm min-h-[44px] text-foreground-primary"
            />
          </div>
        </div>
      </section>

      {/* Dietary Tags Filter bar */}
      {allTags.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">Filter by Diet Preference</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                selectedTag === null
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-card border-border text-foreground-secondary hover:border-foreground-secondary/40'
              }`}
            >
              All Kitchens
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold border capitalize transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-card border-border text-foreground-secondary hover:border-foreground-secondary/40'
                }`}
              >
                {tag.replace('-', ' ')}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Proximity Map */}
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">Neighborhood Proximity Map</span>
          <span className="text-[10px] text-secondary font-bold">3km Delivery Radius Limit</span>
        </div>
        <DiscoveryMap userLat={userLat} userLon={userLon} chefs={filteredChefs} />
      </section>

      {/* Chefs List Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-lg font-bold text-foreground-primary">
            Active Home Kitchens ({filteredChefs.length})
          </h2>
          <span className="text-[10px] text-foreground-secondary font-mono">
            Hub: {selectedHub}
          </span>
        </div>

        {filteredChefs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl flex flex-col items-center gap-3 bg-card transition-colors duration-300">
            <Info className="w-10 h-10 text-foreground-secondary/30" />
            <p className="text-sm font-bold text-foreground-secondary">No chefs found nearby</p>
            <p className="text-xs text-foreground-secondary max-w-xs leading-relaxed">
              We couldn't find any cooks matching "{searchQuery}" delivering to {selectedHub} at the moment. Try checking other neighborhood hubs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChefs.map(chef => (
              <Card 
                key={chef.id}
                hoverable 
                onClick={() => navigate(`/chef/${chef.id}`)}
                className="flex flex-col h-full overflow-hidden cursor-pointer bg-card border border-border/80 shadow-xs transition-all duration-300 hover:shadow-sm"
              >
                {/* Photo Banner */}
                <div className="h-44 bg-background-secondary relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <ChefHat className="w-16 h-16 text-primary/25" />
                  </div>
                  
                  {/* Badge headers */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    {chef.is_verified && <Badge variant="pro">Verified Kitchen</Badge>}
                    <Badge variant="success" className="flex items-center gap-1 font-bold">
                      <Star className="w-3 h-3 fill-white text-white" /> {chef.trust_score.toFixed(1)}
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-[#120e0c]/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" /> {chef.distance.toFixed(1)} km away
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(chef.id, e)}
                    className="absolute bottom-3 right-3 bg-white/95 dark:bg-card/90 p-1.5 rounded-full hover:scale-110 shadow transition-all duration-200 cursor-pointer"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 transition-colors ${
                        favorites.includes(chef.id) ? 'fill-danger text-danger' : 'text-foreground-secondary'
                      }`} 
                    />
                  </button>
                </div>

                {/* Body Content */}
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{chef.kitchen_name}</CardTitle>
                  <p className="text-[9px] text-foreground-secondary font-bold uppercase tracking-wider">Cooked by {chef.name}</p>
                  <CardDescription className="line-clamp-2 mt-1.5 text-xs">
                    {chef.bio}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow pt-1">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {Array.from(new Set(chef.menus.flatMap(m => m.dietary_tags))).map(tag => (
                      <Badge key={tag} variant="outline" className="capitalize text-[9px]">
                        {tag.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Footer Action */}
                <CardFooter className="flex items-center justify-between border-t border-border/40 mt-auto pt-4 pb-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-foreground-secondary uppercase tracking-wider font-bold">WEEKLY PLAN FROM</span>
                    <span className="text-xs font-extrabold text-primary">PKR 3,500 <span className="text-[10px] font-normal text-foreground-secondary">/wk</span></span>
                  </div>
                  <div className="flex gap-1.5">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="font-bold text-[10px] px-2.5 h-8 border-border" 
                      onClick={(e) => handleStartCheckout(chef, e)}
                    >
                      Subscribe
                    </Button>
                    <Button 
                      size="sm" 
                      className="font-bold text-[10px] px-2.5 h-8 flex items-center gap-1"
                      onClick={() => navigate(`/chef/${chef.id}`)}
                    >
                      View Menu <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Subscription Checkout Modal */}
      <Modal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        title="DastarKhwan Weekly Meal Subscription"
        size="md"
      >
        {checkoutChef && (
          <div className="flex flex-col gap-4 font-sans text-foreground-primary">
            
            <div className="bg-primary-light border border-primary/20 p-4 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-primary">Karachi Delivery Window</p>
                <p className="text-[10px] text-primary/80 mt-0.5">
                  Meal subscription plans run from Monday to Friday. You can pause or skip specific daily slots through your subscription roster.
                </p>
              </div>
            </div>

            {/* Plan Config Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-foreground-secondary">Subscription Plan</label>
                <select 
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value as any)}
                  className="w-full bg-background-secondary border border-border rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-foreground-primary"
                >
                  <option value="5-day">5-Day Plan (Mon - Fri)</option>
                  <option value="7-day">7-Day Plan (Mon - Sun)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-foreground-secondary">Preferred Time Slot</label>
                <select 
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value as any)}
                  className="w-full bg-background-secondary border border-border rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-foreground-primary"
                >
                  <option value="lunch">Lunch (12:00 PM - 2:00 PM)</option>
                  <option value="dinner">Dinner (7:00 PM - 9:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <Input 
                label="Delivery Address" 
                placeholder="e.g. Apartment 4B, Clifton Regency, Block 4, Clifton" 
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
              />
              <Input 
                label="Special Cooking Notes (e.g. low spice, no potatoes)" 
                placeholder="None" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Pricing Summary */}
            <div className="py-1">
              <h4 className="text-xs font-bold text-foreground-secondary uppercase tracking-wider mb-2">Weekly Summary</h4>
              <div className="border border-border rounded-xl p-4 flex flex-col gap-2.5 bg-background-secondary/30">
                <div className="flex justify-between text-xs">
                  <span>Weekly Plan Base Charge ({checkoutChef.kitchen_name})</span>
                  <span className="font-bold">PKR {selectedPlan === '5-day' ? 3500 : 4800}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Neighborhood Delivery Charge</span>
                  <span className="font-bold">PKR 500</span>
                </div>
                <div className="border-t border-border/50 my-1 pt-2.5 flex justify-between text-sm font-bold text-foreground-primary">
                  <span>Total Weekly Charges</span>
                  <span className="text-primary">PKR {selectedPlan === '5-day' ? 4000 : 5300}</span>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="cod" defaultChecked className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
              <label htmlFor="cod" className="text-xs text-foreground-secondary font-medium cursor-pointer">
                Pay weekly using Easypaisa / JazzCash / Cash on Delivery
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" onClick={() => setIsCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" className="font-bold" onClick={handleProcessSubscription}>
                Confirm Subscription Payment
              </Button>
            </div>

          </div>
        )}
      </Modal>

    </div>
  )
}
