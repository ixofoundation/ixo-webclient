import * as SUT from './login.actions'
import { LoginActions } from './types'

describe('Login Actions', () => {
  describe('initUserInfo', () => {
    it('should return an action of type LoginActions.InitUserInfo', () => {
      // when ... we call the initUserInfo action creator
      const userInfo = {
        didDoc: { did: 'someDid', pubKey: 'somePubKey' },
        name: 'someName',
        ledgered: true,
        loggedInKeysafe: false,
        hasKYC: true,
      }
      const loginError = { error: null }
      const action = SUT.initUserInfo(userInfo, null)

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(LoginActions.InitUserInfo)
      // ... the payload should be set correctly
      expect(action.payload).toEqual({ userInfo, loginError })
    })
  })

  describe('initUserInfo', () => {
    it('should return an action of type LoginActions.ResetUserInfo', () => {
      // when ... we call the resetUserInfo action creator
      const action = SUT.resetUserInfo()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(LoginActions.ResetUserInfo)
    })
  })
})
