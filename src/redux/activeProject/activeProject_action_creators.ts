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
		// const ixo = getInitializedStoreState().ixoStore.ixo;
		// const keysafe = getInitializedStoreState().keysafeStore.keysafe;
		if (projectDid) {
			// const projectDID = project.did;
			// keysafe.requestSigning(message, (error: any, signature: any) => {
			// 	ixo.agent.listAgentsForProject(listData, signature, PDSUrl).then((response: any) => {
			// 		console.log('Agent list for Project: ' + success(JSON.stringify(response, null, '\t')));
			// 		expect(response.result).to.not.equal(null);
			// 	}).catch((result: Error) => {
			// 		console.log(error(result));
			// 	});
			// });

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
