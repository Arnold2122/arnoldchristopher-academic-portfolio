/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#FAF9F6',
          text: '#171717',
        },
        secondary: {
          bg: '#F4F1EA',
          text: '#6B6B6B',
        },
        card: {
          bg: '#FFFFFF',
        },
        gold: {
          DEFAULT: '#C6A15B',
          dark: '#9F7A35',
        },
        border: {
          DEFAULT: '#E8E1D3',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
