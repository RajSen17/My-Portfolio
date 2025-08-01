/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configure files to scan for Tailwind classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class', // Enable dark mode based on 'dark' class on html element
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define Inter font family
      },
    },
  },
  plugins: [],
}