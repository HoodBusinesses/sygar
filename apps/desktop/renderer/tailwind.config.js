const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
      
    },
    extend: {
      backgroundImage: {
        'gradient-to-blue': 'linear-gradient(269.56deg, #2563EB -3.3%, #FFFFFF 101.39%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],  // Add Poppins to the theme
      },

    },
  },
  plugins: [],
}