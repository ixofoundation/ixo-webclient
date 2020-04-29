import moment from 'moment'
import * as SUT from './Projects.reducer'
import {
  ProjectsActions,
  GetProjectsSuccessAction,
  FilterToggleUserProjectsAction,
  FilterToggleFeaturedProjectsAction,
  FilterTogglePopularProjectsAction,
  FilterProjectsDatesAction,
  ResetProjectsDatesFilterAction,
  FilterProjectsCategoryTagsAction,
  ResetProjectsCategoryFilterAction,
  ResetProjectsFiltersAction,
  Project,
} from './types'

const initialState = SUT.initialState

describe('Projects Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GetProjectsSuccess Action', () => {
    it('should return a new copy of state with the projects data set and the filters left in tact', () => {
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

      const projects: Project[] = [
        {
          projectDid: 'someDid1',
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
        },
      ]

      // given .. we have an action of type ProjectsActions.GetProjectsSuccessAction and some data
      const action: GetProjectsSuccessAction = {
        type: ProjectsActions.GetProjectsSuccess,
        payload: projects,
      }

      // when... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({ ...currentState, projects: [...projects] })
    })
  })

  describe('FilterToggleuserEntities Action', () => {
    it('should return a new copy of state with the user flag set, and the popular and featured reset and the other filters and project data left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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

      // given... we have an action of type FilterToggleuserEntities
      const action: FilterToggleUserProjectsAction = {
        type: ProjectsActions.FilterToggleUserProjects,
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

  describe('FilterTogglefeaturedEntities Action', () => {
    it('should return a new copy of state with the featured flag set, and the user and popular reset and the other filters and project data left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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

      // given... we have an action of type FilterTogglefeaturedEntities
      const action: FilterToggleFeaturedProjectsAction = {
        type: ProjectsActions.FilterToggleFeaturedProjects,
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

  describe('FilterTogglepopularEntities Action', () => {
    it('should return a new copy of state with the popular flag set, and the user and featured reset and the other filters and project data left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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

      // given... we have an action of type FilterTogglepopularEntities
      const action: FilterTogglePopularProjectsAction = {
        type: ProjectsActions.FilterTogglePopularProjects,
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
    it('should return a new copy of state with the dates set and the other filters and project data left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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
      const action: FilterProjectsDatesAction = {
        type: ProjectsActions.FilterDates,
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
    it('should return a new copy of state with the dates reset and the other filters and project data left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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
      const action: ResetProjectsDatesFilterAction = {
        type: ProjectsActions.ResetDatesFilter,
        payload: {},
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

  describe('FilterCategoryTags Action', () => {
    it('should return a new copy of state with the relevant filter category added and everything else left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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
      const action: FilterProjectsCategoryTagsAction = {
        type: ProjectsActions.FilterCategoryTag,
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
        projects: [
          {
            projectDid: 'someDid1',
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
      const action: FilterProjectsCategoryTagsAction = {
        type: ProjectsActions.FilterCategoryTag,
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

  describe('ResetCategoryFilter Action', () => {
    it('should return a new copy of state with the relevant category filter reset and everything else left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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
      const action: ResetProjectsCategoryFilterAction = {
        type: ProjectsActions.ResetCategoryFilter,
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
    it('should return a new copy of state with the filter reset and project data left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
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
      const action: ResetProjectsFiltersAction = {
        type: ProjectsActions.ResetFilters,
        payload: {},
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...initialState.filter,
        },
      })
    })
  })
})
