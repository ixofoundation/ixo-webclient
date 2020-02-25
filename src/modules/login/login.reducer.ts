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
    case LoginActions.InitUserInfo:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        loginError: action.payload.error,
      }
    case LoginActions.ResetUserInfo:
      return initialState
  }

  return state
}
