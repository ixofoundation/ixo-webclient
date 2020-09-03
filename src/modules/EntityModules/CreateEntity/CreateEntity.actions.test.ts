import * as SUT from './CreateEntity.actions'
import { CreateEntityActions } from './types'
import { EntityType } from '../Entities/types'
import mockStore from 'common/redux/mockStore'

let store

beforeEach(() => {
  store = mockStore({
    createEntity: {
      entityType: EntityType.Data,
    },
  })
})

describe('CreateEntity Actions', () => {
  describe('goToStep', () => {
    it('should go to correct step', () => {
      // given ... some content
      const step = 2

      // when ... we call the goToStep action creator
      const action = SUT.goToStep(step)

      // then ... it should dispatch the correct action
      expect(action.type).toEqual(CreateEntityActions.GoToStep)
      expect(action.payload).toEqual({ step })
    })
  })

  describe('newEntity', () => {
    it('should start a new entity creation if the current entity is not equal to the new entity', async () => {
      // given ... some content
      const entityType = EntityType.Cell

      // when ... we call the newEntity action creator
      await store.dispatch(SUT.newEntity(entityType))
      const actions = store.getActions()

      // then ... it should dispatch the correct action
      expect(actions.length).toEqual(1)
      expect(actions[0].type).toEqual(CreateEntityActions.NewEntity)
      expect(actions[0].payload).toEqual({ entityType })
    })
  })

  it('should start a new entity creation if the current entity is equal to the new entity and there was a previous entity created', async () => {
    // given ... some content
    const entityType = EntityType.Data
    store = mockStore({
      createEntity: {
        entityType: EntityType.Data,
        created: true,
      },
    })

    // when ... we call the newEntity action creator
    await store.dispatch(SUT.newEntity(entityType))
    const actions = store.getActions()

    // then ... it should dispatch the correct action
    expect(actions.length).toEqual(1)
    expect(actions[0].type).toEqual(CreateEntityActions.NewEntity)
    expect(actions[0].payload).toEqual({ entityType })
  })

  it('should not do anything if the entity type is the same as the current entity type', async () => {
    // given ... some content
    const entityType = EntityType.Data

    // when ... we call the newEntity action creator
    await store.dispatch(SUT.newEntity(entityType))
    const actions = store.getActions()

    // then ... it should dispatch the correct action
    expect(actions.length).toEqual(0)
  })
})
