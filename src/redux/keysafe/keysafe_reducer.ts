import { createReducer } from '../../lib/redux_utils/reducers';
import { KeysafeResult, KEYSAFE_RESULT } from './keysafe_actions';

export type IKeysafeModelState = {
	keysafe: any,
	error: Object,
};

const initialState: IKeysafeModelState = {
	keysafe: null,
	error: {},
};

export let keysafeReducer = createReducer<IKeysafeModelState>(initialState, [
	{
		action: KEYSAFE_RESULT,
		handler: (state: IKeysafeModelState, action: KeysafeResult) => {
			state.keysafe = action.keysafe,
			state.error = action.error;
			return {
				...state
			};
		}
	}
]);
