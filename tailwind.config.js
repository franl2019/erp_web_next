module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      fontSmoothing: ['hover', 'focus'],
      borderColor: ['checked'],
      backgroundColor: ['active','checked'],
      opacity: ['disabled']
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
