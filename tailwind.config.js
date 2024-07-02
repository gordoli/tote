/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#9388D4",
        darkBlue: "#182547",
        lightBlue: "#748db3",
        slate: "#354160",
        skyBlue: "#1DA1F2",
        green: "#22A06B",
        cream: "#FFFEEF",

        rateColor1: "#D2DFFF",
        rateColor2: "#879BCD",
        rateColor3: "#505E94",
        rateColor4: "#364064",
        rateColor5: "#182547",
      },
    },
  },
  plugins: [],
};
