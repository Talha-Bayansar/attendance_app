/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21823C",
        "primary-transparent": "rgba(33, 130, 60, 0.7)",
        secondary: "#9DC8A8",
      },
      boxShadow: {
        large: "0px 4px 16px 0px rgba(0,0,0,0.1)",
        small: "0px 2px 8px 0px rgba(0,0,0,0.25)",
      },
      fontSize: {
        header1: ["34px", { fontWeight: "700" }],
        header2: ["20px", { fontWeight: "700" }],
        body: ["16px", { fontWeight: "400" }],
        small: ["10px", { fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
