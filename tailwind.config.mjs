/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        dark: '#222222',
        light: '#eeeeee',
        'shade-dark': 'rgba(34, 34, 34, 0.5)',
        'shade-light': 'rgba(255, 255, 255, 0.8)',
        line: 'rgba(128, 128, 128, 0.2)',
      },
      fontFamily: {
        sans: ['Rethink Sans', 'sans-serif'],
      },
      fontSize: {
        h1: '3.5rem',
        h2: '2.5rem',
        h3: '1.5rem',
        p: '1rem',
        small: '0.8rem',
      },
      spacing: {
        'section-gap': '8rem',
        'div-gap': '6rem',
        'item-gap': '4rem',
        'thin-gap': '2rem',
      },
      backdropBlur: {
        blur: '1rem',
      },
    },
  },
  plugins: [],
};

