/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hand: ['Virgil'],
        display: ["'Averia Sans Libre'", ...defaultTheme.fontFamily.serif],
        mono: ["'Fira Code Variable'", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
