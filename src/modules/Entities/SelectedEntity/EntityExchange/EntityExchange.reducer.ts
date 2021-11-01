import {
  EntityExchangeActionTypes,
  EntityExchangeActions,
  EntityExchangeState,
} from './types'

export const initialState: EntityExchangeState = {
  // tradeMethod: TradeMethodType.Swap
  tradeMethod: null,
  portfolioAsset: null,
  stakeCellEntity: null,
  selectedAccountAddress: null,

  Inflation: 0,
  TotalSupply: 0,
  TotalStaked: 0,
  APY: 0,
  validators: [],

  selectedValidator: null,
}

export const reducer = (
  state = initialState,
  action: EntityExchangeActionTypes,
): any => {
  switch (action.type) {
    case EntityExchangeActions.ChangeTradeMethod:
      return {
        ...state,
        tradeMethod: action.payload.tradeMethod,
      }
    case EntityExchangeActions.ChangePortfolioAsset:
      return {
        ...state,
        portfolioAsset: action.payload
      }
    case EntityExchangeActions.ChangeStakeCellEntity:
      return {
        ...state,
        stakeCellEntity: action.payload
      }
    case EntityExchangeActions.ChangeSelectedAccountAddress:
      return {
        ...state,
        selectedAccountAddress: action.payload
      }
    case EntityExchangeActions.SetSelectedValidator:
      return {
        ...state,
        selectedValidator: action.payload
      }


    case EntityExchangeActions.GetTotalSupplySuccess:
      return {
        ...state,
        TotalSupply: action.payload,
      }
    case EntityExchangeActions.GetInflationSuccess:
      return {
        ...state,
        Inflation: action.payload,
      }
    case EntityExchangeActions.GetTotalStakedSuccess:
      return {
        ...state,
        TotalStaked: action.payload,
      }
    case EntityExchangeActions.GetAPY:
      return {
        ...state,
        APY: action.payload,
      }
    case EntityExchangeActions.GetValidatorsSuccess:
      return {
        ...state,
        validators: action.payload,
      }
    case EntityExchangeActions.GetValidatorLogo:
      return {
        ...state,
        validators: state.validators.map((validator) => ({
          ...validator,
          logo:
            validator.address !== action.payload.address
              ? validator.logo
              : action.payload.logo,
        })),
      }
    case EntityExchangeActions.GetValidatorDelegation:
      return {
        ...state,
        validators: state.validators.map((validator) => ({
          ...validator,
          delegation:
            validator.address !== action.payload.address
              ? validator.delegation
              : action.payload.delegation,
        })),
      }
    case EntityExchangeActions.GetValidatorReward:
      return {
        ...state,
        validators: state.validators.map((validator) => ({
          ...validator,
          reward:
            validator.address !== action.payload.address
              ? validator.reward
              : action.payload.reward,
        })),
      }
    default:
      return state
  }
}
