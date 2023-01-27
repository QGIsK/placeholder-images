/* eslint-disable */
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
    fallback: {
      timers: require.resolve('timers-browserify'),
      string_decoder: require.resolve('string_decoder/'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
}
