import { createReducer } from '../../lib/redux_utils/reducers';
import { ActiveProjectResult, SET_ACTIVE_PROJECT, CLEAR_ACTIVE_PROJECT } from './activeProject_actions';

export type IActiveProjectModelState = {
	projectDid: string;
};

const initialState: IActiveProjectModelState = {
	projectDid: ''
};

export let activeProjectReducer = createReducer<IActiveProjectModelState>(initialState, [
	{
		action: SET_ACTIVE_PROJECT,
		handler: (state: IActiveProjectModelState, action: ActiveProjectResult) => {
			state.projectDid = action.projectDid;
			return {
				...state
			};
		}
	},
	{
		action: CLEAR_ACTIVE_PROJECT,
		handler: (state: IActiveProjectModelState, action: ActiveProjectResult) => {
			state.projectDid = action.projectDid;
			return {
				...state
			};
		}
	}
]);
