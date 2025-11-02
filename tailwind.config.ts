import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kitchenFloor: "#f4f1e9",
        bucketBlue: "#3a7bd5",
        potatoSkin: "#e0a96d",
        potatoShadow: "#b17c45"
      },
      animation: {
        wobble: "wobble 1.5s ease-in-out infinite",
        bob: "bob 3s ease-in-out infinite"
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px) rotate(-3deg)" },
          "50%": { transform: "translateX(6px) rotate(3deg)" },
          "75%": { transform: "translateX(-4px) rotate(-2deg)" }
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
