const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
    './node_modules/flowbite/**/*.js',


  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'primary-color-1' : '#1A1A40',
      'primary-color-2' : '#2A2A6A',
      'primary-color-3' : '#270082',
      'primary-color-4' : '#7A0BC0',
      'primary-color-5' : '#FA58B6',
      'primary-color-6': '#353839',
      'primary-color-hover':'#3d3c3d',
      'primary-color-bg':'#212021d5',

      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red : colors.red,
      purple: colors.purple

      
    },
    fontFamily: {
      'main-font' : ['Roboto','sans-serif']
    },
    extend: {

    },

    lineClamp: {
      1: 1,
      2: 2,
      3: 3
    }
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-line-clamp'),
    require('flowbite/plugin'),
  ],
}
