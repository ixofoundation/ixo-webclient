import { ProjectAccountActions } from "../types";
import { Dispatch } from "redux";
import Axios from "axios";

export const getProjectAccounts = (projectDID) => (
  dispatch: Dispatch,
): any => {
  const getAccountsReq = Axios.get(
    `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${projectDID}`,
    // config
  );

  const getAccountBalance = (param): any => {
    console.log('param', param)
    return Axios.get(
    `${process.env.REACT_APP_GAIA_URL}/auth/accounts/${param}`
    )
  }
  dispatch({
    type: ProjectAccountActions.GetAccountsRequest
  })
  return getAccountsReq.then(
    async responses => {
      const promises = []
      Object.values(responses.data).forEach(value => {
        promises.push(new Promise((resolve, reject) => {
          getAccountBalance(value).then(response => resolve(response.data.result))
          .catch(e => reject(e))
        }))
      })
      const values = await Promise.all(promises)

      dispatch({
        type: ProjectAccountActions.GetAccountsSuccess,
        payload: values
      });
  })
};

