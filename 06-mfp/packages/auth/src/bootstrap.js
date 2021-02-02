import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

/**
 * Mount function to start up the app
 * @param {HTMLElement} el the HTML DOM element to which this `auth`
 * microfrontend is rendered.
 * @param {object} object containing
 * - `onSignIn` function that is called whenever sign-in is made.
 * - `onNavigate()` function that is passed down from the `container` to change
 * its route according to the route of this child `auth` microfrontend.
 * - `defaultHistory` that is a `MemoryHistory` route object used a default router
 * setting while running this `auth` microfrontend in development mode.
 * - `initialPath` the initial route path when mounting this child `auth` microfrontend.
 * @return {object} an object contains `onParentNavigate()` function
 * that is passed up to the `container` to listen for route changing event there
 * and update the in-memory route of the this child `auth` microfrontend.
 */
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })

  if (onNavigate) {
    // Listen to route changing event of the auth microfrontend
    // If event occurred, update browser route of the container with
    // the onNavigate callback function
    history.listen(onNavigate)
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el)

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const pathname = history.location

      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}


// If we are in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}


/// We are running through container
// and we should export the mount function
export { mount }
