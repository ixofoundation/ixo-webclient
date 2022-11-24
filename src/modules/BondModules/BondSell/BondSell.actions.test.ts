// @ts-nocheck
import mockAxios from 'axios'
import mockStore from '../../../common/redux/mockStore'
import * as SUT from './BondSell.actions'
import { BondSellActions } from './types'
import { Currency } from 'types/models'

let store
jest.mock('axios')
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

describe('BondSell Actions', () => {
  describe('initiateQuote', () => {
    it('should clear data on initiateQuote', async () => {
      // when ... we call the initiateQuote action creator
      const action = SUT.initiateQuote()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(BondSellActions.InitiateQuote)
    })
  })

  describe('getQuote', () => {
    it('should return data on getQuote success', async () => {
      const minPrice: Currency = { amount: 1, denom: 'a' }
      const sending: Currency = { amount: 1, denom: 'a' }
      const receiving: Currency = { amount: 3, denom: 'returns_a' }
      const totalFee: Currency = { amount: 11, denom: 'total_fees_e' }
      const txFees = [
        { amount: 1, denom: 'tx_fees_c' },
        { amount: 2, denom: 'tx_fees_d' },
      ]

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            returns: [
              { amount: 3, denom: 'returns_a' },
              { amount: 4, denom: 'returns_b' },
            ],
            tx_fees: [
              { amount: 1, denom: 'tx_fees_c' },
              { amount: 2, denom: 'tx_fees_d' },
            ],
            total_fees: [
              { amount: 11, denom: 'total_fees_e' },
              { amount: 12, denom: 'total_fees_f' },
            ],
          },
        }),
      )

      // when ... we call the getQuote action creator
      await store.dispatch(SUT.getQuote(sending, minPrice))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(BondSellActions.GetQuotePending)
      expect(actions[1].type).toEqual(BondSellActions.GetQuoteSuccess)
      expect(actions[1].payload).toEqual({
        sending,
        minPrice,
        receiving,
        txFees,
        totalFee,
      })
    })

    it('should return an error on failure', async () => {
      const receiving: Currency = { amount: 1, denom: 'a' }
      const maxPrice: Currency = { amount: 1, denom: 'a' }
      const error = 'some-error'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      try {
        // when ... we call the getQuote action creator
        await store.dispatch(SUT.getQuote(receiving, maxPrice))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(BondSellActions.GetQuotePending)
        expect(actions[1].type).toEqual(BondSellActions.GetQuoteFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  // TODO - confirmSell

  describe('clearQuote', () => {
    it('should clear data on clearQuote', async () => {
      // when ... we call the clearQuote action creator
      const action = SUT.clear()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(BondSellActions.Clear)
    })
  })
})
