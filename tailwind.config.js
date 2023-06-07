const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        primary: {
          DEFAULT: '#55FF79',
          dark: '#1D4D27',
          darker: '#213728',
        },
        secondary: {
          DEFAULT: '#C86DC9',
        },
      },
      spacing: {
        15: '3.75rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
