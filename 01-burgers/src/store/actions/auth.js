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
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeour = (exprirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, exprirationTime * 1000)
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
        console.log(response)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeour(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(authFail(err.response.data.error))
      })
  }
}
