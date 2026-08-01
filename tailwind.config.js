/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "./content/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#e8b923",
          goldLight: "#ffd87e",
          dark: "#0b1123",
          surface: "#1a1f35",
          blue: "#1e3a8a"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"]
      }
    }
  },
  plugins: []
};
