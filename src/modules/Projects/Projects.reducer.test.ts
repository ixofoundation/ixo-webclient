import * as SUT from './Projects.reducer'
import {
  ProjectsActions,
  GetProjectsSuccessAction,
  FilterToggleUserProjectsAction,
  FilterDatesAction,
  ResetDatesFilterAction,
  FilterCategoryTagsAction,
  ResetCategoryFilterAction,
  ResetFiltersAction,
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
          dateFrom: new Date(),
          dateTo: new Date(),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userProjectsOnly: true,
        },
      }

      const projects: Project[] = [
        {
          projectDid: 'someDid1',
          userDid: 'someUserDid1',
          title: 'someTitle1',
          shortDescription: 'someShortDescription1',
          dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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

  describe('FilterToggleUserProjects Action', () => {
    it('should return a new copy of state with the user flag set and the other filters and project data left in tact', () => {
      const currentState = {
        ...initialState,
        projects: [
          {
            projectDid: 'someDid1',
            userDid: 'someUserDid1',
            title: 'someTitle1',
            shortDescription: 'someShortDescription1',
            dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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
            data: null,
          },
        ],
        filter: {
          dateFrom: new Date(),
          dateTo: new Date(),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userProjectsOnly: false,
        },
      }

      // given... we have an action of type FilterToggleUserProjects
      const action: FilterToggleUserProjectsAction = {
        type: ProjectsActions.FilterToggleUserProjects,
        payload: {
          userProjectsOnly: true,
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          userProjectsOnly: true,
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
            dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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
          userProjectsOnly: true,
        },
      }

      // given... we have an action of type FilterDates
      const action: FilterDatesAction = {
        type: ProjectsActions.FilterDates,
        payload: {
          dateFrom: new Date('2020-04-09T13:14:13.000Z'),
          dateTo: new Date('2020-04-08T13:14:13.000Z'),
        },
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          ...currentState.filter,
          dateFrom: new Date('2020-04-09T13:14:13.000Z'),
          dateTo: new Date('2020-04-08T13:14:13.000Z'),
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
            dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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
            data: null,
          },
        ],
        filter: {
          dateFrom: new Date('2020-04-09T13:14:13.000Z'),
          dateTo: new Date('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userProjectsOnly: true,
        },
      }

      // given... we have an action of type ResetDatesFilter
      const action: ResetDatesFilterAction = {
        type: ProjectsActions.ResetDatesFilter,
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
            dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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
            data: null,
          },
        ],
        filter: {
          dateFrom: new Date('2020-04-09T13:14:13.000Z'),
          dateTo: new Date('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userProjectsOnly: true,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterCategoryTagsAction = {
        type: ProjectsActions.FilterCategoryTags,
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
            dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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
            data: null,
          },
        ],
        filter: {
          dateFrom: new Date('2020-04-09T13:14:13.000Z'),
          dateTo: new Date('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo1',
              tags: ['bar1_1', 'bar1_2', 'bar1_3'],
            },
          ],
          userProjectsOnly: true,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: FilterCategoryTagsAction = {
        type: ProjectsActions.FilterCategoryTags,
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
            dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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
            data: null,
          },
        ],
        filter: {
          dateFrom: new Date('2020-04-09T13:14:13.000Z'),
          dateTo: new Date('2020-04-08T13:14:13.000Z'),
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
          userProjectsOnly: true,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: ResetCategoryFilterAction = {
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
            dateCreated: new Date('2020-04-09T13:14:13.000Z'),
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
            data: null,
          },
        ],
        filter: {
          dateFrom: new Date('2020-04-09T13:14:13.000Z'),
          dateTo: new Date('2020-04-08T13:14:13.000Z'),
          categories: [
            {
              name: 'foo',
              tags: ['bar'],
            },
          ],
          userProjectsOnly: true,
        },
      }

      // given... we have an action of type ResetFiltersAction
      const action: ResetFiltersAction = {
        type: ProjectsActions.ResetFilters,
      }

      // when... we call the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...currentState,
        filter: {
          categories: [],
          dateFrom: null,
          dateTo: null,
          userProjectsOnly: false,
        },
      })
    })
  })
})
