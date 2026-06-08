import { useState, useEffect } from 'react'
import { ChefHat, Info, LogOut, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function ChefWizard() {
  const { profile, signOut } = useAuthStore()
  const navigate = useNavigate()

  // Form states
  const [kitchenName, setKitchenName] = useState('')
  const [bio, setBio] = useState('')
  const [area, setArea] = useState('Clifton, Karachi')
  const [radiusLimit, setRadiusLimit] = useState(3.0)
  const [operatingDays, setOperatingDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (profile?.name) {
      setKitchenName(`${profile.name}'s Kitchen`)
    }
  }, [profile])

  const toggleDay = (day: string) => {
    setOperatingDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const handleNext = () => {
    if (step < 2) {
      if (!kitchenName.trim()) {
        alert('Please enter a kitchen name.')
        return
      }
      setStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simulate API call to save chef details
    setTimeout(() => {
      setSubmitting(false)
      alert(`🎉 Congratulations! Your kitchen "${kitchenName}" is now registered in DastarKhwan. Start adding menu items to your digital storefront!`)
      // Redirect to chef dashboard
      navigate('/chef/dashboard')
    }, 1500)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background-primary flex flex-col justify-between font-sans transition-colors duration-300 pb-12">
      
      {/* Mini Header */}
      <header className="max-w-4xl w-full mx-auto px-4 py-6 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
            <ChefHat className="w-5 h-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground-primary">
            Dastar<span className="text-primary">Khwan</span>
          </span>
          <span className="ml-2 text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold uppercase">
            Chef Onboarding
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="text-foreground-secondary hover:text-foreground-primary flex items-center gap-1.5 font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Button>
      </header>

      {/* Main content container */}
      <main className="max-w-2xl w-full mx-auto px-4 flex-grow flex flex-col justify-center gap-6 py-12">
        <div className="text-center flex flex-col gap-2 max-w-lg mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Onboarding Step 2 of 2</span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground-primary">
            Configure Your Kitchen
          </h1>
          <p className="text-sm text-foreground-secondary leading-relaxed">
            Setup your local storefront details. Customers nearby will view this information before ordering.
          </p>
        </div>

        <Card className="border border-border/80 bg-card p-8 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-background-secondary">
            <div 
              className="bg-primary h-full transition-all duration-300" 
              style={{ width: `${step * 50}%` }}
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
            
            {step === 1 && (
              <div className="flex flex-col gap-5 animate-fadeIn">
                <div className="bg-primary-light border border-primary/20 p-4 rounded-xl flex gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-primary">Chef Storefront Registration</p>
                    <p className="text-[10px] text-primary/80 mt-0.5">
                      Your kitchen will default to a <strong>Pending Verification</strong> state. Once registered, DastarKhwan quality controllers will visit your kitchen for hygiene vetting.
                    </p>
                  </div>
                </div>

                <Input 
                  label="Kitchen Name" 
                  placeholder="e.g. Sana's Gourmet Spices"
                  value={kitchenName}
                  onChange={(e) => setKitchenName(e.target.value)}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground-secondary select-none">Kitchen Bio (Welcome Message)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell customers about your recipes, ingredients, and specialized family dishes..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="flex w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground-primary transition-all duration-200 placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5 animate-fadeIn">
                
                {/* Neighborhood Hub */}
                <div className="flex gap-4 items-end">
                  <div className="flex-grow">
                    <label className="text-xs font-medium text-foreground-secondary block mb-1.5">Karachi Delivery Neighborhood</label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="flex w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground-primary focus:outline-none focus:ring-2 focus:ring-primary min-h-[46px]"
                    >
                      <option value="Clifton, Karachi">Clifton, Karachi</option>
                      <option value="DHA Phase 6, Karachi">DHA Phase 6, Karachi</option>
                      <option value="Gulshan-e-Iqbal, Karachi">Gulshan-e-Iqbal, Karachi</option>
                    </select>
                  </div>

                  <div className="w-36 shrink-0">
                    <Input 
                      label="Delivery Radius (km)" 
                      type="number"
                      step="0.5"
                      min="1.0"
                      max="5.0"
                      value={radiusLimit}
                      onChange={(e) => setRadiusLimit(parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                {/* Operating Days */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-medium text-foreground-secondary">Operating Days</label>
                  <div className="flex flex-wrap gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                      const isActive = operatingDays.includes(day)
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`text-xs px-3.5 py-2 rounded-lg font-bold border transition-all ${
                            isActive 
                              ? 'bg-secondary text-white border-secondary shadow-sm' 
                              : 'bg-background-secondary border-border text-foreground-secondary hover:border-foreground-secondary/40'
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                  <span className="text-[10px] text-foreground-secondary mt-1">
                    Select the days you are active to receive subscriptions.
                  </span>
                </div>
              </div>
            )}

            {/* Form actions */}
            <div className="flex items-center justify-between mt-4 border-t border-border/50 pt-5">
              {step > 1 ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={submitting}
                  className="flex items-center gap-1 text-xs font-bold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              ) : (
                <div />
              )}

              {step === 1 ? (
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={handleNext}
                  className="w-36 font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={submitting}
                  className="w-44 font-bold flex items-center justify-center gap-1.5"
                >
                  {submitting ? 'Registering...' : 'Register Storefront'}
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              )}
            </div>

          </form>
        </Card>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-foreground-secondary max-w-2xl mx-auto w-full px-4 border-t border-border/20 pt-6">
        By continuing, you confirm your kitchen is a residential household operating in accordance with local hygiene rules.
      </footer>

    </div>
  )
}
