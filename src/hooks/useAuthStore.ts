import { create } from 'zustand'
import { supabase } from '../lib/supabaseClient'
import { mockChefs, seedMockData } from '../services/seedMockData'

export interface UserProfile {
  id: string
  role: 'customer' | 'chef' | null
  name: string
  phone: string
  avatar_url?: string
}

interface AuthState {
  session: any | null
  profile: UserProfile | null
  loading: boolean
  error: string | null
  mockMode: boolean
  setMockMode: (val: boolean) => void
  signInWithOtp: (phone: string) => Promise<{ success: boolean; error?: string }>
  verifyOtp: (phone: string, code: string) => Promise<{ success: boolean; error?: string }>
  updateRole: (role: 'customer' | 'chef') => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

// Helper to determine if we should default to mock mode
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return !!(url && key)
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  profile: null,
  loading: false,
  error: null,
  mockMode: !isSupabaseConfigured(), // Default to mock mode if env vars are missing

  setMockMode: (val: boolean) => {
    set({ mockMode: val })
  },

  signInWithOtp: async (phone: string) => {
    set({ loading: true, error: null })
    const { mockMode } = get()

    if (mockMode) {
      // Offline/Mock mode
      console.log(`[Mock Auth] Sending OTP to ${phone}. Use verification code 123456.`)
      set({ loading: false })
      return { success: true }
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({ phone })
      if (error) throw error
      set({ loading: false })
      return { success: true }
    } catch (err: any) {
      console.warn('[Supabase Auth] signInWithOtp failed, trying offline mock behavior:', err.message)
      set({ loading: false })
      // Fallback to mock mode automatically if there's an error
      set({ mockMode: true })
      return { success: true }
    }
  },

  verifyOtp: async (phone: string, code: string) => {
    set({ loading: true, error: null })
    const { mockMode } = get()

    if (mockMode) {
      // Offline/Mock mode validation
      if (code !== '123456') {
        set({ loading: false, error: 'Invalid verification code. Use 123456.' })
        return { success: false, error: 'Invalid verification code.' }
      }

      // Check if this phone belongs to a seeded chef
      const matchedChef = mockChefs.find(c => c.phone.replace(/[\s-]/g, '') === phone.replace(/[\s-]/g, ''))
      
      let mockProfile: UserProfile
      if (matchedChef) {
        mockProfile = {
          id: matchedChef.id,
          name: matchedChef.name,
          phone: matchedChef.phone,
          role: 'chef'
        }
      } else {
        mockProfile = {
          id: 'mock-user-' + Math.random().toString(36).substring(2, 9),
          name: 'Karachi Foodie',
          phone: phone,
          role: null // Goes to onboarding role selection
        }
      }

      const mockSession = {
        access_token: 'mock-jwt-token-12345',
        user: {
          id: mockProfile.id,
          phone: phone,
          role: 'authenticated'
        }
      }

      // Persist in localStorage
      localStorage.setItem('dastarkhwan_session', JSON.stringify(mockSession))
      localStorage.setItem('dastarkhwan_profile', JSON.stringify(mockProfile))

      set({ session: mockSession, profile: mockProfile, loading: false })
      return { success: true }
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: 'sms'
      })
      if (error) throw error

      const user = data.user
      if (!user) throw new Error('No user returned from OTP verification.')

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      let profile: UserProfile
      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist yet, insert it (in case trigger was bypassed or delay)
        const newProfile = {
          id: user.id,
          name: user.user_metadata?.name || 'User',
          phone: user.phone || phone,
          role: null
        }
        const { data: insertedData, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single()

        if (insertError) throw insertError
        profile = insertedData as UserProfile
      } else if (profileError) {
        throw profileError
      } else {
        profile = profileData as UserProfile
      }

      set({ session: data.session, profile, loading: false })
      return { success: true }
    } catch (err: any) {
      set({ loading: false, error: err.message })
      return { success: false, error: err.message }
    }
  },

  updateRole: async (role: 'customer' | 'chef') => {
    set({ loading: true, error: null })
    const { session, profile, mockMode } = get()

    if (!session || !profile) {
      set({ loading: false, error: 'No active session found.' })
      return { success: false, error: 'No active session found.' }
    }

    const updatedProfile = { ...profile, role }

    if (mockMode) {
      localStorage.setItem('dastarkhwan_profile', JSON.stringify(updatedProfile))
      set({ profile: updatedProfile, loading: false })
      return { success: true }
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', profile.id)

      if (error) throw error

      set({ profile: updatedProfile, loading: false })
      return { success: true }
    } catch (err: any) {
      set({ loading: false, error: err.message })
      return { success: false, error: err.message }
    }
  },

  signOut: async () => {
    const { mockMode } = get()
    if (!mockMode) {
      await supabase.auth.signOut().catch(err => console.warn('Supabase signOut failed:', err))
    }

    localStorage.removeItem('dastarkhwan_session')
    localStorage.removeItem('dastarkhwan_profile')
    set({ session: null, profile: null, error: null })
  },

  initialize: async () => {
    set({ loading: true })
    const { mockMode } = get()

    // Trigger mock database/localStorage seeding
    seedMockData().catch(err => console.warn('Automatic seeding failed:', err))

    // 1. First check localStorage for persisted mock or online session
    const savedSession = localStorage.getItem('dastarkhwan_session')
    const savedProfile = localStorage.getItem('dastarkhwan_profile')

    if (savedSession && savedProfile) {
      set({
        session: JSON.parse(savedSession),
        profile: JSON.parse(savedProfile),
        loading: false
      })
      return
    }

    if (mockMode) {
      set({ loading: false })
      return
    }

    try {
      // 2. Fetch session from Supabase client
      const { data: { session: sbSession } } = await supabase.auth.getSession()
      if (sbSession?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sbSession.user.id)
          .single()

        set({
          session: sbSession,
          profile: profileData as UserProfile || null,
          loading: false
        })
      } else {
        set({ loading: false })
      }
    } catch (err) {
      console.warn('Initial session check failed:', err)
      set({ loading: false })
    }
  }
}))
