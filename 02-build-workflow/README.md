# Webpack Build Workflow

[![Framework](https://img.shields.io/badge/-Webpack-2b3a42?style=flat&logo=Webpack)](https://webpack.js.org/)

This project demonstrate how to config [Webpack](https://webpack.js.org/) to build and bundle source code.

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

* Install `webpack`, `webpack-cli` and `webpack-dev-server`

  ```powershell
  npm i -D webpack webpack-cli webpack-dev-server

  # Also install additional dependencies
  npm i -D clean-webpack-plugin html-webpack-plugin
  ```

* Specify npm build scripts

  ```json
  "scripts": {
    "start": "webpack serve --open chrome"
  }
  ```
