/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'red-to-transparent': 'linear-gradient(279.56deg, #FF4757 15.15%, rgba(255, 255, 255, 0) 171.55%)'
      },
      inset: {
        '5p': '5%',
        '10p': '10%',
        '20p': '20%',
        '40p': '40%',
      }
    },
  },
  plugins: [],
}

