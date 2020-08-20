import * as SUT from './CreateEntity.selectors'
import { CreateEntityState } from './types'
import { EntityType } from 'modules/EntityModules/Entities/types'

let state: any

beforeEach(() => {
  state = {
    createEntity: {
      step: 1,
      entityType: EntityType.Investment,
    } as CreateEntityState,
  }
})

describe('CreateEntity Selectors', () => {
  describe('selectCreateEntity', () => {
    it('should return the createEntity property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectCreateEntity(state)

      // then ... should return result as expected
      expect(result).toEqual(state.createEntity)
    })
  })

  describe('selectStep', () => {
    it('should return the selectStep property', () => {
      // when ... we call the selector
      const result = SUT.selectStep(state)

      // then ... should return result as expected
      expect(result).toEqual(1)
    })
  })

  describe('selectEntityType', () => {
    it('should return the selectEntityType property', () => {
      // when ... we call the selector
      const result = SUT.selectEntityType(state)

      // then ... should return result as expected
      expect(result).toEqual(EntityType.Investment)
    })
  })
})
