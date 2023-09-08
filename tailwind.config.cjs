/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        henny: ["Henny Penny"],
        silk: ["Silkscreen"],
      },
    },
  },
  plugins: [],
};
