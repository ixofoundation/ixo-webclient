import { createAction } from '../../lib/redux_utils/actions';
import { PingResult, PING_RESULT } from './ping_actions';
import { Ping } from '../../types/models';

export function pingIxoServer(ixo: any) {
	return dispatch => {
		ixo.network.pingIxoServerNode()
			.then((response: Ping) => {
				dispatch(
					createAction<PingResult>(PING_RESULT.type, {
						pingResult: response.result,
						pingError: ''
					})
				);
			}
			).catch((result: Error) => {
				dispatch(
					createAction<PingResult>(PING_RESULT.type, {
						pingResult: '',
						pingError: result['error'] ? result['error'] : result.message
					})
				);
			});
	};
}

export function resetPing() {
	return dispatch => {
		dispatch(
			createAction<PingResult>(PING_RESULT.type, {
				pingResult: '',
				pingError: ''
			})
		);
	};
}
