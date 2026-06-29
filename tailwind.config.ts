import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#080808",
        graphite: "#111111",
        steel: "#1b1b1b",
        gold: {
          300: "#f6e7a3",
          400: "#d4b35f",
          500: "#b9902d",
          600: "#8a671d"
        }
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(185, 144, 45, 0.18)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(185, 144, 45, 0.18), transparent 35%)",
        "panel-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        pulseLine: "pulseLine 2.5s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
