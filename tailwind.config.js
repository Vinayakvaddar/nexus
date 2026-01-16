/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // custom colors for the interface
      colors: {
        obsidian: "#050505",
        gold: "#D4AF37",
        "gold-dim": "rgba(212, 175, 55, 0.20)",
        "tech-gray": "#C8C8C8",
      },
      fontFamily: {
        cinzel: ['"Cinzel"', "serif"],
        nunito: ['"Nunito"', "sans-serif"],
      },
      // smooth easing for the panels
      transitionTimingFunction: {
        'panel': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}