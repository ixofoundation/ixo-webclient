import moment from 'moment';
import * as SUT from './Entities.selectors';
import { EntityType } from './types';

let state: any;

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
    entities: {
      selectedEntitiesType: EntityType.Project,
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
          pdsUrl: 'somePsdUrl',

          data: null,
        },
        {
          did: 'someDid2',
          entityType: EntityType.Project,
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
          pdsUrl: 'somePsdUrl',

          data: null,
        },
        {
          did: 'someDid3',
          entityType: EntityType.Project,
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
          pdsUrl: 'somePsdUrl',

          data: null,
        },
        {
          did: 'someDid4',
          entityType: EntityType.Cell,
          userDid: 'someUserDid',
          title: 'someTitle4',
          shortDescription: 'someShortDescription4',
          dateCreated: moment('2020-04-02T14:14:14.000Z'),
          ownerName: 'someOwnerName4',
          status: 'someStatus4',
          country: 'someCountry4',
          impactAction: 'someImpactAction4',
          serviceProvidersCount: 5,
          evaluatorsCount: 6,
          requiredClaimsCount: 7,
          successfulClaimsCount: 8,
          pendingClaimsCount: 9,
          rejectedClaimsCount: 10,
          sdgs: ['SDG1_4', 'SDG2_4', 'SDG4_4'],
          longDescription: 'someLongDescription',
          agentDids: ['someAgentDid5'],
          imageUrl: 'sommeImageUrl',
          categories: [
            {
              name: 'someCategory4',
              tags: [
                'someCategory4_tag1',
                'someCategory4_tag2',
                'someCategory4_tag4',
              ],
            },
            {
              name: 'someCategory4',
              tags: [
                'someCategory4_tag1',
                'someCategory4_tag2',
                'someCategory4_tag3',
              ],
            },
          ],
          pdsUrl: 'somePsdUrl',

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
        sector: 'foo',
        userEntities: true,
        featuredEntities: true,
        popularEntities: true,
      },
    },
  };
});

describe('Entities Selectors', () => {
  describe('selectEntitiesState', () => {
    it('should return the entities property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectEntitiesState(state);

      // then ... should return result as expected
      expect(result).toEqual(state.entities);
    });
  });

  describe('selectAllEntities', () => {
    it('should return the all the projects entities', () => {
      // when ... we call the selector
      const result = SUT.selectAllEntitiesByType(state);

      // then ... should return result as expected
      expect(result).toEqual(
        state.entities.entities.filter(
          entity => entity.entityType === EntityType.Project,
        ),
      );
    });

    it('should return the all the cells entities', () => {
      state.entities.selectedEntitiesType = EntityType.Cell;
      // when ... we call the selector
      const result = SUT.selectAllEntitiesByType(state);

      // then ... should return result as expected
      expect(result).toEqual(
        state.entities.entities.filter(
          entity => entity.entityType === EntityType.Cell,
        ),
      );
    });
  });

  describe('selectEntitiesFilter', () => {
    it('should return the the entities filter', () => {
      // when ... we call the selector
      const result = SUT.selectEntitiesFilter(state);

      // then ... should return result as expected
      expect(result).toEqual(state.entities.filter);
    });
  });

  describe('selectEntitiesType', () => {
    it('should return the the entities type', () => {
      // when ... we call the selector
      const result = SUT.selectSelectedEntitiesType(state);

      // then ... should return result as expected
      expect(result).toEqual(state.entities.selectedEntitiesType);
    });
  });

  describe('selectedFilteredEntities', () => {
    it('should return a list of entities sorted when no filters are set', () => {
      state.entities.filter = {
        dateFrom: null,
        dateTo: null,
        categories: [],
        userEntities: false,
      };

      // when ... we call the selector
      const result = SUT.selectedFilteredEntities(state);

      // then ... should return result as expected
      expect(result.length).toEqual(3);
      expect(result[0].did).toEqual('someDid2');
      expect(result[1].did).toEqual('someDid1');
      expect(result[2].did).toEqual('someDid3');
    });

    it('should return a list of entities filtered by user entities when the userEntities flag is true', () => {
      state.entities.filter = {
        dateFrom: null,
        dateTo: null,
        categories: [],
        userEntities: true,
      };

      // when ... we call the selector
      const result = SUT.selectedFilteredEntities(state);

      // then ... should return result as expected
      expect(result.length).toEqual(1);
      expect(result[0].did).toEqual('someDid1');
    });

    it('should return a list of entities filtered by date and sorted when dates are set', () => {
      state.entities.filter = {
        dateFrom: moment('2020-04-09'),
        dateTo: moment('2020-04-10'),
        categories: [],
        userEntities: false,
      };

      // when ... we call the selector
      const result = SUT.selectedFilteredEntities(state);

      // then ... should return result as expected
      expect(result.length).toEqual(2);
      expect(result[0].did).toEqual('someDid2');
      expect(result[1].did).toEqual('someDid1');
    });

    it('should return a list of entities filtered by categories and sorted when categories are set', () => {
      state.entities.filter = {
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
      };

      // when ... we call the selector
      const result = SUT.selectedFilteredEntities(state);

      // then ... should return result as expected
      expect(result.length).toEqual(1);
      expect(result[0].did).toEqual('someDid1');
    });
  });

  describe('selectEntityCountries', () => {
    it('should return a list of entity countries', () => {
      // when ... we call the selector
      const result = SUT.selectEntitiesCountries(state);

      // then ... should return result as expected
      expect(result).toContain('someCountry1');
      expect(result).toContain('someCountry2');
    });
  });

  describe('selectFilteredEntitiesCount', () => {
    it('should return the count of filtered Entities', () => {
      state.entities.filter = {
        dateFrom: moment('2020-04-09'),
        dateTo: moment('2020-04-10'),
        categories: [],
        userEntities: false,
      };
      // when ... we call the selector
      // TODO - add filtering
      const result = SUT.selectFilteredEntitiesCount(state);

      // then ... should return result as expected
      expect(result).toEqual(2);
    });
  });

  describe('selectAllEntitiesCount', () => {
    it('should return the count of all entities regardless of filters set', () => {
      state.entities.filter = {
        dateFrom: moment('1900-01-01'),
        dateTo: moment('1900-01-01'),
        categories: [],
        userEntities: false,
      };
      // when ... we call the selector
      // TODO - add filtering
      const result = SUT.selectAllEntitiesCount(state);

      // then ... should return result as expected
      expect(result).toEqual(3);
    });
  });

  describe('selectUserEntitiesCount', () => {
    it('should return the count of all entities for a user regardless of filters set', () => {
      state.entities.filter = {
        dateFrom: moment('1900-01-01'),
        dateTo: moment('1900-01-01'),
        categories: [],
        userEntities: false,
      };
      // when ... we call the selector
      const result = SUT.selectUserEntitiesCount(state);

      // then ... should return result as expected
      expect(result).toEqual(1);
    });
  });

  describe('selectTotalServiceProvidersCount', () => {
    it('should return the count of all service providers', () => {
      // when ... we call the selector
      const result = SUT.selectTotalServiceProvidersCount(state);

      // then ... should return result as expected
      expect(result).toEqual(29);
    });
  });

  describe('selectTotalEvaluatorsCount', () => {
    it('should return the total amount of all evaluators', () => {
      // when ... we call the selector
      const result = SUT.selectTotalEvaluatorsCount(state);

      // then ... should return result as expected
      expect(result).toEqual(19);
    });
  });

  describe('selectTotalRequiredClaimsCount', () => {
    it('should return a the total amount of required claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRequiredClaimsCount(state);

      // then ... should return result as expected
      expect(result).toEqual(117);
    });
  });

  describe('selectTotalPendingClaimsCount', () => {
    it('should return a the total amount of pending claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalPendingClaimsCount(state);

      // then ... should return result as expected
      expect(result).toEqual(32);
    });
  });

  describe('selectTotalSuccessfulClaimsCount', () => {
    it('should return a the total amount of successful claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalSuccessfulClaimsCount(state);

      // then ... should return result as expected
      expect(result).toEqual(20);
    });
  });

  describe('selectTotalRejectedClaimsCount', () => {
    it('should return a the total amount of Rejected claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRejectedClaimsCount(state);

      // then ... should return result as expected
      expect(result).toEqual(44);
    });
  });

  describe('selectTotalRemainingClaimsCount', () => {
    it('should return a the total amount of remaining claims that is calculated from required and successful claims', () => {
      // when ... we call the selector
      const result = SUT.selectTotalRemainingClaimsCount(state);

      // then ... should return result as expected
      expect(result).toEqual(97);
    });
  });

  describe('selectFilterDateFrom', () => {
    it('should return the dateFrom property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateFrom(state);

      // then... should return result as expected
      expect(result).toEqual(moment('1970-01-01'));
    });
  });

  describe('selectFilterDateTo', () => {
    it('should return the dateTo property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateTo(state);

      // then... should return result as expected
      expect(result).toEqual(moment('2100-12-31'));
    });
  });

  describe('selectFilterDateFromFormatted', () => {
    it('should return the dateFrom property from the filter as a formatted string', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateFromFormatted(state);

      // then... should return result as expected
      expect(result).toEqual("1 Jan '70");
    });
  });

  describe('selectFilterDateToFormatted', () => {
    it('should return the dateTo property from the filter as a formatted string', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateToFormatted(state);

      // then... should return result as expected
      expect(result).toEqual("31 Dec '00");
    });
  });

  describe('selectFilterDateSummary', () => {
    it('should return the correct summary of the dates when both dates have values', () => {
      // when .. we call the selector
      const result = SUT.selectFilterDateSummary(state);

      // then... should return result as expected
      expect(result).toEqual("1 Jan '70 - 31 Dec '00");
    });

    it('should return the correct summary of the dates when only dateFrom has a value', () => {
      // when .. we call the selector
      state.entities.filter.dateTo = null;
      const result = SUT.selectFilterDateSummary(state);

      // then... should return result as expected
      expect(result).toEqual("1 Jan '70 - Select");
    });

    it('should return the correct summary of the dates when only dateTo has a value', () => {
      // when .. we call the selector
      state.entities.filter.dateFrom = null;
      const result = SUT.selectFilterDateSummary(state);

      // then... should return result as expected
      expect(result).toEqual("Select - 31 Dec '00");
    });

    it('should return the correct summary of the dates when only neither dateTo nor dateTo have values', () => {
      // when .. we call the selector
      state.entities.filter.dateFrom = null;
      state.entities.filter.dateTo = null;
      const result = SUT.selectFilterDateSummary(state);

      // then... should return result as expected
      expect(result).toEqual('Dates');
    });
  });

  describe('selectFilterCategories', () => {
    it('should return the categories property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterCategories(state);

      // then... should return result as expected
      expect(result).toEqual([
        {
          name: 'foo',
          tags: ['bar'],
        },
      ]);
    });
  });

  describe('selectFilterSector', () => {
    it('should return the sector property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterSector(state);

      // then... should return result as expected
      expect(result).toEqual('foo');
    });
  });

  describe('selectFilterCategoriesSummary', () => {
    it('should return the correct categories summary from the filter when there are categories selected', () => {
      state.entities.filter.categories = [
        {
          name: 'foo1',
          tags: ['foo1_bar1', 'foo1_bar2'],
        },
        {
          name: 'foo_2',
          tags: ['foo_2_bar1', 'foo_2_bar2', 'foo_2_bar3'],
        },
      ];

      // when .. we call the selector
      const result = SUT.selectFilterCategoriesSummary(state);

      // then... should return result as expected
      expect(result).toEqual('Filters - 5');
    });

    it('should return the correct categories summary from the filter when there are no categories selected', () => {
      state.entities.filter.categories = [];

      // when .. we call the selector
      const result = SUT.selectFilterCategoriesSummary(state);

      // then... should return result as expected
      expect(result).toEqual('Filters');
    });
  });

  describe('selectFilterUserEntities', () => {
    it('should return the userEntities property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterUserEntities(state);

      // then... should return result as expected
      expect(result).toEqual(true);
    });
  });

  describe('selectFilterFeaturedEntities', () => {
    it('should return the FeaturedEntities property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterFeaturedEntities(state);

      // then... should return result as expected
      expect(result).toEqual(true);
    });
  });

  describe('selectFilterPopularEntities', () => {
    it('should return the PopularEntities property from the filter', () => {
      // when .. we call the selector
      const result = SUT.selectFilterPopularEntities(state);

      // then... should return result as expected
      expect(result).toEqual(true);
    });
  });
});
