import * as actionTypes from '../actions/actionTypes'
import reducer from './auth'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/'
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'authenticated-token',
          userId: 'authenticated-user-id'
        })
    ).toEqual({
      token: 'authenticated-token',
      userId: 'authenticated-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
})
