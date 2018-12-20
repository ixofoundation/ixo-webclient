import { createAction } from '../../lib/redux_utils/actions';
import { Web3Result, WEB3_RESULT } from './web3_actions';
import * as Web3 from 'web3';

export function connectWeb3() {
	return dispatch => {
		let { web3 }: Web3 = window;
		// @ts-ignore
		if (window.ethereum) { // Modern dapp browsers...
			// @ts-ignore
			window.web3 = new Web3(ethereum);
			try {
				// Acccounts now exposed
				dispatch(
					createAction<Web3Result>(WEB3_RESULT.type, {
						// @ts-ignore
						web3: window.web3,
						error: {}
					})
				);
			} catch (error) {
				// User denied account access...
			}
			// @ts-ignore
		} else if (window.web3) { // Legacy dapp browsers...
			// @ts-ignore
			window.web3 = new Web3(web3.currentProvider);
			// Acccounts always exposed
			dispatch(
				createAction<Web3Result>(WEB3_RESULT.type, {
					// @ts-ignore
					web3: window.web3,
					error: {}
				})
			);
		}  else {
			dispatch(
				createAction<Web3Result>(WEB3_RESULT.type, {
					web3: null,
					error: 'Please install MetaMask'
				})
			);		
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