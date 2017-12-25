import {createAction} from "../../../lib/redux_utils/actions";
import {USER__CREATE__FAILURE, USER__CREATE__INIT, USER__CREATE__SUCCESS} from "./user_actions";
import {sendPostJSON} from "../../../lib/redux_utils/fetch_utils";

export function createUser(username: string, walletAddress: string) {
  return dispatch => {
    dispatch(createAction<USER__CREATE__INIT>(USER__CREATE__INIT.type, {username, walletAddress}));
    sendPostJSON('/api/user', {username, walletAddress})
      .then((result) => {
        dispatch(
          createAction<USER__CREATE__SUCCESS>(USER__CREATE__SUCCESS.type, {
            result: result['data']
          })
        );
      })
      .catch((result: Error) => {
        dispatch(
          createAction<USER__CREATE__FAILURE>(USER__CREATE__FAILURE.type, {
            error: result['error'] ? result['error'] : result.message
          })
        );
      });
  }
}
