import {
  FuelEntityState,
  FuelEntityActionTypes,
  FuelEntityActions,
} from './types'

export const initialState: FuelEntityState = {
  order: null,
  sending: false,
  error: null,
}

export const reducer = (
  state = initialState,
  action: FuelEntityActionTypes,
): FuelEntityState => {
  switch (action.type) {
    case FuelEntityActions.GetOrder:
      return {
        ...state,
        order: action.payload.order,
      }
    case FuelEntityActions.ConfirmOrderPending:
      return { ...state, sending: true }
    case FuelEntityActions.ConfirmOrderFailure:
      return { ...state, sending: false, error: 'Api error' }
    case FuelEntityActions.ConfirmOrderSuccess:
      return { ...initialState }
  }

  return state
}
