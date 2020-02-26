import * as SUT from './keysafe.actions'
import { KeysafeActions } from './types'
import { Ixo } from 'ixo-module'

describe('Keysafe Actions', () => {
  describe('initKeysafe', () => {
    it('should return an action of type KeysafeActions.InitKeysafe and an error if keysafe is not installed', () => {
      // when ... we call the initKeysafe action creator
      const action = SUT.initKeysafe()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(KeysafeActions.InitKeysafe)
      // ... the payload should be set correctly
      console.log(action.payload)
    })
  })

  describe('initUserInfo', () => {
    it('should return an action of type KeysafeActions.ResetKeysafe', () => {
      // when ... we call the resetKeysafe action creator
      const action = SUT.resetKeysafe()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(KeysafeActions.ResetKeysafe)
    })
  })
})
