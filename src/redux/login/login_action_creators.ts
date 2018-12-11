import { createAction } from '../../lib/redux_utils/actions';
import { LoginResult, LOGIN_RESULT } from './login_actions';
import { UserInfo } from 'src/types/models';

export function initUserInfo(userInfo: UserInfo, error: string) {
	return dispatch => {
		dispatch(
			createAction<LoginResult>(LOGIN_RESULT.type, {
				userInfo: userInfo,
				error: error
		}));
	};
}

export function resetUserInfo() {
	return dispatch => {
		dispatch(
			createAction<LoginResult>(LOGIN_RESULT.type, {
				userInfo: null,
				error: {}
			})
		);
	};
}