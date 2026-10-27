/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", 
            "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
    extend: {
      screens: {
        xs: "450px",
      },
      colors: {
        "dark-1": "#09090a",
        "dark-2": "#121212",
        "dark-3": "#1a1a1a",
        "dark-4": "#2a2a2a",
        "light-1": "#ffffff",
        "light-3": "#7878a3",
        "light-4": "#aaaaaa",
        "black-500": "#1d2130",
        "primary-500": "#6366f1",
        "red": "#ff4d4f",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        465: "465px",
      },
      boxShadow: {
        card: "0px 0px 40px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}
