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
        secondary: {
          dark: "#AD775C",
          DEFAULT: "#EEA47FFF",
          light: "#F0D5C7",
        },
        text: {
          OverBlue: "#01539D",
          OverPeach: "#EEA47F",
          DEFAULT: "#e0e0e0",
        },
      },
    },
  },
  plugins: [],
};
