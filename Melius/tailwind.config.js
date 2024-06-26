/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#F0F8FF',
        'primary-color': '#0D91FA',
        'intermediate-color': '#8087FD',
        'secondary-color': '#5E4DFC',
      },
      boxShadow: {
        'custom-shadow': '0px 0px 15px 4px rgba(0,0,0,0.1)',
      }
    },


  },
  plugins: [],
}
