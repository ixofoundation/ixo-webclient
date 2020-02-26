import { UserInfo } from '../../types/models'

export interface LoginResult {
  userInfo: UserInfo
  error: Record<string, any>
}

// eslint-disable-next-line
export namespace LOGIN_RESULT {
  export const type = 'LOGIN_RESULT'
}
