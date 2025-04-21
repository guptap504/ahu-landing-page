
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6", // Vivid purple for accent (CTA)
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "#0EA5E9", // Ocean Blue accent
          foreground: "#fff",
        },
        energy: "#F2FCE2",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.23,1,0.32,1)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(102.3deg, #93278f 5.9%, #eadae8 85%)",
        "feature-gradient": "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
      },
      boxShadow: {
        glass: "0 6px 32px 0 rgba(139,93,246,0.10)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
