import * as SUT from './FundingChat.selectors'
import BigNumber from 'bignumber.js'

let state: any

beforeEach(() => {
  state = {
    fuelEntity: {
      order: {
        symbol: 'IXO',
        subscription: '12 months',
        fiat: 'EUR',
        fiatSymbol: '€',
        amount: '1267.91000001',
        fiatConversion: '16',
        transactionFee: '8.44500019',
        gasFee: '1.0045',
      },
      sending: true,
      sent: true,
      error: 'Oops an error occured',
    },
  }
})

describe('Entities Selectors', () => {
  describe('selectFuelEntity', () => {
    it('should return the fuelEntity property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectFuelEntity(state)

      // then ... should return result as expected
      expect(result).toEqual(state.fuelEntity)
    })
  })

  describe('selectOrderSymbol', () => {
    it('should return the order symbol property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderSymbol(state)

      // then ... should return result as expected
      expect(result).toEqual('IXO')
    })
  })

  describe('selectOrderSubscription', () => {
    it('should return the order subscription property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderSubscription(state)

      // then ... should return result as expected
      expect(result).toEqual('12 months')
    })
  })

  describe('selectOrderFiat', () => {
    it('should return the order fiat property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderFiat(state)

      // then ... should return result as expected
      expect(result).toEqual('EUR')
    })
  })

  describe('selectOrderFiatSymbol', () => {
    it('should return the order fiatSymbol property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderFiatSymbol(state)

      // then ... should return result as expected
      expect(result).toEqual('€')
    })
  })

  describe('selectOrderFiatConversion', () => {
    it('should return the order fiatConversion property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderFiatConversion(state)

      // then ... should return result as expected
      expect(result).toEqual('16')
    })
  })

  describe('selectOrderAmount', () => {
    it('should return the order amount property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderAmount(state)

      // then ... should return result as expected
      expect(result).toEqual('1267.91000001')
    })
  })

  describe('selectOrderTransactionFee', () => {
    it('should return the order transactionFee property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderTransactionFee(state)

      // then ... should return result as expected
      expect(result).toEqual('8.44500019')
    })
  })

  describe('selectOrderGasFee', () => {
    it('should return the order gasFee property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderGasFee(state)

      // then ... should return result as expected
      expect(result).toEqual('1.005')
    })
  })

  describe('selectSending', () => {
    it('should return the sending property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectSending(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectSent', () => {
    it('should return the sent property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectSent(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectError', () => {
    it('should return the error property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectError(state)

      // then ... should return result as expected
      expect(result).toEqual('Oops an error occured')
    })
  })

  describe('selectOrderConversionRate', () => {
    it('should return the calculated order conversion rate property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderConversionRate(state)

      // then ... should return result as expected
      expect(result).toEqual(new BigNumber(0.0625))
    })
  })

  describe('selectOrderTotal', () => {
    it('should return the calculated order total property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderTotal(state)

      // then ... should return result as expected
      expect(result).toEqual(new BigNumber(1276.3550002))
    })
  })

  describe('selectOrderTokenAmount', () => {
    it('should return the token formatted order amount property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderTokenAmount(state)

      // then ... should return result as expected
      expect(result).toEqual('1’267.910')
    })
  })

  describe('selectOrderTokenTransactionFee', () => {
    it('should return the token formatted order transactionFee property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderTokenTransactionFee(state)

      // then ... should return result as expected
      expect(result).toEqual('8.445')
    })
  })

  describe('selecOrderTokenTotal', () => {
    it('should return the calculated token formatted order total property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderTokenTotal(state)

      // then ... should return result as expected
      expect(result).toEqual('1’276.355')
    })
  })

  describe('selectOrderFiatConversionRate', () => {
    it('should return the fiat formatted order conversionRate property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderFiatConversionRate(state)

      // then ... should return result as expected
      expect(result).toEqual('€ 0.06')
    })
  })

  describe('selectOrderFiatAmount', () => {
    it('should return the fiat formatted order amount property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderFiatAmount(state)

      // then ... should return result as expected
      expect(result).toEqual('€ 79.24')
    })
  })

  describe('selectOrderFiatTransactionFee', () => {
    it('should return the fiat formatted order transactionFee property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderFiatTransactionFee(state)

      // then ... should return result as expected
      expect(result).toEqual('€ 0.53')
    })
  })

  describe('selectOrderFiatTotal', () => {
    it('should return the fiat formatted calculated order total property of fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectOrderFiatTotal(state)

      // then ... should return result as expected
      expect(result).toEqual('€ 79.77')
    })
  })

  describe('selectHasOrder', () => {
    it('should return the a boolean value of whether there is an order in fuelEntity state', () => {
      // when ... we call the selector
      const result = SUT.selectHasOrder(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
