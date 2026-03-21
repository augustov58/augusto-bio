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
        paper: "#E8E2D6",
        "paper-alt": "#EEEFE9",
        "window-chrome": "#F5F0E8",
        "window-titlebar": "#D4CFC4",
        primary: "#1D2939",
        secondary: "#475467",
        accent: "#F54E00",
        "accent-hover": "#E04400",
        "window-border": "#B8B3A8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
