import axios from 'axios'
import mockStore from '../../common/redux/mockStore'
import * as SUT from './account.actions'
import { AccountActions } from './types'

const mockAxios = axios as jest.Mocked<typeof axios>
let store

beforeEach(() => {
  store = mockStore({})
})

describe('Account Actions', () => {
  describe('getBalances', () => {
    it('should return data on success', async () => {
      const data = 'some-data'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data,
        }),
      )

      // when ... we call the getBalances action creator with an address
      await store.dispatch(SUT.getBalances('some-address'))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(AccountActions.GetBalancesPending)
      expect(actions[1].type).toEqual(AccountActions.GetBalancesSuccess)
      expect(actions[1].payload.data).toEqual(data)
    })

    it('should return an error on failure', async () => {
      const error = 'some-error'
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      try {
        // when ... we call the getBalances action creator with an address
        await store.dispatch(SUT.getBalances('some-address'))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(AccountActions.GetBalancesPending)
        expect(actions[1].type).toEqual(AccountActions.GetBalancesFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  describe('getOrders', () => {
    it('should return data on success', async () => {
      const data = []

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data,
        }),
      )

      // when ... we call the getOrders action creator with an address
      await store.dispatch(SUT.getOrders('some-address'))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(AccountActions.GetOrdersPending)
      expect(actions[1].type).toEqual(AccountActions.GetOrdersSuccess)
      expect(actions[1].payload.data).toEqual(data)
    })

    it('should return an error on failure', async () => {
      const error = 'some-error'
      mockAxios.all.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      // when ... we call the getOrders action creator with an address

      try {
        await store.dispatch(SUT.getOrders('some-address'))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(AccountActions.GetOrdersPending)
        expect(actions[1].type).toEqual(AccountActions.GetOrdersFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })
})
