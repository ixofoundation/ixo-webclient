import * as SUT from './account.reducer'
import { AccountState, AccountActions, LoginAction, LogoutAction, GetAccountSuccessAction } from './account.types'

const initialState = SUT.initialState

describe('Account Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('Login Action', () => {
    it('should return a new copy of state, with the correct result set', () => {
      const userInfo = {
        didDoc: { did: 'someDid', pubKey: 'somePubKey' },
        name: 'someName',
        ledgered: true,
        loggedInKeysafe: false,
        hasKYC: true,
      }

      const address = 'abc'

      // ... we create a initUserInfo action
      const action: LoginAction = {
        type: AccountActions.Login,
        // @ts-ignore
        payload: {
          userInfo: {
            didDoc: { did: 'someDid', pubKey: 'somePubKey' },
            name: 'someName',
            ledgered: true,
            loggedInKeysafe: false,
            hasKYC: true,
          },
          address: 'abc',
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(
        {
          ...initialState,
          balances: [{ amount: '1', denom: 'sometoken' }],
        },
        action,
      )

      // then the state should be set as expected
      expect(state).toEqual({ ...state, userInfo, address })
    })
  })

  describe('Logout Action', () => {
    it('should return the initial state', () => {
      // given ... we have some mock state
      // @ts-ignore
      const mockState: AccountState = {
        userInfo: {
          didDoc: { did: 'someDid', pubKey: 'somePubKey' },
          name: 'someName',
          ledgered: true,
          loggedInKeysafe: false,
          hasKYC: true,
        },
        address: 'abc',
        balances: [{ amount: '1', denom: 'sometoken' }],
        loginStatusCheckCompleted: true,
        assistantToggled: false,
        assistantFixed: false,
        intent: '',
        params: null,
      }

      // ... we create a resetUserInfo action
      const action: LogoutAction = {
        type: AccountActions.Logout,
      }

      // when ... we run the reducer and pass it our mockState state and this action
      const state = SUT.reducer(mockState, action)

      // then the state should be reset
      expect(state).toEqual({
        ...initialState,
        loginStatusCheckCompleted: true,
      })
    })
  })

  describe('GetBalancesSuccess Action', () => {
    it('should return a new copy of state, with the balances set', () => {
      const balances = [
        { amount: '100', denom: 'abc' },
        { amount: '200', denom: 'def' },
        { amount: '300', denom: 'def' },
      ]

      // const sequence = '123'
      // const accountNumber = '0123456'

      // ... we create a getBalances action
      const action: GetAccountSuccessAction = {
        type: AccountActions.GetAccountSuccess,
        payload: {
          balances,
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual({
        ...initialState,
        balances,
      })
    })
  })
})
