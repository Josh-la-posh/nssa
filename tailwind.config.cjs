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
      error: '#F84C4C',
      green: '#0DB153',
      blue: {
        600: '#215EAA',
        500: '#3062B4',
        400: '#3B79DE',
        300: '#6187CD',
        200: '#C5D8FC',
        100: '#DEE9FF',
      },
      gray: {
        900: '#242424',
        800: '#424242',
        700: '#616161',
        600: '#757575',
        500: '#9E9E9E',
        400: '#C2C2C2',
        300: '#E0E0E0',
        200: '#EDEDED',
        100: '#F4F4F4',
      },
      orange: {
        500: '#EC6300',
        400: '#F8700D',
        300: '#FF8227',
        200: '#FFA15E',
        100: '#FFA15E',
      },

      success: {
        600: '#073218',
        500: '#0B4D25',
        400: '#0E6330',
        300: '#B4CCBD',
        200: '#CED9D2',
        100: '#EDFAF3',
      },
      warning: {
        600: '#806217',
        500: '#D4A326',
        400: '#FFC42E',
        300: '#D9D0B8',
        200: '#E5DFCF',
        100: '#FAF6ED',
      },
      danger: {
        600: '#7B0F0F',
        500: '#930B0B',
        400: '#AD1010',
        300: '#D99F9F',
        200: '#E5D0D0',
        100: '#FFE3E3',
      },
      status: {
        warning: {},
        error: '#E41236',
        success: '#00AB59',
      },

      dark: '#111621',
      light: '#F6F6FC',
    },

    extend: {},
  },
  plugins: [],
};
