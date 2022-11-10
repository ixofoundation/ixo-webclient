import { BondActions, BondStateType } from './types'
import { BondState, BondActionTypes } from './types'

export const initialState = {
  bondDid: '',
  symbol: '',
  reserveDenom: '',
  name: '',
  address: '',
  type: '',
  collateral: { amount: '0', denom: '' },
  totalSupply: { amount: '0', denom: '' },
  reserve: { amount: '0', denom: '' },
  myStake: { amount: '0', denom: '' },
  capital: { amount: '0', denom: '' },
  maxSupply: { amount: '0', denom: '' },
  systemAlpha: 0,
  publicAlpha: 0,
  state: BondStateType.HATCH,
  alphaDate: new Date(),
  transactions: [],
  allowSells: false,
  allowReserveWithdrawals: false,

  Outcomes: {
    Targets: [],
    Rewards: [],
  },
  priceHistory: [],
  lastPrice: 0,
  initialSupply: 0,
  initialPrice: 0,
  initialRaised: 0,
  alphaHistory: [],
  withdrawHistory: [],
} as BondState

export const reducer = (
  state = initialState,
  action: BondActionTypes,
): BondState => {
  switch (action.type) {
    case BondActions.GetBondDid:
      return {
        ...state,
        bondDid: action.payload,
      }
    case BondActions.GetBondDetailSuccess:
      if (!action.payload.symbol) {
        return {
          ...state,
          ...action.payload,
        }
      }
      return {
        ...state,
        ...action.payload,
      }
    case BondActions.ClearBond:
      return initialState
    case BondActions.GetTransactionsSuccess:
      return {
        ...state,
        transactions: action.payload,
      }
    case BondActions.GetOutcomesTargetsSuccess:
      return {
        ...state,
        Outcomes: {
          ...state.Outcomes,
          Targets: action.payload.filter((target: any) =>
            target.ddoTags.some(
              (ddoTag: any) =>
                ddoTag.category === 'Claim Type' &&
                ddoTag.tags.some((tag) => tag === 'Outcome'),
            ),
          ),
        },
      }
    case BondActions.GetPriceHistorySuccess:
      return {
        ...state,
        priceHistory: action.payload,
        lastPrice:
          action.payload.length > 0
            ? action.payload[action.payload.length - 1].price
            : 0,
      }
    case BondActions.GetAlphaHistorySuccess:
      return { ...state, alphaHistory: action.payload }
    case BondActions.GetWithdrawHistorySuccess:
      return { ...state, withdrawHistory: action.payload }
  }

  return state
}
