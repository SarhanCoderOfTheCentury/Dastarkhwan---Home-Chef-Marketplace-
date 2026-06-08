/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
        },
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        background: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
        },
        foreground: {
          primary: 'var(--color-foreground-primary)',
          secondary: 'var(--color-foreground-secondary)',
        },
        border: 'var(--color-border)',
        card: 'var(--color-card)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Playfair Display', 'serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      keyframes: {
        'modal-in': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        }
      },
      animation: {
        'modal-in': 'modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
