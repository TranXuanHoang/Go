import { useEffect, useState } from "react"

// Define global state, listeners, and actions outside of the custom
// hook useStore so that
//   (1) they will not be recreated whenever the hook is called
//   (2) the globalState object can be globally shared among components

/** An object representing the global state */
let globalState = {}

/**
 * An array of functions that can be called to update (re-render) UI
 * of components that depend on the data in the global state
 */
let listeners = []

/**
 * An object that contains 'action identifier' and 'action function'
 * key-value pairs
 */
let actions = {}

// IDEA: useState has a machenism to manage a state and whenever the state
// is updated, any components that use useState will re-render.
// If a component uses a custom hook (which is useStore here), and
// that custom hook uses useState, the component will re-render when
// the useState in that custom hook triggers a re-render.
/**
 * A custom hook to connect components to a custom store where app data
 * is stored and managed.
 *
 *   ```
 *     const MyComponent = React.memo(props => {
 *       const [state, dispatch] = useStore(false)
 *       ...
 *     })
 *   ```
 * @param {boolean} shouldListen A flag specifying whether the component
 * that calls this custom `useStore` hook should trigger the re-render
 * of other components that also refer to the global state. Need to use in
 * combination with `React.memo()`.
 */
export const useStore = (shouldListen = true) => {
  // setState is a function to update globalState defined outside.
  // Whenever setState is called, the component that uses useStore hook
  // will re-render.
  const setState = useState(globalState)[1]

  // dispatch is a function that will call an action function which
  // is specified in the actions object, then get a new state object
  // returned by that action fucntion, and merge the new state to
  // the global state
  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload)
    globalState = { ...globalState, ...newState }

    // Notify all listeners about the change of the globalState
    for (const listener of listeners) {
      listener(globalState)
    }
  }

  useEffect(() => {
    if (shouldListen) {
      // setState function is registered as a listener for the component
      // that calls useStore hook.
      // Whenever a component that calls useStore hook and execute
      // the returned dispatch action function, the globalState will change
      // trigger all other components that have a listener registered in
      // the listeners array to re-render.
      listeners.push(setState)
    }

    // Clean up (remove) the 'setState' function from the list of listeners
    // whenever the component that called useStore is unmounted
    return () => {
      if(shouldListen) {
        listeners = listeners.filter(li => li !== setState)
      }
    }
  }, [setState, shouldListen])

  // The returned value is very similar to what React Hook useReducer returns
  return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState }
  }
  actions = { ...actions, ...userActions }
}
