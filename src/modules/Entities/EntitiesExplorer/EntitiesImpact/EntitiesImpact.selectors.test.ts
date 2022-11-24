import moment from 'moment'
import { EntityType } from 'modules/Entities/types'
import * as SUT from './EntitiesImpact.selectors'

let state: any

beforeEach(() => {
  state = {
    entities: {
      selectedEntitiesType: EntityType.Project,
      entities: [
        {
          did: 'someDid1',
          type: EntityType.Project,
          creatorDid: 'someCreatorDid1',
          title: 'someTitle1',
          description: 'somedescription1',
          dateCreated: moment('2020-04-09T13:14:13.000Z'),
          creatorName: 'someCreatorName1',
          status: 'someStatus1',
          location: 'someCountry1',
          goal: 'someGoal1',
          serviceProvidersCount: 13,
          evaluatorsCount: 1,
          requiredClaimsCount: 100,
          successfulClaimsCount: 10,
          pendingClaimsCount: 20,
          rejectedClaimsCount: 30,
          sdgs: ['SDG1_1', 'SDG2_1', 'SDG3_1'],
          agentDids: ['someAgentDid1'],
          image: 'sommeImageUrl',
          logo: 'someLogoUrl',
          ddoTags: [],
        },
        {
          did: 'someDid2',
          type: EntityType.Project,
          creatorDid: 'someCreatorDid',
          title: 'someTitle2',
          description: 'somedescription2',
          dateCreated: moment('2020-04-10T13:14:13.000Z'),
          creatorName: 'someCreatorName2',
          status: 'someStatus2',
          location: 'someCountry2',
          goal: 'someGoal2',
          serviceProvidersCount: 11,
          evaluatorsCount: 12,
          requiredClaimsCount: 10,
          successfulClaimsCount: 2,
          pendingClaimsCount: 3,
          rejectedClaimsCount: 4,
          sdgs: ['SDG1_2', 'SDG2_2', 'SDG3_2'],
          agentDids: ['someAgentDid1'],
          image: 'sommeImageUrl',
          logo: 'someLogoUrl',
          ddoTags: [],
        },
        {
          did: 'someDid3',
          type: EntityType.Project,
          creatorDid: 'someCreatorDid',
          title: 'someTitle3',
          description: 'somedescription3',
          dateCreated: moment('2020-04-02T13:14:13.000Z'),
          creatorName: 'someCreatorName3',
          status: 'someStatus3',
          location: 'someCountry3',
          goal: 'someGoal3',
          serviceProvidersCount: 5,
          evaluatorsCount: 6,
          requiredClaimsCount: 7,
          successfulClaimsCount: 8,
          pendingClaimsCount: 9,
          rejectedClaimsCount: 10,
          sdgs: ['SDG1_3', 'SDG2_3', 'SDG3_3'],
          agentDids: ['someAgentDid5'],
          image: 'sommeImageUrl',
          logo: 'someLogoUrl',
          ddoTags: [],
        },
        {
          did: 'someDid4',
          type: EntityType.Dao,
          creatorDid: 'someCreatorDid',
          title: 'someTitle4',
          description: 'somedescription4',
          dateCreated: moment('2020-04-02T14:14:14.000Z'),
          creatorName: 'someCreatorName4',
          status: 'someStatus4',
          location: 'someCountry4',
          goal: 'someGoal4',
          serviceProvidersCount: 5,
          evaluatorsCount: 6,
          requiredClaimsCount: 7,
          successfulClaimsCount: 8,
          pendingClaimsCount: 9,
          rejectedClaimsCount: 10,
          sdgs: ['SDG1_4', 'SDG2_4', 'SDG4_4'],
          agentDids: ['someAgentDid5'],
          image: 'sommeImageUrl',
          logo: 'someLogoUrl',
          ddoTags: [],
        },
        {
          did: 'someDid5',
          type: EntityType.Project,
          creatorDid: 'someCreatorDid',
          title: 'someTitle5',
          description: 'somedescription5',
          dateCreated: moment('2020-05-02T15:15:15.000Z'),
          creatorName: 'someCreatorName5',
          status: 'someStatus5',
          location: 'someCountry5',
          goal: 'someGoal5',
          serviceProvidersCount: undefined,
          evaluatorsCount: undefined,
          requiredClaimsCount: undefined,
          successfulClaimsCount: undefined,
          pendingClaimsCount: undefined,
          rejectedClaimsCount: undefined,
          sdgs: ['SDG1_5', 'SDG2_5', 'SDG5_4'],
          agentDids: ['someAgentDid6'],
          image: 'sommeImageUrl',
          logo: 'someLogoUrl',
          ddoTags: [],
        },
      ],
      filter: {},
    },
  }
})

describe('EntitiesImpact Selectors', () => {
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

  describe('selectEntityCountries', () => {
    it('should return a list of entity countries', () => {
      // when ... we call the selector
      const result = SUT.selectEntitiesCountries(state)

      // then ... should return result as expected
      expect(result).toEqual(['someCountry1', 'someCountry2', 'someCountry3', 'someCountry5'])
    })
  })
})
