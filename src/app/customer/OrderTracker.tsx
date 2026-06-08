import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, User } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'

interface OrderDetails {
  id: string
  kitchenName: string
  items: string
  price: number
  status: 'preparing' | 'packed' | 'transit' | 'delivered'
  riderName?: string
  riderPhone?: string
  address: string
}

export default function OrderTracker() {
  const { order_id } = useParams<{ order_id: string }>()
  const [order, setOrder] = useState<OrderDetails>({
    id: order_id || 'ord-9921',
    kitchenName: "Sana's Gourmet Kitchen",
    items: '1x Sindhi Chicken Biryani (Friday Plan)',
    price: 400,
    status: 'preparing',
    address: 'Apartment 4B, Clifton Regency, Block 4, Clifton, Karachi'
  })

  // Mock status advancement over time for demonstration
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setOrder(prev => ({ ...prev, status: 'packed' }))
    }, 8000)

    const timer2 = setTimeout(() => {
      setOrder(prev => ({ 
        ...prev, 
        status: 'transit', 
        riderName: 'Shahzad Khan',
        riderPhone: '+92 332 1122334' 
      }))
    }, 16000)

    const timer3 = setTimeout(() => {
      setOrder(prev => ({ ...prev, status: 'delivered' }))
    }, 28000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const steps = [
    { label: 'Preparing', key: 'preparing', desc: 'Chef cooking your order' },
    { label: 'Packed & Ready', key: 'packed', desc: 'Boxed and ready for pickup' },
    { label: 'Out for Delivery', key: 'transit', desc: 'Rider on route' },
    { label: 'Delivered', key: 'delivered', desc: 'Handoff complete' }
  ]

  const getStepIndex = (status: string) => {
    return steps.findIndex(s => s.key === status)
  }

  const activeIndex = getStepIndex(order.status)

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 py-4">
      {/* Header Back */}
      <div className="flex items-center">
        <Link to="/subscriptions" className="flex items-center gap-1 text-xs font-bold text-foreground-secondary hover:text-primary transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Subscriptions
        </Link>
      </div>

      {/* Main Status Roster */}
      <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 transition-colors duration-300">
        
        <div className="flex justify-between items-start border-b border-border/40 pb-4 flex-wrap gap-4">
          <div>
            <span className="text-[10px] text-foreground-secondary font-bold uppercase">Active Meal Tracker</span>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-foreground-primary mt-1">
              Order #{order.id}
            </h1>
            <p className="text-xs text-foreground-secondary mt-1">{order.kitchenName} | {order.items}</p>
          </div>
          <Badge variant={order.status === 'delivered' ? 'success' : 'primary'} className="capitalize">
            {order.status === 'transit' ? 'Out for Delivery' : order.status}
          </Badge>
        </div>

        {/* Milestone Stepper */}
        <div className="w-full relative py-6">
          <div className="absolute top-[44px] left-[6%] right-[6%] h-[2px] bg-border/60 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-[44px] left-[6%] h-[2px] bg-secondary -translate-y-1/2 z-0 transition-all duration-700" 
            style={{ width: `${(activeIndex / (steps.length - 1)) * 88}%` }}
          />

          <div className="grid grid-cols-4 relative z-10">
            {steps.map((step, i) => {
              const done = i < activeIndex
              const current = i === activeIndex
              
              return (
                <div key={step.key} className="flex flex-col items-center text-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ring-4 transition-all duration-300 ${
                    done 
                      ? 'bg-secondary text-white ring-background-primary' 
                      : current 
                        ? 'bg-primary text-white ring-primary-light animate-pulse scale-105' 
                        : 'bg-card text-foreground-secondary border border-border ring-background-primary'
                  }`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold mt-3 transition-colors ${current ? 'text-primary' : 'text-foreground-primary'}`}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rider details card (Only visible when out for delivery / transit) */}
        {order.status === 'transit' && order.riderName && (
          <div className="bg-primary-light border border-primary/20 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary">Assigned delivery rider</p>
                <h4 className="text-sm font-extrabold text-foreground-primary mt-0.5">{order.riderName}</h4>
                <p className="text-[10px] text-foreground-secondary">External courier arranged by chef</p>
              </div>
            </div>
            <a 
              href={`tel:${order.riderPhone}`} 
              className="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-primary-hover transition-all self-start sm:self-auto"
            >
              <Phone className="w-3.5 h-3.5" /> Call Rider ({order.riderPhone})
            </a>
          </div>
        )}

        {/* Delivery Address Details */}
        <div className="border-t border-border/40 pt-4 flex flex-col gap-2 text-xs text-foreground-secondary">
          <div className="flex items-start gap-1.5">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-foreground-primary block">Delivery Location</span>
              <span className="text-[11px] leading-relaxed mt-0.5 inline-block">{order.address}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
