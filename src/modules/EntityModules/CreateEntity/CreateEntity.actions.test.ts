import * as SUT from './CreateEntity.actions'
import { Step, CreateEntityActions } from './types'
import { EntityType } from '../Entities/types'

describe('CreateEntity Actions', () => {
  describe('goToStep', () => {
    it('should go to correct step', () => {
      // given ... some content
      const step = Step.Settings

      // when ... we call the goToStep action creator
      const action = SUT.goToStep(step)

      // then ... it should dispatch the correct action
      expect(action.type).toEqual(CreateEntityActions.GoToStep)
      expect(action.payload).toEqual({ step })
    })
  })

  describe('newEntity', () => {
    it('should set the entity type', () => {
      // given ... some content
      const entityType = EntityType.Cell

      // when ... we call the newEntity action creator
      const action = SUT.newEntity(entityType)

      // then ... it should dispatch the correct action
      expect(action.type).toEqual(CreateEntityActions.NewEntity)
      expect(action.payload).toEqual({ entityType })
    })
  })
})
