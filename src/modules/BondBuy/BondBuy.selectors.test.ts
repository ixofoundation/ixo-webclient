import * as SUT from './BondBuy.selectors'

const state: any = {
  bondBuy: {
    totalPrice: { amount: 123, denom: 'total' },
    receiving: { amount: 456, denom: 'receiving' },
    actualPrice: { amount: 789, denom: 'actual' },
    totalFee: { amount: 1011, denom: 'totalFee' },
    maxPrice: { amount: 1314, denom: 'maxPrice' },
    txFees: [
      { amount: 1, denom: 'txFee1' },
      { amount: 2, denom: 'feFee2' },
    ],
    signPending: true,
    quotePending: true,
    transacting: true,
  },
}

describe('BondBuy Selectors', () => {
  describe('selectBondBuy', () => {
    it('should return the bondBuy property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuy(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({
        totalPrice: { amount: 123, denom: 'total' },
        receiving: { amount: 456, denom: 'receiving' },
        actualPrice: { amount: 789, denom: 'actual' },
        totalFee: { amount: 1011, denom: 'totalFee' },
        maxPrice: { amount: 1314, denom: 'maxPrice' },
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

  describe('selectBondBuyActualPrice', () => {
    it('should return the actualPrice property', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuyActualPrice(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 789, denom: 'actual' })
    })
  })

  describe('selectBondBuyTotalFee', () => {
    it('should return the totalFee property', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuyTotalFee(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 1011, denom: 'totalFee' })
    })
  })

  describe('selectBondBuyMaxPrice', () => {
    it('should return the maxPrice property', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuyMaxPrice(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 1314, denom: 'maxPrice' })
    })
  })

  describe('selectBondBuyReceiving', () => {
    it('should return the receiving property', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuyReceiving(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ amount: 456, denom: 'receiving' })
    })
  })

  describe('selectBondBuySignPending', () => {
    it('should return the signPending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuySignPending(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondBuyQuotePending', () => {
    it('should return the quotePending property', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuyQuotePending(state)

      // then ... should return the slice of state as expected
      expect(result).toBeTruthy()
    })
  })

  describe('selectBondIsBuyReceiving', () => {
    it('should return the result of whether the receiving property is null', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuyIsReceiving(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectBondBuyHasTotalPrice', () => {
    it('should return the result of whether the totalPrice property is null', () => {
      // when ... we call the selector
      const result = SUT.selectBondBuyHasTotalPrice(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectEstimatePrice', () => {
    it('should return the calculated estimated price', () => {
      // when ... we call the selector
      const result = SUT.selectEstimatePrice(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({
        amount: 1.730263157894737,
        denom: 'actual',
      })
    })
  })
})
