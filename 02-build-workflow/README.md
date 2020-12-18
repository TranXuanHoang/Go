# Webpack Build Workflow

[![Build Tool](https://img.shields.io/badge/-Webpack-2b3a42?style=flat&logo=Webpack)](https://webpack.js.org/)
[![JavaScript Compiler](https://img.shields.io/badge/-Babel-2b3a42?style=flat&logo=Babel)](https://babeljs.io/)
[![CSS Preprocessor](https://img.shields.io/badge/-PostCSS-DD3A0A?style=flat&logo=PostCSS)](https://postcss.org/)

This project demonstrates how to manually config [Webpack](https://webpack.js.org/) to build and bundle source code.

## 3rd-Party Packages

The app uses the following 3rd-party packages

| Package | Type | Purpose |
|---------|------|---------|
| [react](https://www.npmjs.com/package/react) | `production` | A JavaScript library for creating user interfaces, contains only the functionality necessary to define React components, and is typically used together with a React renderer like react-dom for the web |
| [react-dom](https://www.npmjs.com/package/react-dom) | `production` | Serves as the entry point to the DOM and server renderers for React |
| [react-router-dom](https://www.npmjs.com/package/react-router-dom) | `production` | Provides navigational components for dynamically handling routes in React apps |
| [webpack](https://www.npmjs.com/package/webpack) | `dev` | To bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. |
| [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) | `dev` | Use `Webpack` with a development server that provides live reloading |
| [webpack-cli](https://www.npmjs.com/package/webpack-cli) | `dev` | Provides a flexible set of commands for developers to increase speed when setting up a custom webpack project. As of webpack v4, webpack is not expecting a configuration file, but often developers want to create a more custom webpack configuration based on their use-cases and needs. webpack CLI addresses these needs by providing a set of tools to improve the setup of custom webpack configuration. |
| [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) | `dev` | A webpack plugin to remove/clean build folder(s). |
| [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) | `dev` | A webpack plugin that simplifies creation of HTML files to serve webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. |
| [@babel/core](https://www.npmjs.com/package/@babel/core) | `dev` | [`Homepage`](https://babeljs.io/docs/en/babel-core) |
| [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) | `dev` | [`Homepage`](https://babeljs.io/docs/en/babel-preset-env) |
| [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react) | `dev` | [`Homepage`](https://babeljs.io/docs/en/babel-preset-react) |
| [babel-loader](https://www.npmjs.com/package/babel-loader) | `dev` | Allows transpiling JavaScript files using [Babel](https://babeljs.io/) and webpack |
| [@babel/plugin-proposal-class-properties](https://www.npmjs.com/package/@babel/plugin-proposal-class-properties) | `dev` | [`Homepage`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties.html) |
| [style-loader](https://www.npmjs.com/package/style-loader) | `dev` | Injects CSS into the DOM |
| [css-loader](https://www.npmjs.com/package/css-loader) | `dev` | Interprets `CSS` @import and url() like import/require() and will resolve them |
| [postcss-loader](https://www.npmjs.com/package/postcss-loader) | `dev` | [`Homepage`](https://postcss.org/) A tool for transforming CSS. For example, adding vendor prefixes to CSS rules using values from Can I Use. |
| [autoprefixer](https://www.npmjs.com/package/autoprefixer) | `dev` | [PostCSS](https://postcss.org/) plugin to parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](https://caniuse.com/) |
| [file-loader](https://www.npmjs.com/package/file-loader) | `dev` | A loader that resolves `import`/`require()` on a file into a url and emits the file into the output directory |
| [url-loader](https://www.npmjs.com/package/url-loader) | `dev` | A loader for webpack which transforms files into base64 URIs |

## Source Code

Switch the source code to versions described below to view different implementations.

| Git Tag | Commits & Diff | Implementation |
|---------|----------------|----------------|
| [v2.0.0](https://github.com/TranXuanHoang/React/releases/tag/v2.0.0) | [diff](https://github.com/TranXuanHoang/React/compare/v1.6.0...v2.0.0) | Create `webpack-build-workflow` project |

## Run App

* Install `Node.js` dependencies with `npm install`
* Run app with `npm start`

## Webpack Config

This configuration was successfully tested with `webpack v5.10.3`, `webpack-cli v4.2.0`, `webpack-dev-server v3.11.0` which are the up-to-date versions of these webpack libraries at the time of writing this readme file

* Install `webpack`, `webpack-cli`, `webpack-dev-server` and other dependencies

  ```powershell
  npm i -D webpack webpack-cli webpack-dev-server

  # Also install additional dependencies
  npm i -D clean-webpack-plugin html-webpack-plugin

  # Plugins to transpile JavaScript and JSX code
  npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/plugin-proposal-class-properties

  # Loaders to interpret CSS rules and inject them into the DOM
  npm i -D style-loader css-loader

  # Preprocess CSS with PostCSS (e.g. prefixing CSS rules)
  npm i -D postcss-loader autoprefixer

  # Load assets files (e.g., images)
  npm i -D file-loader url-loader
  ```

* Specify supported browsers list and npm build scripts

  ```json
  {
    "browserslist": "> 1%, last 2 versions",
    "scripts": {
      "start": "webpack serve --open chrome",
      "build": "webpack --config webpack.config.prod.js"
    }
  }
  ```

* Create a [`webpack.config.js`](./webpack.config.js) file for `development` environment. This config file will be used by the `npm start` script.

  ```javascript
  const path = require('path')
  const autoprefixer = require('autoprefixer')
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
    devtool: 'eval-cheap-module-source-map',

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
  ```

* Create a [`webpack.config.prod.js`](./webpack.config.prod.js) file for `production` environment. This config file will be used by the `npm run build` script.
