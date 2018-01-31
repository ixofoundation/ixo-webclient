import { createAction } from '../../../lib/redux_utils/actions';
import { IXO__CREATE__FAILURE, IXO__CREATE__INIT, IXO__CREATE__SUCCESS } from './ixo_actions';
import { Ixo } from 'ixo-module';

export function initIxo(hostName: string) {
    var ixo = new Ixo(hostName);
    return dispatch => {
        dispatch(createAction<IXO__CREATE__INIT>(IXO__CREATE__INIT.type, { hostName }));
        if (ixo) {
            dispatch(
                createAction<IXO__CREATE__SUCCESS>(IXO__CREATE__SUCCESS.type, {
                    ixo: ixo
                }));
        } else {
            dispatch(
                createAction<IXO__CREATE__FAILURE>(IXO__CREATE__FAILURE.type, {
                    error: 'Error initialising ixo'
                }));
        }
    };
}
