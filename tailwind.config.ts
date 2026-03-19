import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary greens — life, growth, healing
        sage: {
          50: "#f6f7f4",
          100: "#e8ebe3",
          200: "#d1d7c7",
          300: "#b3bda3",
          400: "#95a17f",
          500: "#7a8865",
          600: "#5f6b4e",
          700: "#4a5440",
          800: "#3d4535",
          900: "#33392e",
        },
        // Earth tones — grounding, stability, trust
        earth: {
          50: "#faf8f5",
          100: "#f0ebe3",
          200: "#e0d5c6",
          300: "#ccb9a3",
          400: "#b89c80",
          500: "#a88468",
          600: "#9a7359",
          700: "#805e4a",
          800: "#694e40",
          900: "#574237",
        },
        // Warm cream — calm, warmth
        cream: {
          50: "#fefdfb",
          100: "#fdf9f3",
          200: "#faf2e5",
          300: "#f5e7d1",
          400: "#eed8b8",
          500: "#e5c89e",
        },
        // Deep forest — wisdom, depth
        forest: {
          700: "#2d4a3e",
          800: "#1f3a30",
          900: "#142b22",
        },
        // Accent — subtle warmth for CTAs
        terracotta: {
          400: "#c47d5a",
          500: "#b56a45",
          600: "#9c5838",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
