import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        primary: "#00D4FF",
        secondary: "#6E44FF",
        accent: "#00FFB2",
        foreground: "#FFFFFF",
        subtext: "#B7C0D1",
        "card-bg": "#0D1224",
        "card-border": "#1A2340",
        "glass-bg": "rgba(13, 18, 36, 0.7)",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #00D4FF, #6E44FF)",
        "gradient-accent": "linear-gradient(135deg, #6E44FF, #00FFB2)",
        "gradient-glow": "linear-gradient(180deg, rgba(0,212,255,0.15) 0%, rgba(110,68,255,0.1) 50%, transparent 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(110,68,255,0.3)" },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 30px rgba(0,212,255,0.4)",
        "glow-secondary": "0 0 30px rgba(110,68,255,0.4)",
        "glow-accent": "0 0 30px rgba(0,255,178,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
