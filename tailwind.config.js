/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#0F1108",
        secondary: "#D64550",
        secondaryLight: "#EA9E8D",
        secondarySecondary: "#ffffff",
        secondarySecondarylight: "#f2f1f1",
        textWhiteWithSecondary : "#F2F7F2",
        gold : "#F6BA00"
      },
      fontFamily: {
        lato: ["var(--font-Lato)"],
      },
    },
  },

  plugins: [],
};

// main: "#000000",
//         secondary: "#D64550",
//         secondaryLight: "#EA9E8D",
//         secondarySecondary: "#ffffff",
//         secondarySecondarylight: "#f2f1f1",
