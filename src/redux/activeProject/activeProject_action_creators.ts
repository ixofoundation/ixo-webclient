import { createAction } from '../../lib/redux_utils/actions';
import { ActiveProjectResult, SET_ACTIVE_PROJECT, CLEAR_ACTIVE_PROJECT } from './activeProject_actions';
// import { getInitializedStoreState } from '../store';

export function ActiveProjectInit() {
	return dispatch => {
		dispatch(
			createAction<ActiveProjectResult>(CLEAR_ACTIVE_PROJECT.type, {
				projectDid: ''
		}));
	};
}

export function clearActiveProject() {
	return dispatch => {
		dispatch(
			createAction<ActiveProjectResult>(CLEAR_ACTIVE_PROJECT.type, {
				projectDid: ''
		}));
	};
}

export function setActiveProject(projectDid?: any) {
	return dispatch => {
		if (projectDid) {
			dispatch(
				createAction<ActiveProjectResult>(SET_ACTIVE_PROJECT.type, {
					projectDid: projectDid
				}));
		} else {
			dispatch(
				createAction<ActiveProjectResult>(CLEAR_ACTIVE_PROJECT.type, {
					projectDid: ''
				}));
		}
	}; 
}
