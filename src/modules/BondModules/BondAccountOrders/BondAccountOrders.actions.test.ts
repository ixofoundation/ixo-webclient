import axios from 'axios'
import mockStore from 'common/redux/mockStore'
import * as SUT from './BondAccountOrders.actions'
import { BondAccountOrdersActions } from './types'
jest.mock('axios')

let store: any
const mockAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  store = mockStore({
    account: {
      address: 'abc',
    },
    bondAccountOrders: [],
  })
})

describe('getBondAccountOrders', () => {
  it('should return data on success', async () => {
    const bondAccountOrders = [{ someprop: 'someval1' }, { someprop: 'someval2' }]

    mockAxios.spread.mockReturnValue(() => {
      return {
        bondAccountOrders: [{ someprop: 'someval1' }, { someprop: 'someval2' }],
      }
    })

    // when ... we call the getBondAccountOrders action creator
    await store.dispatch(SUT.getBondAccountOrders())
    const actions = store.getActions()

    // then we should expect it to create actions with the correct types and payload
    expect.assertions(3)
    expect(actions[0].type).toEqual(BondAccountOrdersActions.GetOrdersPending)
    expect(actions[1].type).toEqual(BondAccountOrdersActions.GetOrdersSuccess)
    expect(actions[1].payload.bondAccountOrders).toEqual(bondAccountOrders)
  })

  it('should return an error on failure', async () => {
    const error = 'some-error'
    mockAxios.all.mockImplementationOnce(() =>
      Promise.reject({
        error,
      }),
    )

    // when ... we call the getBondAccountOrders action creator

    try {
      await store.dispatch(SUT.getBondAccountOrders())
    } catch {
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(BondAccountOrdersActions.GetOrdersPending)
      expect(actions[1].type).toEqual(BondAccountOrdersActions.GetOrdersFailure)
      expect(actions[1].payload.error).toEqual(error)
    }
  })
})
