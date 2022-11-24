// @ts-nocheck
import mockAxios from 'axios'
import mockStore from '../../common/redux/mockStore'
import * as SUT from './tokenSupply.actions'
import { TokenSupplyActions } from './types'

jest.mock('axios')
let store

beforeEach(() => {
  store = mockStore({})
})

describe('TokenSupply Actions', () => {
  describe('getTotalSupplies', () => {
    it('should return data on success', async () => {
      const totalSupply = [{ someprop: 'someval1' }, { someprop: 'someval2' }]

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [{ someprop: 'someval1' }, { someprop: 'someval2' }],
        }),
      )

      // when ... we call the getTotalSupplies action creator with an address
      await store.dispatch(SUT.getTotalSupply())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(TokenSupplyActions.GetTotalSupplyPending)
      expect(actions[1].type).toEqual(TokenSupplyActions.GetTotalSupplySuccess)
      expect(actions[1].payload.tokenSupply).toEqual(totalSupply)
    })

    it('should return an error on failure', async () => {
      const error = 'some-error'
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      try {
        // when ... we call the getTotalSupplies action creator with an address
        await store.dispatch(SUT.getTotalSupply())
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(TokenSupplyActions.GetTotalSupplyPending)
        expect(actions[1].type).toEqual(TokenSupplyActions.GetTotalSupplyFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })
})
