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
      },

      keyframes: {
        'fade-up': {
          '0%': {transform: 'translateY(30px)', opacity: 0},
          '100%': {transform: 'translateY(0px)', opacity: 1}
        },
        'fade-up-slower': {
          '0%': {transform: 'translateY(-30px)', opacity: 0},
          '100%': {transform: 'translateY(0px)', opacity: 1}
        },
        'fade-down': {
          '0%': {transform: 'translateY(-60px)', opacity: 0},
          '100%': {transform: 'translateY(0px)', opacity: 1}
        }
      },

      animation: {
        'fade-up': 'fade-up 0.4s ease-in-out',
        'fade-up-slower': 'fade-up 1s ease-out',
        'fade-down': 'fade-down 1s ease-out',
      }
    },


  },
  plugins: [],
}
