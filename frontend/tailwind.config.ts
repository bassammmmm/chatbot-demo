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
        primary: 'var(--primary)',
        onPrimary: 'var(--on-primary)',
        primaryContainer: 'var(--primary-container)',
        secondary: 'var(--secondary)',
        secondaryContainer: 'var(--secondary-container)',
        onPrimaryContainer: 'var(--on-primary-container)',
        onSecondaryContainer: 'var(--on-secondary-container)',
        onSurface: 'var(--on-surface)',
        onSurfaceVariant: 'var(--on-surface-variant)',
        onSecondary: 'var(--on-secondary)',
        surface: 'var(--surface)',
        surfaceContainerHigh: 'var(--surface-container-high)',
        surfaceContainerLowest: 'var(--surface-container-lowest)',
        surfaceContainerLow: 'var(--surface-container-low)',
        outlineVariant: 'var(--outline-variant)',
        outline: 'var(--outline)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderRadius: {
        button: '16px',
        block: '28px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },

    },
  },
  plugins: [],
} satisfies Config;