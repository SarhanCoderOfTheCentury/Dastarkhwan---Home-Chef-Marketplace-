import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from './hooks/useAuthStore'
import AppRouter from './app/AppRouter'

function App() {
  const { loading, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-primary transition-colors duration-300">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <span className="text-sm font-medium text-foreground-secondary">Loading DastarKhwan Session...</span>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
