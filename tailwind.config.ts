import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        aeroBlue: "#C9E6CA", // Verde claro característico
        skyBlue: "#A3D5FF", // Azul cielo
        softBrown: "#C5A880", // Marrón claro
        softGray: "#E6E6E6", // Gris suave
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        aero: "0 10px 20px rgba(0, 0, 0, 0.15)", // Sombra suave
      },
    },
  },
  plugins: [],
} satisfies Config;
