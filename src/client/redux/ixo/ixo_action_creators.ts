import { createAction } from '../../../lib/redux_utils/actions';
import { IXO__CREATE__FAILURE, IXO__CREATE__INIT, IXO__CREATE__SUCCESS } from './ixo_actions';
import { Ixo } from 'ixo-module';
import { hostname } from 'os';

export function initIxo(hostName: string) {
    return dispatch => {
        dispatch(createAction<IXO__CREATE__INIT>(IXO__CREATE__INIT.type, { hostName }));
        var web3 = window['web3'];
        var ixo = new Ixo(hostName);
        if (ixo) {
            ixo.init(web3).then((provider: any) => {
                if (provider) {
                    dispatch(
                        createAction<IXO__CREATE__SUCCESS>(IXO__CREATE__SUCCESS.type, {
                            ixo: new Ixo(ixo.hostname, provider)
                        }));
                }
            })
        } else {
            dispatch(
                createAction<IXO__CREATE__FAILURE>(IXO__CREATE__FAILURE.type, {
                    error: 'Error initialising ixo'
                }));
        }
    };
}
