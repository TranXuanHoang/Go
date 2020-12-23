import axios from 'axios'
import { delay, put, call } from 'redux-saga/effects'
import * as actions from '../actions/index'

// For more information about Firebase Auth REST API,
// see https://firebase.google.com/docs/reference/rest/auth
const GOOGLE_AUTH_API_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts'
const GOOGLE_API_KEY = 'AIzaSyDgsUotZEJIHSUnv26Vcv9gslbpbxXeiNw'

/**
 * The asterisk '*' after the 'function' keyword turns 'logout' to be
 * a so-called generator which is a new feature of the next-generation JavaScript.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
 */
export function* logoutSaga(action) {
  // yield localStorage.removeItem('token')
  // yield localStorage.removeItem('expirationDate')
  // yield localStorage.removeItem('userId')

  // Another way of implementing the above commented code
  // This notation is considered as easier to test with mocks
  yield call([localStorage, 'removeItem'], 'token')
  yield call([localStorage, 'removeItem'], 'expirationDate')
  yield call([localStorage, 'removeItem'], 'userId')

  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.exprirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = `${GOOGLE_AUTH_API_BASE_URL}:signUp?key=${GOOGLE_API_KEY}`
  if (!action.isSignup) {
    url = `${GOOGLE_AUTH_API_BASE_URL}:signInWithPassword?key=${GOOGLE_API_KEY}`
  }

  try {
    const response = yield axios.post(url, authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
    yield localStorage.setItem('token', response.data.idToken)
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem('userId', response.data.localId)
    yield put(actions.authSuccess(response.data.idToken, response.data.localId))
    yield put(actions.checkAuthTimeout(response.data.expiresIn))
  } catch (error) {
    yield put(actions.authFail(error.response.data.error))
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      // Token has already expired - Logout
      yield put(actions.logout())
    } else {
      // Token hasn't expired yet - Login
      const userId = yield localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId))
      yield put(actions.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      ))
    }
  }
}
