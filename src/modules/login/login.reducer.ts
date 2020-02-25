import { LoginState, LoginActions, LoginActionTypes } from './types'

export const initialState: LoginState = {
  userInfo: null,
  loginError: {},
}

export const loginReducer = (
  state = initialState,
  action: LoginActionTypes,
): LoginState => {
  switch (action.type) {
    case LoginActions.LoginResult:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        loginError: action.payload.error,
      }
  }

  return state
}
