import * as SUT from './BondSell.selectors'

const state: any = {
  bondSell: {
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
  },
}

describe('BondSell Selectors', () => {
  describe('selectBondSell', () => {
    it('should return the bondSell property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectBondSell(state)

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

  describe('selectBondSellTotalFee', () => {
    it('should return the totalFee property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellTotalFee(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 1011, denom: 'totalFee' })
    })
  })

  describe('selectBondSellMinPrice', () => {
    it('should return the minPrice property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellMinPrice(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 1314, denom: 'minPrice' })
    })
  })

  describe('selectBondSellSending', () => {
    it('should return the sending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellSending(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 123, denom: 'sending' })
    })
  })

  describe('selectBondSellReceiving', () => {
    it('should return the receiving property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellReceiving(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 456, denom: 'receiving' })
    })
  })

  describe('selectBondSellSignPending', () => {
    it('should return the signPending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellSignPending(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondSellQuotePending', () => {
    it('should return the quotePending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellQuotePending(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondSellTransacting', () => {
    it('should return the transacting property', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellTransacting(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondIsSellSending', () => {
    it('should return the result of whether the sending property is null', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellIsSending(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectEstimatePrice', () => {
    it('should return the calculated estimated price', () => {
      // when ... we call the selector
      const result = SUT.selectBondSellPriceEstimate(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({
        amount: 3.707317073170732,
        denom: 'receiving',
      })
    })
  })
})
