import * as SUT from './currency.utils'
import BigNumber from 'bignumber.js'

describe('Currency Utils', () => {
  describe('displayFiatAmount', () => {
    it('should return an fiat formatted amount for an amount less than 10', () => {
      const displayAmount = SUT.displayFiatAmount(new BigNumber(1.1), '€')
      expect(displayAmount).toEqual('€ 1.10')
    })

    it('should return an fiat formatted amount for an amount less than 100', () => {
      const displayAmount = SUT.displayFiatAmount(new BigNumber(89.13), '€')
      expect(displayAmount).toEqual('€ 89.13')
    })

    it('should return an fiat formatted amount for an amount less than 1000', () => {
      const displayAmount = SUT.displayFiatAmount(new BigNumber(786.15), '€')
      expect(displayAmount).toEqual('€ 786.15')
    })

    it('should return an fiat formatted amount for an amount less than 10000', () => {
      const displayAmount = SUT.displayFiatAmount(new BigNumber(9992.09), '€')
      expect(displayAmount).toEqual('€ 9,992.09')
    })

    it('should return an fiat formatted amount for an amount less than 100000', () => {
      const displayAmount = SUT.displayFiatAmount(new BigNumber(99924.04), '€')
      expect(displayAmount).toEqual('€ 99,924.04')
    })

    it('should return an fiat formatted amount for an amount less than 1000000', () => {
      const displayAmount = SUT.displayFiatAmount(new BigNumber(997924.04), '€')
      expect(displayAmount).toEqual('€ 997,924.04')
    })

    it('should return an fiat formatted amount for an amount less than 10000000', () => {
      const displayAmount = SUT.displayFiatAmount(
        new BigNumber(3829282.78),
        '€',
      )
      expect(displayAmount).toEqual('€ 3,829,282.78')
    })
  })

  describe('displayTokenAmount', () => {
    it('should return an token formatted amount for an amount less than 10', () => {
      const displayAmount = SUT.displayTokenAmount(new BigNumber(1.109))
      expect(displayAmount).toEqual('1.109')
    })

    it('should return an token formatted amount for an amount less than 100', () => {
      const displayAmount = SUT.displayTokenAmount(new BigNumber(89.133))
      expect(displayAmount).toEqual('89.133')
    })

    it('should return an token formatted amount for an amount less than 1000', () => {
      const displayAmount = SUT.displayTokenAmount(new BigNumber(786.15))
      expect(displayAmount).toEqual('786.150')
    })

    it('should return an token formatted amount for an amount less than 10000', () => {
      const displayAmount = SUT.displayTokenAmount(new BigNumber(9992.092))
      expect(displayAmount).toEqual('9’992.092')
    })

    it('should return an token formatted amount for an amount less than 100000', () => {
      const displayAmount = SUT.displayTokenAmount(new BigNumber(99924.028))
      expect(displayAmount).toEqual('99’924.028')
    })

    it('should return an token formatted amount for an amount less than 1000000', () => {
      const displayAmount = SUT.displayTokenAmount(new BigNumber(997924))
      expect(displayAmount).toEqual('997’924.000')
    })

    it('should return an token formatted amount for an amount less than 10000000', () => {
      const displayAmount = SUT.displayTokenAmount(new BigNumber(3829282.789))
      expect(displayAmount).toEqual('3’829’282.789')
    })
  })
})
