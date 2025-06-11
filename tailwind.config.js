/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        load: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInPage: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        load: 'load 3s linear forwards',
        fadeIn: 'fadeIn 0.6s ease-out',
        fadeInPage: 'fadeInPage 1s ease-out forwards'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} 