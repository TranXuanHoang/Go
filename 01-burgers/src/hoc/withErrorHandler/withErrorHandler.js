// Method 1: Use Class Based Lifecycle Hooks
// import React, { Component, Fragment } from 'react'
// import Modal from '../../components/UI/Modal/Modal'

// const withErrorHandler = (WrappedComponent, axios) => {
//   return class extends Component {
//     state = {
//       error: null
//     }

//     UNSAFE_componentWillMount() {
//       this.reqInterceptor = axios.interceptors.request.use(
//         req => {
//           this.setState({ error: null })
//           return req
//         }
//       )

//       this.resInterceptor = axios.interceptors.response.use(
//         res => res,
//         error => {
//           this.setState({ error: error })
//         }
//       )
//     }

//     componentWillUnmount() {
//       axios.interceptors.request.eject(this.reqInterceptor)
//       axios.interceptors.response.eject(this.resInterceptor)
//     }

//     errorConfirmedHandler = () => {
//       this.setState(
//         { error: null }
//       )
//     }

//     render() {
//       return (
//         <Fragment>
//           <Modal show={this.state.error}
//             modalClosed={this.errorConfirmedHandler}>
//             {this.state.error && this.state.error.message}
//           </Modal>
//           <WrappedComponent {...this.props} />
//         </Fragment>
//       )
//     }
//   }
// }

// export default withErrorHandler


// Method 2: Use React Hooks
import React, { useEffect, useState } from 'react'
import Modal from '../../components/UI/Modal/Modal'

/**
 * A function that wraps a component and handles any errors occur
 * when making HTTP requests in that component.
 * @param {Component} WrappedComponent the component to be error-handled
 * @param {Axios} axios the axios that is used to send HTTP requests and is error-handled
 */
const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null)

    // Reference: https://github.com/axios/axios#interceptors
    // Note: The following two interceptor configs (request and response)
    // should be done before any HTTP requests is sent from the
    // wrapped components, otherwise this will not work correctly.
    // This is why we are configuring the interceptors here inside
    // the constructor.

    // Clear error state before sending any request
    const reqInterceptor = axios.interceptors.request.use(
      req => {
        setError(null)
        return req
      }
    )

    // Checking error with the response
    // Setup a global interceptor allowing us to handle errors
    // The interceptors.response.use() should receive two functions
    // one for successful response case, one for error case like bellow
    // axios.interceptors.response.use(response => {}, error => {})
    // Here we only consider the error, so we simply pass to the first argument
    // a function that forwards the response to the HTTP request caller
    const resInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setError(error)
        return Promise.reject(error)
      }
    )

    useEffect(
      () => {
        return () => {
          // Remove the interceptors when the component is unused to avoid memory leak
          axios.interceptors.request.eject(reqInterceptor)
          axios.interceptors.response.eject(resInterceptor)
        }
      },
      [reqInterceptor, resInterceptor]
    )

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return (
      <>
        <Modal show={error}
          modalClosed={errorConfirmedHandler}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
}

export default withErrorHandler
