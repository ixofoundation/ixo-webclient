import * as SUT from './quote.reducer'
import {
  QuoteActions,
  BuyPendingAction,
  BuySuccessAction,
  BuyFailureAction,
  SellPendingAction,
  SellSuccessAction,
  SellFailureAction,
  SwapPendingAction,
  SwapSuccessAction,
  SwapFailureAction,
  ConfirmPendingAction,
  ConfirmSuccessAction,
  ConfirmFailureAction,
  ClearAction,
  QuoteState,
} from './types'
// import { QuoteState } from './types'

const initialState = SUT.initialState

describe('Quote Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('BuyPending Action', () => {
    it('should return a new copy of state, with buy flags set', () => {
      // given .. we have an action of type QuoteActions.BuyPending
      const action: BuyPendingAction = {
        type: QuoteActions.BuyPending,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        transacting: true,
        quotePending: true,
      })
    })
  })

  describe('BuySuccess Action', () => {
    it('should return a new copy of state, with quote data set', () => {
      // given .. we have an action of type QuoteActions.BuySuccess and some data
      const action: BuySuccessAction = {
        type: QuoteActions.BuySuccess,
        payload: {
          data: {
            result: {
              adjusted_supply: {
                denom: 'token1',
                amount: '5',
              },
              prices: [
                {
                  denom: 'res',
                  amount: 464,
                },
              ],
              tx_fees: [
                {
                  denom: 'res',
                  amount: 3,
                },
              ],
              total_prices: [
                {
                  denom: 'res',
                  amount: 467,
                },
              ],
              total_fees: [
                {
                  denom: 'res',
                  amount: 3,
                },
              ],
            },
            sending: { denom: 'a', amount: 1 },
            receiving: { denom: 'b', amount: 2 },
            maxPrices: [
              { denom: 'a', amount: 100 },
              { denom: 'b', amount: 200 },
            ],
          },
        },
      }

      const newState: QuoteState = {
        ...initialState,
        sending: { denom: 'a', amount: 1 },
        receiving: { denom: 'b', amount: 2 },
        maxPrices: [
          { denom: 'a', amount: 100 },
          { denom: 'b', amount: 200 },
        ],
        actualPrices: [
          {
            denom: 'res',
            amount: 464,
          },
        ],
        txFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
        totalPrices: [
          {
            denom: 'res',
            amount: 467,
          },
        ],
        totalFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
        quotePending: false,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual(newState)
    })
  })

  describe('BuyFailure Action', () => {
    it('should return a new copy of state, with buy flags set', () => {
      // given .. we have an action of type QuoteActions.BuyFailure
      const action: BuyFailureAction = {
        type: QuoteActions.BuyFailure,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        { ...initialState, transacting: true, quotePending: true },
        action,
      )

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        transacting: false,
        quotePending: false,
      })
    })
  })

  describe('SellPending Action', () => {
    it('should return a new copy of state, with Sell flags set', () => {
      // given .. we have an action of type QuoteActions.SellPending
      const action: SellPendingAction = {
        type: QuoteActions.SellPending,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        transacting: true,
        quotePending: true,
      })
    })
  })

  describe('SellSuccess Action', () => {
    it('should return a new copy of state, with quote data set', () => {
      // given .. we have an action of type QuoteActions.SellSuccess and some data
      const action: SellSuccessAction = {
        type: QuoteActions.SellSuccess,
        payload: {
          data: {
            result: {
              tx_fees: [
                {
                  denom: 'res',
                  amount: 3,
                },
              ],
              total_prices: [
                {
                  denom: 'res',
                  amount: 467,
                },
              ],
              total_fees: [
                {
                  denom: 'res',
                  amount: 3,
                },
              ],
              returns: [
                {
                  denom: 'res',
                  amount: 3,
                },
              ],
            },
            sending: { denom: 'a', amount: 1 },
            minPrices: [
              { denom: 'a', amount: 100 },
              { denom: 'b', amount: 200 },
            ],
          },
        },
      }

      const newState: QuoteState = {
        ...initialState,
        sending: { denom: 'a', amount: 1 },
        receiving: {
          denom: 'res',
          amount: 3,
        },
        minPrices: [
          { denom: 'a', amount: 100 },
          { denom: 'b', amount: 200 },
        ],
        txFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
        totalFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
        quotePending: false,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual(newState)
    })
  })

  describe('SellFailure Action', () => {
    it('should return a new copy of state, with sell flags set', () => {
      // given .. we have an action of type QuoteActions.SellFailure
      const action: SellFailureAction = {
        type: QuoteActions.SellFailure,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        { ...initialState, transacting: true, quotePending: true },
        action,
      )

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        transacting: false,
        quotePending: false,
      })
    })
  })

  describe('SwapPending Action', () => {
    it('should return a new copy of state, with Swap flags set', () => {
      // given .. we have an action of type QuoteActions.SwapPending
      const action: SwapPendingAction = {
        type: QuoteActions.SwapPending,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        transacting: true,
        quotePending: true,
      })
    })
  })

  describe('SwapSuccess Action', () => {
    it('should return a new copy of state, with quote data set', () => {
      // given .. we have an action of type QuoteActions.SwapSuccess and some data
      const action: SwapSuccessAction = {
        type: QuoteActions.SwapSuccess,
        payload: {
          data: {
            result: {
              total_fees: [
                {
                  denom: 'res',
                  amount: 4,
                },
              ],
              total_returns: [
                {
                  denom: 'res',
                  amount: 3,
                },
              ],
            },
          },
        },
      }

      const newState: QuoteState = {
        ...initialState,
        receiving: {
          denom: 'res',
          amount: 3,
        },
        totalFees: [
          {
            denom: 'res',
            amount: 4,
          },
        ],
        quotePending: false,
        isSwapping: true,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual(newState)
    })
  })

  describe('SwapFailure Action', () => {
    it('should return a new copy of state, with Swap flags set', () => {
      // given .. we have an action of type QuoteActions.SwapFailure
      const action: SwapFailureAction = {
        type: QuoteActions.SwapFailure,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        { ...initialState, transacting: true, quotePending: true },
        action,
      )

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        transacting: false,
        quotePending: false,
      })
    })
  })

  describe('ConfirmPending Action', () => {
    it('should return a new copy of state, with Confirm flags set', () => {
      // given .. we have an action of type QuoteActions.ConfirmPending
      const action: ConfirmPendingAction = {
        type: QuoteActions.ConfirmPending,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        signPending: true,
      })
    })
  })

  describe('ConfirmSuccess Action', () => {
    it('should return a new copy of state, with ConfirmSuccess flags set if there is no payload', () => {
      // given .. we have an action of type QuoteActions.ConfirmSuccess
      const action: ConfirmSuccessAction = {
        type: QuoteActions.ConfirmSuccess,
        payload: null,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, signPending: true }, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        signPending: false,
      })
    })

    it('should return a copy of the initialState, with ConfirmSuccess flags set if there is a payload', () => {
      // given .. we have an action of type QuoteActions.ConfirmSuccess
      const action: ConfirmSuccessAction = {
        type: QuoteActions.ConfirmSuccess,
        payload: {
          data: [{ denom: 'a', amount: 1 }],
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        { ...initialState, signPending: true, transacting: true },
        action,
      )

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
      })
    })
  })

  describe('ConfirmFailure Action', () => {
    it('should return a new copy of state, with Confirm flags set', () => {
      // given .. we have an action of type QuoteActions.ConfirmFailure
      const action: ConfirmFailureAction = {
        type: QuoteActions.ConfirmFailure,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          signPending: true,
        },
        action,
      )

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        signPending: false,
      })
    })
  })

  describe('Clear Action', () => {
    it('should return a new copy the initial state', () => {
      // given .. we have an action of type QuoteActions.Clear
      const action: ClearAction = {
        type: QuoteActions.Clear,
      }

      const currentState: QuoteState = {
        ...initialState,
        sending: { denom: 'a', amount: 1 },
        receiving: { denom: 'b', amount: 2 },
        maxPrices: [
          { denom: 'a', amount: 100 },
          { denom: 'b', amount: 200 },
        ],
        actualPrices: [
          {
            denom: 'res',
            amount: 464,
          },
        ],
        txFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
        totalPrices: [
          {
            denom: 'res',
            amount: 467,
          },
        ],
        totalFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
        quotePending: false,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state flags should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})
