/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        slideup: {
          "0%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        slideup: "slideup 3s ease-in-out",
      },
      colors: {
        primary: {
          light: "#FF5266",
          DEFAULT: "#FE4C60",
          dark: "#D13B4C",
        },
        secondary: {
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
      fontFamily: {
        sans: [
          "Nunito",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          "Overlock",
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
