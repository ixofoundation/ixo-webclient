import * as SUT from './BondSwap.reducer'
import {
  InitiateQuoteAction,
  GetQuotePendingAction,
  GetQuoteSuccessAction,
  GetQuoteFailureAction,
  ConfirmSwapPendingAction,
  ConfirmSwapSuccessAction,
  ConfirmSwapFailureAction,
  ClearAction,
  BondSwapState,
  BondSwapActions,
} from './types'

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

  describe('InitiateQuote Action', () => {
    it('should return a new copy of state, with quote data set', () => {
      // given .. we have an action of type BondSwapActions.InitiateQuote and some data
      const action: InitiateQuoteAction = {
        type: BondSwapActions.InitiateQuote,
      }

      const currentState: BondSwapState = {
        ...initialState,
        receiving: { amount: 1, denom: 'receiving' },
        sending: { amount: 2, denom: 'sending' },
        totalFee: { amount: 11, denom: 'totalFee' },
        txFees: [
          { amount: 11, denom: 'txFee1' },
          { amount: 12, denom: 'txFee2' },
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
    it('should return a new copy of state, with flags set', () => {
      // given .. we have an action of type BondSwapActions.GetQuotePending
      const action: GetQuotePendingAction = {
        type: BondSwapActions.GetQuotePending,
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
      // given .. we have an action of type BondSwapActions.GetQuoteSuccess and some data
      const action: GetQuoteSuccessAction = {
        type: BondSwapActions.GetQuoteSuccess,
        payload: {
          sending: { amount: 1, denom: 'sending' },
          receiving: { amount: 1, denom: 'receiving' },
          totalFee: { amount: 11, denom: 'totalFee' },
          txFees: [
            { amount: 11, denom: 'txFee1' },
            { amount: 12, denom: 'txFee2' },
          ],
        },
      }

      const newState: BondSwapState = {
        ...initialState,
        sending: { amount: 1, denom: 'sending' },
        receiving: { amount: 1, denom: 'receiving' },
        totalFee: { amount: 11, denom: 'totalFee' },
        txFees: [
          { amount: 11, denom: 'txFee1' },
          { amount: 12, denom: 'txFee2' },
        ],
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual(newState)
    })
  })

  describe('SwapFailure Action', () => {
    it('should return a new copy of state, with flags set', () => {
      // given .. we have an action of type BondSwapActions.GetQuoteFailure
      const action: GetQuoteFailureAction = {
        type: BondSwapActions.GetQuoteFailure,
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

  describe('ConfirmPending Action', () => {
    it('should return a new copy of state, with flags set', () => {
      // given .. we have an action of type BondSwapActions.ConfirmSwapPending
      const action: ConfirmSwapPendingAction = {
        type: BondSwapActions.ConfirmSwapPending,
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

  describe('ConfirmSwapSuccess Action', () => {
    it('should return a new copy of state, with flags set if there is no payload', () => {
      // given .. we have an action of type BondSwapActions.ConfirmSwapSuccess
      const action: ConfirmSwapSuccessAction = {
        type: BondSwapActions.ConfirmSwapSuccess,
        payload: null!,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, signPending: true }, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
        signPending: false,
      })
    })

    it('should return a copy of the initialState, with flags set if there is a payload', () => {
      // given .. we have an action of type BondSwapActions.ConfirmSwapSuccess
      const action: ConfirmSwapSuccessAction = {
        type: BondSwapActions.ConfirmSwapSuccess,
        payload: {
          data: [{ denom: 'a', amount: 1 }],
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, signPending: true, transacting: true }, action)

      // then the state flags should be set as expected
      expect(result).toEqual({
        ...initialState,
      })
    })
  })

  describe('ConfirmSwapFailure Action', () => {
    it('should return a new copy of state, with ConfirmSwapFailure flags set', () => {
      // given .. we have an action of type BondSwapActions.ConfirmSwapFailure
      const action: ConfirmSwapFailureAction = {
        type: BondSwapActions.ConfirmSwapFailure,
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
      // given .. we have an action of type BondSwapActions.Clear
      const action: ClearAction = {
        type: BondSwapActions.Clear,
      }

      const currentState: BondSwapState = {
        ...initialState,
        sending: { denom: 'a', amount: 1 },
        receiving: { denom: 'b', amount: 2 },
        txFees: [
          {
            denom: 'res',
            amount: 3,
          },
        ],
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
