import * as SUT from './BondSwap.selectors'

const state: any = {
  bondSwap: {
    sending: { amount: 123, denom: 'sending' },
    receiving: { amount: 456, denom: 'receiving' },
    totalFee: { amount: 1011, denom: 'totalFee' },
    txFees: [
      { amount: 1, denom: 'txFee1' },
      { amount: 2, denom: 'feFee2' },
    ],
    signPending: true,
    quotePending: true,
    transacting: true,
  },
}

describe('BondSwap Selectors', () => {
  describe('selectBondSwap', () => {
    it('should return the bondSwap property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwap(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({
        sending: { amount: 123, denom: 'sending' },
        receiving: { amount: 456, denom: 'receiving' },
        totalFee: { amount: 1011, denom: 'totalFee' },
        minPrice: { amount: 1314, denom: 'minPrice' },
        txFees: [
          { amount: 1, denom: 'txFee1' },
          { amount: 2, denom: 'feFee2' },
        ],
        signPending: true,
        quotePending: true,
        transacting: true,
      })
    })
  })

  describe('selectBondSwapTotalFee', () => {
    it('should return the totalFee property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapTotalFee(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 1011, denom: 'totalFee' })
    })
  })

  describe('selectBondSwapSending', () => {
    it('should return the sending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapSending(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 123, denom: 'sending' })
    })
  })

  describe('selectBondSwapReceiving', () => {
    it('should return the receiving property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapReceiving(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 456, denom: 'receiving' })
    })
  })

  describe('selectBondSwapSignPending', () => {
    it('should return the signPending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapSignPending(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondSwapQuotePending', () => {
    it('should return the quotePending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapQuotePending(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondSwapTransacting', () => {
    it('should return the transacting property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapTransacting(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondIsSwapSending', () => {
    it('should return the result of whether the sending property is null', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapIsSending(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectEstimatePrice', () => {
    it('should return the calculated estimated price', () => {
      // when ... we call the selector
      const result = SUT.selectBondSwapPriceEstimate(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({
        amount: 3.707317073170732,
        denom: 'receiving',
      })
    })
  })
})
