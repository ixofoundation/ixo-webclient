import { Currency } from '../../types/models'
import { TokenSupplyActionTypes, TokenSupplyActions } from './types'

export const initialState: Currency[] = []

export const reducer = (
  state = initialState,
  action: TokenSupplyActionTypes,
): Currency[] => {
  switch (action.type) {
    case TokenSupplyActions.GetTotalSuppliesSuccess:
      return [...action.payload.data]
  }

  return state
}
