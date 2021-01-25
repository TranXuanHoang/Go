# Microfrontend Project

This project works on building an online shopping website in which UI compoments are grouped into child modules and loaded and rendered by a `container` module based on a `microfrontend` approach.

Below is a list of modules that constitue the app:

| Module | Framework Applied | Description |
|--------|-------------------|-------------|
| [auth](./packages/auth) | `React` | Renders authentication UI components |
| [marketing](./packages/marketing) | `React` | Generates UI for the marketing page |
| [orders](./packages/orders) | `Angular` | Makes UI for the orders page |
| [dashboard](./packages/dashboard) | `Vue` | Creates UI contents for the dashboard page |
| [container](./packages/container) | `React` | Combines all the above child modules into a single app |

## Source Code

Switch the source code to versions described below to view different implementations.

| Git Tag | Commits & Diff | Implementation |
|---------|----------------|----------------|
| [v6.0.0](https://github.com/TranXuanHoang/React/releases/tag/v6.0.0) | [diff](https://github.com/TranXuanHoang/React/compare/v5.0.0...v6.0.0) | Create an online shopping web project using a `microfrontend` architecture |
