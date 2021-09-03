import * as SUT from './EditEntity.reducer'
import {
  GoToStepAction,
  EditEntityActions,
  NewEntityAction,
  EditEntitySuccessAction,
  EditEntityFailureAction,
  EditEntityStartAction,
} from './types'
import { EntityType } from '../../types'

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
        creating: false,
        created: false,
        error: null,
      })
    })
  })

  describe('NewEntity Action', () => {
    it('should set the entityType', () => {
      const entityType = EntityType.Investment

      // given .. we have an action of type EditEntityActions.NewEntityAction
      const action: NewEntityAction = {
        type: EditEntityActions.NewEntity,
        payload: { entityType },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        step: 1,
        entityType,
        creating: false,
        created: false,
        error: null,
      })
    })
  })

  describe('EditEntityStart Action', () => {
    it('should set the creating flag to true', () => {
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
        creating: true,
        created: false,
        error: null,
      })
    })
  })

  describe('EditEntitySuccess Action', () => {
    it('should set the creating flag to false and the edited flag to true', () => {
      // given .. we have an action of type EditEntityActions.EditEntitySuccess
      const action: EditEntitySuccessAction = {
        type: EditEntityActions.EditEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        { ...initialState, creating: true, edited: false },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        step: 1,
        entityType: null,
        creating: false,
        created: true,
        error: null,
      })
    })
  })

  describe('EditEntityFailure Action', () => {
    it('should set the creating flag to false and the error to the payload', () => {
      // given .. we have an action of type EditEntityActions.EditEntityFailure
      const action: EditEntityFailureAction = {
        type: EditEntityActions.EditEntityFailure,
        payload: {
          error: 'some error occurred',
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, creating: true }, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        step: 1,
        entityType: null,
        creating: false,
        created: false,
        error: 'some error occurred',
      })
    })
  })
})
