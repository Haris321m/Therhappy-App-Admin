/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '100' : '100%',
        '90' : '90%',
        '80' : '80%',
        '70' : '70%',
      },
    },
  },
  plugins: [],
}

