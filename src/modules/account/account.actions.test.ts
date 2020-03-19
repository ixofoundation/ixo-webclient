import axios from 'axios'
import mockStore from '../../common/redux/mockStore'
import * as SUT from './account.actions'
import { AccountActions } from './types'

jest.mock('../../common/keysafe/keysafe')

const mockAxios = axios as jest.Mocked<typeof axios>
let store
let windowSpy

beforeEach(() => {
  windowSpy = jest.spyOn(global, 'window' as any, 'get')

  store = mockStore({
    account: {
      userInfo: '',
    },
  })
})

afterEach(() => {
  windowSpy.mockRestore()
})

describe('Account Actions', () => {
  describe('login', () => {
    it('should return an action of type LoginActions.Login', () => {
      // when ... we call the login action creator
      const userInfo = {
        didDoc: { did: 'someDid', pubKey: 'somePubKey' },
        name: 'someName',
        ledgered: true,
        loggedInKeysafe: false,
        hasKYC: true,
      }
      const address = 'abc'

      const action = SUT.login(userInfo, address)

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(AccountActions.Login)
      // ... the payload should be set correctly
      expect(action.payload).toEqual({ userInfo, address })
    })
  })

  describe('logout', () => {
    it('should return an action of type LoginActions.Logout', () => {
      // when ... we call the resetUserInfo action creator
      const action = SUT.logout()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(AccountActions.Logout)
    })
  })

  describe('getAccount', () => {
    it('should return data on success', async () => {
      const balances = [{ someprop: 'someval1' }, { someprop: 'someval2' }]
      const sequence = '123'
      const accountNumber = '0123456'

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            coins: [{ someprop: 'someval1' }, { someprop: 'someval2' }],
            sequence: '123',
            account_number: '0123456',
          },
        }),
      )

      // when ... we call the getAccount action creator with an address
      await store.dispatch(SUT.getAccount('some-address'))
      const actions = store.getActions()

      console.log(actions[1].payload)

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(5)
      expect(actions[0].type).toEqual(AccountActions.GetAccountPending)
      expect(actions[1].type).toEqual(AccountActions.GetAccountSuccess)
      expect(actions[1].payload.balances).toEqual(balances)
      expect(actions[1].payload.accountNumber).toEqual(accountNumber)
      expect(actions[1].payload.sequence).toEqual(sequence)
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
        await store.dispatch(SUT.getAccount('some-address'))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(AccountActions.GetAccountPending)
        expect(actions[1].type).toEqual(AccountActions.GetAccountFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  describe('getOrders', () => {
    it('should return data on success', async () => {
      const orders = [{ someprop: 'someval1' }, { someprop: 'someval2' }]

      mockAxios.spread.mockReturnValue(() => {
        return { orders: [{ someprop: 'someval1' }, { someprop: 'someval2' }] }
      })

      // when ... we call the getOrders action creator with an address
      await store.dispatch(SUT.getOrders('some-address'))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(AccountActions.GetOrdersPending)
      expect(actions[1].type).toEqual(AccountActions.GetOrdersSuccess)
      expect(actions[1].payload.orders).toEqual(orders)
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

  // TODO
  /*   describe.only('updateLoginStatus', () => {
    it('should dispatch a login action if logged in to keysafe', async () => {
      windowSpy.mockImplementation(() => ({
        ixoKs: jest.fn(),
      }))

      await store.dispatch(SUT.updateLoginStatus())
      const actions = store.getActions()

      // rest of code
    })
  }) */
})
