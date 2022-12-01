import { FuelEntityState, FuelEntityActionTypes, FuelEntityActions } from './fundingChat.types'

export const initialState: FuelEntityState = {
  sending: false,
  sent: false,
  error: null,
  order: null,
} as any

export const reducer = (state = initialState, action: FuelEntityActionTypes): FuelEntityState => {
  switch (action.type) {
    case FuelEntityActions.GetOrder:
      return {
        ...initialState,
        order: action.payload.order,
      }
    case FuelEntityActions.ConfirmOrderPending:
      return { ...state, sending: true }
    case FuelEntityActions.ConfirmOrderFailure:
      return { ...state, sending: false, error: 'Api error' }
    case FuelEntityActions.ConfirmOrderSuccess:
      return { ...initialState, sent: true }
    case FuelEntityActions.CancelOrder:
      return { ...initialState, order: null } as any
  }

  return state
}
