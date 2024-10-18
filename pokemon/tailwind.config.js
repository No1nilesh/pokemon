/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
                "exo": ['Exo', 'sans-serif']
            },

      backgroundColor : {
        "primary" : "#050a1a",
        "header" : "hsla(219, 32%, 16%, 1)",
        "primary-card" : "hsla(219, 32%, 16%, 1)",
        "card-border" : "hsl(207, 90%, 72%)"
      },

      textColor :{
        "card" : "hsl(207,90%,72%)"
      }
            
    },
  },
  plugins: [],
};
