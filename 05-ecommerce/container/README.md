# Container

This directory contains source code of a `container` in a microfrontend architecture. The `container` decides when/where to show each `microfrontend`.

## 3rd-Party Packages

The app uses the following 3rd-party packages

| Package | Type | Purpose |
|---------|------|---------|
| [webpack](https://www.npmjs.com/package/webpack) | `production` | To bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. |
| [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) | `production` | Use `Webpack` with a development server that provides live reloading |
| [webpack-cli](https://www.npmjs.com/package/webpack-cli) | `production` | Provides a flexible set of commands for developers to increase speed when setting up a custom webpack project. As of webpack v4, webpack is not expecting a configuration file, but often developers want to create a more custom webpack configuration based on their use-cases and needs. webpack CLI addresses these needs by providing a set of tools to improve the setup of custom webpack configuration. |
| [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) | `production` | A webpack plugin that simplifies creation of HTML files to serve webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. |
| [nodemon](https://www.npmjs.com/package/nodemon) | `dev` | Auto reload app when making any changes to source code |
