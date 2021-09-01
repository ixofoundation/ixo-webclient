import { AccountActionTypes, AccountActions, AccountState } from './types'

export const initialState: AccountState = {
  userInfo: null,
  address: null,
  balances: [],
  loginStatusCheckCompleted: true,
  assistantToggled: false,
  assistantFixed: false,
  intent: '',
  params: null,
  accountNumber: null,
  sequence: null,
  keplrWallet: null,
}

export const reducer = (
  state = initialState,
  action: AccountActionTypes,
): AccountState => {
  switch (action.type) {
    case AccountActions.Login:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        address: action.payload.address,
        accountNumber: action.payload.accountNumber,
        sequence: action.payload.sequence,
        loginStatusCheckCompleted: true,
      }
    case AccountActions.GetAccountSuccess:
      return {
        ...state,
        balances: action.payload.balances,
      }
    case AccountActions.Logout:
      return { ...initialState, loginStatusCheckCompleted: true }
    case AccountActions.ToggleAssistant:
      return {
        ...state,
        assistantToggled: (!state.assistantToggled && !action.payload.forceClose) || (!!action.payload.forceOpen),
        assistantFixed: action.payload.fixed ?? state.assistantFixed ,
        intent: action.payload.intent,
        params: action.payload.params ? action.payload.params : state.params
      }
    case AccountActions.SetKeplrWallet:
      return {
        ...state,
        keplrWallet: action.payload
      }
  }

  return state
}
