import * as SUT from './BondAccountOrders.reducer'
import { BondAccountOrdersActions, GetBondAccountOrdersSuccessAction } from './types'

const initialState = SUT.initialState

describe('GetBondAccountOrdersSuccessAction Action', () => {
  it('should return a new copy of state, with the bondAccountOrders set', () => {
    const bondAccountOrders = [
      { id: 1, prop1: 'value1' },
      { id: 2, prop1: 'value2' },
      { id: 3, prop1: 'value3' },
      { id: 4, prop1: 'value1' },
      { id: 5, prop1: 'value2' },
      { id: 6, prop1: 'value3' },
      { id: 7, prop1: 'value1' },
      { id: 8, prop1: 'value2' },
      { id: 9, prop1: 'value3' },
    ]

    // ... we create a GetBondAccountOrdersSuccessAction action
    const action: GetBondAccountOrdersSuccessAction = {
      type: BondAccountOrdersActions.GetOrdersSuccess,
      payload: {
        bondAccountOrders,
      },
    }

    // when ... we run the reducer and pass it our initial state and this action
    const state = SUT.reducer(initialState, action)

    // then the state should be set as expected
    expect(state).toEqual(bondAccountOrders)
  })
})
