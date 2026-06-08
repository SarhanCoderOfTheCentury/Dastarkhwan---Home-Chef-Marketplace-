import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Play, Pause } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

interface Subscription {
  id: string
  kitchenName: string
  chefName: string
  planName: string
  timeSlot: string
  price: number
  status: 'active' | 'paused'
  startDate: string
  nextDelivery: string
}

export default function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>([
    {
      id: 'sub-1',
      kitchenName: "Sana's Gourmet Kitchen",
      chefName: 'Sana Fatima',
      planName: '5-Day Lunch Subscription',
      timeSlot: 'Lunch (12:00 PM - 2:00 PM)',
      price: 3500,
      status: 'active',
      startDate: '2026-06-08',
      nextDelivery: 'Today, 12:30 PM'
    }
  ])

  const toggleStatus = (id: string) => {
    setSubs(prev => 
      prev.map(s => {
        if (s.id === id) {
          const nextStatus = s.status === 'active' ? 'paused' : 'active'
          alert(`Subscription status changed to: ${nextStatus.toUpperCase()}`)
          return { ...s, status: nextStatus }
        }
        return s
      })
    )
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 py-4">
      
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground-primary">
          My Active Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-foreground-secondary">
          Manage your daily delivery schedules, pause upcoming slots, or skip specific calendar dates.
        </p>
      </div>

      {subs.length === 0 ? (
        <Card className="text-center py-12 border-border/60">
          <CardContent className="flex flex-col items-center gap-3">
            <CalendarIcon className="w-12 h-12 text-foreground-secondary/30" />
            <p className="text-sm font-bold text-foreground-secondary">No active weekly meal plans found</p>
            <p className="text-xs text-foreground-secondary max-w-xs leading-relaxed">
              Explore home chefs in your neighborhood to schedule daily warm kitchen deliveries.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {subs.map(sub => {
            const isActive = sub.status === 'active'
            return (
              <Card key={sub.id} className="border border-border/80 shadow-sm overflow-hidden bg-card">
                
                {/* Header Status Bar */}
                <div className={`h-1.5 w-full transition-colors ${isActive ? 'bg-success' : 'bg-warning'}`} />
                
                <div className="p-6 flex flex-col md:flex-row justify-between gap-6 transition-colors duration-300">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display text-lg font-bold text-foreground-primary">
                        {sub.kitchenName}
                      </h3>
                      <Badge variant={isActive ? 'success' : 'warning'}>
                        {isActive ? 'Active Plan' : 'Paused'}
                      </Badge>
                    </div>

                    <p className="text-xs text-foreground-secondary font-bold uppercase tracking-wider">
                      Cooked by {sub.chefName}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                        <CalendarIcon className="w-4 h-4 text-primary shrink-0" />
                        <div>
                          <p className="font-bold text-foreground-primary">{sub.planName}</p>
                          <p className="text-[10px] mt-0.5">Started: {sub.startDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                        <Clock className="w-4 h-4 text-secondary shrink-0" />
                        <div>
                          <p className="font-bold text-foreground-primary">{sub.timeSlot}</p>
                          <p className="text-[10px] mt-0.5">Next Meal: {isActive ? sub.nextDelivery : 'Resumes on activation'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Bill info */}
                  <div className="flex flex-col sm:flex-row md:flex-col justify-between items-start md:items-end gap-4 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6 shrink-0">
                    <div className="flex flex-col md:text-right">
                      <span className="text-[9px] text-foreground-secondary font-bold uppercase">Weekly Billing Rate</span>
                      <span className="text-base font-extrabold text-primary">PKR {sub.price} <span className="text-xs font-normal text-foreground-secondary">/wk</span></span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button 
                        variant={isActive ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => toggleStatus(sub.id)}
                        className="font-bold text-xs flex items-center gap-1.5 h-9"
                      >
                        {isActive ? (
                          <>
                            <Pause className="w-3.5 h-3.5" /> Pause Subscription
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" /> Resume Subscription
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                </div>

                {/* Important Notice */}
                <div className="bg-background-secondary/30 px-6 py-3 border-t border-border/40 flex items-center gap-2 text-[10px] text-foreground-secondary font-medium">
                  {isActive ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span>Next Monday–Friday meal delivery is scheduled. Cancel before midnight for next day pause schedules.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-warning shrink-0" />
                      <span>Delivery calendar is paused. No billing will occur until this plan is resumed.</span>
                    </>
                  )}
                </div>

              </Card>
            )
          })}
        </div>
      )}

    </div>
  )
}
