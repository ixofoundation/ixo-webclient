import { createAction } from '../../lib/redux_utils/actions';
import { LoginResult, LOGIN_RESULT } from './login_actions';

export function initUserInfo(keysafe: any) {
	return dispatch => {
		if (keysafe === null) {
			dispatch(
				createAction<LoginResult>(LOGIN_RESULT.type, {
					userInfo: null,
					error: 'Please install IXO Keysafe and login!'
				}));
		} else {
			keysafe.getInfo((error, response) => {
				if (response) {
					dispatch(
						createAction<LoginResult>(LOGIN_RESULT.type, {
							userInfo: response,
							error: {}
						})
					);
				} else {
					dispatch(
						createAction<LoginResult>(LOGIN_RESULT.type, {
							userInfo: null,
							error: 'Please log into IXO Keysafe'
						}));
					}
			});
		}
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