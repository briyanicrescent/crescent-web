/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.vue",
    "./src/main.js",
    "./public/index.html",
    "./src/components/**/*.vue"
  ],
  theme: {
    extend: {
      colors:{
      },
      fontFamily:{
        boldTamil:['Noto Sans Tamil', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

