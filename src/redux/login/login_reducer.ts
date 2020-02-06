import { createReducer } from '../../lib/redux_utils/reducers';
import { LoginResult, LOGIN_RESULT } from './login_actions';
import { UserInfo } from '../../types/models';

export type ILoginModelState = {
	userInfo: UserInfo,
	loginError: Object,
};

const initialState: ILoginModelState = {
	userInfo: null,
	loginError: {},
};

export const loginReducer = createReducer<ILoginModelState>(initialState, [
	{
		action: LOGIN_RESULT,
		handler: (state: ILoginModelState, action: LoginResult) => {
			state.userInfo = action.userInfo,
			state.loginError = action.error;
			return {
				...state
			};
		}
	}
]);
