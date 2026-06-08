import { useState, useEffect } from 'react'
import { UtensilsCrossed, ChefHat, CheckCircle2, ArrowRight, LogOut, Loader2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function RoleSelection() {
  const { profile, session, updateRole, signOut, loading } = useAuthStore()
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<'customer' | 'chef' | null>(null)

  // Access control check
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!session) {
      navigate('/auth/login')
      return
    }

    // If role already assigned, redirect to their home portal
    if (profile && profile.role) {
      if (profile.role === 'customer') {
        navigate('/discovery')
      } else {
        navigate('/onboarding/chef-wizard')
      }
    }
  }, [session, profile, navigate])

  const handleNext = async () => {
    if (!selectedRole) return

    const res = await updateRole(selectedRole)
    if (res.success) {
      if (selectedRole === 'customer') {
        navigate('/discovery')
      } else {
        navigate('/onboarding/chef-wizard')
      }
    } else {
      alert(`Error updating role selection: ${res.error}`)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/auth/login')
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-primary p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-sm font-medium text-foreground-secondary">Redirecting to login...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-primary flex flex-col justify-between font-sans transition-colors duration-300 pb-12">
      
      {/* Mini Header */}
      <header className="max-w-5xl w-full mx-auto px-4 py-6 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
            <ChefHat className="w-5 h-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground-primary">
            Dastar<span className="text-primary">Khwan</span>
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

      {/* Main Form content */}
      <main className="max-w-3xl w-full mx-auto px-4 flex-grow flex flex-col justify-center gap-8 py-12">
        <div className="text-center flex flex-col gap-2 max-w-lg mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Onboarding Step 1 of 2</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground-primary leading-tight">
            How would you like to use DastarKhwan?
          </h1>
          <p className="text-sm text-foreground-secondary leading-relaxed">
            Select your account type below. This sets up your dashboard tools and cannot be changed later.
          </p>
        </div>

        {/* Role Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full mt-4">
          
          {/* Customer Card */}
          <Card 
            hoverable
            onClick={() => setSelectedRole('customer')}
            className={`cursor-pointer overflow-hidden border-2 transition-all duration-300 flex flex-col h-full relative ${
              selectedRole === 'customer' 
                ? 'border-primary shadow-md bg-primary/5 ring-1 ring-primary/20 scale-[1.02]' 
                : 'border-border bg-card hover:border-foreground-secondary/40'
            }`}
          >
            <CardContent className="p-8 flex flex-col items-center text-center gap-5 justify-between h-full">
              
              {/* Checkbox indicator */}
              <div className="absolute top-4 right-4">
                <div className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                  selectedRole === 'customer'
                    ? 'bg-success border-success text-white'
                    : 'border-border bg-background-primary'
                }`}>
                  {selectedRole === 'customer' && <CheckCircle2 className="w-4 h-4 fill-success text-white" />}
                </div>
              </div>

              <div className={`p-4 rounded-full transition-colors duration-300 ${
                selectedRole === 'customer' ? 'bg-primary/15 text-primary' : 'bg-background-secondary text-foreground-secondary'
              }`}>
                <UtensilsCrossed className="w-10 h-10" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold text-foreground-primary">I want to Order Food</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Browse verified home cooks in Clifton, DHA, or Gulshan. Setup flexible weekly subscriptions, choose delivery slots, and track meals in real-time.
                </p>
              </div>

              <div className="text-xs font-semibold text-primary mt-2">
                Discover Nearby Cooks
              </div>
            </CardContent>
          </Card>

          {/* Chef Card */}
          <Card 
            hoverable
            onClick={() => setSelectedRole('chef')}
            className={`cursor-pointer overflow-hidden border-2 transition-all duration-300 flex flex-col h-full relative ${
              selectedRole === 'chef' 
                ? 'border-primary shadow-md bg-primary/5 ring-1 ring-primary/20 scale-[1.02]' 
                : 'border-border bg-card hover:border-foreground-secondary/40'
            }`}
          >
            <CardContent className="p-8 flex flex-col items-center text-center gap-5 justify-between h-full">
              
              {/* Checkbox indicator */}
              <div className="absolute top-4 right-4">
                <div className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                  selectedRole === 'chef'
                    ? 'bg-success border-success text-white'
                    : 'border-border bg-background-primary'
                }`}>
                  {selectedRole === 'chef' && <CheckCircle2 className="w-4 h-4 fill-success text-white" />}
                </div>
              </div>

              <div className={`p-4 rounded-full transition-colors duration-300 ${
                selectedRole === 'chef' ? 'bg-primary/15 text-primary' : 'bg-background-secondary text-foreground-secondary'
              }`}>
                <ChefHat className="w-10 h-10" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold text-foreground-primary">I want to Cook & Earn</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Run a digital kitchen storefront from home. Build menus, handle daily prep sheets, set delivery radius limits, and verify your hygiene standards.
                </p>
              </div>

              <div className="text-xs font-semibold text-primary mt-2">
                Launch My Home Storefront
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-6">
          <Button 
            onClick={handleNext}
            disabled={!selectedRole || loading}
            variant="primary"
            size="lg"
            className="w-full sm:w-64 font-bold shadow-md h-12 flex items-center justify-center gap-2 group"
          >
            {loading ? 'Saving Profile...' : 'Complete & Continue'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-foreground-secondary max-w-3xl mx-auto w-full px-4 border-t border-border/20 pt-6">
        Need assistance? Contact DastarKhwan support at support@dastarkhwan.com
      </footer>

    </div>
  )
}
