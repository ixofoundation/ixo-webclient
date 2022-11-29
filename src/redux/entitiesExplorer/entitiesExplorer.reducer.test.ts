// @ts-nocheck
import moment from 'moment'
import * as SUT from './entitiesExplorer.reducer'
import {
  EntitiesExplorerActions,
  GetEntitiesSuccessAction,
  FilterToggleUserEntitiesAction,
  FilterToggleFeaturedEntitiesAction,
  FilterTogglePopularEntitiesAction,
  FilterDatesAction,
  ResetDatesFilterAction,
  FilterAddCategoryTagAction,
  ResetCategoryFilterAction,
  ResetFiltersAction,
  ChangeEntitiesTypeAction,
  FilterDDOCategoriesAction,
  FilterCategoryTagAction,
  FilterSectorAction,
  ExplorerEntity,
} from './entitiesExplorer.types'
import { EntityType, TermsOfUseType } from 'modules/Entities/types'

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
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      const entities: ExplorerEntity[] = [
        {
          did: 'someDid1',
          type: EntityType.Project,
          creatorDid: 'someUserDid1',
          name: 'someTitle1',
          description: 'someShortDescription1',
          dateCreated: moment('2020-04-09T13:14:13.000Z'),
          creatorName: 'someCreatorName1',
          creatorLogo: 'someCreatorLogo1',
          status: 'someStatus1',
          location: 'someCountry1',
          goal: 'someImpactAction1',
          serviceProvidersCount: 13,
          evaluatorsCount: 1,
          requiredClaimsCount: 100,
          successfulClaimsCount: 10,
          pendingClaimsCount: 20,
          rejectedClaimsCount: 30,
          disputedClaimsCount: 0,
          sdgs: ['1', '2', '3'],
          agentDids: ['someAgentDid1'],
          image: 'sommeImageUrl',
          logo: 'someLogoUrl',
          termsType: TermsOfUseType.FreeOpenSource,
          version: '1.2.3',
          badges: ['badge1'],
          ddoTags: [
            {
              name: 'someCategory1',
              tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
            },
            {
              name: 'someCategory1',
              tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
            },
          ],
          entityClaims: '',
          linkedEntities: [],
          liquidity: null,
        },
      ]

      // given .. we have an action of type EntitiesActions.GetEntitiesSuccessAction and some data
      const action: GetEntitiesSuccessAction = {
        type: EntitiesExplorerActions.GetEntitiesSuccess,
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: false,
          popularEntities: true,
          featuredEntities: true,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
        entityConfig: {
          Project: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Oracle: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Template: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Asset: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Cell: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Dao: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Investment: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
        },
      }

      // given... we have an action of type FilterToggleUserEntities
      const action: ChangeEntitiesTypeAction = {
        type: EntitiesExplorerActions.ChangeEntitiesType,
        payload: {
          type: EntityType.Dao,
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result.selectedEntitiesType).toEqual(EntityType.Dao)
      expect(result.entities).toEqual(currentState.entities)
      expect(result.filter.dateFrom).toEqual(null)
      expect(result.filter.dateTo).toEqual(null)
      expect(result.filter.userEntities).toEqual(currentState.filter.userEntities)
      expect(result.filter.featuredEntities).toEqual(currentState.filter.featuredEntities)
      expect(result.filter.popularEntities).toEqual(currentState.filter.popularEntities)
    })
  })

  describe('FilterToggleUserEntities Action', () => {
    it('should return a new copy of state with the user flag set, and the popular and featured reset and the other filters and entity data left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
            did: 'someDid1',
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: false,
          popularEntities: true,
          featuredEntities: true,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type FilterToggleUserEntities
      const action: FilterToggleUserEntitiesAction = {
        type: EntitiesExplorerActions.FilterToggleUserEntities,
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          featuredEntities: false,
          popularEntities: true,
          userEntities: true,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type FilterToggleFeaturedEntities
      const action: FilterToggleFeaturedEntitiesAction = {
        type: EntitiesExplorerActions.FilterToggleFeaturedEntities,
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment(),
          dateTo: moment(),
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          popularEntities: false,
          featuredEntities: true,
          userEntities: true,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type FilterTogglePopularEntities
      const action: FilterTogglePopularEntitiesAction = {
        type: EntitiesExplorerActions.FilterTogglePopularEntities,
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: null,
          dateTo: null,
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type FilterDates
      const action: FilterDatesAction = {
        type: EntitiesExplorerActions.FilterDates,
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type ResetDatesFilter
      const action: ResetDatesFilterAction = {
        type: EntitiesExplorerActions.ResetDatesFilter,
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterCategoryTagAction = {
        type: EntitiesExplorerActions.FilterCategoryTag,
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
          ddoTags: [
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterAddCategoryTagAction = {
        type: EntitiesExplorerActions.FilterAddCategoryTag,
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
          ddoTags: [
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterAddCategoryTagAction = {
        type: EntitiesExplorerActions.FilterAddCategoryTag,
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
          ddoTags: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3', 'bar1_4', 'bar1_5', 'bar1_6'],
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
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
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterDDOCategoriesAction = {
        type: EntitiesExplorerActions.FilterDDOCategories,
        payload: {
          ddoTags: [{ name: 'Cell Type', tags: ['Index', 'Relayer', 'Portal'] }],
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          ddoTags: [{ name: 'Cell Type', tags: ['Index', 'Relayer', 'Portal'] }],
        },
      })
    })
  })

  describe('FilerSector Action', () => {
    it('should return a new copy of state with the sector set and everything else left in tact', () => {
      const currentState = {
        ...initialState,
        entities: [
          {
            did: 'someDid1',
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
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
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterSectorAction = {
        type: EntitiesExplorerActions.FilterSector,
        payload: {
          sector: 'test',
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          sector: 'test',
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
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
          sector: 'test',
          query: '',
          itemOffset: 0,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: ResetCategoryFilterAction = {
        type: EntitiesExplorerActions.ResetCategoryFilter,
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
          ddoTags: [
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
            type: EntityType.Project,
            creatorDid: 'someUserDid1',
            name: 'someTitle1',
            description: 'someShortDescription1',
            dateCreated: moment('2020-04-09T13:14:13.000Z'),
            creatorName: 'someCreatorName1',
            creatorLogo: 'someCreatorLogo1',
            status: 'someStatus1',
            location: 'someCountry1',
            goal: 'someImpactAction1',
            serviceProvidersCount: 13,
            evaluatorsCount: 1,
            requiredClaimsCount: 100,
            successfulClaimsCount: 10,
            pendingClaimsCount: 20,
            rejectedClaimsCount: 30,
            disputedClaimsCount: 0,
            sdgs: ['1', '2', '3'],
            agentDids: ['someAgentDid1'],
            image: 'sommeImageUrl',
            logo: 'someLogoUrl',
            termsType: TermsOfUseType.FreeOpenSource,
            version: '1.2.3',
            badges: ['badge1'],
            ddoTags: [
              {
                name: 'someCategory1',
                tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
              },
            ],
          },
        ],
        filter: {
          dateFrom: moment('2020-04-09T13:14:13.000Z'),
          dateTo: moment('2020-04-08T13:14:13.000Z'),
          ddoTags: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
          sector: 'test',
          query: '',
        },
        entityConfig: {
          Project: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Oracle: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Template: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Asset: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Cell: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Dao: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
          Investment: {
            filterSchema: {
              name: 'Project Type',
              ddoTags: [],
              selectedTags: [],
            },
          },
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: ResetFiltersAction = {
        type: EntitiesExplorerActions.ResetFilters,
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
          sector: 'test',
        },
      })
    })
  })
})
