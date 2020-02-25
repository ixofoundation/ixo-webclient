import { createAction } from '../../common/redux/redux.utils'
import { LoginResult, LOGIN_RESULT } from './types'
import { UserInfo } from 'src/types/models'

export function initUserInfo(userInfo: UserInfo, error: string) {
  return (dispatch): void => {
    dispatch(
      createAction<LoginResult>(LOGIN_RESULT.type, {
        userInfo: userInfo,
        error: { error },
      }),
    )
  }
}

export function resetUserInfo() {
  return (dispatch): void => {
    dispatch(
      createAction<LoginResult>(LOGIN_RESULT.type, {
        userInfo: null,
        error: {},
      }),
    )
  }
}
