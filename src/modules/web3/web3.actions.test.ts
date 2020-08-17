import * as SUT from './web3.actions'
import { Web3Actions } from './types'

let windowSpy

beforeEach(() => {
  windowSpy = jest.spyOn(global, 'window' as any, 'get')
})

afterEach(() => {
  windowSpy.mockRestore()
})

describe('Web3 Actions', () => {
  describe('connectWeb3', () => {
    it('should return an action of type Web3Actions.ConnectWeb3 and an error if MetaMask is not installed', () => {
      // when ... we call the connectWeb3 action creator
      const action = SUT.connectWeb3()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(Web3Actions.ConnectWeb3)
      // ... the payload should be set correctly
      expect(action.payload).toEqual({
        web3: null,
        error: { error: 'Please install MetaMask' },
      })
    })

    it('should return an action of type Web3Actions.ConnectWeb3 and web3 should be set if MetaMask is installed and browser is modern', () => {
      windowSpy.mockImplementation(() => ({
        ethereum: {},
        web3: { something: 'something' },
      }))

      // when ... we call the connectWeb3 action creator
      const action = SUT.connectWeb3()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(Web3Actions.ConnectWeb3)
      // ... the payload should be set correctly
      expect(action.payload).toEqual({
        web3: { something: 'something' },
        error: {},
      })
    })

    it('should return an action of type Web3Actions.ConnectWeb3 and web3 should be set if MetaMask is installed and browser is legacy', () => {
      windowSpy.mockImplementation(() => ({
        web3: { something: 'something' },
      }))

      // when ... we call the connectWeb3 action creator
      const action = SUT.connectWeb3()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(Web3Actions.ConnectWeb3)
      // ... the payload should be set correctly
      expect(action.payload).toEqual({
        web3: { something: 'something' },
        error: {},
      })
    })
  })

  describe('resetWeb3Connection', () => {
    it('should return an action of type Web3Actions.ResetWeb3Connection if web3 connection is reset', () => {
      // when ... we call the resetWeb3Connection action creator
      const action = SUT.resetWeb3Connection()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(Web3Actions.ResetWeb3Connection)
    })
  })
})
