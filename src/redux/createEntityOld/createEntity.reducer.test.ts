import * as SUT from './createEntity.reducer'
import {
  GoToStepAction,
  CreateEntityActions,
  NewEntityAction,
  CreateEntitySuccessAction,
  CreateEntityFailureAction,
  CreateEntityStartAction,
} from './createEntity.types'
import { EntityType } from '../../modules/Entities/types'

const initialState = SUT.initialState

describe('CreateEntity Reducer', () => {
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

      // given .. we have an action of type CreateEntityActions.GoToStep
      const action: GoToStepAction = {
        type: CreateEntityActions.GoToStep,
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

      // given .. we have an action of type CreateEntityActions.NewEntityAction
      const action: NewEntityAction = {
        type: CreateEntityActions.NewEntity,
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

  describe('CreateEntityStart Action', () => {
    it('should set the creating flag to true', () => {
      // given .. we have an action of type CreateEntityActions.CreateEntityStart
      const action: CreateEntityStartAction = {
        type: CreateEntityActions.CreateEntityStart,
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

  describe('CreateEntitySuccess Action', () => {
    it('should set the creating flag to false and the created flag to true', () => {
      // given .. we have an action of type CreateEntityActions.CreateEntitySuccess
      const action: CreateEntitySuccessAction = {
        type: CreateEntityActions.CreateEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer({ ...initialState, creating: true, created: false }, action)

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

  describe('CreateEntityFailure Action', () => {
    it('should set the creating flag to false and the error to the payload', () => {
      // given .. we have an action of type CreateEntityActions.CreateEntityFailure
      const action: CreateEntityFailureAction = {
        type: CreateEntityActions.CreateEntityFailure,
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
