/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/App.vue",
    "./src/assets/**/*.css",
    "./src/components/**/*.vue",
    "./src/views/**/*.vue",
    "./src/views/posts/**/*.vue",
    "./src/components/posts/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
