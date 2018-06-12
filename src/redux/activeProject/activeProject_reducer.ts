import { createReducer } from '../../lib/redux_utils/reducers';
import { ActiveProjectResult, SET_ACTIVE_PROJECT, CLEAR_ACTIVE_PROJECT } from './activeProject_actions';

export type IActiveProjectModelState = {
	activeProject: ActiveProjectResult,
};

const initialState: IActiveProjectModelState = {
	activeProject: {
		public: {},
		agents: {}
	}
};

export let activeProjectReducer = createReducer<IActiveProjectModelState>(initialState, [
	{
		action: SET_ACTIVE_PROJECT,
		handler: (state: IActiveProjectModelState, action: ActiveProjectResult) => {
			state.activeProject.public = action.public;
			state.activeProject.agents = action.agents;
			return {
				...state
			};
		}
	},
	{
		action: CLEAR_ACTIVE_PROJECT,
		handler: (state: IActiveProjectModelState, action: ActiveProjectResult) => {
			state.activeProject.public = action.public;
			state.activeProject.agents = action.agents;
			return {
				...state
			};
		}
	}
]);
