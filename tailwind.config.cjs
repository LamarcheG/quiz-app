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
          primary: "#00539CFF",
        },
      },
    },
  },
  plugins: [],
};
