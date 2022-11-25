import { Dispatch } from 'redux'
import Axios from 'axios'
import {
  ChangePortfolioAssetAction,
  ChangeSelectedAccountAddressAction,
  ChangeStakeCellEntityAction,
  EntityExchangeActions,
  // GetAPYAction,
  GetInflationAction,
  GetLiquidityPoolsAction,
  GetTotalStakedAction,
  GetTotalSupplyAction,
  GetValidatorsAction,
  SetSelectedValidatorAction,
  SetSelectedTradeMethodAction,
  TradeMethodType,
} from './types'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { get } from 'lodash'

export const changePortfolioAsset = (asset: string): ChangePortfolioAssetAction => ({
  type: EntityExchangeActions.ChangePortfolioAsset,
  payload: asset,
})

export const changeStakeCellEntity = (entityDID: string): ChangeStakeCellEntityAction => ({
  type: EntityExchangeActions.ChangeStakeCellEntity,
  payload: entityDID,
})

export const changeSelectedAccountAddress = (address: string): ChangeSelectedAccountAddressAction => ({
  type: EntityExchangeActions.ChangeSelectedAccountAddress,
  payload: address,
})

export const setSelectedValidator = (address: string): SetSelectedValidatorAction => ({
  type: EntityExchangeActions.SetSelectedValidator,
  payload: address,
})

export const setSelectedTradeMethod = (method: TradeMethodType): SetSelectedTradeMethodAction => ({
  type: EntityExchangeActions.SetSelectedTradeMethod,
  payload: method,
})

export const getInflation =
  () =>
  (dispatch: Dispatch): GetInflationAction => {
    return dispatch({
      type: EntityExchangeActions.GetInflation,
      payload: Axios.get(`${process.env.REACT_APP_GAIA_URL}/minting/inflation`)
        .then((response) => response.data)
        .then(({ result }) => Number(result))
        .catch(() => 0),
    })
  }

export const getTotalSupply =
  (denom = 'uixo') =>
  (dispatch: Dispatch): GetTotalSupplyAction => {
    // convert denom
    return dispatch({
      type: EntityExchangeActions.GetTotalSupply,
      payload: Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/bank/v1beta1/supply/${denom}`)
        .then((response) => response.data)
        .then((response) => response.amount)
        .then((response) => response.amount)
        .catch(() => 0),
    })
  }

export const getTotalStaked =
  () =>
  (dispatch: Dispatch): GetTotalStakedAction => {
    // convert denom
    return dispatch({
      type: EntityExchangeActions.GetTotalStaked,
      payload: Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/staking/v1beta1/pool`)
        .then((response) => response.data)
        .then((response) => response.pool)
        .then((response) => ({
          TotalBonded: Number(response.bonded_tokens),
          TotalNotBonded: Number(response.not_bonded_tokens),
        }))
        .catch(() => ({
          TotalBonded: 0,
          TotalNotBonded: 0,
        })),
    })
  }

export const getValidators =
  (accountAddress: string) =>
  (dispatch: Dispatch): GetValidatorsAction => {
    return dispatch({
      type: EntityExchangeActions.GetValidators,
      payload: Axios.get(`${process.env.REACT_APP_GAIA_URL}/staking/validators`)
        .then((response) => response.data)
        .then(({ result }) => {
          return result.map((validator: any) => {
            const identity = validator.description.identity
            const address = validator.operator_address
            const name = validator.description.moniker
            const website = validator.description.website
            const commission = validator.commission.commission_rates.rate
            const votingPower = validator.tokens
            const mission = validator.description.details ?? ''

            if (identity) {
              Axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`)
                .then((response) => response.data)
                .then((response) => response.them[0])
                .then((response) => response.pictures)
                .then((response) => response.primary)
                .then((response) => response.url)
                .then((response) => {
                  return dispatch({
                    type: EntityExchangeActions.GetValidatorLogo,
                    payload: {
                      address,
                      logo: response,
                    },
                  })
                })
                .catch(() => {
                  return dispatch({
                    type: EntityExchangeActions.GetValidatorLogo,
                    payload: {
                      address,
                      logo: require('assets/img/relayer.png'),
                    },
                  })
                })
            }

            Axios.get(
              `${process.env.REACT_APP_GAIA_URL}/cosmos/staking/v1beta1/validators/${address}/delegations/${accountAddress}`,
            )
              .then((response) => response.data)
              .then((response) => response.delegation_response)
              .then((response) => response.balance)
              .then(({ amount, denom }) => {
                return dispatch({
                  type: EntityExchangeActions.GetValidatorDelegation,
                  payload: {
                    address,
                    delegation: {
                      amount: denom !== 'uixo' ? amount : getBalanceNumber(new BigNumber(amount)),
                      denom: denom !== 'uixo' ? denom : 'ixo',
                    },
                  },
                })
              })
              .catch((error) => {
                console.log(error)
              })

            Axios.get(
              `${process.env.REACT_APP_GAIA_URL}/cosmos/distribution/v1beta1/delegators/${accountAddress}/rewards/${address}`,
            )
              .then((response) => response.data)
              .then(({ rewards }) => {
                const { amount, denom } = rewards[0]
                return dispatch({
                  type: EntityExchangeActions.GetValidatorReward,
                  payload: {
                    address,
                    reward: {
                      amount: denom !== 'uixo' ? amount : getBalanceNumber(new BigNumber(amount)),
                      denom: denom !== 'uixo' ? denom : 'ixo',
                    },
                  },
                })
              })
              .catch((err) => {
                console.log(err)
              })

            return {
              address,
              name,
              website,
              commission,
              logo: require('assets/img/relayer.png'),
              delegation: null,
              reward: null,
              votingPower,
              mission,
            }
          })
        }),
    })
  }

export const getLiquidityPools =
  () =>
  (dispatch: Dispatch): GetLiquidityPoolsAction => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    const request = Axios.get(process.env.REACT_APP_CONFIG_EXCHANGE_URL!)

    return dispatch({
      type: EntityExchangeActions.GetLiquidityPools,
      payload: request
        .then((response) => response.data)
        .then((data) => data.liquidityPools)
        .then((liquidityPools) => liquidityPools.find((liquidityPool: any) => liquidityPool.chainId === chainId)?.pools)
        .then((pools) => {
          const requests = pools.map((pool: any) => {
            const { poolID } = pool
            return Axios.get(`${process.env.REACT_APP_GAIA_URL}/ixo/bonds/${poolID}`, {
              transformResponse: [
                (response: string): any => {
                  const parsedResponse = JSON.parse(response)
                  return get(parsedResponse, 'bond', parsedResponse)
                },
              ],
            })
          })
          Promise.all(requests).then((bondDetails) => {
            bondDetails
              .map((response: any) => response.data)
              .forEach((bondDetail: any) => {
                return dispatch({
                  type: EntityExchangeActions.GetLiquidityPoolDetailSuccess,
                  payload: {
                    poolID: bondDetail.bond_did,
                    poolDetail: bondDetail,
                  },
                })
              })
          })

          return pools
        })
        .catch((e) => {
          console.error('getLiquidityPools', e)
          return []
        }),
    })
  }
