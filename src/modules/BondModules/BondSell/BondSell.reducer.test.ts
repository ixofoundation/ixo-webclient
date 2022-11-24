import * as SUT from './BondSell.reducer'
import {
  BondSellActions,
  GetQuotePendingAction,
  GetQuoteSuccessAction,
  GetQuoteFailureAction,
  ConfirmSellPendingAction,
  ConfirmSellSuccessAction,
  ConfirmSellFailureAction,
  ClearAction,
  InitiateQuoteAction,
  BondSellState,
} from './types'

const initialState = SUT.initialState

describe('BondSell Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('InitiateQuote Action', () => {
    it('should return a new copy of state, with quote data set', () => {
      // given .. we have an action of type BondSellActions.InitiateQuote and some data
      const action: InitiateQuoteAction = {
        type: BondSellActions.InitiateQuote,
      }

      const currentState: BondSellState = {
        ...initialState,
        sending: { amount: 1, denom: 'a' },
        receiving: { amount: 1, denom: 'a' },
        totalFee: { amount: 11, denom: 'a' },
        minPrice: { amount: 1, denom: 'a' },
        txFees: [
          { amount: 1, denom: 'a' },
          { amount: 2, denom: 'b' },
        ],
        quotePending: true,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({ ...currentState, quotePending: false })
    })
  })

  describe('GetQuotePending Action', () => {
    it('should return a new copy of state, with getQuote flags set', () => {
      // given .. we have an action of type BondSellActions.GetQuotePending
      const action: GetQuotePendingAction = {
        type: BondSellActions.GetQuotePending,
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

  describe('GetQuoteSuccess Action', () => {
    it('should return a new copy of state, with quote data set', () => {
      // given .. we have an action of type BondSellActions.GetQuoteSuccess and some data
      const action: GetQuoteSuccessAction = {
        type: BondSellActions.GetQuoteSuccess,
        payload: {
          sending: { amount: 1, denom: 'a' },
          totalFee: { amount: 11, denom: 'a' },
          minPrice: { amount: 1, denom: 'a' },
          txFees: [
            { amount: 1, denom: 'a' },
            { amount: 2, denom: 'b' },
          ],
        },
      }

      const newState: BondSellState = {
        ...initialState,
        sending: { amount: 1, denom: 'a' },
        totalFee: { amount: 11, denom: 'a' },
        minPrice: { amount: 1, denom: 'a' },
        txFees: [
          { amount: 1, denom: 'a' },
          { amount: 2, denom: 'b' },
        ],
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual(newState)
    })
  })

  describe('GetQuoteFailure Action', () => {
    it('should return a new copy of state, with quote flags set', () => {
      // given .. we have an action of type BondSellActions.GetQuoteFailure
      const action: GetQuoteFailureAction = {
        type: BondSellActions.GetQuoteFailure,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, transacting: true, quotePending: true }, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        transacting: false,
        quotePending: false,
      })
    })
  })

  describe('ConfirmSellPending Action', () => {
    it('should return a new copy of state, with Confirm flags set', () => {
      // given .. we have an action of type BondSellActions.ConfirmSellPending
      const action: ConfirmSellPendingAction = {
        type: BondSellActions.ConfirmSellPending,
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

  describe('ConfirmSellSuccess Action', () => {
    it('should return a new copy of state, with ConfirmSellSuccess flags set if there is no payload', () => {
      // given .. we have an action of type BondSellActions.ConfirmSellSuccess
      const action: ConfirmSellSuccessAction = {
        type: BondSellActions.ConfirmSellSuccess,
        payload: null!,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          signPending: true,
          sending: { amount: 1, denom: '2' },
        },
        action,
      )

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
      })
    })
  })

  describe('ConfirmSellFailure Action', () => {
    it('should return a new copy of state, with Confirm flags set', () => {
      // given .. we have an action of type BondSellActions.ConfirmSellFailure
      const action: ConfirmSellFailureAction = {
        type: BondSellActions.ConfirmSellFailure,
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
      // given .. we have an action of type BondSellActions.Clear
      const action: ClearAction = {
        type: BondSellActions.Clear,
      }

      const currentState: BondSellState = {
        ...initialState,
        sending: { denom: 'b', amount: 2 },
        receiving: {
          denom: 'res',
          amount: 464,
        },
        totalFee: {
          denom: 'res',
          amount: 3,
        },
        txFees: [
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
