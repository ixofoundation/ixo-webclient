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
  LoginResult = 'ixo/Login/LOGIN_RESULT',
}

export interface UserInfoAction {
  type: typeof LoginActions.LoginResult
  payload: { userInfo: UserInfo; error: Record<string, any> }
}

export type LoginActionTypes = UserInfoAction
