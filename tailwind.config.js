/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    spacing: { 1: "8px", 2: "16px", 3: "24px" },
    colors: { r: "red", p: "pink" },
    extend: {},
  },
  plugins: [],
};
