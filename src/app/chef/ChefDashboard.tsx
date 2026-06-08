import { useState } from 'react'
import { ClipboardList, ArrowRight, User, Phone, CheckCircle2, ShoppingBag, MapPin } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'

interface ChefOrder {
  id: string
  customerName: string
  phone: string
  address: string
  items: string
  slot: string
  status: 'preparing' | 'packed' | 'transit' | 'delivered'
  riderName?: string
  riderPhone?: string
}

export default function ChefDashboard() {
  const [orders, setOrders] = useState<ChefOrder[]>([
    {
      id: 'ord-101',
      customerName: 'Zainab Khan',
      phone: '+92 300 9876543',
      address: 'Apartment 4B, Clifton Regency, Block 4, Clifton, Karachi',
      items: '1x Memon Beef Khausa (Extra Spicy)',
      slot: 'Lunch (12:30 PM)',
      status: 'preparing'
    },
    {
      id: 'ord-102',
      customerName: 'Bilal Ahmed',
      phone: '+92 321 4455667',
      address: 'House 92, Lane 4, DHA Phase 6, Karachi',
      items: '1x Sindhi Chicken Biryani (Low Salt)',
      slot: 'Lunch (1:00 PM)',
      status: 'packed'
    }
  ])

  const [activeOrderForRider, setActiveOrderForRider] = useState<ChefOrder | null>(null)
  const [riderName, setRiderName] = useState('')
  const [riderPhone, setRiderPhone] = useState('')
  const [isRiderModalOpen, setIsRiderModalOpen] = useState(false)

  const advanceStatus = (orderId: string, currentStatus: ChefOrder['status']) => {
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    if (currentStatus === 'preparing') {
      // Advance to packed
      updateOrderStatus(orderId, 'packed')
    } else if (currentStatus === 'packed') {
      // Trigger rider assignment modal
      setActiveOrderForRider(order)
      setRiderName('')
      setRiderPhone('')
      setIsRiderModalOpen(true)
    } else if (currentStatus === 'transit') {
      // Advance to delivered
      updateOrderStatus(orderId, 'delivered')
    }
  }

  const updateOrderStatus = (orderId: string, nextStatus: ChefOrder['status'], riderDetails?: { name: string; phone: string }) => {
    setOrders(prev => 
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: nextStatus,
            riderName: riderDetails?.name || o.riderName,
            riderPhone: riderDetails?.phone || o.riderPhone
          }
        }
        return o
      })
    )
  }

  const handleRiderSubmit = () => {
    if (!activeOrderForRider) return
    if (!riderName.trim() || !riderPhone.trim()) {
      alert('Please enter both Rider Name and Contact Phone.')
      return
    }

    updateOrderStatus(activeOrderForRider.id, 'transit', {
      name: riderName,
      phone: riderPhone
    })
    setIsRiderModalOpen(false)
    setActiveOrderForRider(null)
    alert('🎉 Rider assigned! Order dispatched out for delivery.')
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground-primary">
          Kitchen Dispatch Center
        </h1>
        <p className="text-xs sm:text-sm text-foreground-secondary">
          Track incoming subscription meals, print daily prep rosters, and coordinate local rider delivery schedules.
        </p>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Prep Roster */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-foreground-primary flex items-center gap-1.5">
            <ShoppingBag className="w-5 h-5 text-primary" /> Daily Cook Roster
          </h2>
          
          <Card className="border border-border/80 bg-card transition-colors duration-300">
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-border/40 pb-3">
                <span className="text-xs font-bold text-foreground-secondary">Item Summary</span>
                <Badge variant="outline">Today</Badge>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-xs items-center">
                  <span className="text-foreground-primary font-bold">Memon Beef Khausa</span>
                  <span className="bg-primary-light text-primary px-2.5 py-0.5 rounded-full font-bold">1 serving</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-foreground-primary font-bold">Sindhi Chicken Biryani</span>
                  <span className="bg-primary-light text-primary px-2.5 py-0.5 rounded-full font-bold">1 serving</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Columns: Active orders list */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-foreground-primary flex items-center gap-1.5">
            <ClipboardList className="w-5 h-5 text-secondary" /> Active Orders
          </h2>

          <div className="flex flex-col gap-4">
            {orders.map(order => {
              return (
                <Card key={order.id} className="border border-border/80 overflow-hidden bg-card transition-colors duration-300">
                  <div className="p-5 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-primary">Order #{order.id}</span>
                        <Badge variant={
                          order.status === 'delivered' ? 'success' : 'primary'
                        } className="capitalize text-[10px]">
                          {order.status === 'transit' ? 'Out for Delivery' : order.status}
                        </Badge>
                      </div>

                      <h3 className="font-display text-sm font-bold text-foreground-primary leading-none">
                        {order.customerName} | <span className="text-xs text-foreground-secondary font-mono">{order.phone}</span>
                      </h3>
                      
                      <p className="text-xs text-foreground-secondary font-bold mt-1">
                        Meal: {order.items}
                      </p>

                      <div className="flex items-start gap-1.5 text-xs text-foreground-secondary mt-1 max-w-md">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="text-[10px] leading-relaxed">{order.address}</span>
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div className="flex flex-col justify-between items-start sm:items-end gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-border/60 pt-4 sm:pt-0 sm:pl-5">
                      <div className="text-left sm:text-right flex flex-col gap-1">
                        <span className="text-[9px] text-foreground-secondary font-bold">SLOT</span>
                        <span className="text-xs font-bold text-foreground-primary">{order.slot}</span>
                      </div>

                      {order.status !== 'delivered' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => advanceStatus(order.id, order.status)}
                          className="font-bold text-xs flex items-center gap-1 h-9"
                        >
                          {order.status === 'preparing' && 'Mark Packed & Ready'}
                          {order.status === 'packed' && 'Assign Rider & Dispatch'}
                          {order.status === 'transit' && 'Mark Delivered'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      )}

                      {order.status === 'delivered' && (
                        <span className="text-xs text-success flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Order Handoff Complete
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rider credentials summary bar if dispatched */}
                  {order.status === 'transit' && order.riderName && (
                    <div className="bg-background-secondary/40 px-5 py-2.5 border-t border-border/50 text-[10px] text-foreground-secondary flex items-center gap-4 flex-wrap">
                      <span className="font-bold">Assigned Rider:</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-primary" /> {order.riderName}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-secondary" /> {order.riderPhone}</span>
                    </div>
                  )}

                </Card>
              )
            })}
          </div>
        </div>

      </div>

      {/* Rider Assignment Modal Prompt */}
      <Modal
        isOpen={isRiderModalOpen}
        onClose={() => setIsRiderModalOpen(false)}
        title="Assign Delivery Rider Details"
        size="sm"
      >
        <div className="flex flex-col gap-4 font-sans text-foreground-primary">
          <p className="text-xs text-foreground-secondary leading-relaxed">
            Enter the details of the external delivery service rider (e.g. Bykea, Yango, or private courier) taking this order to notify the customer.
          </p>

          <div className="flex flex-col gap-4">
            <Input 
              label="Rider Name" 
              placeholder="e.g. Shahzad Khan" 
              value={riderName}
              onChange={(e) => setRiderName(e.target.value)}
              required
            />
            <Input 
              label="Rider Contact Phone Number" 
              placeholder="e.g. +92 332 1234567" 
              value={riderPhone}
              onChange={(e) => setRiderPhone(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={() => setIsRiderModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" className="font-bold" onClick={handleRiderSubmit}>
              Dispatch Order
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}
