const path = require("path");
const resolve = require('resolve')


module.exports = {
    resolve: {
      extensions: ['js'],
      alias: {
        // '@': path.resolve(__dirname, './src'),
        // '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        // ...etc
      },
    },
  }


//   https://www.taniarascia.com/react-architecture-directory-structure/#components