import { UserInfo } from '../../types/models';

export interface LoginResult {
	userInfo: UserInfo;
	error: Object;
}

export module LOGIN_RESULT {
	export var type = 'LOGIN_RESULT';
}