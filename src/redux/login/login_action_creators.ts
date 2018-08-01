import { createAction } from '../../lib/redux_utils/actions';
import { LoginResult, LOGIN_RESULT } from './login_actions';

export function initUserInfo(keysafe: any, ixo: any) {
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
					var userInfo = response;
					ixo.user.getDidDoc(userInfo.didDoc.did).then((didResponse: any) => {
						if (!didResponse) {
							userInfo.ledgered = false;
						} else {
							userInfo.ledgered = true;
						}
						dispatch(
							createAction<LoginResult>(LOGIN_RESULT.type, {
								userInfo: userInfo,
								error: {}
							})
						);
				}).catch((didError) => {
					console.log(didError);
				});

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