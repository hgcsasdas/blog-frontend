/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#19256D',
        opposite: '#F1FFEB',
        primary2: '#1739CC',
        opposite2: '#C8FFB3',
        secondary: '#8093D8'
      },
      backgroundColor: {
        'page-light': '#F1FFEB',
        'page-dark': '#19256D',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#19256D",
          secondary: "#8093D8",
          accent: "#1739CC",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
}
