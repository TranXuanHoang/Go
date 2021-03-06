# Ecommerce

[![Build Tool](https://img.shields.io/badge/-Webpack-2b3a42?style=flat&logo=Webpack)](https://webpack.js.org/)

This project build a scallable ecommerce web app following a `run-time integration` approach.

## Source Code

Switch the source code to versions described below to view different implementations.

| Git Tag | Commits & Diff | Implementation |
|---------|----------------|----------------|
| [v5.0.0](https://github.com/TranXuanHoang/React/releases/tag/v5.0.0) | [diff](https://github.com/TranXuanHoang/React/compare/v4.0.0...v5.0.0) | Create an ecommerce web project using a `microfrontend` architecture |

## Architecture

The ecommerce application in this project is broken down into 3 components

* a `product list` whose source code is placed in the [products](./products) directory plays the role of rendering a list of products
* a `shopping cart` whose source code is in the [cart](./cart) directory renders the shopping cart content
* a `container` with source code in the [container](./container) directory loads and runs the source code of both the [products](./products) and [cart](./cart) modules and creates the final eccomerce website
