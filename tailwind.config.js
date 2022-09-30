const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        gray: colors.neutral,
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}

