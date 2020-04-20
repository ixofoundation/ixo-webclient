import * as SUT from './Projects.selectors'

const state: any = {
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
    projects: [
      {
        projectDid: 'someDid1',
        userDid: 'someUserDid1',
        title: 'someTitle1',
        shortDescription: 'someShortDescription1',
        dateCreated: '2020-04-09T13:14:13.000Z',
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
      },
      {
        projectDid: 'someDid2',
        userDid: 'someUserDid',
        title: 'someTitle2',
        shortDescription: 'someShortDescription2',
        dateCreated: '2020-04-10T13:14:13.000Z',
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
        agentDids: ['someUserDid2'],
      },
    ],
    filter: {
      dateFrom: new Date('2020-04-05T13:14:13.000Z'),
      dateTo: new Date('2020-04-10T13:14:13.000Z'),
      categories: [
        {
          name: 'foo',
          tags: ['bar'],
        },
      ],
      userProjectsOnly: true,
    },
  },
}

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
      expect(result).toEqual(state.projects.projects)
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
    it('should return a list of filtered projects', () => {
      // when ... we call the selector
      const result = SUT.selectedFilteredProjects(state)

      // then ... should return result as expected
      expect(result[0].dateCreated).toEqual('2020-04-10T13:14:13.000Z')
      expect(result[1].dateCreated).toEqual('2020-04-09T13:14:13.000Z')
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
      // when ... we call the selector
      // TODO - add filtering
      const result = SUT.selectFilteredProjectsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(2)
    })
  })

  describe('selectUserProjectsCount', () => {
    it('should return the count of all projects for a user', () => {
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
      expect(result).toEqual(24)
    })
  })

  describe('selectTotalEvaluatorsCount', () => {
    it('should return the total amount of all evaluators', () => {
      // when ... we call the selector
      const result = SUT.selectTotalEvaluatorsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(13)
    })
  })

  describe('selectTotalRequiredClaimsCount', () => {
    it('should return a the total amount of required claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRequiredClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(110)
    })
  })

  describe('selectTotalPendingClaimsCount', () => {
    it('should return a the total amount of pending claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalPendingClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(23)
    })
  })

  describe('selectTotalSuccessfulClaimsCount', () => {
    it('should return a the total amount of successful claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalSuccessfulClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(12)
    })
  })

  describe('selectTotalRejectedClaimsCount', () => {
    it('should return a the total amount of Rejected claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRejectedClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(34)
    })
  })

  describe('selectTotalRemainingClaimsCount', () => {
    it('should return a the total amount of remaining claims that is calculated from required and successful claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRemainingClaimsCount(state)

      // then ... should return result as expected
      expect(result).toEqual(98)
    })
  })

  describe('selectFilterDateFrom', () => {
    it('should return the dateFrom property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateFrom(state)

      // then... should return result as expected
      expect(result).toEqual(new Date('2020-04-05T13:14:13.000Z'))
    })
  })

  describe('selectFilterDateTo', () => {
    it('should return the dateTo property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateTo(state)

      // then... should return result as expected
      expect(result).toEqual(new Date('2020-04-10T13:14:13.000Z'))
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

  describe('selectFilterUserProjectsOnly', () => {
    it('should return the userProjectsOnly property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterUserProjectsOnly(state)

      // then... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
