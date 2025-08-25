/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Seftec Brand Colors
        'seftec': {
          midnight: "hsl(var(--seftec-midnight))",
          purple: "hsl(var(--seftec-purple))",
          mint: "hsl(var(--seftec-mint))",
          gold: "hsl(var(--seftec-gold))",
          grey: "hsl(var(--seftec-grey))",
        },
        // SME Brand Colors (mapped to Seftec)
        'sme-primary': {
          DEFAULT: "hsl(var(--sme-primary))",
          light: "hsl(var(--sme-primary-light))",
          dark: "hsl(var(--sme-primary-dark))",
        },
        'sme-secondary': {
          DEFAULT: "hsl(var(--sme-secondary))",
          light: "hsl(var(--sme-secondary-light))",
        },
        'sme-accent': "hsl(var(--sme-accent))",
        'sme-neutral': {
          50: "hsl(var(--sme-neutral-50))",
          100: "hsl(var(--sme-neutral-100))",
          200: "hsl(var(--sme-neutral-200))",
          300: "hsl(var(--sme-neutral-300))",
          400: "hsl(var(--sme-neutral-400))",
          500: "hsl(var(--sme-neutral-500))",
          600: "hsl(var(--sme-neutral-600))",
          700: "hsl(var(--sme-neutral-700))",
          800: "hsl(var(--sme-neutral-800))",
          900: "hsl(var(--sme-neutral-900))",
        },
        // Base shadcn colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Urbanist', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
