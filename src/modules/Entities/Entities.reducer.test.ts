import moment from 'moment'
import * as SUT from './Entities.reducer'
import {
  EntitiesActions,
  GetEntitiesSuccessAction,
  FilterToggleUserEntitiesAction,
  FilterToggleFeaturedEntitiesAction,
  FilterTogglePopularEntitiesAction,
  FilterDatesAction,
  ResetDatesFilterAction,
  FilterAddCategoryTagAction,
  ResetCategoryFilterAction,
  ResetFiltersAction,
  Entity,
  ChangeEntitiesTypeAction,
  EntityType,
  FilterCategoriesAction,
  FilterCategoryTagAction,
} from './types'

const initialState = SUT.initialState

describe('Entities Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GetEntitiesSuccess Action', () => {
    it('should return a new copy of state with the entities data set and the filters left in tact', () => {
      const currentState = {
        ...initialState,
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      const entities: Entity[] = [
        {
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
          pdsUrl: 'somePsdUrl',
          data: null,
        },
      ]

      // given .. we have an action of type EntitiesActions.GetEntitiesSuccessAction and some data
      const action: GetEntitiesSuccessAction = {
        type: EntitiesActions.GetEntitiesSuccess,
        payload: entities,
      }

      // when... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({ ...currentState, entities: [...entities] })
    })
  })

  describe('ChangeEntityType Action', () => {
    it('should return a new copy of state with the entities left in tact, some properties of the filter cleared and the initial selected categories set', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',
            data: null,
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: false,
          popularEntities: true,
          featuredEntities: true,
        },
      }

      // given... we have an action of type FilterToggleUserEntities
      const action: ChangeEntitiesTypeAction = {
        type: EntitiesActions.ChangeEntitiesType,
        payload: {
          entityType: EntityType.Cell,
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result.selectedEntitiesType).toEqual(EntityType.Cell)
      expect(result.entities).toEqual(currentState.entities)
      expect(result.filter.dateFrom).toEqual(null)
      expect(result.filter.dateTo).toEqual(null)
      expect(result.filter.userEntities).toEqual(
        currentState.filter.userEntities,
      )
      expect(result.filter.featuredEntities).toEqual(
        currentState.filter.featuredEntities,
      )
      expect(result.filter.popularEntities).toEqual(
        currentState.filter.popularEntities,
      )
    })
  })

  describe('FilterToggleUserEntities Action', () => {
    it('should return a new copy of state with the user flag set, and the popular and featured reset and the other filters and entity data left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: false,
          popularEntities: true,
          featuredEntities: true,
        },
      }

      // given... we have an action of type FilterToggleUserEntities
      const action: FilterToggleUserEntitiesAction = {
        type: EntitiesActions.FilterToggleUserEntities,
        payload: {
          userEntities: true,
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      })
    })
  })

  describe('FilterToggleFeaturedEntities Action', () => {
    it('should return a new copy of state with the featured flag set, and the user and popular reset and the other filters and entity data left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          featuredEntities: false,
          popularEntities: true,
          userEntities: true,
        },
      }

      // given... we have an action of type FilterToggleFeaturedEntities
      const action: FilterToggleFeaturedEntitiesAction = {
        type: EntitiesActions.FilterToggleFeaturedEntities,
        payload: {
          featuredEntities: true,
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          featuredEntities: true,
          popularEntities: false,
          userEntities: false,
        },
      })
    })
  })

  describe('FilterTogglePopularEntities Action', () => {
    it('should return a new copy of state with the popular flag set, and the user and featured reset and the other filters and entity data left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          popularEntities: false,
          featuredEntities: true,
          userEntities: true,
        },
      }

      // given... we have an action of type FilterTogglePopularEntities
      const action: FilterTogglePopularEntitiesAction = {
        type: EntitiesActions.FilterTogglePopularEntities,
        payload: {
          popularEntities: true,
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          popularEntities: true,
          featuredEntities: false,
          userEntities: false,
        },
      })
    })
  })

  describe('FilterDates Action', () => {
    it('should return a new copy of state with the dates set and the other filters and entity data left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: null,
          dateTo: null,
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type FilterDates
      const action: FilterDatesAction = {
        type: EntitiesActions.FilterDates,
        payload: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
        },
      })
    })
  })

  describe('ResetDatesFilter Action', () => {
    it('should return a new copy of state with the dates reset and the other filters and entity data left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type ResetDatesFilter
      const action: ResetDatesFilterAction = {
        type: EntitiesActions.ResetDatesFilter,
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          dateFrom: null,
          dateTo: null,
        },
      })
    })
  })

  describe('FilterCategoryTag Action', () => {
    it('should return a new copy of state with the relevant filter category added and all other categories left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterCategoryTagAction = {
        type: EntitiesActions.FilterCategoryTag,
        payload: {
          category: 'foo2',
          tags: ['bar2_1'],
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          categories: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
            {
              name: 'foo2',
              tags: ['bar2_1'],
            },
          ],
        },
      })
    })
  })

  describe('FilterAddCategoryTag Action', () => {
    it('should return a new copy of state with the relevant filter category added and everything else left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterAddCategoryTagAction = {
        type: EntitiesActions.FilterAddCategoryTag,
        payload: {
          category: 'foo2',
          tags: ['bar2_1', 'bar2_2', 'bar2_3'],
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          categories: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
            {
              name: 'foo2',
              tags: ['bar2_1', 'bar2_2', 'bar2_3'],
            },
          ],
        },
      })
    })

    it('should return a new copy of state with the relevant filter category changed and everything else left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterAddCategoryTagAction = {
        type: EntitiesActions.FilterAddCategoryTag,
        payload: {
          category: 'foo1',
          tags: ['bar1_1', 'bar1_2', 'bar1_3', 'bar1_4', 'bar1_5', 'bar1_6'],
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          categories: [
            {
              name: 'foo1',
              tags: [
                'bar1_1',
                'bar1_2',
                'bar1_3',
                'bar1_4',
                'bar1_5',
                'bar1_6',
              ],
            },
          ],
        },
      })
    })
  })

  describe('FilterCategories Action', () => {
    it('should return a new copy of state with the categories filter set and everything else left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo1',
              tags: ['bar1'],
            },
            {
              name: 'foo2',
              tags: ['bar2'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterCategoriesAction = {
        type: EntitiesActions.FilterCategories,
        payload: {
          categories: [
            { name: 'Cell Type', tags: ['Index', 'Relayer', 'Portal'] },
          ],
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          categories: [
            { name: 'Cell Type', tags: ['Index', 'Relayer', 'Portal'] },
          ],
        },
      })
    })
  })

  describe('ResetCategoryFilter Action', () => {
    it('should return a new copy of state with the relevant category filter reset and everything else left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo1',
              tags: ['bar1'],
            },
            {
              name: 'foo2',
              tags: ['bar2'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: ResetCategoryFilterAction = {
        type: EntitiesActions.ResetCategoryFilter,
        payload: {
          category: 'foo1',
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          categories: [
            {
              name: 'foo2',
              tags: ['bar2'],
            },
            {
              name: 'foo1',
              tags: [],
            },
          ],
        },
      })
    })
  })

  describe('ResetFilters Action', () => {
    it('should return a new copy of state with some properties of the filter reset', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
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
            logoUrl: 'someLogoUrl',
            founderLogoUrl: 'sommeLogoUrl',
            categories: [
              {
                name: 'someCategory1',
                tags: [
                  'someCategory1_tag1',
                  'someCategory1_tag2',
                  'someCategory1_tag3',
                ],
              },
            ],
            pdsUrl: 'somePsdUrl',

            data: null,
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: ResetFiltersAction = {
        type: EntitiesActions.ResetFilters,
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...initialState.filter,
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      })
    })
  })
})
