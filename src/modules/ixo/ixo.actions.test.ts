import * as SUT from './ixo.actions'
import { IxoActions } from './types'
import { Ixo } from '@ixo/ixo-apimodule'

describe('Ixo Actions', () => {
  describe('initIxo', () => {
    it('should return an action of type IxoActions.InitIxo', () => {
      // when ... we call the initIxo action creator
      const ixo = new Ixo('some-url')
      const action = SUT.initIxo('some-url')

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(IxoActions.InitIxo)
      // ... the payload should be set correctly
      expect(JSON.stringify(action.payload.ixo)).toEqual(JSON.stringify(ixo))
    })
  })

  describe('initUserInfo', () => {
    it('should return an action of type IxoActions.ResetIxo', () => {
      // when ... we call the resetIxo action creator
      const action = SUT.resetIxo()

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(IxoActions.ResetIxo)
    })
  })
})
