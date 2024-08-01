import { Reducer } from 'redux'
import { ExchangeActionTypes, ExchangeActions, ExchangeState } from './exchange.types'
import BigNumber from 'bignumber.js'

const initialState: ExchangeState = {
  balances: {},
  chainId: import.meta.env.VITE_APP_CHAIN_ID,
  tokenBalances: [],
  inputAsset: {
    amount: BigNumber(0),
    minimumOutputAmount: BigNumber(0),
    entity: null,
    balance: 0,
    asset: null,
    usdAmount: BigNumber(0),
    batches: [],
  },
  outputAsset: {
    amount: BigNumber(0),
    minimumOutputAmount: BigNumber(0),
    entity: null,
    balance: 0,
    asset: null,
    usdAmount: BigNumber(0),
    batches: [],
  },
  settings: {
    slippage: 3,
  },
}

const reducer: Reducer<ExchangeState, ExchangeActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case ExchangeActions.SetBalances:
      return {
        ...state,
        balances: action.payload,
      }
    case ExchangeActions.SetInputAsset:
      return {
        ...state,
        inputAsset: {
          ...state.inputAsset,
          ...action.payload,
        },
      }
    case ExchangeActions.SetOutputAsset:
      return {
        ...state,
        outputAsset: {
          ...state.outputAsset,
          ...action.payload,
        },
      }
    case ExchangeActions.SetInputAssetUSDAmount:
      return {
        ...state,
        inputAsset: {
          ...state.inputAsset,
          usdAmount: action.payload,
        },
      }
    case ExchangeActions.SetOutputAssetUSDAmount:
      return {
        ...state,
        outputAsset: {
          ...state.outputAsset,
          usdAmount: action.payload,
        },
      }
    case ExchangeActions.SetInputAssetEntity:
      return {
        ...state,
        inputAsset: {
          ...state.inputAsset,
          entity: action.payload,
        },
      }
    case ExchangeActions.SetOutputAssetEntity:
      return {
        ...state,
        outputAsset: {
          ...state.outputAsset,
          entity: action.payload,
        },
      }
    case ExchangeActions.SetSlippage:
      return {
        ...state,
        settings: { ...state.settings, slippage: action.payload },
      }
    case ExchangeActions.SetTokenBalances:
      return {
        ...state,
        tokenBalances: action.payload,
      }
    case ExchangeActions.SetInputAssetAmount:
      return {
        ...state,
        inputAsset: {
          ...state.inputAsset,
          amount: action.payload,
        },
      }
    case ExchangeActions.ResetState:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default reducer
