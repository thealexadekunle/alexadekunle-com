import type { Config } from "tailwindcss";

/**
 * Design tokens — the single source of truth for the visual system.
 * Mirrored as CSS custom properties in app/globals.css so plain CSS
 * (pseudo-elements, keyframes, the cursor) can reach the same values.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#DEDEE2",
        },
        line: {
          DEFAULT: "#E4E4E7",
          strong: "#D4D4D8",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          pure: "#000000",
          900: "#18181B",
          800: "#27272A",
        },
        zinc: {
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
        },
        accent: {
          DEFAULT: "#FFA500",
          soft: "rgba(255, 165, 0, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.055em",
        editorial: "-0.035em",
        label: "0.2em",
      },
      maxWidth: {
        "8xl": "100rem",
        measure: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 2.5rem)",
        section: "clamp(5rem, 12vw, 10rem)",
      },
      fontSize: {
        label: ["11px", { lineHeight: "1.2", letterSpacing: "0.2em" }],
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        drawerIn: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        ping: "ping 1.9s cubic-bezier(0, 0, 0.2, 1) infinite",
        marquee: "marquee 34s linear infinite",
        drawerIn: "drawerIn 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
