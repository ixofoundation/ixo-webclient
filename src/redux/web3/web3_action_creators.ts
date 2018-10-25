import { createAction } from '../../lib/redux_utils/actions';
import { Web3Result, WEB3_RESULT } from './web3_actions';
import * as Web3 from 'web3';

export function connectWeb3() {
	return dispatch => {
		let { web3 }: Web3 = window;
		if (web3) {
			let myWeb3 = new Web3(web3.currentProvider);
			
			dispatch(
				createAction<Web3Result>(WEB3_RESULT.type, {
					web3: myWeb3,
					error: {}
				})
			);
		} else {
			console.error('Please use a web3 browser or extension such as MetaMask');
		}
	};
}

export function resetWeb3Connection() {
	return dispatch => {
		dispatch(
			createAction<Web3Result>(WEB3_RESULT.type, {
				web3: null,
				error: {}
			})
		);
	};
}