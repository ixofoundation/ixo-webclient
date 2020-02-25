import * as SUT from './login.reducer'
import * as fromActions from './login.actions'
import { LoginResult, LoginState } from './types'

const initialState = SUT.initialState

describe('Login Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.loginReducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('InitUserInfo Action', () => {
    it('should return a new copy of state, with the login result set', () => {
      // given ... we have some mock state
      const mockState: LoginState = {
        userInfo: {
          didDoc: { did: 'someDid', pubKey: 'somePubKey' },
          name: 'someName',
          ledgered: true,
          loggedInKeysafe: false,
          hasKYC: true,
        },
        loginError: { error: 'oops' },
      }

      // ... we create a initUserInfo action
      const action = fromActions.initUserInfo(
        mockState.userInfo,
        mockState.loginError.error,
      )

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.loginReducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual(mockState)
    })
  })

  describe('ResetUserInfo Action', () => {
    it('should return a new copy of state, with the login result set', () => {
      // given ... we have some mock state
      const mockState: LoginState = {
        userInfo: {
          didDoc: { did: 'someDid', pubKey: 'somePubKey' },
          name: 'someName',
          ledgered: true,
          loggedInKeysafe: false,
          hasKYC: true,
        },
        loginError: { error: 'oops' },
      }

      // ... we create a initUserInfo action
      const action = fromActions.initUserInfo(
        mockState.userInfo,
        mockState.loginError.error,
      )

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.loginReducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual(mockState)
    })
  })
})
