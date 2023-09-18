const path = require('path');
const webpack = require('webpack');

const supportedLocales = [
  'en-US',
  'en-GB',
  'de',
];

module.exports = {
  entry: './scripts/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: 'production',
};
