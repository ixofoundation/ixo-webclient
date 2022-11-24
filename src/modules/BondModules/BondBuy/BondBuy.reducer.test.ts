import * as SUT from './BondBuy.reducer'
import {
  BondBuyActions,
  GetQuotePendingAction,
  GetQuoteSuccessAction,
  GetQuoteFailureAction,
  ConfirmBuyPendingAction,
  ConfirmBuySuccessAction,
  ConfirmBuyFailureAction,
  ClearAction,
  InitiateQuoteAction,
  BondBuyState,
} from './types'

const initialState = SUT.initialState

describe('BondBuy Reducer', () => {
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
      // given .. we have an action of type BondBuyActions.InitiateQuote and some data
      const action: InitiateQuoteAction = {
        type: BondBuyActions.InitiateQuote,
      }

      const currentState: BondBuyState = {
        ...initialState,
        receiving: { amount: 1, denom: 'a' },
        actualPrice: { amount: 3, denom: 'a' },
        totalPrice: { amount: 9, denom: 'a' },
        totalFee: { amount: 11, denom: 'a' },
        maxPrice: { amount: 1, denom: 'a' },
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
      // given .. we have an action of type BondBuyActions.GetQuotePending
      const action: GetQuotePendingAction = {
        type: BondBuyActions.GetQuotePending,
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
      // given .. we have an action of type BondBuyActions.GetQuoteSuccess and some data
      const action: GetQuoteSuccessAction = {
        type: BondBuyActions.GetQuoteSuccess,
        payload: {
          receiving: { amount: 1, denom: 'a' },
          actualPrice: { amount: 3, denom: 'a' },
          totalPrice: { amount: 9, denom: 'a' },
          totalFee: { amount: 11, denom: 'a' },
          maxPrice: { amount: 1, denom: 'a' },
          txFees: [
            { amount: 1, denom: 'a' },
            { amount: 2, denom: 'b' },
          ],
        },
      }

      const newState: BondBuyState = {
        ...initialState,
        receiving: { amount: 1, denom: 'a' },
        actualPrice: { amount: 3, denom: 'a' },
        totalPrice: { amount: 9, denom: 'a' },
        totalFee: { amount: 11, denom: 'a' },
        maxPrice: { amount: 1, denom: 'a' },
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
      // given .. we have an action of type BondBuyActions.GetQuoteFailure
      const action: GetQuoteFailureAction = {
        type: BondBuyActions.GetQuoteFailure,
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

  describe('ConfirmBuyPending Action', () => {
    it('should return a new copy of state, with Confirm flags set', () => {
      // given .. we have an action of type BondBuyActions.ConfirmBuyPending
      const action: ConfirmBuyPendingAction = {
        type: BondBuyActions.ConfirmBuyPending,
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

  describe('ConfirmBuySuccess Action', () => {
    it('should return a new copy of state', () => {
      // given .. we have an action of type BondBuyActions.ConfirmBuySuccess
      const action: ConfirmBuySuccessAction = {
        type: BondBuyActions.ConfirmBuySuccess,
        payload: null!,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          signPending: true,
          receiving: { amount: 1, denom: '2' },
        },
        action,
      )

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
      })
    })
  })

  describe('ConfirmBuyFailure Action', () => {
    it('should return a new copy of state, with Confirm flags set', () => {
      // given .. we have an action of type BondBuyActions.ConfirmBuyFailure
      const action: ConfirmBuyFailureAction = {
        type: BondBuyActions.ConfirmBuyFailure,
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
      // given .. we have an action of type BondBuyActions.Clear
      const action: ClearAction = {
        type: BondBuyActions.Clear,
      }

      const currentState: BondBuyState = {
        ...initialState,
        receiving: { denom: 'b', amount: 2 },
        maxPrice: { denom: 'a', amount: 100 },
        actualPrice: {
          denom: 'res',
          amount: 464,
        },
        txFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
        totalPrice: {
          denom: 'res',
          amount: 467,
        },
        totalFee: {
          denom: 'res',
          amount: 3,
        },
        quotePending: false,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state flags should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})
