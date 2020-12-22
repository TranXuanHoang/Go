import { delay, put } from 'redux-saga/effects'
import * as actions from '../actions/index'

/**
 * The asterisk '*' after the 'function' keyword turns 'logout' to be
 * a so-called generator which is a new feature of the next-generation JavaScript.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
 */
export function* logoutSaga(action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.exprirationTime * 1000)
  yield put(actions.logout())
}
