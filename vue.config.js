/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const webpack = require('webpack');

const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          APP_VERSION: `"${version}"`,
        },
      }),
    ],
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/divisor-client/' : '/',
};
