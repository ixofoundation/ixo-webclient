import axios from 'axios'
import mockStore from '../../common/redux/mockStore'
import * as SUT from './quote.actions'
import { QuoteActions } from './types'
import { Currency } from 'src/types/models'

jest.mock('../../service/KeystationService')

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
      const data = 'some-data'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data,
        }),
      )

      // when ... we call the buy action creator with an address
      await store.dispatch(SUT.buy(sending, receiving, maxPrices))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(QuoteActions.BuyPending)
      expect(actions[1].type).toEqual(QuoteActions.BuySuccess)
      expect(actions[1].payload.data).toEqual(data)
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

  describe('confirmBuy', () => {
    it('should return data on confirmBuy success', async () => {
      // when ... we call the confirmBuy action creator with an address
      await store.dispatch(SUT.confirmBuy())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(2)
      expect(actions[0].type).toEqual(QuoteActions.ConfirmPending)
      expect(actions[1].type).toEqual(QuoteActions.ConfirmSuccess)
    })
  })

  describe('sell', () => {
    it('should return data on sell success', async () => {
      const sending: Currency = { amount: 2, denom: 'b' }
      const minPrices: Currency[] = [
        { amount: 1, denom: 'a' },
        { amount: 2, denom: 'b' },
      ]
      const data = 'some-data'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data,
        }),
      )

      // when ... we call the sell action creator with an address
      await store.dispatch(SUT.sell(sending, minPrices))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(QuoteActions.SellPending)
      expect(actions[1].type).toEqual(QuoteActions.SellSuccess)
      expect(actions[1].payload.data).toEqual(data)
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

  describe('confirmSell', () => {
    it('should return data on confirmSell success', async () => {
      // when ... we call the confirmSell action creator with an address
      await store.dispatch(SUT.confirmSell())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(2)
      expect(actions[0].type).toEqual(QuoteActions.ConfirmPending)
      expect(actions[1].type).toEqual(QuoteActions.ConfirmSuccess)
    })
  })

  describe('swap', () => {
    it('should return data on swap success', async () => {
      const receiving: Currency = { amount: 1, denom: 'a' }
      const sending: Currency = { amount: 2, denom: 'b' }
      const data = 'some-data'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data,
        }),
      )

      // when ... we call the Swap action creator with an address
      await store.dispatch(SUT.swap(receiving, sending))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(QuoteActions.SwapPending)
      expect(actions[1].type).toEqual(QuoteActions.SwapSuccess)
      expect(actions[1].payload.data).toEqual(data)
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

  describe('confirmSwap', () => {
    it('should return data on confirmSwap success', async () => {
      // when ... we call the confirmSwap action creator with an address
      await store.dispatch(SUT.confirmSwap())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(2)
      expect(actions[0].type).toEqual(QuoteActions.ConfirmPending)
      expect(actions[1].type).toEqual(QuoteActions.ConfirmSuccess)
    })
  })
})
