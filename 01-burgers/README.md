# Burgers

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 3rd-Party Packages

The app uses the following 3rd-party packages

| Package | Type | Purpose |
|---------|------|---------|
| [react](https://www.npmjs.com/package/react) | `production` | A JavaScript library for creating user interfaces, contains only the functionality necessary to define React components, and is typically used together with a React renderer like react-dom for the web |
| [react-dom](https://www.npmjs.com/package/react-dom) | `production` | Serves as the entry point to the DOM and server renderers for React |
| [react-scripts](https://www.npmjs.com/package/react-scripts) | `production` | Includes scripts and configuration used by [Create React App](https://create-react-app.dev/) |
| [web-vitals](https://www.npmjs.com/package/web-vitals) | `production` | a tiny (~1K), modular library for measuring all the [Web Vitals](https://web.dev/vitals/) metrics on real users, in a way that accurately matches how they're measured by Chrome and reported to other Google tools (e.g. Chrome User Experience Report, Page Speed Insights, Search Console's Speed Report) |
| [prop-types](https://www.npmjs.com/package/prop-types) | `production` | Runtime type checking for React props |
| [axios](https://www.npmjs.com/package/axios) | `production` | Send HTTP requests and handle their responses on web browsers |
| [react-router-dom](https://www.npmjs.com/package/react-router-dom) | `production` | Provides navigational components for dynamically handling routes in React apps |
| [redux](https://www.npmjs.com/package/redux) | `production` | Used in combination with `React` as a *predictable state container* for our app |
| [react-redux](https://www.npmjs.com/package/react-redux) | `production` | React Redux is the official React binding for Redux. It lets React components read data from a Redux store, and dispatch actions to the store to update data. |
| [redux-thunk](https://www.npmjs.com/package/redux-thunk) | `production` | A middleware used to handle async code while interacting with a `Redux store` - which means to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. |
| [enzyme](https://www.npmjs.com/package/enzyme) | `dev` | **`For Testing`** [`Homepage`](https://enzymejs.github.io/enzyme/) A JavaScript Testing utility for React that makes it easier to test React Components' output. It allows us to manipulate, traverse, and in some ways simulate runtime given the output. |
| [enzyme-adapter-react-16](https://www.npmjs.com/package/enzyme-adapter-react-16) | `dev` | An adapter allowing `enzyme` to work with `React 16.x` compatibly |
| [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) | `dev` | **`For Testing`** Provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment. |

## Source Code

Switch the source code to versions described below to view different implementations.

| Git Tag | Implementation |
|---------|----------------|
| [v1.0.0](https://github.com/TranXuanHoang/React/releases/tag/v1.0.0) | Create burgers web app (without making purchase order functionality) |
| [v1.1.0](https://github.com/TranXuanHoang/React/releases/tag/v1.1.0) | Store purchase order data in and fetch ingredients data from a [Firebase realtime database](https://firebase.google.com/products/realtime-database) |
| [v1.2.0](https://github.com/TranXuanHoang/React/releases/tag/v1.2.0) | Add routing to the app |
| [v1.3.0](https://github.com/TranXuanHoang/React/releases/tag/v1.3.0) | Implement form validation |
| [v1.4.0](https://github.com/TranXuanHoang/React/releases/tag/v1.4.0) | Manage app state with `Redux` |
| [v1.5.0](https://github.com/TranXuanHoang/React/releases/tag/v1.5.0) | Add authentication |
| [v1.6.0](https://github.com/TranXuanHoang/React/releases/tag/v1.6.0) | Add lazy loading and unit tests |

## Run App

* Install `Node.js` dependencies with `npm install`
* Run app with `npm start`

## Run Unit Tests

[Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) are two libraries used in this project to write automatic unit tests. Not all components and containers are accompanied with unit tests. There are only some examples of how to write unit tests that can be automatically run with the following command

```shell
npm test
```

| Example | Purpose |
|---------|---------|
| [App.test.js](./src/App.test.js) | Show how to test the `App` component without having to consider `Redux store` |
| [NavigationItems.test.js](./src/components/Navigation/NavigationItems/NavigationItems.test.js) | Demonstrate how to write a test suite with a set of test cases for a `React` component |
| [BurgerBuilder.test.js](./src/containers/BurgerBuilder/BurgerBuilder.test.js) | Example of how to test containers |
| [auth.test.js](./src/store/reducers/auth.test.js) | Show how to test a `Redux reducer` |
