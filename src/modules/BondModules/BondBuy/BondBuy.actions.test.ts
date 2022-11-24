import axios from 'axios'
import mockStore from 'common/redux/mockStore'
import * as SUT from './BondBuy.actions'
import { BondBuyActions } from './types'
import { Currency } from 'types/models'

let store: any
jest.mock('jest')
const mockAxios = axios as jest.Mocked<typeof axios>

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

describe('BondBuy Actions', () => {
  describe('initiateQuote', () => {
    it('should clear data on initiateQuote', async () => {
      // when ... we call the initiateQuote action creator
      const action = SUT.initiateQuote()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(BondBuyActions.InitiateQuote)
    })
  })

  describe('getQuote', () => {
    it('should return data on getQuote success', async () => {
      const receiving: Currency = { amount: 1, denom: 'a' }
      const actualPrice: Currency = { amount: 3, denom: 'a' }
      const totalPrice: Currency = { amount: 9, denom: 'a' }
      const totalFee: Currency = { amount: 11, denom: 'a' }
      const maxPrice: Currency = { amount: 1, denom: 'a' }
      const txFees = [
        { amount: 1, denom: 'a' },
        { amount: 2, denom: 'b' },
      ]

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            prices: [
              { amount: 3, denom: 'a' },
              { amount: 4, denom: 'b' },
            ],
            tx_fees: [
              { amount: 1, denom: 'a' },
              { amount: 2, denom: 'b' },
            ],
            total_prices: [
              { amount: 9, denom: 'a' },
              { amount: 10, denom: 'b' },
            ],
            total_fees: [
              { amount: 11, denom: 'a' },
              { amount: 12, denom: 'b' },
            ],
          },
        }),
      )

      // when ... we call the getQuote action creator
      await store.dispatch(SUT.getQuote(receiving, maxPrice))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(BondBuyActions.GetQuotePending)
      expect(actions[1].type).toEqual(BondBuyActions.GetQuoteSuccess)
      expect(actions[1].payload).toEqual({
        receiving,
        maxPrice,
        actualPrice,
        txFees,
        totalPrice,
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
        expect(actions[0].type).toEqual(BondBuyActions.GetQuotePending)
        expect(actions[1].type).toEqual(BondBuyActions.GetQuoteFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  // TODO - confirmBuy

  describe('clearQuote', () => {
    it('should clear data on clearQuote', async () => {
      // when ... we call the clearQuote action creator
      const action = SUT.clear()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(BondBuyActions.Clear)
    })
  })
})
