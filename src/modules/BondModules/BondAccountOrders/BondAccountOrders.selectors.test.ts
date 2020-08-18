import * as SUT from './BondAccountOrders.selectors'

describe('BondAccountOrders Selectors', () => {
  let state: any

  describe('selectBondAccountOrders', () => {
    it('should return the BondAccountOrders', () => {
      // given ... we have some state

      const bondAccountOrders: any[] = [{ id: 'test', name: 'test' }]

      state = [...bondAccountOrders]
      // when ... we call the selector
      const result = SUT.selectBondAccountOrders(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(state.bondAccountOrders)
    })
  })
})
