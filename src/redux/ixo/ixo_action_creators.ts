import { createAction } from '../../lib/redux_utils/actions';
import { Ixo } from 'ixo-module';
import { IxoResult, IXO_RESULT } from './ixo_actions';

export function initIxo() {
	return dispatch => {
		var ixo = new Ixo();
		if (ixo) {
			dispatch(
				createAction<IxoResult>(IXO_RESULT.type, {
					ixo: ixo,
					error: {}
				}));
		} else {
			dispatch(
				createAction<IxoResult>(IXO_RESULT.type, {
					ixo: null,
					error: 'Please log into your web3 provider!'
				}));
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