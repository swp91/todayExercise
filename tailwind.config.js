/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        itemgray: "#D9D9D9",
        maincolor: "#5467F5",
        bggray: "#F5F5F5",
        timered: "#F55454",
      },
      screens: {
        mobile: { max: "539px" },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".placeholder09": {
          "&::placeholder": {
            fontSize: "0.9rem",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
