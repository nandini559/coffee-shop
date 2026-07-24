/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coffee: {
          950: '#160F0B',
          900: '#241812',
          800: '#3D291F',
          700: '#5C4337',
          600: '#855E4C',
          500: '#A6735B',
          400: '#C67C4E',
          300: '#D48C5B',
          200: '#E8C5A8',
          100: '#F5EFE6',
          50: '#FDFBF7',
        },
        caramel: {
          DEFAULT: '#C67C4E',
          light: '#E8AA68',
          dark: '#A35D31'
        },
        crema: {
          DEFAULT: '#F0C085',
          light: '#F8E6D3',
          dark: '#D48C5B'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(198, 124, 78, 0.3)',
        'glow-lg': '0 0 35px -5px rgba(198, 124, 78, 0.4)',
        'card-soft': '0 10px 30px -5px rgba(44, 26, 20, 0.05)',
      },
    },
  },
  plugins: [],
}
