import { createAction } from '../../../lib/redux_utils/actions';
import { Ixo } from 'ixo-module';
import { hostname } from 'os';
import { IXO_RESULT } from './ixo_actions';

export function initIxo(hostName: string) {
    return dispatch => {
        var ixo = new Ixo(hostName);
        var web3 = window['web3'];

        if (ixo && web3) {
            ixo.init(web3).then((provider: any) => {
                if (provider) {
                    dispatch(
                        createAction<IXO_RESULT>(IXO_RESULT.type, {
                            ixo: new Ixo(ixo.hostname, provider),
                            error: null
                        }));
                }
            }).catch((result: Error) => {
                dispatch(
                    createAction<IXO_RESULT>(IXO_RESULT.type, {
                        ixo: null,
                        error: result
                    }));
            });
        } else {
            dispatch(
                createAction<IXO_RESULT>(IXO_RESULT.type, {
                    ixo: null,
                    error: 'Please log into your web3 provider!'
                }));
        }
    };
}

export function resetIxo() {
    return dispatch => {
        dispatch(
            createAction<IXO_RESULT>(IXO_RESULT.type, {
                ixo: null,
                error: null
            })
        )
    }
}

