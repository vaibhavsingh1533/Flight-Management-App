import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e293b",
        success: "#16a34a",
        danger: "#dc2626",
        warning: "#f59e0b"
      }
    }
  },
  plugins: []
};

export default config;