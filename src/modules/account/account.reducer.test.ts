import * as SUT from './account.reducer'
import {
  AccountState,
  AccountActions,
  LoginAction,
  LogoutAction,
  GetBalancesSuccessAction,
  GetOrdersSuccessAction,
} from './types'

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
    it('should return a new copy of state, with the correct result set and any other info cleared', () => {
      const userInfo = {
        didDoc: { did: 'someDid', pubKey: 'somePubKey' },
        name: 'someName',
        ledgered: true,
        loggedInKeysafe: false,
        hasKYC: true,
      }

      const loginError = { error: 'oops' }

      // ... we create a initUserInfo action
      const action: LoginAction = {
        type: AccountActions.Login,
        payload: {
          userInfo: {
            didDoc: { did: 'someDid', pubKey: 'somePubKey' },
            name: 'someName',
            ledgered: true,
            loggedInKeysafe: false,
            hasKYC: true,
          },
          loginError: { error: 'oops' },
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(
        {
          ...initialState,
          orders: [{ someprop: 'someval' }],
          balances: [{ amount: 1, denom: 'sometoken' }],
          address: '123',
        },
        action,
      )

      // then the state should be set as expected
      expect(state).toEqual({ ...initialState, userInfo, loginError })
    })
  })

  describe('Logout Action', () => {
    it('should return the initial state', () => {
      // given ... we have some mock state
      const mockState: AccountState = {
        userInfo: {
          didDoc: { did: 'someDid', pubKey: 'somePubKey' },
          name: 'someName',
          ledgered: true,
          loggedInKeysafe: false,
          hasKYC: true,
        },
        loginError: { error: 'oops' },
        orders: [{ someprop: 'someval' }],
        balances: [{ amount: 1, denom: 'sometoken' }],
        address: '123',
      }

      // ... we create a resetUserInfo action
      const action: LogoutAction = {
        type: AccountActions.Logout,
      }

      // when ... we run the reducer and pass it our mockState state and this action
      const state = SUT.reducer(mockState, action)

      // then the state should be reset
      expect(state).toEqual(initialState)
    })
  })

  describe('GetBalancesSuccess Action', () => {
    it('should return a new copy of state, with the balances set', () => {
      const balances = [
        { amount: 100, denom: 'abc' },
        { amount: 200, denom: 'def' },
        { amount: 300, denom: 'def' },
      ]
      // ... we create a getBalances action
      const action: GetBalancesSuccessAction = {
        type: AccountActions.GetBalancesSuccess,
        payload: {
          balances,
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual({ ...initialState, balances: balances })
    })
  })

  describe('GetOrdersSuccess Action', () => {
    it('should return a new copy of state, with the balances set', () => {
      const orders = [
        { id: 1, prop1: 'value1' },
        { id: 2, prop1: 'value2' },
        { id: 3, prop1: 'value3' },
        { id: 4, prop1: 'value1' },
        { id: 5, prop1: 'value2' },
        { id: 6, prop1: 'value3' },
        { id: 7, prop1: 'value1' },
        { id: 8, prop1: 'value2' },
        { id: 9, prop1: 'value3' },
      ]

      // ... we create a getBalances action
      const action: GetOrdersSuccessAction = {
        type: AccountActions.GetOrdersSuccess,
        payload: {
          orders,
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual({
        ...initialState,
        orders,
      })
    })
  })
})
