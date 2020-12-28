import { useEffect, useState } from 'react'

/**
 * A custom hook that looks into every HTTP request and response to
 * see if there exists any errors. If error occurred, it returns an
 * array of 2 elements `[error, errorConfirmedHandler]`. The `error`
 * and a function `errorConfirmedHandler` for clearing the `error`.
 *
 * @param {Axios} axios the axios that is used to send HTTP requests and is error-handled
 */
const useHttpErrorHandler = /*httpClient*/ axios => {
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
    [reqInterceptor, resInterceptor, axios.interceptors.request, axios.interceptors.response]
  )

  const errorConfirmedHandler = () => {
    setError(null)
  }

  // Return the error and a function to clear the error
  return [error, errorConfirmedHandler]
}

export default useHttpErrorHandler
