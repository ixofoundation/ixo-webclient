import moment from 'moment'
import * as SUT from './SelectedEntity.reducer'
import {
  // ClearEntityAction,
  // GetEntityAction,
  GetEntitySuccessAction,
  // SelectedEntityActionTypes,
  SelectedEntityActions,
  ClearEntityAction,
} from './types'
import { Entity, EntityType } from '../Entities/types'

const initialState = SUT.initialState

describe('SelectedEntity Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GetEntitySuccess Action', () => {
    it('should return a new copy of state with the entity data set', () => {
      const entity: Entity = {
        did: 'someDid1',
        entityType: EntityType.Project,
        userDid: 'someUserDid1',
        title: 'someTitle1',
        shortDescription: 'someShortDescription1',
        dateCreated: moment('2020-04-09T13:14:13.000Z'),
        ownerName: 'someOwnerName1',
        status: 'someStatus1',
        country: 'someCountry1',
        impactAction: 'someImpactAction1',
        serviceProvidersCount: 13,
        evaluatorsCount: 1,
        requiredClaimsCount: 100,
        successfulClaimsCount: 10,
        pendingClaimsCount: 20,
        rejectedClaimsCount: 30,
        sdgs: [1, 2, 3],
        longDescription: 'someLongDescription',
        agentDids: ['someAgentDid1'],
        imageUrl: 'sommeImageUrl',
        founderLogoUrl: 'sommeLogoUrl',
        logoUrl: 'someLogoUrl',
        categories: [
          {
            name: 'someCategory1',
            tags: [
              'someCategory1_tag1',
              'someCategory1_tag2',
              'someCategory1_tag3',
            ],
          },
          {
            name: 'someCategory1',
            tags: [
              'someCategory1_tag1',
              'someCategory1_tag2',
              'someCategory1_tag3',
            ],
          },
        ],
        data: null,
      }

      // given .. we have an action of type SelectedEntityActions.GetEntitySuccess and some data
      const action: GetEntitySuccessAction = {
        type: SelectedEntityActions.GetEntitySuccess,
        payload: entity,
      }

      // when... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(result).toEqual(entity)
    })
  })

  describe('ClearEntity Action', () => {
    it('should clear the entity', () => {
      const currentState: Entity = {
        did: 'someDid1',
        entityType: EntityType.Project,
        userDid: 'someUserDid1',
        title: 'someTitle1',
        shortDescription: 'someShortDescription1',
        dateCreated: moment('2020-04-09T13:14:13.000Z'),
        ownerName: 'someOwnerName1',
        status: 'someStatus1',
        country: 'someCountry1',
        impactAction: 'someImpactAction1',
        serviceProvidersCount: 13,
        evaluatorsCount: 1,
        requiredClaimsCount: 100,
        successfulClaimsCount: 10,
        pendingClaimsCount: 20,
        rejectedClaimsCount: 30,
        sdgs: [1, 2, 3],
        longDescription: 'someLongDescription',
        agentDids: ['someAgentDid1'],
        imageUrl: 'sommeImageUrl',
        founderLogoUrl: 'sommeLogoUrl',
        logoUrl: 'someLogoUrl',
        categories: [
          {
            name: 'someCategory1',
            tags: [
              'someCategory1_tag1',
              'someCategory1_tag2',
              'someCategory1_tag3',
            ],
          },
          {
            name: 'someCategory1',
            tags: [
              'someCategory1_tag1',
              'someCategory1_tag2',
              'someCategory1_tag3',
            ],
          },
        ],
        data: null,
      }

      // given .. we have an action of type SelectedEntityActions.ClearEntity
      const action: ClearEntityAction = {
        type: SelectedEntityActions.ClearEntity,
      }

      // when... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual(null)
    })
  })
})
