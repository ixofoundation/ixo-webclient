import moment from 'moment'
import * as SUT from './EntitiesExplorer.selectors'
import { EntityType, TermsOfUseType } from '../types'

let state: any

beforeEach(() => {
  state = {
    account: {
      userInfo: {
        didDoc: {
          did: 'someCreatorDid1',
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
          creatorLogo: 'someCreatorLogo1',
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
          ddoTags: [
            {
              name: 'someCategory1',
              tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
            },
            {
              name: 'someCategory5',
              tags: ['someCategory5_tag1', 'someCategory5_tag2', 'someCategory5_tag3'],
            },
          ],
          termsType: TermsOfUseType.FreeOpenSource,
          version: '1.2.3',
          badges: ['somebadge'],
        },
        {
          did: 'someDid2',
          type: EntityType.Project,
          creatorDid: 'someCreatorDid',
          title: 'someTitle2',
          description: 'somedescription2',
          dateCreated: moment('2020-04-10T13:14:13.000Z'),
          creatorName: 'someCreatorName2',
          creatorLogo: 'someCreatorLogo2',
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
          ddoTags: [
            {
              name: 'someCategory1',
              tags: ['someCategory1_tag1', 'someCategory1_tag2', 'someCategory1_tag3'],
            },
            {
              name: 'someCategory6',
              tags: ['someCategory6_tag1', 'someCategory6_tag2', 'someCategory6_tag3'],
            },
          ],
          termsType: TermsOfUseType.FreeOpenSource,
          version: '1.2.3',
          badges: ['somebadge'],
        },
        {
          did: 'someDid3',
          type: EntityType.Project,
          creatorDid: 'someCreatorDid',
          title: 'someTitle3',
          description: 'somedescription3',
          dateCreated: moment('2020-04-02T13:14:13.000Z'),
          creatorName: 'someCreatorName3',
          creatorLogo: 'someCreatorLogo3',
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
          ddoTags: [
            {
              name: 'someCategory3',
              tags: ['someCategory3_tag1', 'someCategory3_tag2', 'someCategory3_tag3'],
            },
            {
              name: 'someCategory3',
              tags: ['someCategory3_tag1', 'someCategory3_tag2', 'someCategory3_tag3'],
            },
          ],
          termsType: TermsOfUseType.FreeOpenSource,
          version: '1.2.3',
          badges: ['somebadge'],
        },
        {
          did: 'someDid4',
          type: EntityType.Dao,
          creatorDid: 'someCreatorDid',
          title: 'someTitle4',
          description: 'somedescription4',
          dateCreated: moment('2020-04-02T14:14:14.000Z'),
          creatorName: 'someCreatorName4',
          creatorLogo: 'someCreatorLogo4',
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
          ddoTags: [
            {
              name: 'someCategory4',
              tags: ['someCategory4_tag1', 'someCategory4_tag2', 'someCategory4_tag4'],
            },
            {
              name: 'someCategory4',
              tags: ['someCategory4_tag1', 'someCategory4_tag2', 'someCategory4_tag3'],
            },
          ],
          termsType: TermsOfUseType.FreeOpenSource,
          version: '1.2.3',
          badges: ['somebadge'],
        },
        {
          did: 'someDid4',
          type: EntityType.Template,
          creatorDid: 'someCreatorDid4',
          title: 'someTitle4',
          description: 'somedescription4',
          dateCreated: moment('2020-04-24T13:14:13.000Z'),
          creatorName: 'someCreatorName4',
          creatorLogo: 'someCreatorLogo4',
          status: 'someStatus4',
          location: 'someCountry4',
          goal: 'someGoal4',
          serviceProvidersCount: 0,
          evaluatorsCount: 0,
          requiredClaimsCount: 0,
          successfulClaimsCount: 0,
          pendingClaimsCount: 0,
          rejectedClaimsCount: 0,
          sdgs: ['SDG1_4', 'SDG2_4', 'SDG3_4'],
          agentDids: ['someAgentDid4'],
          image: 'sommeImageUrl',
          logo: 'someLogoUrl',
          ddoTags: [
            {
              name: 'someCategory4',
              tags: ['someCategory1_tag4', 'someCategory1_tag2', 'someCategory1_tag3'],
            },
            {
              name: 'someCategory5',
              tags: ['someCategory5_tag4', 'someCategory5_tag2', 'someCategory5_tag3'],
            },
          ],
          termsType: TermsOfUseType.FreeOpenSource,
          version: '1.2.3',
          badges: ['somebadge'],
        },
      ],
      filter: {
        dateFrom: moment('1970-01-01'),
        dateTo: moment('2100-12-31'),
        ddoTags: [
          {
            name: 'foo',
            tags: ['bar'],
          },
        ],
        sector: 'foo',
        userEntities: true,
        featuredEntities: true,
        popularEntities: true,
      },
    },
  }
})

describe('EntitiesExplorer Selectors', () => {
  describe('selectEntitiesState', () => {
    it('should return the entities property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectEntitiesState(state)

      // then ... should return result as expected
      expect(result).toEqual(state.entities)
    })
  })

  describe('selectAllEntities', () => {
    it('should return the all the projects entities', () => {
      // when ... we call the selector
      const result = SUT.selectAllEntitiesByType(state)

      // then ... should return result as expected
      expect(result).toEqual(state.entities.entities.filter((entity: any) => entity.type === EntityType.Project))
    })

    it('should return the all the cells entities', () => {
      state.entities.selectedEntitiesType = EntityType.Dao
      // when ... we call the selector
      const result = SUT.selectAllEntitiesByType(state)

      // then ... should return result as expected
      expect(result).toEqual(state.entities.entities.filter((entity: any) => entity.type === EntityType.Dao))
    })
  })

  describe('selectEntitiesFilter', () => {
    it('should return the the entities filter', () => {
      // when ... we call the selector
      const result = SUT.selectEntitiesFilter(state)

      // then ... should return result as expected
      expect(result).toEqual(state.entities.filter)
    })
  })

  describe('selectEntitiesType', () => {
    it('should return the the entities type', () => {
      // when ... we call the selector
      const result = SUT.selectSelectedEntitiesType(state)

      // then ... should return result as expected
      expect(result).toEqual(state.entities.selectedEntitiesType)
    })
  })

  describe('selectedFilteredEntities', () => {
    it('should return a list of entities sorted when no filters are set', () => {
      state.entities.filter = {
        dateFrom: null,
        dateTo: null,
        ddoTags: [],
        userEntities: false,
      }

      // when ... we call the selector
      const result = SUT.selectedFilteredEntities(state)

      // then ... should return result as expected
      expect(result.length).toEqual(1)
      expect(result[0].did).toEqual('someDid1')
    })

    it('should return a list of entities filtered by user entities when the userEntities flag is true', () => {
      state.entities.filter = {
        dateFrom: null,
        dateTo: null,
        ddoTags: [],
        userEntities: true,
      }

      // when ... we call the selector
      const result = SUT.selectedFilteredEntities(state)

      // then ... should return result as expected
      expect(result.length).toEqual(1)
      expect(result[0].did).toEqual('someDid1')
    })

    it('should return a list of entities filtered by date and sorted when dates are set', () => {
      state.entities.filter = {
        dateFrom: moment('2020-04-09'),
        dateTo: moment('2020-04-10'),
        ddoTags: [],
        userEntities: false,
      }

      // when ... we call the selector
      const result = SUT.selectedFilteredEntities(state)

      // then ... should return result as expected
      expect(result.length).toEqual(1)
      expect(result[0].did).toEqual('someDid1')
    })

    it('should return a list of entities filtered by ddoTags and sorted when ddoTags are set', () => {
      state.entities.filter = {
        dateFrom: null,
        dateTo: null,
        ddoTags: [
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
      const result = SUT.selectedFilteredEntities(state)

      // then ... should return result as expected
      expect(result.length).toEqual(1)
      expect(result[0].did).toEqual('someDid1')
    })
  })

  describe('selectAllTemplateEntities', () => {
    it('should return a list of template entities sorted by date regardless of filters', () => {
      state.entities.filter = {
        dateFrom: moment('2020-04-09'),
        dateTo: moment('2020-04-10'),
        ddoTags: [],
        userEntities: false,
      }

      // when ... we call the selector
      const result = SUT.selectAllTemplateEntities(state)

      // then ... should return result as expected
      expect(result.length).toEqual(1)
      expect(result[0].did).toEqual('someDid4')
    })
  })

  describe('selectFilteredEntitiesCount', () => {
    it('should return the count of filtered Entities', () => {
      state.entities.filter = {
        dateFrom: moment('2020-04-09'),
        dateTo: moment('2020-04-10'),
        ddoTags: [],
        userEntities: false,
      }
      // when ... we call the selector
      // TODO - add filtering
      const result = SUT.selectFilteredEntitiesCount(state)

      // then ... should return result as expected
      expect(result).toEqual(1)
    })
  })

  describe('selectAllEntitiesCount', () => {
    it('should return the count of all entities regardless of filters set', () => {
      state.entities.filter = {
        dateFrom: moment('1900-01-01'),
        dateTo: moment('1900-01-01'),
        ddoTags: [],
        userEntities: false,
      }
      // when ... we call the selector
      // TODO - add filtering
      const result = SUT.selectAllEntitiesCount(state)

      // then ... should return result as expected
      expect(result).toEqual(3)
    })
  })

  describe('selectUserEntitiesCount', () => {
    it('should return the count of all entities for a user regardless of filters set', () => {
      state.entities.filter = {
        dateFrom: moment('1900-01-01'),
        dateTo: moment('1900-01-01'),
        ddoTags: [],
        userEntities: false,
      }
      // when ... we call the selector
      const result = SUT.selectUserEntitiesCount(state)

      // then ... should return result as expected
      expect(result).toEqual(1)
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
      state.entities.filter.dateTo = null
      const result = SUT.selectFilterDateSummary(state)

      // then... should return result as expected
      expect(result).toEqual("1 Jan '70 - Select")
    })

    it('should return the correct summary of the dates when only dateTo has a value', () => {
      // when .. we call the selector
      state.entities.filter.dateFrom = null
      const result = SUT.selectFilterDateSummary(state)

      // then... should return result as expected
      expect(result).toEqual("Select - 31 Dec '00")
    })

    it('should return the correct summary of the dates when only neither dateTo nor dateTo have values', () => {
      // when .. we call the selector
      state.entities.filter.dateFrom = null
      state.entities.filter.dateTo = null
      const result = SUT.selectFilterDateSummary(state)

      // then... should return result as expected
      expect(result).toEqual('Dates')
    })
  })

  describe('selectFilterCategories', () => {
    it('should return the ddoTags property from the filter', () => {
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

  describe('selectFilterSector', () => {
    it('should return the sector property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterSector(state)

      // then... should return result as expected
      expect(result).toEqual('foo')
    })
  })

  describe('selectFilterCategoriesSummary', () => {
    it('should return the correct ddoTags summary from the filter when there are ddoTags selected', () => {
      state.entities.filter.ddoTags = [
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

    it('should return the correct ddoTags summary from the filter when there are no ddoTags selected', () => {
      state.entities.filter.ddoTags = []

      // when .. we call the selector
      const result = SUT.selectFilterCategoriesSummary(state)

      // then... should return result as expected
      expect(result).toEqual('Filters')
    })
  })

  describe('selectFilterUserEntities', () => {
    it('should return the userEntities property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterUserEntities(state)

      // then... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectFilterFeaturedEntities', () => {
    it('should return the FeaturedEntities property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterFeaturedEntities(state)

      // then... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectFilterPopularEntities', () => {
    it('should return the PopularEntities property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterPopularEntities(state)

      // then... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
