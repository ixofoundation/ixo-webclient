import { createReducer } from '../../common/redux/redux.utils'
import { LoginResult, LOGIN_RESULT } from './types'
import { UserInfo } from '../../types/models'

export type ILoginModelState = {
  userInfo: UserInfo
  loginError: Record<string, any>
}

const initialState: ILoginModelState = {
  userInfo: null,
  loginError: {},
}

export const loginReducer = createReducer<ILoginModelState>(initialState, [
  {
    action: LOGIN_RESULT,
    handler: (state: ILoginModelState, action: LoginResult): any => {
      state.userInfo = action.userInfo
      state.loginError = action.error
      return {
        ...state,
      }
    },
  },
])
