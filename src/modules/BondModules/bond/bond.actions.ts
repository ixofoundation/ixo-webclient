import Axios from "axios";
import { BondActions, GetBalancesAction, GetTradesAction, ClearBondAction } from "./types";
import { Dispatch } from "redux";
import { get } from 'lodash'
import { apiCurrencyToCurrency } from "../../Account/Account.utils";

export const clearBond = (): ClearBondAction => ({
  type: BondActions.ClearBond,
})

export const getBalances = (bondDid: string) => (
  dispatch: Dispatch
): GetBalancesAction => {
  dispatch(clearBond())
  const bondRequest = Axios.get(
    `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}`,
    {
      transformResponse: [
        (response: string): any => {
          const parsedResponse = JSON.parse(response)
          return get(parsedResponse, 'result.value', parsedResponse);
        },
      ],
    }
  );
  const priceRequest = Axios.get(
    `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/current_price`,
    {
      transformResponse: [
        (response: string): any => {
          const parsedResponse = JSON.parse(response)
          return get(parsedResponse, 'result', ['error'])[0];
        },
      ],
    }
  );
  const reserveRequest = Axios.get(
    `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/current_reserve`,
    {
      transformResponse: [
        (response: string): any => {
          const parsedResponse = JSON.parse(response)
          return get(parsedResponse, 'result', ['error'])[0];
        },
      ],
    }
  );

  return dispatch({
    type: BondActions.GetBalances,
    payload: Promise.all([bondRequest, priceRequest, reserveRequest]).then(
      Axios.spread((...responses) => {
        const bond = responses[0].data;
        const price = responses[1].data;
        const reserve = responses[2].data;

        return {
          bondDid,
          symbol: bond.token,
          name: bond.name,
          address: bond.feeAddress,
          type: bond.function_type,
          collateral: apiCurrencyToCurrency(bond.current_supply),
          totalSupply: apiCurrencyToCurrency(bond.max_supply),
          price: apiCurrencyToCurrency(price),
          reserve: apiCurrencyToCurrency(reserve),
          alpha: 0,
          alphaDate: new Date(),
        };
      })
    ),
  });
};

export const getTransactions = () => (dispatch: Dispatch): GetTradesAction => {
  // TODO: Select Specific token
  // TODO: Are queries disappearing?

  const config = {
    transformResponse: [
      (response: string): any => {
        return JSON.parse(response).txs;
      },
    ],
  };

  const buyReq = Axios.get(
    process.env.REACT_APP_GAIA_URL + "/txs?message.action=buy",
    config
  );
  const sellReq = Axios.get(
    process.env.REACT_APP_GAIA_URL + "/txs?message.action=sell",
    config
  );
  const swapReq = Axios.get(
    process.env.REACT_APP_GAIA_URL + "/txs?message.action=swap",
    config
  );

  return dispatch({
    type: BondActions.GetTrades,
    payload: Promise.all([buyReq, sellReq, swapReq]).then(
      Axios.spread((...responses) => {
        const buy = responses[0].data;
        const sell = responses[1].data;
        const swap = responses[2].data;
        return { trades: [...buy, ...sell, ...swap] };
      })
    ),
  });
};
