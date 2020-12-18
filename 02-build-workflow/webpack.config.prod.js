/**
 * This file contains basic configuration of webpack for building and bundling
 * source code that is ready for production release.
 * For more information, see https://webpack.js.org/guides/production/
 */

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // This config is meant for production!
  mode: 'production',

  // The point or points where to start the application bundling process.
  entry: {
    index: './src/index.js',
  },

  // Tells the dev server where to look for files.
  // This tells webpack-dev-server to serve the files from the dist directory on localhost:8080
  devServer: {
    contentBase: './dist',
  },

  // Customizes the webpack build process
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body'
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
  devtool: 'source-map',

  // Determines how the different types of modules within a project will be treated.
  module: {
    // An array of Rules which are matched to requests when modules are created.
    // These rules can modify how the module is created.
    // They can apply loaders to the module, or modify the parser.
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/i,
        exclude: [/node_modules/],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
