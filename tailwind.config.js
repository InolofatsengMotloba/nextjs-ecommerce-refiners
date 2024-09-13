/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nerko: ['"Nerko One"', "cursive"], // Adding the Nerko One font
      },
      animation: {
        "bounce-1": "bounce 1s infinite 0.2s",
        "bounce-2": "bounce 1s infinite 0.4s",
        "bounce-3": "bounce 1s infinite 0.6s",
      },
    },
  },
  plugins: [],
};
