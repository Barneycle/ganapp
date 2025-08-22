/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          navy: {
            600: '#1e3a8a',
            700: '#1e40af',
            800: '#1e3a8a',
          }
        }
      },
    },
    plugins: [],
  }
  