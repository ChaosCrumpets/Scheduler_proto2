/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      colors: {
        'onyx': { DEFAULT: '#3a3c41', 100: '#0c0c0d', 200: '#17181a', 300: '#232427', 400: '#2e3034', 500: '#3a3c41', 600: '#5e616a', 700: '#848892', 800: '#adafb6', 900: '#d6d7db' },
        'gold': { DEFAULT: '#d0b362', 100: '#2f260e', 200: '#5e4d1c', 300: '#8d732a', 400: '#bc9938', 500: '#d0b362', 600: '#d9c281', 700: '#e3d1a1', 800: '#ece0c0', 900: '#f6f0e0' },
        'peach-yellow': { DEFAULT: '#ddc992', 100: '#382e12', 200: '#705b23', 300: '#a78935', 400: '#cbad5b', 500: '#ddc992', 600: '#e4d4a8', 700: '#eadfbe', 800: '#f1e9d4', 900: '#f8f4e9' },
        'seashell': { DEFAULT: '#fdf2ec', 100: '#592509', 200: '#b14a13', 300: '#ea793b', 400: '#f4b594', 500: '#fdf2ec', 600: '#fdf5f0', 700: '#fef7f4', 800: '#fefaf8', 900: '#fffcfb' },
        'indian-red': { DEFAULT: '#e75f68', 100: '#39080c', 200: '#721117', 300: '#aa1923', 400: '#df2633', 500: '#e75f68', 600: '#ec7f86', 700: '#f19fa5', 800: '#f5bfc3', 900: '#fadfe1' },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
