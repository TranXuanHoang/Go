import React, { Component } from "react";

/**
 * This component implement layzy loading which will asynchronously
 * load only needed component.
 *
 * ```
 *   // EXAMPLE:
 *   import asyncComponent from "../../hoc/asyncComponent/asyncComponent";
 *
 *   const AsyncCheckout = asyncComponent(() => {
 *     return import("./containers/Checkout/Checkout");
 *   });
 *
 *   <Route path="/checkout" exact component={AsyncCheckout} />
 * ```
 *
 * @param {Component} importComponent a function reference returns
 * a promise that gradually emits a loaded component with a 'default'
 * property that will be a component loaded dynamically
 *
 * **NOTE:** This component is not used in this project.
 * In stead, we use the `lazy` and `Suspense` to implement lazy loading.
 * See https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
 */
const asyncComponent = importComponent => {
  return class extends Component {
    // The actual loaded component (lazily loaded component) is stored
    // in the state.component at some point of time
    // (see componentDidMount bellow)
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
