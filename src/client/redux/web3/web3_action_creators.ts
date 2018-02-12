import {createAction} from "../../../lib/redux_utils/actions";
import {INIT__WEB3__FAILURE, INIT__WEB3__INIT, INIT__WEB3__SUCCESS} from "./web3_actions";

import {ICredentialProviderResult} from "../../../../types/models";

export function initializeWeb3(ixo: any) {
    return dispatch => {
        dispatch(createAction<INIT__WEB3__INIT>(INIT__WEB3__INIT.type, {ixo: ixo}));

       /*  window.addEventListener('load', function () {
            var web3 = window['web3'];
            ixo.auth.getCredentialProvider(web3.currentProvider).then((result: ICredentialProviderResult) => {
                dispatch(createAction<INIT__WEB3__SUCCESS>(INIT__WEB3__SUCCESS.type, {web3Instance: result.credentialProviderInstance}))
            }).catch((error => {
                dispatch(createAction<INIT__WEB3__FAILURE>(INIT__WEB3__FAILURE.type, {error: error}))
            }));
        }); */
    }
}






