import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.6rem",
        sm: "0.7rem",
        formBase: "0.8rem",
        // Add more or adjust existing sizes as needed
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "28": "repeat(28, minmax(0, 1fr))",
      },
      colors: {
        primary: {
          DEFAULT: "#f3c614",
          50: "#fffdf6",
          100: "#fef9ec",
          200: "#fdeca8",
          300: "#fcd964",
          400: "#fbcf20",
          500: "#f3c614",
          600: "#c7a30f",
          700: "#9b7f0a",
          800: "#6e5b05",
          900: "#423701",
        },
        secondary: {
          DEFAULT: "#f3c614",
          50: "#fffdf6",
          100: "#fef9ec",
          200: "#fdeca8",
          300: "#fcd964",
          400: "#fbcf20",
          500: "#f3c614",
          600: "#c7a30f",
          700: "#9b7f0a",
          800: "#6e5b05",
          900: "#423701",
        },
        gray: {
          50: "#f9fafb",
          100: "#f4f5f7",
          200: "#e5e7eb",
          300: "#d2d6dc",
          400: "#9fa6b2",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#252f3f",
          900: "#161e2e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
