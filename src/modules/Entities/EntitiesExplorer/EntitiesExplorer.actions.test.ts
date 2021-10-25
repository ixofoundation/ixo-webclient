import moment from 'moment'
import * as SUT from './EntitiesExplorer.actions'
import { EntityType, TermsOfUseType } from '../types'
import { EntitiesExplorerActions } from './types'
import mockStore from 'common/redux/mockStore'

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

      expect(actions[0].type).toEqual(
        EntitiesExplorerActions.GetEntitiesPending,
      )
      expect(actions[1].type).toEqual(
        EntitiesExplorerActions.GetEntitiesSuccess,
      )
      expect(actions[1].payload).toEqual([
        {
          name: 'Some Title',
          description: 'Some Short Description',
          type: EntityType.Project,
          did: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
          creatorDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
          dateCreated: moment('2020-09-12T19:49:45Z'),
          creatorName: 'Creator Display Name',
          creatorLogo:
            'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
          status: 'CREATED',
          location: 'AR',
          goal: 'Some Goal',
          serviceProvidersCount: 10,
          evaluatorsCount: 10,
          requiredClaimsCount: 45,
          successfulClaimsCount: 10,
          pendingClaimsCount: 3,
          rejectedClaimsCount: 5,
          sdgs: ['5', '7'],
          agentDids: [
            'did:ixo:CB1idAyvNUsSEktkT3a5LY',
            'did:ixo:NT1idAyvNUsSEktkT3a5LY',
          ],
          image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
          logo: 'https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof',
          ddoTags: [
            {
              name: 'Project Type',
              tags: [
                'Index',
                'Accreditation',
                'Accountability',
                'Insurance Bond',
              ],
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
          funding:  {
            "@context": "https://schema.ixo.world/funding/ipfs3r08webu2eou",
            "items": [
              {
                "@type": "Alphabond",
                "id": "did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz",
              },
            ],
          },
        },
        {
          name: 'Some Claim Title',
          description: 'Some Claim Description',
          type: EntityType.Template,
          did: 'did:ixo:BuXZQaXJ9o2UKm4tGYKLW',
          creatorDid: 'did:sov:AB1fV7PTbWG3aveDJZpgSb',
          dateCreated: moment('2020-08-12T19:49:45Z'),
          creatorName: 'Creator Display Name',
          creatorLogo:
            'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
          status: 'COMPLETED',
          serviceProvidersCount: 10,
          evaluatorsCount: 10,
          agentDids: [
            'did:ixo:TB1idAyvNUsSEktkT3a5LY',
            'did:ixo:VT1idAyvNUsSEktkT3a5LY',
          ],
          ddoTags: [
            {
              name: 'Project Type',
              tags: [
                'Index',
                'Accreditation',
                'Accountability',
                'Insurance Bond',
              ],
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
          claims: [],
          funding:  {
            "@context": "https://schema.ixo.world/funding/ipfs3r08webu2eou",
            "items": [
              {
                "@type": "Alphabond",
                "id": "did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz",
              },
            ],
          },
        },
      ])
    })
  })

  describe('changeEntityType', () => {
    it('should create an action to set the entityType', () => {
      // when ... we call the changeEntityType action creator
      const action = SUT.changeEntitiesType(EntityType.Cell)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(EntitiesExplorerActions.ChangeEntitiesType)
      expect(action.payload).toEqual({ type: EntityType.Cell })
    })
  })

  describe('filterToggleUserEntities', () => {
    it('should create an action to set the userEntities filter', () => {
      // when ... we call the filterToggleUserEntities action creator
      const action = SUT.filterToggleUserEntities(true)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(
        EntitiesExplorerActions.FilterToggleUserEntities,
      )
      expect(action.payload).toEqual({ userEntities: true })
    })
  })

  describe('filterToggleFeaturedEntities', () => {
    it('should create an action to set the featuredEntities filter', () => {
      // when ... we call the filterToggleFeaturedEntities action creator
      const action = SUT.filterToggleFeaturedEntities(true)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(
        EntitiesExplorerActions.FilterToggleFeaturedEntities,
      )
      expect(action.payload).toEqual({ featuredEntities: true })
    })
  })

  describe('filterTogglePopularEntities', () => {
    it('should create an action to set the popularEntities filter', () => {
      // when ... we call the filterTogglePopularEntities action creator
      const action = SUT.filterTogglePopularEntities(true)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(
        EntitiesExplorerActions.FilterTogglePopularEntities,
      )
      expect(action.payload).toEqual({ popularEntities: true })
    })
  })

  describe('filterDates', () => {
    it('should create an action to set the dates filter', () => {
      // when ... we call the filterDates action creator
      const action = SUT.filterDates(
        moment('2020-04-03T13:14:13.000Z'),
        moment('2020-04-09T13:14:13.000Z'),
      )

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
