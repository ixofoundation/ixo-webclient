import axios from 'axios'
import mockStore from '../../common/redux/mockStore'
import * as SUT from './quote.actions'
import { QuoteActions } from './types'
import { Currency } from 'src/types/models'

const mockAxios = axios as jest.Mocked<typeof axios>
let store

beforeEach(() => {
  store = mockStore({
    activeBond: {
      symbol: '123',
    },
    account: {
      address: 'abc',
    },
    activeQuote: {
      sending: { amount: 1, denom: 'a' },
      receiving: { amount: 1, denom: 'a' },
      minPrices: [{ amount: 1, denom: 'a' }],
      maxPrices: [{ amount: 1, denom: 'a' }],
    },
  })
})

describe('Quote Actions', () => {
  describe('buy', () => {
    it('should return data on buy success', async () => {
      const sending: Currency = { amount: 2, denom: 'b' }
      const receiving: Currency = { amount: 1, denom: 'a' }
      const maxPrices: Currency[] = [
        { amount: 1, denom: 'a' },
        { amount: 2, denom: 'b' },
      ]
      const actualPrices = [
        { amount: 3, denom: 'a' },
        { amount: 4, denom: 'b' },
      ]
      const adjustedSupply = [
        { amount: 5, denom: 'a' },
        { amount: 6, denom: 'b' },
      ]
      const txFees = [
        { amount: 0.7, denom: 'a' },
        { amount: 0.8, denom: 'b' },
      ]
      const totalPrices = [
        { amount: 9, denom: 'a' },
        { amount: 10, denom: 'b' },
      ]
      const totalFees = [
        { amount: 11, denom: 'a' },
        { amount: 12, denom: 'b' },
      ]

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            prices: [
              { amount: 3, denom: 'a' },
              { amount: 4, denom: 'b' },
            ],
            adjusted_supply: [
              { amount: 5, denom: 'a' },
              { amount: 6, denom: 'b' },
            ],
            tx_fees: [
              { amount: 0.7, denom: 'a' },
              { amount: 0.8, denom: 'b' },
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

      // when ... we call the buy action creator with an address
      await store.dispatch(SUT.buy(sending, receiving, maxPrices))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(QuoteActions.BuyPending)
      expect(actions[1].type).toEqual(QuoteActions.BuySuccess)
      expect(actions[1].payload).toEqual({
        sending,
        receiving,
        maxPrices,
        actualPrices,
        adjustedSupply,
        txFees,
        totalPrices,
        totalFees,
      })
    })

    it('should return an error on failure', async () => {
      const receiving: Currency = { amount: 1, denom: 'a' }
      const sending: Currency = { amount: 2, denom: 'b' }
      const minPrices: Currency[] = [
        { amount: 1, denom: 'a' },
        { amount: 2, denom: 'b' },
      ]
      const error = 'some-error'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      try {
        // when ... we call the buy action creator with an address
        await store.dispatch(SUT.buy(receiving, sending, minPrices))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(QuoteActions.BuyPending)
        expect(actions[1].type).toEqual(QuoteActions.BuyFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  // TODO
  /*   describe('confirmBuy', () => {
    it('should return data on confirmBuy success', async () => {
      // when ... we call the confirmBuy action creator with an address
      await store.dispatch(SUT.confirmBuy())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(2)
      expect(actions[0].type).toEqual(QuoteActions.ConfirmPending)
      expect(actions[1].type).toEqual(QuoteActions.ConfirmSuccess)
    })
  }) */

  describe('sell', () => {
    it('should return data on sell success', async () => {
      const sending: Currency = { amount: 2, denom: 'b' }
      const minPrices: Currency[] = [
        { amount: 1, denom: 'a' },
        { amount: 2, denom: 'b' },
      ]
      const receiving = { amount: 1, denom: 'a' }
      const txFees = [
        { amount: 0.7, denom: 'a' },
        { amount: 0.8, denom: 'b' },
      ]
      const totalFees = [
        { amount: 11, denom: 'a' },
        { amount: 12, denom: 'b' },
      ]

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            returns: [
              { amount: 1, denom: 'a' },
              { amount: 2, denom: 'b' },
            ],
            tx_fees: [
              { amount: 0.7, denom: 'a' },
              { amount: 0.8, denom: 'b' },
            ],
            total_fees: [
              { amount: 11, denom: 'a' },
              { amount: 12, denom: 'b' },
            ],
          },
        }),
      )

      // when ... we call the sell action creator with an address
      await store.dispatch(SUT.sell(sending, minPrices))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(QuoteActions.SellPending)
      expect(actions[1].type).toEqual(QuoteActions.SellSuccess)
      expect(actions[1].payload).toEqual({
        sending,
        minPrices,
        receiving,
        txFees,
        totalFees,
      })
    })

    it('should return an error on failure', async () => {
      const sending: Currency = { amount: 2, denom: 'b' }
      const minPrices: Currency[] = [
        { amount: 1, denom: 'a' },
        { amount: 2, denom: 'b' },
      ]
      const error = 'some-error'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      try {
        // when ... we call the sell action creator with an address
        await store.dispatch(SUT.sell(sending, minPrices))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(QuoteActions.SellPending)
        expect(actions[1].type).toEqual(QuoteActions.SellFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  // TODO
  /*   describe('confirmSell', () => {
    it('should return data on confirmSell success', async () => {
      // when ... we call the confirmSell action creator with an address
      await store.dispatch(SUT.confirmSell())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(2)
      expect(actions[0].type).toEqual(QuoteActions.ConfirmPending)
      expect(actions[1].type).toEqual(QuoteActions.ConfirmSuccess)
    })
  }) */

  describe('swap', () => {
    it('should return data on swap success', async () => {
      const receiving: Currency = { amount: 1, denom: 'a' }
      const sending: Currency = { amount: 2, denom: 'b' }
      const totalFees = [
        { amount: 11, denom: 'a' },
        { amount: 12, denom: 'b' },
      ]

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

      // when ... we call the swap action creator with an address
      await store.dispatch(SUT.swap(receiving, sending))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(QuoteActions.SwapPending)
      expect(actions[1].type).toEqual(QuoteActions.SwapSuccess)
      expect(actions[1].payload).toEqual({ receiving, totalFees })
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
        // when ... we call the swap action creator with an address
        await store.dispatch(SUT.swap(receiving, sending))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(QuoteActions.SwapPending)
        expect(actions[1].type).toEqual(QuoteActions.SwapFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  // TODO
  /*   describe('confirmSwap', () => {
    it('should return data on confirmSwap success', async () => {
      // when ... we call the confirmSwap action creator with an address
      await store.dispatch(SUT.confirmSwap())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(2)
      expect(actions[0].type).toEqual(QuoteActions.ConfirmPending)
      expect(actions[1].type).toEqual(QuoteActions.ConfirmSuccess)
    })
  }) */

  describe('clear', () => {
    it('should clear data on clear', async () => {
      // when ... we call the clear action creator with an address
      const action = SUT.clear()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(QuoteActions.Clear)
    })
  })
})
