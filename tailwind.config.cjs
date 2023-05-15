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
      priGreyColor: '#828282',
      greyLight: '#F2F2F2',
      priDanger: '#F84C4C',
      borderColor: '#CED4DA',
      inputText: '#38393C',
    },

    fontSize: {
      8: '8px',
      10: '10px',
      12: '12px',
      15: '15px',
      16: '16px',
      18: '18px',
    },

    fontWeight: {
      400: '400px',
      500: '500px',
      600: '600px',
      700: '700px',
    },
    lineHeight: {
      18: '18px',
    },

    extend: {},
  },
  plugins: [],
};
