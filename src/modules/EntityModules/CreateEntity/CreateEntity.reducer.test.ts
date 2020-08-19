import * as SUT from './CreateEntity.reducer'
import { GoToStepAction, CreateEntityActions, NewEntityAction } from './types'
import { EntityType } from '../Entities/types'

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
      })
    })
  })

  describe('SetEntityTyp4 Action', () => {
    it('should set the entityType', () => {
      const entityType = EntityType.Investment

      // given .. we have an action of type CreateEntityActions.SetEntityType
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
      })
    })
  })
})
