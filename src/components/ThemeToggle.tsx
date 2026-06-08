import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from './ui/Button'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="text-foreground-secondary hover:text-foreground-primary transition-all duration-200 border-border/80"
      aria-label={`Toggle theme: current is ${theme}`}
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </Button>
  )
}
