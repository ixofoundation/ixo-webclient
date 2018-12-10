import { createAction } from '../../lib/redux_utils/actions';
import { LoginResult, LOGIN_RESULT } from './login_actions';
import { UserInfo } from 'src/types/models';

export function initUserInfo(keysafe: any, ixo: any) {
	return dispatch => {
		if (keysafe === null) {
			dispatch(
				createAction<LoginResult>(LOGIN_RESULT.type, {
					userInfo: null,
					error: 'Please install IXO Keysafe and login!'
				}));
		} else {
			let userInfo: UserInfo = {
				ledgered : false,
				hasKYC: false,
				loggedInKeysafe: false,
				didDoc: {
					did: '',
					pubKey: ''
				},
				name: ''
			};
			
			keysafe.getInfo((error, response) => {
				console.log('error is:', error);
				console.log('response is:', response);	
				if (response) {
					userInfo = response;
					userInfo.loggedInKeysafe = true;
					ixo.user.getDidDoc(userInfo.didDoc.did).then((didResponse: any) => {
						if (didResponse.error) {
							userInfo.ledgered = false;
							userInfo.hasKYC = false;
						} else {
							userInfo.ledgered = true;
							if (didResponse.credentials.length > 0) {
								userInfo.hasKYC = true;
							}
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
					userInfo.loggedInKeysafe = false;
					dispatch(
						createAction<LoginResult>(LOGIN_RESULT.type, {
							userInfo: userInfo,
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