import { useState, useEffect, useRef } from 'react'
import { ChefHat, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { signInWithOtp, verifyOtp, loading, error, mockMode, setMockMode } = useAuthStore()
  const navigate = useNavigate()

  // Form states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [otpError, setOtpError] = useState('')
  
  // Step states
  const [step, setStep] = useState<'phone' | 'otp'>('phone') // 'phone' or 'otp'
  const [cooldown, setCooldown] = useState(0)
  const [showOtpSuccess, setShowOtpSuccess] = useState(false)

  // Timer ref for cooldown
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setTimeout(() => {
        setCooldown(prev => prev - 1)
      }, 1000)
    } else if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [cooldown])

  // Pakistani phone validation: e.g. 300 1234567, +923001234567, 03001234567
  const validatePhone = (number: string) => {
    const clean = number.replace(/[\s-]/g, '')
    // Match standard Pakistani mobile numbers: 3001234567, 923001234567, 03001234567, +923001234567
    const match = clean.match(/^(\+92|92|0)?(3\d{9})$/)
    if (!match) return null
    return '+92' + match[2] // Standardize to +923001234567
  }

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError('')
    
    const formattedPhone = validatePhone(phoneNumber)
    if (!formattedPhone) {
      setPhoneError('Please enter a valid Pakistani mobile number (e.g. 300 1234567 or 0300 1234567)')
      return
    }

    const res = await signInWithOtp(formattedPhone)
    if (res.success) {
      setStep('otp')
      setCooldown(60)
      setShowOtpSuccess(true)
      setTimeout(() => setShowOtpSuccess(false), 4000)
    } else {
      setPhoneError(res.error || 'Failed to send verification code. Try again.')
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setOtpError('')

    if (otpCode.length !== 6 || !/^\d+$/.test(otpCode)) {
      setOtpError('Please enter a valid 6-digit verification code.')
      return
    }

    const formattedPhone = validatePhone(phoneNumber)
    if (!formattedPhone) return

    const res = await verifyOtp(formattedPhone, otpCode)
    if (res.success) {
      // Auth success, check profile role for routing
      // Re-read profile from store
      const profile = useAuthStore.getState().profile
      if (profile && profile.role) {
        if (profile.role === 'customer') {
          navigate('/discovery')
        } else {
          navigate('/onboarding/chef-wizard')
        }
      } else {
        // Uncommitted profile role, go to onboarding role selection
        navigate('/onboarding/role')
      }
    } else {
      setOtpError(res.error || 'Incorrect verification code. Please check and try again.')
    }
  }

  const handleResend = async () => {
    if (cooldown > 0) return
    const formattedPhone = validatePhone(phoneNumber)
    if (!formattedPhone) return

    setOtpCode('')
    setOtpError('')
    const res = await signInWithOtp(formattedPhone)
    if (res.success) {
      setCooldown(60)
      setShowOtpSuccess(true)
      setTimeout(() => setShowOtpSuccess(false), 4000)
    } else {
      setOtpError(res.error || 'Failed to resend code.')
    }
  }

  const changePhone = () => {
    setStep('phone')
    setOtpCode('')
    setOtpError('')
  }

  return (
    <div className="min-h-screen bg-background-primary flex font-sans transition-colors duration-300">
      
      {/* Left Panel: Gourmet Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-background-secondary overflow-hidden items-center justify-center">
        {/* Background Image with warm overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: `url('/auth-bg.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#120e0c]/90 via-[#2b1610]/70 to-[#e05a36]/30" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Content Container */}
        <div className="relative z-10 max-w-lg px-8 text-white flex flex-col justify-between h-full py-16">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg border border-primary/20">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight">
                Dastar<span className="text-primary">Khwan</span>
              </span>
              <p className="text-[10px] text-white/50 tracking-widest font-semibold uppercase">Home Chef Marketplace</p>
            </div>
          </div>

          <div className="my-auto flex flex-col gap-6">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-primary-light px-3 py-1 rounded-full text-xs font-semibold w-fit border border-white/5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Sustaining Karachi's Culinary Legacies
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              A Taste of Home, Cooked with <span className="text-primary">Love & Care</span>
            </h1>
            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Connecting Karachi's household culinary artisans with families, students, and busy working professionals seeking fresh, hygienic daily meal plans.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-xl">
                <span className="text-2xl font-bold text-primary">6+</span>
                <p className="text-xs text-white/60 mt-0.5">Seeded Karachi Hubs</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-xl">
                <span className="text-2xl font-bold text-success">100%</span>
                <p className="text-xs text-white/60 mt-0.5">Hygiene Verified</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/40 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Secure encryption standards & verification powered by Supabase.</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Focused Login Box */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 py-12 bg-background-primary relative">
        
        {/* Floating Developer settings in top right */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-background-secondary border border-border px-3 py-1.5 rounded-lg text-[11px] font-semibold text-foreground-secondary shadow-sm">
            <input 
              type="checkbox" 
              id="devModeToggle" 
              checked={mockMode} 
              onChange={(e) => setMockMode(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5 cursor-pointer"
            />
            <label htmlFor="devModeToggle" className="cursor-pointer select-none">
              Dev Mode (Bypass OTP)
            </label>
          </div>
        </div>

        <div className="w-full max-w-md flex flex-col gap-8">
          
          {/* Header Mobile Only */}
          <div className="flex flex-col items-center text-center lg:hidden gap-2">
            <div className="bg-primary p-2.5 rounded-xl shadow-md">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Dastar<span className="text-primary">Khwan</span>
            </h2>
            <p className="text-xs text-foreground-secondary">Karachi's Premium Home-Chef Subscriptions</p>
          </div>

          {/* Core Login Card */}
          <div className="bg-card border border-border p-8 rounded-2xl shadow-lg flex flex-col gap-6 relative overflow-hidden transition-colors duration-300">
            
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display text-2xl font-bold text-foreground-primary">Welcome to DastarKhwan</h2>
              <p className="text-sm text-foreground-secondary">
                Enter your mobile number to sign in or create a kitchen profile.
              </p>
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/25 text-danger px-4 py-3 rounded-xl text-xs font-medium animate-fadeIn">
                {error}
              </div>
            )}

            {showOtpSuccess && (
              <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verification code sent successfully. Use <strong>123456</strong> if using Dev Mode.</span>
              </div>
            )}

            {/* OTP Height-Sliding Container */}
            <div className="relative">
              {/* Step 1: Phone Form */}
              <form onSubmit={handleSendCode} className="flex flex-col gap-5">
                <div className="flex gap-2 items-end">
                  <div className="w-20 shrink-0">
                    <label className="text-xs font-medium text-foreground-secondary select-none block mb-1.5">Prefix</label>
                    <div className="flex items-center justify-center bg-background-secondary border border-border rounded-md px-3 py-3 text-sm font-semibold h-[46px] select-none text-foreground-secondary">
                      +92
                    </div>
                  </div>
                  <div className="flex-grow">
                    <Input
                      label="Mobile Number"
                      type="tel"
                      placeholder="300 1234567"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value)
                        if (phoneError) setPhoneError('')
                      }}
                      disabled={step === 'otp' || loading}
                      error={!!phoneError}
                      errorMessage={phoneError}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Sliding OTP Input */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    step === 'otp' ? 'max-h-36 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="border-t border-border/50 pt-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-foreground-secondary">6-Digit Verification Code</label>
                      <button 
                        type="button" 
                        onClick={changePhone} 
                        className="text-xs text-primary hover:underline font-semibold"
                        disabled={loading}
                      >
                        Change Number
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 123456"
                        value={otpCode}
                        onChange={(e) => {
                          setOtpCode(e.target.value.replace(/\D/g, ''))
                          if (otpError) setOtpError('')
                        }}
                        disabled={loading}
                        className={`flex w-full rounded-md border bg-card px-4 py-3 text-center text-lg tracking-widest font-mono font-bold text-foreground-primary transition-all duration-200 placeholder:text-foreground-secondary placeholder:tracking-normal placeholder:font-normal focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[46px] ${
                          otpError 
                            ? 'border-danger focus:ring-danger/20 focus:border-danger' 
                            : 'border-border focus:ring-primary focus:border-primary hover:border-foreground-secondary/40'
                        }`}
                      />
                      {otpError && (
                        <span className="text-xs text-danger font-medium mt-1 block">
                          {otpError}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submission Action */}
                {step === 'phone' ? (
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full font-bold shadow-md h-12 flex items-center justify-center gap-2 group mt-2"
                    disabled={loading}
                  >
                    {loading ? 'Sending Code...' : 'Send Verification Code'}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3 mt-2">
                    <Button 
                      type="button" 
                      variant="primary" 
                      onClick={handleVerifyCode}
                      className="w-full font-bold shadow-md h-12 flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify & Sign In'}
                    </Button>
                    <div className="flex justify-between items-center text-xs mt-1 text-foreground-secondary px-1">
                      <span>Didn't receive the SMS?</span>
                      <button 
                        type="button" 
                        onClick={handleResend}
                        disabled={cooldown > 0 || loading}
                        className={`font-semibold transition-colors duration-200 ${
                          cooldown > 0 
                            ? 'text-foreground-secondary/50 cursor-not-allowed' 
                            : 'text-primary hover:text-primary-hover hover:underline'
                        }`}
                      >
                        {cooldown > 0 ? `Resend Code (${cooldown}s)` : 'Resend SMS'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Dev helper instructions */}
            {mockMode && (
              <div className="bg-primary-light border border-primary/20 rounded-xl p-3.5 flex gap-2.5 animate-fadeIn">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-primary">Developer Test Sandbox</p>
                  <p className="text-[10px] text-primary/80 mt-0.5">
                    1. Use any phone number (e.g. <strong>3001112233</strong> for Chef Sana, or any new number).
                    <br />
                    2. Use mock verification code: <strong>123456</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center text-xs text-foreground-secondary px-4">
            By signing in, you agree to DastarKhwan's 
            <a href="#" className="underline ml-1 hover:text-foreground-primary">Terms of Service</a> and 
            <a href="#" className="underline ml-1 hover:text-foreground-primary">Privacy Guidelines</a>.
          </div>

        </div>
      </div>
    </div>
  )
}
