/**
 * This file contains basic configuration of webpack for development
 * For more information on this, see https://webpack.js.org/guides/development/
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // This config is meant for development, please avoid using them in production!
  mode: 'development',

  // The point or points where to start the application bundling process.
  entry: {
    index: './src/index.js',
  },

  // Tells the dev server where to look for files.
  // This tells webpack-dev-server to serve the files from the dist directory on localhost:8080
  devServer: {
    contentBase: './dist',
  },

  // Customize the webpack build process
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],

  // Contains set of options instructing webpack on how and where it should
  // output bundles, assets and anything else bundled or loaded with webpack
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  // When webpack bundles your source code, it can become difficult
  // to track down errors and warnings to their original location.
  // In order to make it easier to track down errors and warnings,
  // specify a source maps option so that webpack generate source map files
  // which map compiled code back to the original source code.
  devtool: 'eval-cheap-module-source-map'
}
