import axios from 'axios'
import * as actionTypes from './actionTypes'

// For more information about Firebase Auth REST API,
// see https://firebase.google.com/docs/reference/rest/auth
const GOOGLE_AUTH_API_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts'
const GOOGLE_API_KEY = 'AIzaSyDgsUotZEJIHSUnv26Vcv9gslbpbxXeiNw'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

/**
 * Automatically logs user out when the authentication token expires.
 * @param {number} exprirationTime Number of seconds until the authentication token expires
 */
export const checkAuthTimeout = (exprirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    exprirationTime: exprirationTime
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = `${GOOGLE_AUTH_API_BASE_URL}:signUp?key=${GOOGLE_API_KEY}`
    if (!isSignup) {
      url = `${GOOGLE_AUTH_API_BASE_URL}:signInWithPassword?key=${GOOGLE_API_KEY}`
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', response.data.localId)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        // Token has already expired - Logout
        dispatch(logout())
      } else {
        // Token hasn't expired yet - Login
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        ))
      }
    }
  }
}
