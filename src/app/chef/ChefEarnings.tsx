import { TrendingUp, Award, DollarSign, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

export default function ChefEarnings() {
  const earningsHistory = [
    { id: 'pay-01', week: 'Week 23 (Jun 01 - Jun 07)', orders: 14, amount: 12500, status: 'paid' },
    { id: 'pay-02', week: 'Week 22 (May 25 - May 31)', orders: 12, amount: 10400, status: 'paid' }
  ]

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground-primary">
          Storefront Earnings
        </h1>
        <p className="text-xs sm:text-sm text-foreground-secondary">
          Track weekly subscription payouts, review order cash flows, and manage mobile wallet withdrawal linkages.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <Card className="border border-border/80 bg-card transition-colors duration-300">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-foreground-secondary font-bold uppercase">Pending Balance</span>
              <h3 className="text-lg font-bold text-foreground-primary mt-1">PKR 7,500</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 bg-card transition-colors duration-300">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-foreground-secondary font-bold uppercase">Total Earned (June)</span>
              <h3 className="text-lg font-bold text-foreground-primary mt-1">PKR 22,900</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 bg-card transition-colors duration-300">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-info/10 text-info rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-foreground-secondary font-bold uppercase">Average Review Score</span>
              <h3 className="text-lg font-bold text-foreground-primary mt-1">★ 4.8 / 5.0</h3>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Wallet linking & details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Earnings History Table */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-foreground-primary flex items-center gap-1.5">
            <Calendar className="w-5 h-5 text-primary" /> Payout History
          </h2>

          <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs transition-colors duration-300">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-background-secondary/40 border-b border-border/60 text-foreground-secondary font-bold uppercase tracking-wider text-[10px]">
                  <th className="px-5 py-4">Week Interval</th>
                  <th className="px-5 py-4">Meals Delivered</th>
                  <th className="px-5 py-4">Net Payout</th>
                  <th className="px-5 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {earningsHistory.map(row => {
                  return (
                    <tr key={row.id} className="border-b border-border/40 hover:bg-background-secondary/20 transition-colors">
                      <td className="px-5 py-4 font-bold text-foreground-primary">{row.week}</td>
                      <td className="px-5 py-4 text-foreground-secondary font-medium">{row.orders} orders</td>
                      <td className="px-5 py-4 text-primary font-bold">PKR {row.amount.toLocaleString()}</td>
                      <td className="px-5 py-4 text-right">
                        <Badge variant="success" className="capitalize text-[10px]">
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Account card */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-foreground-primary">Payout Account</h2>

          <Card className="border border-border/80 bg-card transition-colors duration-300">
            <CardContent className="p-5 flex flex-col gap-4">
              <span className="text-[10px] text-foreground-secondary font-bold uppercase">Linked Mobile Wallet</span>
              <div className="bg-background-secondary/50 border border-border/50 rounded-xl p-4 flex flex-col gap-1 text-xs">
                <span className="font-bold text-foreground-primary">Easypaisa Mobile Account</span>
                <span className="text-foreground-secondary mt-1">Account Number: 0300****67</span>
                <span className="text-[10px] text-success font-semibold mt-1">✓ Connected & Active</span>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                Change Wallet Settings <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  )
}
