import { UserInfoAction, LoginActions } from './types'
import { UserInfo } from 'src/types/models'

export const initUserInfo = (
  userInfo: UserInfo,
  error: string,
): UserInfoAction => ({
  type: LoginActions.LoginResult,
  payload: {
    userInfo,
    error: { error },
  },
})

export const resetUserInfo = (): UserInfoAction => ({
  type: LoginActions.LoginResult,
  payload: {
    userInfo: null,
    error: {},
  },
})
