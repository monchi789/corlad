/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito Sans', 'sans-serif'],
        'mukta': ['Mukta', 'sans-serif'],
        'didact': ['Didact Gothic', 'sans-serif']
      },
      keyframes: {
        efecto: {
          '0%': { boxShadow: '0 0 0 0 rgba(9, 145, 5, 0.85)' },
          '100%': { boxShadow: '0 0 0 25px rgba(50, 121, 3, 0)' },
        },
      },
      animation: {
        efecto: 'efecto 1s infinite',
      },
      boxShadow: {
        'custom': '0 4px 15px 0 rgba(37, 58, 41)',
        'custom-input': '0px 4px 5px 0px rgba(0, 0, 0, 0.25)'
      },
      colors:{
        'default': '#3A3A3A',
        'default-green': '#00330A',
        'light': '#ECF6E8',
        'default-input': '#F1F9F1',
        'corlad': '#007336',
        'best-green': '#0A8541',
        'custom-yellow': '#CCB23A',
      }
    },
  },
  plugins: [],
}

