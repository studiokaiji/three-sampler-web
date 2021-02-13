module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-dark": "#03044A",
        "primary": "#1C1F89",
        "primary-light": "#B7B8E4",
        "primary-thin": "F4F4F9",
        "secondary-dark": "#F59703",
        "secondary": "#F7C100",
        "sendodary-light": "#FFE58A",
        "secondary-thin": "#FFFCF5",
        "accent-dark": "#D4300C",
        "accent": "#E66218",
      },
      textColor: {
        "text-primary": "#03044A",
        "text-secondary": "#6E6E99",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
