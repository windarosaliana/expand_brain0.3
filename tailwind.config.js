/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          black: "#0d0d0d",
          gray: "#f2f2f2",
        },
        accent: {
          cyan: "#06b6d4",
        },
      },
    },
  },
  plugins: [],
}