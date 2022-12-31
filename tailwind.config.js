/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        'app-content': 'min(100%, 100vw - 30rem)',
      },
      backgroundImage: {
        'color-strip':
          'linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)',
      },
    },
  },
  plugins: [],
}
