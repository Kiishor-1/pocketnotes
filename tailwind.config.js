/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom': '500px', // Custom breakpoint at 1024px
      },
      height: {
        '14': '3.5rem', 
        '16': '4rem',
      },
      backdropBrightness: {
        25: '.25',
        40: '.4',
        60: '.6',
        80: '.8',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
      })
    }
  ],
}

