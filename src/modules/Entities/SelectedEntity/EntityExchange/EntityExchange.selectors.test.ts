import * as SUT from './EntityExchange.selectors'
import { EntityExchangeState } from './types'

let state: any

beforeEach(() => {
  state = {
    selectedEntityExchange: {
      tradeMethod: 'Swap'
    } as EntityExchangeState,
  }
})

describe('EntityExchange Selectors', () => {
  describe('selectRequiredClaimsCount', () => {
    it('should return the requiredClaimsCount property', () => {
      // when ... we call the selector
      const result = SUT.selectSelectedEntityExchange(state)

      // then ... should return result as expected
      expect(result).toEqual(1)
    })
  })
})
