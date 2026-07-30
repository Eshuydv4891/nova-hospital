import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9B111E", // Deep Medical Red
          hover: "#800E19",
          light: "#FFF0F2",
          dark: "#660B14",
        },
        secondary: {
          DEFAULT: "#D4AF37", // Royal Gold
          hover: "#B89628",
          light: "#FFF9E6",
          dark: "#967A1F",
        },
        navy: {
          DEFAULT: "#0B132B", // Dark Navy Accent
          light: "#1C2541",
          border: "#2A3A5E",
        },
        cream: "#FAF8F5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.08)",
        gold: "0 4px 20px -2px rgba(212, 175, 55, 0.3)",
        red: "0 4px 20px -2px rgba(155, 17, 30, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
