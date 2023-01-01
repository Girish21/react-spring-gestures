/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        'app-content': 'min(100% - 3rem, 1200px)',
      },
    },
  },
  plugins: [],
}
