import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#0A0A0F",
        depth: "#1A1F36",
        signal: "#00E5FF",
        static: "#F0F2F5",
        muted: "#6B7280",
        warm: "#FFB800",
        steel: "#374151",
      },
      fontFamily: {
        primary: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        "2xl": "64px",
        "3xl": "96px",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 229, 255, 0.15)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3)",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "pulse-signal": "pulse-signal 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-signal": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
