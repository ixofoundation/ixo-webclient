import {createAction} from "../../../lib/redux_utils/actions";
import {PING__CREATE__FAILURE, PING__CREATE__INIT, PING__CREATE__SUCCESS} from "./ping_actions";
import {sendPostJSON} from "../../../lib/redux_utils/fetch_utils";

export function createPing(isResponding: boolean, responseTime: number) {
  return dispatch => {
    dispatch(createAction<PING__CREATE__INIT>(PING__CREATE__INIT.type, {isResponding, responseTime}));
    sendPostJSON('/api/ping', {isResponding, responseTime})
      .then((result) => {
        dispatch(
          createAction<PING__CREATE__SUCCESS>(PING__CREATE__SUCCESS.type, {
            result: result['data']
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
