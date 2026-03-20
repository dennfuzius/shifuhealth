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
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        "primary-lt": "var(--color-primary-lt)",
        accent: "var(--color-accent)",
        gold: "var(--color-gold)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        btn: "var(--radius-btn)",
        card: "var(--radius-card)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
    },
  },
  plugins: [],
};
export default config;
