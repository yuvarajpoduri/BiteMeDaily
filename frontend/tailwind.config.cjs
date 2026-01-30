/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
        accent: {
          orange: '#FF8C00',
          green: '#4CAF50',
          yellow: '#FFD700',
          blue: '#1E90FF',
          purple: '#9370DB'
        }
      },
      animation: {
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
}
