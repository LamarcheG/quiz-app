/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#01335E",
          DEFAULT: "#00539CFF",
          light: "#027EEB",
        },
        text: {
          OverBlue: "#f8f8f8",
          DEFAULT: "#e0e0e0",
        },
      },
      keyframes: {
        buttonClick: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        buttonClick: "buttonClick 0.15s ease-in-out",
      },
    },
  },
  plugins: [],
};
