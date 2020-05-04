import moment from 'moment'
import * as SUT from './Projects.selectors'

let state: any

beforeEach(() => {
  state = {
    account: {
      userInfo: {
        didDoc: {
          did: 'someUserDid1',
          pubKey: 'somePubKey',
          credentials: [],
        },
        name: 'SomeName',
        loggedInKeysafe: true,
        ledgered: true,
        hasKYC: false,
      },
      address: 'abc1234',
      accountNumber: null,
      sequence: null,
      balances: [],
      loginStatusCheckCompleted: true,
    },
    projects: {
      entities: [
        {
          did: 'someDid1',
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
          sdgs: ['SDG1_1', 'SDG2_1', 'SDG3_1'],
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
              name: 'someCategory5',
              tags: [
                'someCategory5_tag1',
                'someCategory5_tag2',
                'someCategory5_tag3',
              ],
            },
          ],
          data: null,
        },
        {
          did: 'someDid2',
          userDid: 'someUserDid',
          title: 'someTitle2',
          shortDescription: 'someShortDescription2',
          dateCreated: moment('2020-04-10T13:14:13.000Z'),
          ownerName: 'someOwnerName2',
          status: 'someStatus2',
          country: 'someCountry2',
          impactAction: 'someImpactAction2',
          serviceProvidersCount: 11,
          evaluatorsCount: 12,
          requiredClaimsCount: 10,
          successfulClaimsCount: 2,
          pendingClaimsCount: 3,
          rejectedClaimsCount: 4,
          sdgs: ['SDG1_2', 'SDG2_2', 'SDG3_2'],
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
              name: 'someCategory6',
              tags: [
                'someCategory6_tag1',
                'someCategory6_tag2',
                'someCategory6_tag3',
              ],
            },
          ],
          data: null,
        },
        {
          did: 'someDid3',
          userDid: 'someUserDid',
          title: 'someTitle3',
          shortDescription: 'someShortDescription3',
          dateCreated: moment('2020-04-02T13:14:13.000Z'),
          ownerName: 'someOwnerName3',
          status: 'someStatus3',
          country: 'someCountry3',
          impactAction: 'someImpactAction3',
          serviceProvidersCount: 5,
          evaluatorsCount: 6,
          requiredClaimsCount: 7,
          successfulClaimsCount: 8,
          pendingClaimsCount: 9,
          rejectedClaimsCount: 10,
          sdgs: ['SDG1_3', 'SDG2_3', 'SDG3_3'],
          longDescription: 'someLongDescription',
          agentDids: ['someAgentDid5'],
          imageUrl: 'sommeImageUrl',
          categories: [
            {
              name: 'someCategory3',
              tags: [
                'someCategory3_tag1',
                'someCategory3_tag2',
                'someCategory3_tag3',
              ],
            },
            {
              name: 'someCategory3',
              tags: [
                'someCategory3_tag1',
                'someCategory3_tag2',
                'someCategory3_tag3',
              ],
            },
          ],
          data: null,
        },
      ],
      filter: {
        dateFrom: moment('1970-01-01'),
        dateTo: moment('2100-12-31'),
        categories: [
          {
            name: 'foo',
            tags: ['bar'],
          },
        ],
        userEntities: true,
        featuredEntities: true,
        popularEntities: true,
      },
    },
  }
})

describe('Projects Selectors', () => {
  describe('selectProjectsState', () => {
    it('should return the projects property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectProjectsState(state)

      // then ... should return result as expected
      expect(result).toEqual(state.projects)
    })
  })

  describe('selectAllProjects', () => {
    it('should return the all the projects', () => {
      // when ... we call the selector
      const result = SUT.selectAllProjects(state)

      // then ... should return result as expected
      expect(result).toEqual(state.projects.entities)
    })
  })

  describe('selectProjectsFilter', () => {
    it('should return the the projectsfilter', () => {
      // when ... we call the selector
      const result = SUT.selectProjectsFilter(state)

      // then ... should return result as expected
      expect(result).toEqual(state.projects.filter)
    })
  })

  describe('selectedFilteredProjects', () => {
    it('should return a list of projects sorted when no filters are set', () => {
      state.projects.filter = {
        dateFrom: null,
        dateTo: null,
        categories: [],
        userEntities: false,
      }

      // when ... we call the selector
      const result = SUT.selectedFilteredProjects(state)

      // then ... should return result as expected
      expect(result.length).toEqual(3)
      expect(result[0].did).toEqual('someDid2')
      expect(result[1].did).toEqual('someDid1')
      expect(result[2].did).toEqual('someDid3')
    })

    it('should return a list of projects filtered by user projects when the userEntities flag is true', () => {
      state.projects.filter = {
        dateFrom: null,
        dateTo: null,
        categories: [],
        userEntities: true,
      }

      // when ... we call the selector
      const result = SUT.selectedFilteredProjects(state)

      // then ... should return result as expected
      expect(result.length).toEqual(1)
      expect(result[0].did).toEqual('someDid1')
    })

    it('should return a list of projects filtered by date and sorted when dates are set', () => {
      state.projects.filter = {
        dateFrom: moment('2020-04-09'),
        dateTo: moment('2020-04-10'),
        categories: [],
        userEntities: false,
      }

      // when ... we call the selector
      const result = SUT.selectedFilteredProjects(state)

      // then ... should return result as expected
      expect(result.length).toEqual(2)
      expect(result[0].did).toEqual('someDid2')
      expect(result[1].did).toEqual('someDid1')
    })

    it('should return a list of projects filtered by categories and sorted when categories are set', () => {
      state.projects.filter = {
        dateFrom: null,
        dateTo: null,
        categories: [
          {
            name: 'someCategory1',
            tags: ['someCategory1_tag1'],
          },
          {
            name: 'someCategory5',
            tags: ['someCategory5_tag1'],
          },
        ],
        userEntities: false,
      }

      // when ... we call the selector
      const result = SUT.selectedFilteredProjects(state)

      // then ... should return result as expected
      expect(result.length).toEqual(1)
      expect(result[0].did).toEqual('someDid1')
    })
  })

  describe('selectProjectCountries', () => {
    it('should return a list of project countries', () => {
      // when ... we call the selector
      const result = SUT.selectProjectCountries(state)

      // then ... should return result as expected
      expect(result).toContain('someCountry1')
      expect(result).toContain('someCountry2')
    })
  })

  describe('selectFilteredProjectsCount', () => {
    it('should return the count of filtered projects', () => {
      state.projects.filter = {
        dateFrom: moment('2020-04-09'),
        dateTo: moment('2020-04-10'),
        categories: [],
        userEntities: false,
      }
      // when ... we call the selector
      // TODO - add filtering
      const result = SUT.selectFilteredProjectsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(2)
    })
  })

  describe('selectAllProjectsCount', () => {
    it('should return the count of all projects regardless of filters set', () => {
      state.projects.filter = {
        dateFrom: moment('1900-01-01'),
        dateTo: moment('1900-01-01'),
        categories: [],
        userEntities: false,
      }
      // when ... we call the selector
      // TODO - add filtering
      const result = SUT.selectAllProjectsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(3)
    })
  })

  describe('selectUserProjectsCount', () => {
    it('should return the count of all projects for a user regardless of filters set', () => {
      state.projects.filter = {
        dateFrom: moment('1900-01-01'),
        dateTo: moment('1900-01-01'),
        categories: [],
        userEntities: false,
      }
      // when ... we call the selector
      const result = SUT.selectUserProjectsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(1)
    })
  })

  describe('selectTotalServiceProvidersCount', () => {
    it('should return the count of all service providers', () => {
      // when ... we call the selector
      const result = SUT.selectTotalServiceProvidersCount(state)

      // then ... should return result as expected
      expect(result).toEqual(29)
    })
  })

  describe('selectTotalEvaluatorsCount', () => {
    it('should return the total amount of all evaluators', () => {
      // when ... we call the selector
      const result = SUT.selectTotalEvaluatorsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(19)
    })
  })

  describe('selectTotalRequiredClaimsCount', () => {
    it('should return a the total amount of required claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRequiredClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(117)
    })
  })

  describe('selectTotalPendingClaimsCount', () => {
    it('should return a the total amount of pending claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalPendingClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(32)
    })
  })

  describe('selectTotalSuccessfulClaimsCount', () => {
    it('should return a the total amount of successful claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalSuccessfulClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(20)
    })
  })

  describe('selectTotalRejectedClaimsCount', () => {
    it('should return a the total amount of Rejected claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRejectedClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(44)
    })
  })

  describe('selectTotalRemainingClaimsCount', () => {
    it('should return a the total amount of remaining claims that is calculated from required and successful claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRemainingClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(97)
    })
  })

  describe('selectFilterDateFrom', () => {
    it('should return the dateFrom property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateFrom(state)

      // then... should return result as expected
      expect(result).toEqual(moment('1970-01-01'))
    })
  })

  describe('selectFilterDateTo', () => {
    it('should return the dateTo property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateTo(state)

      // then... should return result as expected
      expect(result).toEqual(moment('2100-12-31'))
    })
  })

  describe('selectFilterDateFromFormatted', () => {
    it('should return the dateFrom property from the filter as a formatted string', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateFromFormatted(state)

      // then... should return result as expected
      expect(result).toEqual("1 Jan '70")
    })
  })

  describe('selectFilterDateToFormatted', () => {
    it('should return the dateTo property from the filter as a formatted string', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateToFormatted(state)

      // then... should return result as expected
      expect(result).toEqual("31 Dec '00")
    })
  })

  describe('selectFilterDateSummary', () => {
    it('should return the correct summary of the dates when both dates have values', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateSummary(state)

      // then... should return result as expected
      expect(result).toEqual("1 Jan '70 - 31 Dec '00")
    })

    it('should return the correct summary of the dates when only dateFrom has a value', () => {
      // when .. we call the selector
      state.projects.filter.dateTo = null
      const result = SUT.selectFilterDateSummary(state)

      // then... should return result as expected
      expect(result).toEqual("1 Jan '70 - Select")
    })

    it('should return the correct summary of the dates when only dateTo has a value', () => {
      // when .. we call the selector
      state.projects.filter.dateFrom = null
      const result = SUT.selectFilterDateSummary(state)

      // then... should return result as expected
      expect(result).toEqual("Select - 31 Dec '00")
    })

    it('should return the correct summary of the dates when only neither dateTo nor dateTo have values', () => {
      // when .. we call the selector
      state.projects.filter.dateFrom = null
      state.projects.filter.dateTo = null
      const result = SUT.selectFilterDateSummary(state)

      // then... should return result as expected
      expect(result).toEqual('Dates')
    })
  })

  describe('selectFilterCategories', () => {
    it('should return the categories property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterCategories(state)

      // then... should return result as expected
      expect(result).toEqual([
        {
          name: 'foo',
          tags: ['bar'],
        },
      ])
    })
  })

  describe('selectFilterCategoriesSummary', () => {
    it('should return the correct categories summary from the filter when there are categories selected', () => {
      state.projects.filter.categories = [
        {
          name: 'foo1',
          tags: ['foo1_bar1', 'foo1_bar2'],
        },
        {
          name: 'foo_2',
          tags: ['foo_2_bar1', 'foo_2_bar2', 'foo_2_bar3'],
        },
      ]

      // when .. we call the selector
      const result = SUT.selectFilterCategoriesSummary(state)

      // then... should return result as expected
      expect(result).toEqual('Filters - 5')
    })

    it('should return the correct categories summary from the filter when there are no categories selected', () => {
      state.projects.filter.categories = []

      // when .. we call the selector
      const result = SUT.selectFilterCategoriesSummary(state)

      // then... should return result as expected
      expect(result).toEqual('Filters')
    })
  })

  describe('selectFilterUserProjects', () => {
    it('should return the userEntities property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterUserProjects(state)

      // then... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectFilterFeaturedProjects', () => {
    it('should return the FeaturedProjects property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterFeaturedProjects(state)

      // then... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectFilterPopularProjects', () => {
    it('should return the PopularProjects property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterPopularProjects(state)

      // then... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
