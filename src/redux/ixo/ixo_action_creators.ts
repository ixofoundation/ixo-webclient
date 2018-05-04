import { createAction } from '../../lib/redux_utils/actions';
import { Ixo } from 'ixo-module';
import { IxoResult, IXO_RESULT } from './ixo_actions';

export function initIxo(hostName: string) {
	return dispatch => {
		var ixo = new Ixo(hostName);
		var web3 = window['web3'];
		if (ixo && web3) {
			ixo.init(web3).then((provider: any) => {
				if (provider) {
					dispatch(
						createAction<IxoResult>(IXO_RESULT.type, {
							ixo: new Ixo(ixo.hostname, provider),
							error: {}
						}));
				}
			}).catch((result: Error) => {
				dispatch( 
					createAction<IxoResult>(IXO_RESULT.type, {
						ixo: null,
						error: result
					}));
			});
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