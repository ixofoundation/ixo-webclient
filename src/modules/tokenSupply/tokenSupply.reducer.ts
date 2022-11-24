import { Currency } from '../../types/models'
import { TokenSupplyActionTypes, TokenSupplyActions } from './types'

export const initialState: Currency[] = []

export const reducer = (state = initialState, action: TokenSupplyActionTypes): Currency[] => {
  switch (action.type) {
    case TokenSupplyActions.GetTotalSupplySuccess:
      return [...action.payload.tokenSupply]
  }

  return state
}
