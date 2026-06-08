import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ DastarKhwan Warning: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing from environment variables. ' +
    'Local offline fallback triggers will be active for development evaluation.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://dastarkhwan-mock-url.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-anon-key'
)
