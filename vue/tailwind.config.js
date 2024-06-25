/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "rgb(129 140 248)" /* Tailwind indigo-400 */,
          500: "rgb(99 102 241)" /* Tailwind indigo-500 */,
          600: "rgb(79 70 229)" /* Tailwind indigo-600 */,
          700: "rgb(67 56 202)" /* Tailwind indigo-700 */,
        },
      },
      keyframes: {
        "fade-in-down": {
          from: {
            transform: "translateY(-0.75rem)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0rem)",
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.2s ease-in-out both",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
