// @ts-nocheck
import mockAxios from 'axios'
import mockStore from 'common/redux/mockStore'
import * as SUT from './BondSwap.actions'
import { BondSwapActions } from './types'
import { Currency } from 'types/models'
jest.mock('axios')

let store: any

beforeEach(() => {
  store = mockStore({
    activeBond: {
      symbol: '123',
    },
    account: {
      address: 'abc',
    },
  })
})

describe('BondSwap Actions', () => {
  describe('getQuote', () => {
    it('should return data on getQuote success', async () => {
      const receiving: Currency = { amount: 1, denom: 'a' }
      const sending: Currency = { amount: 2, denom: 'b' }
      const totalFee = { amount: 11, denom: 'a' }

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            total_returns: [
              { amount: 1, denom: 'a' },
              { amount: 2, denom: 'b' },
            ],
            total_fees: [
              { amount: 11, denom: 'a' },
              { amount: 12, denom: 'b' },
            ],
          },
        }),
      )

      // when ... we call the getQuote action creator with an address
      await store.dispatch(SUT.getQuote(sending, receiving))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(BondSwapActions.GetQuotePending)
      expect(actions[1].type).toEqual(BondSwapActions.GetQuoteSuccess)
      expect(actions[1].payload).toEqual({ sending, receiving, totalFee })
    })

    it('should return an error on failure', async () => {
      const receiving: Currency = { amount: 1, denom: 'a' }
      const sending: Currency = { amount: 2, denom: 'b' }
      const error = 'some-error'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      try {
        // when ... we call the getQuote action creator with an address
        await store.dispatch(SUT.getQuote(sending, receiving))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(BondSwapActions.GetQuotePending)
        expect(actions[1].type).toEqual(BondSwapActions.GetQuoteFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  // TODO - confirmSwap

  describe('clear', () => {
    it('should clear data on clear', async () => {
      // when ... we call the clearQuote action creator with an address
      const action = SUT.clear()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(BondSwapActions.Clear)
    })
  })
})
