/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        slideleft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        slideleft: "slideleft 0.5s ease-in",
      },
      colors: {
        primary: {
          light: "#FF5266",
          DEFAULT: "#FE4C60",
          dark: "#D13B4C",
        },
        secondary: {
          light: "#2a2c36",
          DEFAULT: "#121420",
        },
        white: {
          DEFAULT: "#FFFFFF",
          blue: "#F1F9FE",
          green: "#F5F7F2",
        },
        gray: {
          light: "#EFEFEF",
          DEFAULT: "#A5A7AC",
        },
      },
    },
    fontFamily: {
      Asap: ["Asap", "cursive"],
    },
  },
  plugins: [],
};
