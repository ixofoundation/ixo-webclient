import { createAction } from '../../lib/redux_utils/actions';
import { Ixo } from 'ixo-module';
import { IxoResult, IXO_RESULT } from './ixo_actions';

export function initIxo(BLOCKCHAIN_IP: string, BLOCK_SYNC_URL: string) {
	return dispatch => {
		var ixo = new Ixo(BLOCKCHAIN_IP, BLOCK_SYNC_URL);
		if (ixo) {
			dispatch(
				createAction<IxoResult>(IXO_RESULT.type, {
					ixo: ixo,
					error: {}
				})
			);
		} else {
			dispatch(
				createAction<IxoResult>(IXO_RESULT.type, {
					ixo: null,
					error: 'Please log into your ixo key safe!'
				})
			);
		}
	};
}

export function resetIxo() {
	return dispatch => {
		dispatch(
			createAction<IxoResult>(IXO_RESULT.type, {
				ixo: null,
				error: {}
			})
		);
	};
}
