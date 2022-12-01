// @ts-nocheck
import * as SUT from './fundingChat.reducer'
import {
  FuelEntityActions,
  GetOrderAction,
  ConfirmOrderPendingAction,
  ConfirmOrderSuccessAction,
  ConfirmOrderFailureAction,
  FuelEntityOrder,
} from './fundingChat.types'

const initialState = SUT.initialState

describe('FuelEntity Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GetOrder Action', () => {
    it('should return a new copy of state, with order set', () => {
      // given .. we have an action of type FuelEntityActions.GetOrder and an order
      const order: FuelEntityOrder = {
        subscription: '12 months',
        fiat: 'Euros',
        fiatSymbol: '€',
        amount: '1200',
        fiatConversion: '10',
        transactionFee: '10',
        gasFee: '1',
        symbol: 'IXO',
      }

      const action: GetOrderAction = {
        type: FuelEntityActions.GetOrder,
        payload: {
          order,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual({ ...initialState, order })
    })
  })

  describe('ConfirmOrderPending Action', () => {
    it('should return a new copy of state, with the sending flag set to true', () => {
      // given .. we have an action of type FuelEntityActions.ConfirmOrderPending
      const action: ConfirmOrderPendingAction = {
        type: FuelEntityActions.ConfirmOrderPending,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        sending: true,
      })
    })
  })

  describe('ConfirmOrderFailure Action', () => {
    it('should return a new copy of state, with the sending flag set to false and the error set', () => {
      // given .. we have an action of type FuelEntityActions.ConfirmOrderFailure
      const action: ConfirmOrderFailureAction = {
        type: FuelEntityActions.ConfirmOrderFailure,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, sending: true, error: null }, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        sending: false,
        error: 'Api error',
      })
    })
  })

  describe('ConfirmOrderSuccess Action', () => {
    it('should return the initial state', () => {
      // given .. we have an action of type FuelEntityActions.ConfirmOrderSuccess
      const currentState = {
        sending: true,
        sent: false,
        error: null,
        order: {
          subscription: '12 months',
          fiat: 'Euros',
          fiatSymbol: '€',
          amount: '1200',
          fiatConversion: '10',
          transactionFee: '10',
          gasFee: '1',
          symbol: 'IXO',
        },
      }

      const action: ConfirmOrderSuccessAction = {
        type: FuelEntityActions.ConfirmOrderSuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({ ...initialState, sent: true })
    })
  })
})
