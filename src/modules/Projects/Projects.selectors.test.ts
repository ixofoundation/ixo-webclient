import * as SUT from './Projects.selectors'

const state: any = {
  projects: {
    projects: [
      {
        data: {
          createdOn: '2020-04-09T13:14:13.000Z',
          projectLocation: 'location 1',
          agentStats: {
            evaluators: 1,
            serviceProviders: 1,
          },
          claims: [],
          requiredClaims: 100,
        },
      },
      {
        data: {
          createdOn: '2020-04-10T13:14:13.000Z',
          projectLocation: 'location 2',
          agentStats: {
            evaluators: 1,
            serviceProviders: 1,
          },
          claims: [],
          requiredClaims: 10,
        },
      },
    ],
  },
}

describe('Projects Selectors', () => {
  describe('selectProjects', () => {
    it('should return the projects property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectProjects(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(state.projects)
    })
  })

  describe('selectAllProjects', () => {
    it('should return the all the projects listed in the root state', () => {
      // when ... we call the selector
      const result = SUT.selectAllProjects(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(state.projects.projects)
    })
  })

  describe('selectDateSortedProjects', () => {
    it('should return a list of sorted projects from the root state', () => {
      // when ... we call the selector
      const result = SUT.selectDateSortedProjects(state)

      // then ... should return the slice of state as expected
      expect(result[0].data.createdOn).toEqual('2020-04-10T13:14:13.000Z')
      expect(result[1].data.createdOn).toEqual('2020-04-09T13:14:13.000Z')
    })
  })

  describe('selectProjectCountries', () => {
    it('should return a list of project locations from the root state', () => {
      // when ... we call the selector
      const result = SUT.selectProjectCountries(state)

      // then ... should return the slice of state as expected
      expect(result[0]).toEqual('location 2')
      expect(result[1]).toEqual('location 1')
    })
  })

  describe('selectClaimsAgents', () => {
    it('should return a list an object containg claimsagent information from the root state', () => {
      // when ... we call the selector
      const result = SUT.selectClaimsAgents(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual({ serviceProviders: 2, evaluators: 2 })
    })
  })

  describe('selectClaims', () => {
    it('should return a list of claims from the root state', () => {
      // when ... we call the selector
      const result = SUT.selectClaims(state)

      // then ... should return the slice of state as expected
      // TODO add proper claims data to the test
      expect(result).toEqual([[], []])
    })
  })

  describe('selectTotalClaimsRequired', () => {
    it('should return a the total amount of required claims from the root state', () => {
      // when ... we call the selector
      const result = SUT.selectTotalClaimsRequired(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(110)
    })
  })
})
