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
        card: "var(--color-card)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        "primary-10": "var(--color-primary-10)",
        "primary-15": "var(--color-primary-15)",
        "primary-fg": "var(--color-primary-fg)",
        accent: "var(--color-accent)",
        gold: "var(--color-gold)",
        text: "var(--color-text)",
        "text-body": "var(--color-text-body)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
      },
      fontFamily: {
        logo: ["var(--font-logo)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        btn: "var(--radius-btn)",
        card: "var(--radius-card)",
        icon: "var(--radius-icon)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        primary: "var(--shadow-primary)",
      },
    },
  },
  plugins: [],
};
export default config;
