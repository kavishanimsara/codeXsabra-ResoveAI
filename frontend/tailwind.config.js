/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hutch: {
          orange: '#FF5500',
          'orange-dark': '#E04800',
          'orange-glow': 'rgba(255,85,0,0.15)',
          'orange-light': '#FFF0E6',
          dark: '#111827',
          charcoal: '#1E242B',
          surface: '#EEF0F5'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'hutch': '0 8px 24px -4px rgba(255,85,0,0.30), 0 2px 6px -2px rgba(255,85,0,0.15)',
        'hutch-lg': '0 16px 40px -6px rgba(255,85,0,0.35)',
        'glass': '0 4px 24px -2px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.6)',
        'card': '0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 30px -4px rgba(0,0,0,0.10), 0 4px 10px -2px rgba(0,0,0,0.05)',
      },
      backgroundImage: {
        'hutch-gradient': 'linear-gradient(135deg, #FF5500 0%, #E04800 100%)',
        'dark-gradient': 'linear-gradient(135deg, #12161A 0%, #1E242B 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite linear',
        'count-up': 'countUp 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right': 'slideRight 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
