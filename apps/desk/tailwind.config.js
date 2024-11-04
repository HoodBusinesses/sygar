const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      satisfies: ['rtl:'],
      backgroundImage: {
        // 'gradient-to-blue': 'linear-gradient(269.56deg, #2563EB -3.3%, #FFFFFF 101.39%)',
        'gradient-to-blue':
          'url("/images/background.png") , linear-gradient(269.56deg, #2563EB , #FFFFFF )'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'] // Add Poppins to the theme
      }
    }
  },
  plugins: []
}
