import { BondAccountActions, GetBondAccountAction } from "./types";
import { Dispatch } from "redux";
import Axios from "axios";

export const getBondAccounts = (projectDID) => (
  dispatch: Dispatch,
): GetBondAccountAction => {

  // const config = {
  //   transformResponse: [
  //     (response: string): any => {
  //       return JSON.parse(response).txs;
  //     },
  //   ],
  // };

  const getAccountsReq = Axios.get(
    `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${projectDID}`,
    // config
  );

  return dispatch({
    type: BondAccountActions.GetAccounts,
    payload: getAccountsReq.then(
      responses => {
        console.log('getAccounts', responses.data)
        return { bondAccounts: [] };
      })
  });
};
