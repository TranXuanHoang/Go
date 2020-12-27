import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

const Auth = lazy(() => import('./containers/Auth/Auth'))
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'))
const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
const Orders = lazy(() => import('./containers/Orders/Orders'))

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup()
  }, [props])

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

// Wrapping with withRouter enforces props will be passed down to the App component
// and therefore React Router is back on the page and knows what's getting loaded.
// This wrap requires when 'connect' alone doesn't make Routes work
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
