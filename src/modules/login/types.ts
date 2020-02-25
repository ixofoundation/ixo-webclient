import { UserInfo } from '../../types/models'

export interface LoginState {
  userInfo: UserInfo
  loginError: Record<string, any>
}

export interface LoginResult {
  userInfo: UserInfo
  error: Record<string, any>
}

export enum LoginActions {
  InitUserInfo = 'ixo/Login/INIT_USER_INFO',
  ResetUserInfo = 'ixo/Login/RESET_USER_INFO',
}

export interface InitUserInfoAction {
  type: typeof LoginActions.InitUserInfo
  payload: {
    userInfo: UserInfo
    error: Record<string, any>
  }
}

export interface ResetUserInfoAction {
  type: typeof LoginActions.ResetUserInfo
}

export type LoginActionTypes = InitUserInfoAction | ResetUserInfoAction
