import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChefHat, Star, MapPin, ArrowLeft, Heart } from 'lucide-react'
import { mockChefs, type MockChef } from '../../services/seedMockData'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'

export default function ChefProfile() {
  const { id } = useParams<{ id: string }>()
  const [chef, setChef] = useState<MockChef | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (id) {
      const matched = mockChefs.find(c => c.id === id)
      if (matched) setChef(matched)
    }
  }, [id])

  if (!chef) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <ChefHat className="w-12 h-12 text-foreground-secondary/35 animate-bounce" />
        <h2 className="text-lg font-bold text-foreground-primary">Chef Profile Not Found</h2>
        <p className="text-xs text-foreground-secondary">The requested chef listing does not exist in Karachi hubs.</p>
        <Link to="/discovery">
          <Button variant="primary">Return to Discovery Feed</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 py-4">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link to="/discovery" className="flex items-center gap-1 text-xs font-bold text-foreground-secondary hover:text-primary transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Discovery
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex items-center gap-1.5 text-xs font-bold"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-danger text-danger' : ''}`} />
          {isFavorite ? 'Favorited Kitchen' : 'Favorite'}
        </Button>
      </div>

      {/* Profile Banner */}
      <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm flex flex-col sm:flex-row justify-between gap-6 transition-colors duration-300">
        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground-primary">
              {chef.kitchen_name}
            </h1>
            {chef.is_verified && <Badge variant="pro">Verified</Badge>}
          </div>
          
          <p className="text-xs text-foreground-secondary font-bold uppercase tracking-wider">Cooked by {chef.name}</p>
          <p className="text-xs sm:text-sm text-foreground-secondary max-w-xl leading-relaxed mt-1">
            {chef.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <span className="text-xs text-foreground-secondary flex items-center gap-1 font-medium">
              <MapPin className="w-4 h-4 text-primary" /> {chef.area}
            </span>
            <span className="text-xs text-foreground-secondary flex items-center gap-1 font-medium">
              <Star className="w-4 h-4 text-warning fill-warning" /> {chef.trust_score.toFixed(1)} / 5.0 Rating
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start sm:items-end shrink-0 border-t sm:border-t-0 sm:border-l border-border/60 pt-4 sm:pt-0 sm:pl-6">
          <div className="flex flex-col text-left sm:text-right gap-1.5">
            <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">Operating Days</span>
            <div className="flex gap-1 flex-wrap sm:justify-end">
              {chef.operating_days.map(d => (
                <span key={d} className="text-[10px] bg-background-secondary border border-border px-1.5 py-0.5 rounded font-semibold">
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col text-left sm:text-right mt-4">
            <span className="text-[10px] text-foreground-secondary font-bold uppercase">Weekly Price Starts</span>
            <span className="text-lg font-bold text-primary">PKR 3,500 <span className="text-xs font-normal text-foreground-secondary">/wk</span></span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Menu Items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-foreground-primary">Kitchen Menu Options</h2>
          
          <div className="flex flex-col gap-4">
            {chef.menus.map(item => (
              <Card key={item.id} className="border border-border/60 shadow-xs hover:border-primary/20 transition-all bg-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <span className="text-sm font-extrabold text-primary">PKR {item.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-foreground-secondary leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.dietary_tags.map(t => (
                      <Badge key={t} variant="outline" className="capitalize text-[9px]">
                        {t.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Col: Reviews */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-foreground-primary">Neighborhood Feedback</h2>

          <div className="flex flex-col gap-3">
            {chef.reviews.map(rev => (
              <div key={rev.id} className="bg-card border border-border/60 p-4 rounded-xl flex flex-col gap-2 shadow-xs transition-colors duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground-primary">{rev.customer_name}</span>
                  <div className="flex items-center gap-0.5 text-warning">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-warning" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
