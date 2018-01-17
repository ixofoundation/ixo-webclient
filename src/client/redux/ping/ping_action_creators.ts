import {createAction} from "../../../lib/redux_utils/actions";
import {PING__CREATE__FAILURE, PING__CREATE__INIT, PING__CREATE__SUCCESS} from "./ping_actions";
import {IPingResult} from "../../../../types/models";

export function pingIxoServer(ixo: any) {
    return dispatch => {
        dispatch(createAction<PING__CREATE__INIT>(PING__CREATE__INIT.type, {ixo: ixo}));
        ixo.network.pingIxoServerNode()
            .then((response: IPingResult) => {

                    dispatch(
                        createAction<PING__CREATE__SUCCESS>(PING__CREATE__SUCCESS.type, {
                            pingResult: response
                        }))
                }
            ).catch((result: Error) => {
            dispatch(
                createAction<PING__CREATE__FAILURE>(PING__CREATE__FAILURE.type, {
                    error: result['error'] ? result['error'] : result.message
                }))
        });

    }
}
