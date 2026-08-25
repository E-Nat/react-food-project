/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        foodly: {
          orange: '#FF7048',
          'orange-hover': '#E85B33',
          'orange-soft': '#FFE0D4',
          green: '#8FBF7A',
          'green-dark': '#2F5932',
          'green-soft': '#DCECCF',
          yellow: '#F5C84B',
          'yellow-soft': '#FFF0BD',
          pink: '#EFA7A5',
          'pink-soft': '#FDECEC',
          'bg-light': '#F7F5ED',
          'bg-dark': '#07100B',
          'text-dark': '#142019',
          'text-light': '#F7F5ED',
          'text-muted': '#68736D',
          'text-muted-dark': '#A9B4AE',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 10px 24px rgba(255, 112, 72, 0.28)',
        'glow-green': '0 10px 24px rgba(143, 191, 122, 0.32)',
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
