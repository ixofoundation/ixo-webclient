import {createAction} from "../../../lib/redux_utils/actions";
import {PING_RESULT} from "./ping_actions";
import {IPingResult} from "../../../../types/models";

export function pingIxoServer(ixo: any) {
    return dispatch => {
        ixo.network.pingIxoServerNode()
            .then((response: IPingResult) => {
                dispatch(
                    createAction<PING_RESULT>(PING_RESULT.type, {
                        pingResult: response.result,
                        pingError: null
                    })
                )}
            ).catch((result: Error) => {
            dispatch(
                createAction<PING_RESULT>(PING_RESULT.type, {
                    pingResult: null,
                    pingError: result['error'] ? result['error'] : result.message
                })
            )
        });

    }
}


export function resetPing() {
    return dispatch => {
        dispatch(
            createAction<PING_RESULT>(PING_RESULT.type, {
                pingResult: null,
                pingError: null
            })
        )
    }
}
