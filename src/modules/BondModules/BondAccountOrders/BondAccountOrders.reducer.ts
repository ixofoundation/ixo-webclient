import { BondAccountOrdersActionTypes, BondAccountOrdersActions } from './types'

export const initialState: any = []

export const reducer = (state = initialState, action: BondAccountOrdersActionTypes): any[] => {
  switch (action.type) {
    case BondAccountOrdersActions.GetOrdersSuccess:
      return [...action.payload.bondAccountOrders]
  }

  return state
}
