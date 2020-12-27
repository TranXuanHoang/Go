import { useCallback, useReducer } from 'react'

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null
}

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier
      }
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra
      }
    case 'ERROR':
      return {
        loading: false,
        error: action.errorMessage
      }
    case 'CLEAR':
      return initialState
    default:
      throw new Error('Should not be reached!')
  }
}

/**
 * A custom `React Hook` for handling HTTP requests.
 */
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState)

  // Handle error case
  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), [])

  /** Define logic to send HTTP requests and dispatches response data.
   * `useCallBack` wraps the logic function so that it will not be re-created
   * whenever the useHttp hook is re-executed.
   * @param {string} url the `url` to which the HTTP request will be sent
   * @param {string} method the HTTP method (`GET`, `POST`, `DELETE`, ...)
   * @param {json} body the body attached to the HTTP request
   * @param {any} reqExtra the extra data passed in to the function so that
   * latter it can be used on the function caller side
   * @param {string} reqIdentifier an unique identifier passed in so that
   * the caller can determine what type of request was sent and decide
   * appropriate request handling logic
   */
  const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
    dispatchHttp({ type: 'SEND', identifier: reqIdentifier })
    fetch(url, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseData => {
        dispatchHttp({
          type: 'RESPONSE',
          responseData: responseData,
          extra: reqExtra
        })
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' })
      })
  }, [])

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear: clear
  }
}

export default useHttp
