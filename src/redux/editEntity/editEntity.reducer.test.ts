import * as SUT from './editEntity.reducer'
import {
  GoToStepAction,
  EditEntityActions,
  NewEntityAction,
  EditEntitySuccessAction,
  EditEntityFailureAction,
  EditEntityStartAction,
} from './editEntity.types'
import { EntityType } from '../../types/entities'

const initialState = SUT.initialState

describe('EditEntity Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GoToStep Action', () => {
    it('should update the step', () => {
      const step = 2

      // given .. we have an action of type EditEntityActions.GoToStep
      const action: GoToStepAction = {
        type: EditEntityActions.GoToStep,
        payload: { step },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        step,
        entityType: null,
        editing: false,
        edited: false,
        error: null,
        entityDid: null,
      })
    })
  })

  describe('NewEntity Action', () => {
    it('should set the entityType', () => {
      const entityType = EntityType.Investment
      const entityDid = 'did:ixo:investment'

      // given .. we have an action of type EditEntityActions.NewEntityAction
      const action: NewEntityAction = {
        type: EditEntityActions.NewEntity,
        payload: { entityType, entityDid },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        step: 1,
        entityType,
        editing: false,
        edited: false,
        error: null,
        entityDid,
      })
    })
  })

  describe('EditEntityStart Action', () => {
    it('should set the editing flag to true', () => {
      // given .. we have an action of type EditEntityActions.EditEntityStart
      const action: EditEntityStartAction = {
        type: EditEntityActions.EditEntityStart,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        step: 1,
        entityType: null,
        editing: true,
        edited: false,
        error: null,
        entityDid: null,
      })
    })
  })

  describe('EditEntitySuccess Action', () => {
    it('should set the editing flag to false and the edited flag to true', () => {
      // given .. we have an action of type EditEntityActions.EditEntitySuccess
      const action: EditEntitySuccessAction = {
        type: EditEntityActions.EditEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, editing: true, edited: false }, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        step: 1,
        entityType: null,
        editing: false,
        edited: true,
        error: null,
        entityDid: null,
      })
    })
  })

  describe('EditEntityFailure Action', () => {
    it('should set the editing flag to false and the error to the payload', () => {
      // given .. we have an action of type EditEntityActions.EditEntityFailure
      const action: EditEntityFailureAction = {
        type: EditEntityActions.EditEntityFailure,
        payload: {
          error: 'some error occurred',
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, editing: true }, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        step: 1,
        entityType: null,
        editing: false,
        edited: false,
        error: 'some error occurred',
        entityDid: null,
      })
    })
  })
})
