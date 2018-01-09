import {createAction} from "../../../lib/redux_utils/actions";
import {PING__CREATE__FAILURE, PING__CREATE__INIT, PING__CREATE__SUCCESS} from "./ping_actions";

const Ixo = require('ixo-module');

export function pingIxoServer() {
  return dispatch => {
    dispatch(createAction<PING__CREATE__INIT>(PING__CREATE__INIT.type, {}));
    var ixo = new Ixo();

    ixo.network.pingIxoNode().then((result) => {
      dispatch(
        createAction<PING__CREATE__SUCCESS>(PING__CREATE__SUCCESS.type, {
          result: result[0].result
        })
      );
    })
      .catch((result: Error) => {
        dispatch(
          createAction<PING__CREATE__FAILURE>(PING__CREATE__FAILURE.type, {
            error: result['error'] ? result['error'] : result.message
          })
        );
      });
  }
}
