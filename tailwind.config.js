/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
};
