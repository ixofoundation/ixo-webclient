import * as SUT from './EditEntity.actions'
import { EditEntityActions } from './types'
import { EntityType } from '../../types'
import mockStore from 'common/redux/mockStore'

// let store

// beforeEach(() => {
//   store = mockStore({
//     editEntity: {
//       entityType: EntityType.Asset,
//     },
//   })
// })

describe('EditEntity Actions', () => {
  describe('goToStep', () => {
    it('should go to correct step', () => {
      // given ... some content
      const step = 2

      // when ... we call the goToStep action creator
      const action = SUT.goToStep(step)

      // then ... it should dispatch the correct action
      expect(action.type).toEqual(EditEntityActions.GoToStep)
      expect(action.payload).toEqual({ step })
    })
  })

  // it('should not do anything if the entity type is the same as the current entity type', async () => {
  //   // given ... some content
  //   const entityType = EntityType.Asset

  //   // when ... we call the newEntity action creator
  //   await store.dispatch(SUT.newEntity(entityType))
  //   const actions = store.getActions()

  //   // then ... it should dispatch the correct action
  //   expect(actions.length).toEqual(0)
  // })
})
