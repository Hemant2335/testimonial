/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "5xl" : "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);" , 
        "3xl":
          "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
        "4xl":
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
        'inner-dark': 'inset 0 4px 6px rgba(255, 255, 255, 0.1), inset 0 -4px 6px rgba(0, 0, 0, 0.7)'
      },
      mixBlendMode: {
        multiply: "multiply", // Object of blend modes
        screen: "screen",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
    require('daisyui'),
  ],
};
