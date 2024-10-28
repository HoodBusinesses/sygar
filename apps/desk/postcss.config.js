const tailwindConfig = require("./tailwind.config");

module.exports = {
  plugins: {
        tailwindcss: {
          config: './tailwind.config.js',
        },
        autoprefixer: {},
  },
}
