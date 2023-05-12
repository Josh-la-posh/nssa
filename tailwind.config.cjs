/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {},

    colors: {
      inherit: 'inherit',
      initial: 'initial',

      white: '#FFFFFF',

      black: '#000000',
      transparent: 'transparent',
      priBtnColor: '#3062B4',
      priBlueColor: '#215EAA',
      blueWhiteColor: '#F7FCFF',
      darkText: '#212529',
    },

    extend: {},
  },
  plugins: [],
};
