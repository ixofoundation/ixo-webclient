import {createAction} from "../../../lib/redux_utils/actions";
import {INIT__WEB3__FAILURE, INIT__WEB3__INIT, INIT__WEB3__SUCCESS} from "./web3_actions";

import Ixo from "/Users/nicolaasvercuiel/repos/ixo-module";
import {ICredentialProviderResult} from "../../../../types/models";

export function initializeWeb3() {
    return dispatch => {
        dispatch(createAction<INIT__WEB3__INIT>(INIT__WEB3__INIT.type, {}));
        var ixo = new Ixo('https://arcane-stream-64697.herokuapp.com/api/network');
        ixo.auth.getCredentialProvider(window['web3'].currentProvider).then((result: ICredentialProviderResult) => {
            dispatch(createAction<INIT__WEB3__SUCCESS>(INIT__WEB3__SUCCESS.type, {web3Instance: result.credentialProviderInstance}))
        }).catch((error => {
            dispatch(createAction<INIT__WEB3__FAILURE>(INIT__WEB3__FAILURE.type, {error: error}))
        }));
    }
}



