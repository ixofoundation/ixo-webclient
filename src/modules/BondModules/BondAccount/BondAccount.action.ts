import { BondAccountActions, GetBondAccountAction } from './types'
import { Dispatch } from 'redux'
import Axios from 'axios'

export const getBondAccounts =
  (projectDID: any) =>
  (dispatch: Dispatch): GetBondAccountAction => {
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
    )

    const getAccountBalance = (param: any): any => {
      return Axios.get(`${process.env.REACT_APP_GAIA_URL}/auth/accounts/${param}`)
    }
    return dispatch({
      type: BondAccountActions.GetAccounts,
      payload: getAccountsReq.then(async (responses) => {
        await getAccountBalance(responses.data.InitiatingNodePayFees)
        return { bondAccounts: [] }
      }),
    })
  }
