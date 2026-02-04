import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core semantic palette driven by CSS variables */
        brand: {
          DEFAULT: "rgb(var(--color-brand))",
          soft: "rgb(var(--color-brand-soft))",
          strong: "rgb(var(--color-brand-strong))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent))",
          soft: "rgb(var(--color-accent-soft))",
        },
        /* Backwards-compatible aliases so existing classes still work,
           now mapped onto the minimal brand + accent palette */
        primary: {
          50: "rgb(var(--color-brand-soft))",
          100: "rgb(var(--color-brand-soft))",
          200: "rgb(var(--color-brand-soft))",
          300: "rgb(var(--color-brand))",
          400: "rgb(var(--color-brand))",
          500: "rgb(var(--color-brand))",
          600: "rgb(var(--color-brand-strong))",
          700: "rgb(var(--color-brand-strong))",
          800: "rgb(var(--color-brand-strong))",
          900: "rgb(var(--color-brand-strong))",
        },
        secondary: {
          50: "rgb(var(--color-accent-soft))",
          100: "rgb(var(--color-accent-soft))",
          200: "rgb(var(--color-accent-soft))",
          300: "rgb(var(--color-accent))",
          400: "rgb(var(--color-accent))",
          500: "rgb(var(--color-accent))",
          600: "rgb(var(--color-accent))",
          700: "rgb(var(--color-accent))",
          800: "rgb(var(--color-accent))",
          900: "rgb(var(--color-accent))",
        },
        surface: "rgb(var(--color-surface))",
        page: {
          DEFAULT: "rgb(var(--color-bg))",
          soft: "rgb(var(--color-bg-soft))",
        },
        border: "rgb(var(--color-border))",
        foreground: {
          DEFAULT: "rgb(var(--color-text))",
          muted: "rgb(var(--color-text-muted))",
        },
        success: "rgb(var(--color-success))",
        error: "rgb(var(--color-error))",
      },
    },
  },
  plugins: [],
};
export default config;
