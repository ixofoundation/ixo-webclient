// @ts-nocheck
import moment from 'moment'
import * as SUT from './entitiesExplorer.actions'
import { EntityType, TermsOfUseType } from 'modules/Entities/types'
import { EntitiesExplorerActions } from './entitiesExplorer.types'
import mockStore from 'redux/mockStore'

let store

beforeEach(() => {
  store = mockStore({
    entities: {
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
      },
    },
  })
})

describe('Entities Actions', () => {
  describe('getEntities', () => {
    // TOO enable when live api enabled again
    it('should retrieve the entities from the api', async () => {
      // when we call the action creator
      await store.dispatch(SUT.getEntities())
      const actions = store.getActions()

      expect(actions.length).toEqual(2)

      // then ... it should dispatch the correct actions
      expect(actions.length).toEqual(2)

      expect(actions[0].type).toEqual(EntitiesExplorerActions.GetEntitiesPending)
      expect(actions[1].type).toEqual(EntitiesExplorerActions.GetEntitiesSuccess)
      expect(actions[1].payload).toEqual([
        {
          name: 'Some Title',
          description: 'Some Short Description',
          type: EntityType.Project,
          did: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
          disputedClaimsCount: 0,
          creatorDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
          dateCreated: moment('2020-09-12T19:49:45Z'),
          creatorName: 'Creator Display Name',
          creatorLogo: 'https://cellnode-pandora.ixo.earth/public/8520qk1ckqvkelkjfeg',
          status: 'CREATED',
          location: 'AR',
          goal: undefined,
          funding: undefined,
          serviceProvidersCount: 10,
          evaluatorsCount: 10,
          requiredClaimsCount: 0,
          successfulClaimsCount: 0,
          pendingClaimsCount: 0,
          rejectedClaimsCount: 0,
          sdgs: ['5', '7'],
          agentDids: ['did:ixo:CB1idAyvNUsSEktkT3a5LY', 'did:ixo:NT1idAyvNUsSEktkT3a5LY'],
          image: 'https://cellnode-pandora.ixo.earth/public/sbujb0xg0dgkeljwtnc',
          logo: 'https://cellnode-pandora.ixo.earth/public/v7kvrycap9kf2ofnof',
          ddoTags: [
            {
              name: 'Project Type',
              tags: ['Index', 'Accreditation', 'Accountability', 'Insurance Bond'],
            },
            {
              name: 'SDG',
              tags: [
                'SDG3 – Good Health and Well-being',
                'SDG15 – Life on Land',
                'SDG16 – Peace, Justice and Strong Institutions',
                'SDG17 – Partnerships for Goals',
              ],
            },
            { name: 'Stage', tags: ['Planning'] },
          ],
          termsType: TermsOfUseType.OnceOffFee,
          badges: ['https://somebadge.com', 'https://anotherbadge.com'],
          version: '1.0.5',
          claims: [
            {
              date: new Date('2020-11-26T19:24:18.167Z'),
              location: {
                long: 'someLong',
                lat: 'someLat',
              },
              claimId: '1',
              status: '0',
              saDid: 'someSADid',
              eaDid: 'someEADid',
            },
            {
              date: new Date('2020-11-26T19:24:18.167Z'),
              location: {
                long: 'someLong',
                lat: 'someLat',
              },
              claimId: '2',
              status: '0',
              saDid: 'someSADid',
              eaDid: 'someEADid',
            },
            {
              date: new Date('2020-11-26T19:24:18.167Z'),
              location: {
                long: 'someLong',
                lat: 'someLat',
              },
              claimId: '3',
              status: '0',
              saDid: 'someSADid',
              eaDid: 'someEADid',
            },
            {
              date: new Date('2020-11-26T19:24:18.167Z'),
              location: {
                long: 'someLong',
                lat: 'someLat',
              },
              claimId: '4',
              status: '1',
              saDid: 'someSADid',
              eaDid: 'someEADid',
            },
          ],
          liquidity: {
            '@context': 'https://schema.ixo.world/liquidity/ipfs3r08webu2eou',
            items: [
              {
                '@type': 'Alphabond',
                id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
              },
            ],
          },
          entityClaims: {
            '@context': 'https://schema.ixo.world/claims:3r08webu2eou',
            items: [
              {
                '@id': 'template:did:2',
                agents: [
                  {
                    autoApprove: true,
                    credential: 'Credential 1',
                    role: 'PO',
                  },
                  {
                    autoApprove: false,
                    credential: 'Credential 2',
                    role: 'SA',
                  },
                  {
                    autoApprove: true,
                    credential: 'Credential 3',
                    role: 'IA',
                  },
                ],
                claimApproval: [
                  {
                    // '@type': 'Alphabond',
                    // id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
                    '@context': 'somecontext1',
                    '@id': 'somelink1',
                    criteria: [
                      {
                        attribute: 'criteria1',
                        condition: 'condition1',
                      },
                      {
                        attribute: 'criteria2',
                        condition: 'condition2',
                      },
                      {
                        attribute: 'criteria3',
                        condition: 'condition3',
                      },
                      {
                        attribute: 'criteria4',
                        condition: 'condition4',
                      },
                    ],
                  },
                ],
                claimEnrichment: [
                  {
                    '@context': 'somecontext1',
                    '@id': 'somelink1',
                    resources: [
                      {
                        productId: 'productId1',
                        resource: 'res1',
                      },
                      {
                        productId: 'productId2',
                        resource: 'res2',
                      },
                      {
                        productId: 'productId3',
                        resource: 'res3',
                      },
                    ],
                  },
                  {
                    '@context': 'somecontext2',
                    '@id': 'somelink2',
                    resources: [
                      {
                        productId: 'productId1',
                        resource: 'res1',
                      },
                      {
                        productId: 'productId2',
                        resource: 'res2',
                      },
                    ],
                  },
                ],
                claimEvaluation: [
                  {
                    '@context': 'somecontext1',
                    '@id': 'somelinktocontext1',
                    attributes: ['attr1', 'attr2'],
                    methodology: 'somemethodology1',
                  },
                  {
                    '@context': 'somecontext2',
                    '@id': 'somelinktocontext2',
                    attributes: ['attr1', 'attr2', 'attr3'],
                    methodology: 'somemethodology2',
                  },
                ],
                description: 'Some Claim Description 1',
                endDate: '2020-10-22T00:00:00.000Z',
                goal: 'Some Goal',
                startDate: '2020-09-25T00:00:00.000Z',
                targetMax: 45,
                targetMin: 23,
                title: 'Some Claim Title 1',
                visibility: 'Private',
              },
            ],
          },
          linkedEntities: [
            {
              '@type': 'Investment',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
            },
            {
              '@type': 'Oracle',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt',
            },
          ],
        },
        {
          name: 'Some Claim Title',
          description: 'Some Claim Description',
          type: EntityType.Template,
          did: 'did:ixo:BuXZQaXJ9o2UKm4tGYKLW',
          disputedClaimsCount: 0,
          creatorDid: 'did:sov:AB1fV7PTbWG3aveDJZpgSb',
          dateCreated: moment('2020-08-12T19:49:45Z'),
          creatorName: 'Creator Display Name',
          creatorLogo: 'https://cellnode-pandora.ixo.earth/public/8520qk1ckqvkelkjfeg',
          status: 'COMPLETED',
          serviceProvidersCount: 10,
          evaluatorsCount: 10,
          agentDids: ['did:ixo:TB1idAyvNUsSEktkT3a5LY', 'did:ixo:VT1idAyvNUsSEktkT3a5LY'],
          ddoTags: [
            {
              name: 'Project Type',
              tags: ['Index', 'Accreditation', 'Accountability', 'Insurance Bond'],
            },
            {
              name: 'SDG',
              tags: [
                'SDG3 – Good Health and Well-being',
                'SDG15 – Life on Land',
                'SDG16 – Peace, Justice and Strong Institutions',
                'SDG17 – Partnerships for Goals',
              ],
            },
            { name: 'Stage', tags: ['Planning'] },
          ],
          funding: undefined,
          termsType: TermsOfUseType.OnceOffFee,
          badges: ['https://somebadge.com', 'https://anotherbadge.com'],
          version: '1.0.5',
          claims: [],
          liquidity: {
            '@context': 'https://schema.ixo.world/liquidity/ipfs3r08webu2eou',
            items: [
              {
                '@type': 'Alphabond',
                id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
              },
            ],
          },
          successfulClaimsCount: 0,
          pendingClaimsCount: 0,
          rejectedClaimsCount: 0,
          requiredClaimsCount: 0,
          sdgs: undefined,
          location: undefined,
          logo: '',
          linkedEntities: [
            {
              '@type': 'Investment',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
            },
            {
              '@type': 'Oracle',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt',
            },
          ],
          entityClaims: undefined,
          goal: undefined,
          image: '',
        },
      ])
    })
  })

  describe('changeEntityType', () => {
    it('should create an action to set the entityType', () => {
      // when ... we call the changeEntityType action creator
      const action = SUT.changeEntitiesType(EntityType.Dao)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.ChangeEntitiesType)
      expect(action.payload).toEqual({ type: EntityType.Dao })
    })
  })

  describe('filterToggleUserEntities', () => {
    it('should create an action to set the userEntities filter', () => {
      // when ... we call the filterToggleUserEntities action creator
      const action = SUT.filterToggleUserEntities(true)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterToggleUserEntities)
      expect(action.payload).toEqual({ userEntities: true })
    })
  })

  describe('filterToggleFeaturedEntities', () => {
    it('should create an action to set the featuredEntities filter', () => {
      // when ... we call the filterToggleFeaturedEntities action creator
      const action = SUT.filterToggleFeaturedEntities(true)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterToggleFeaturedEntities)
      expect(action.payload).toEqual({ featuredEntities: true })
    })
  })

  describe('filterTogglePopularEntities', () => {
    it('should create an action to set the popularEntities filter', () => {
      // when ... we call the filterTogglePopularEntities action creator
      const action = SUT.filterTogglePopularEntities(true)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterTogglePopularEntities)
      expect(action.payload).toEqual({ popularEntities: true })
    })
  })

  describe('filterDates', () => {
    it('should create an action to set the dates filter', () => {
      // when ... we call the filterDates action creator
      const action = SUT.filterDates(moment('2020-04-03T13:14:13.000Z'), moment('2020-04-09T13:14:13.000Z'))

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterDates)
      expect(action.payload).toEqual({
        dateFrom: moment('2020-04-03T13:14:13.000Z'),
        dateTo: moment('2020-04-09T13:14:13.000Z'),
      })
    })
  })

  describe('resetDatesFilter', () => {
    it('should create an action to reset the dates filter', () => {
      // when ... we call the resetDatesFilter action creator
      const action = SUT.resetDatesFilter()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(EntitiesExplorerActions.ResetDatesFilter)
    })
  })

  describe('filterCategoryTag', () => {
    it('should create an action to remove all tags when when it exists', () => {
      // when ... we call the filterCategoryTag action creator
      store.dispatch(SUT.filterCategoryTag('foo1', 'bar1_3'))
      const action = store.getActions()[0]

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterCategoryTag)
      expect(action.payload).toEqual({
        category: 'foo1',
        tags: [],
      })
    })

    it('should create an action to remove all tags when when it doesnt exist', () => {
      // when ... we call the filterCategoryTag action creator
      store.dispatch(SUT.filterCategoryTag('foo1', 'bar1_3_new'))
      const action = store.getActions()[0]

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterCategoryTag)
      expect(action.payload).toEqual({
        category: 'foo1',
        tags: ['bar1_3_new'],
      })
    })
  })

  describe('filterAddCategoryTag', () => {
    it('should create an action to remove the specific category tag when it exists', () => {
      // when ... we call the filterAddCategoryTag action creator
      store.dispatch(SUT.filterAddCategoryTag('foo1', 'bar1_3'))
      const action = store.getActions()[0]

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterAddCategoryTag)
      expect(action.payload).toEqual({
        category: 'foo1',
        tags: ['bar1_1', 'bar1_2'],
      })
    })

    it('should create an action to add the specific category tag when it does not exists', () => {
      // when ... we call the filterAddCategoryTag action creator
      store.dispatch(SUT.filterAddCategoryTag('foo1', 'bar1_4'))
      const action = store.getActions()[0]

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterAddCategoryTag)
      expect(action.payload).toEqual({
        category: 'foo1',
        tags: ['bar1_1', 'bar1_2', 'bar1_3', 'bar1_4'],
      })
    })
  })

  describe('filterCategories', () => {
    it('should create an action to set the entity type and filter', () => {
      // when ... we call the filterAddCategoryTag action creator
      store.dispatch(
        SUT.filterCategories([
          { name: 'Cell Type', tags: ['Index', 'Relayer', 'Portal'] },
          { name: 'Stage', tags: ['Forming'] },
        ]),
      )
      const action = store.getActions()[0]

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterDDOCategories)
      expect(action.payload).toEqual({
        ddoTags: [
          { name: 'Cell Type', tags: ['Index', 'Relayer', 'Portal'] },
          { name: 'Stage', tags: ['Forming'] },
        ],
      })
    })
  })

  describe('filterSector', () => {
    it('should create an action to set the sector', () => {
      // when ... we call the filterAddCategoryTag action creator
      store.dispatch(SUT.filterSector('Oracle Launchpad'))
      const action = store.getActions()[0]

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.FilterSector)
      expect(action.payload).toEqual({
        sector: 'Oracle Launchpad',
      })
    })
  })

  describe('resetCategoryFilter', () => {
    it('should create an action to reset the specific category filter', () => {
      // when ... we call the resetCategoryFilter action creator
      const action = SUT.resetCategoryFilter('foo')

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(EntitiesExplorerActions.ResetCategoryFilter)
      expect(action.payload).toEqual({ category: 'foo' })
    })
  })

  describe('resetFilters', () => {
    it('should create an action to reset the filter', () => {
      // when ... we call the resetFilters action creator
      const action = SUT.resetFilters()

      // then we should expect it to create action with the correct type
      expect(action.type).toEqual(EntitiesExplorerActions.ResetFilters)
    })
  })
})
