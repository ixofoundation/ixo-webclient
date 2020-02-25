import { InitUserInfoAction, ResetUserInfoAction, LoginActions } from './types'
import { UserInfo } from 'src/types/models'

export const initUserInfo = (
  userInfo: UserInfo,
  error: string,
): InitUserInfoAction => ({
  type: LoginActions.InitUserInfo,
  payload: {
    userInfo,
    loginError: { error },
  },
})

export const resetUserInfo = (): ResetUserInfoAction => ({
  type: LoginActions.ResetUserInfo,
})
