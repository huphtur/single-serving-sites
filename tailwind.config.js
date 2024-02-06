/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,liquid}"],
  theme: {
    extend: {   
      fontFamily: {
        'sans': ['Seravek, Gill Sans Nova, Ubuntu, Calibri, DejaVu Sans, source-sans-pro, sans-serif']
      },   
      screens: {
        xs: "480px",
      },
      boxShadow: {
        hard: "6px 6px 0 0 rgba(0,0,0,1)",
      },
    },
  },
  plugins: [],
};
