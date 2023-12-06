/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          900: '#4f46e5',
          DEFAULT: '#4f46e5',
        },
        'secondary': '#625f6e',
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}