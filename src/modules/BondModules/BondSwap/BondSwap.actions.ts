import { ClearAction, GetQuoteAction, ConfirmSwapAction, BondSwapActions, InitiateQuoteAction } from './types'
import Axios from 'axios'
import { Currency } from 'types/models'
import { currencyStr } from 'modules/Account/Account.utils'
import { Dispatch } from 'redux'
import { RootState } from 'common/redux/types'

export const initiateQuote = (): InitiateQuoteAction => ({
  type: BondSwapActions.InitiateQuote,
})

export const getQuote =
  (sending: Currency, receiving: Currency) =>
  (dispatch: Dispatch, getState: () => RootState): GetQuoteAction => {
    const {
      activeBond: { bondDid },
    } = getState()

    return dispatch({
      type: BondSwapActions.GetQuote,
      payload: Axios.get(
        `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/swap_return/${currencyStr(sending!, false)}/${
          receiving!.denom
        }`,
        {
          transformResponse: [
            (response: string): any => {
              return JSON.parse(response).result
            },
          ],
        },
      ).then((response) => {
        return {
          sending,
          receiving: response.data.total_returns[0],
          totalFee: response.data.total_fees[0],
          txFees: response.data.tx_fees,
        }
      }),
    })
  }

// TODO
export const confirmSwap =
  () =>
  (dispatch: Dispatch, getState: () => RootState): ConfirmSwapAction => {
    return null!
  }

export const clear = (): ClearAction => {
  return {
    type: BondSwapActions.Clear,
  }
}
