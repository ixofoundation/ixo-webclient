import moment from 'moment'
import * as SUT from './SelectedEntity.actions'
import mockStore from 'common/redux/mockStore'
import { SelectedEntityActions } from './types'
import { EntityType } from '../types'

let store

beforeEach(() => {
  store = mockStore({
    selectedEntity: null,
  })
})

describe('SelectedEntity Actions', () => {
  describe('clearEntity', () => {
    it('it should dispatch an action to clear selected entity state back to initial state', () => {
      // when ... we call clearEntity
      const action = SUT.clearEntity()
      // then ...
      expect(action.type).toEqual(SelectedEntityActions.ClearEntity)
    })
  })

  describe('getEntity', () => {
    // TODO - enable when live api enabled
    it('should not dispatch any action if the entity is the same as the current in state', async () => {
      // given ... the store has an existing entity with same did
      const did = 'existingDid'
      store = mockStore({
        selectedEntity: {
          did,
        },
      })

      // when ... we call getEntity
      await store.dispatch(SUT.getEntity(did))
      const actions = store.getActions()

      // then ... nothing should be dispatched
      expect(actions.length).toEqual(0)
    })

    it('should dispatch an action to fetch the entity and clear any existing entity', async () => {
      // given ... the store has an existing entity with same did
      const did = 'someDid'

      // when ... we call getEntity
      await store.dispatch(SUT.getEntity(did))
      const actions = store.getActions()

      // then ... the correct amount of actions should be dispatched
      expect(actions.length).toEqual(7)
      // first action should be of type clear entity
      expect(actions[0].type).toEqual(SelectedEntityActions.ClearEntity)
      // second action should be the pending action
      expect(actions[1].type).toEqual(SelectedEntityActions.GetEntityPending)
      // third action should be the success action

      // @todo this is commenting out because for now, we get claimTemplate when get an entity

      /* expect(actions[2].type).toEqual(SelectedEntityActions.GetEntitySuccess)
      expect(actions[2].payload).toEqual({
        did: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
        type: EntityType.Project,
        creatorDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
        status: 'CREATED',
        name: 'Some Title',
        description: 'Some Short Description',
        dateCreated: moment('2020-09-12T19:49:45Z'),
        creatorName: 'Creator Display Name',
        creatorLogo: 'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
        creatorMission: 'Some mission',
        creatorWebsite: 'https://blah.com',
        location: 'AR',
        image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
        logo: 'https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof',
        goal: 'Some Goal',
        serviceProvidersCount: 10,
        serviceProvidersPendingCount: 2,
        entityClaims: {
          '@context': 'https://schema.ixo.world/claims:3r08webu2eou',
          'items': [
            {
              '@id': 'template:did:2',
              'visibility': 'Private',
              'title': 'Some Claim Title 1',
              'description': 'Some Claim Description 1',
              'targetMin': 23,
              'targetMax': 45,
              'goal': 'Some Goal',
              'startDate': '2020-09-25T00:00:00.000Z',
              'endDate': '2020-10-22T00:00:00.000Z',
              'agents': [
                {
                  role: 'PO',
                  credential: 'Credential 1',
                  autoApprove: true,
                },
                {
                  role: 'SA',
                  credential: 'Credential 2',
                  autoApprove: false,
                },
                {
                  role: 'IA',
                  credential: 'Credential 3',
                  autoApprove: true,
                },
              ],
              'claimEvaluation': [
                {
                  '@context': 'somecontext1',
                  '@id': 'somelinktocontext1',
                  'methodology': 'somemethodology1',
                  'attributes': ['attr1', 'attr2'],
                },
                {
                  '@context': 'somecontext2',
                  '@id': 'somelinktocontext2',
                  'methodology': 'somemethodology2',
                  'attributes': ['attr1', 'attr2', 'attr3'],
                },
              ],
              'claimApproval': [
                {
                  '@context': 'somecontext1',
                  '@id': 'somelink1',
                  'criteria': [
                    { condition: 'condition1', attribute: 'criteria1' },
                    { condition: 'condition2', attribute: 'criteria2' },
                    { condition: 'condition3', attribute: 'criteria3' },
                    { condition: 'condition4', attribute: 'criteria4' },
                  ],
                },
              ],
              'claimEnrichment': [
                {
                  '@context': 'somecontext1',
                  '@id': 'somelink1',
                  'resources': [
                    { productId: 'productId1', resource: 'res1' },
                    { productId: 'productId2', resource: 'res2' },
                    { productId: 'productId3', resource: 'res3' },
                  ],
                },
                {
                  '@context': 'somecontext2',
                  '@id': 'somelink2',
                  'resources': [
                    { productId: 'productId1', resource: 'res1' },
                    { productId: 'productId2', resource: 'res2' },
                  ],
                },
              ],
            },
          ],
        },
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
        evaluatorsCount: 10,
        evaluatorsPendingCount: 0,
        claimTemplateId: 'template:did:2',
        requiredClaimsCount: 45,
        pendingClaimsCount: 3,
        successfulClaimsCount: 10,
        rejectedClaimsCount: 5,
        agents: [
          {
            did: 'did:ixo:CB1idAyvNUsSEktkT3a5LY',
            status: '0',
            role: 'SA',
            kyc: false,
          },
          {
            did: 'did:ixo:NT1idAyvNUsSEktkT3a5LY',
            status: '0',
            role: 'EA',
            kyc: false,
          },
        ],
        sdgs: ['5', '7'],
        bondDid: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
        content: {
          header: {
            image: 'https://pds_pandora.ixo.world/public/67xcwb5kda3kfe6pdro',
            title: 'Test Project',
            shortDescription:
              'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias',
            brand: 'Test',
            location: 'AS',
            sdgs: ['3', '7'],
            imageDescription:
              'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis',
            logo: 'https://pds_pandora.ixo.world/public/ywqirhguu8ikfe6pt43',
          },
          body: [
            {
              title: 'Test Section',
              content:
                'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus',
              image: 'https://pds_pandora.ixo.world/public/tel1dgdjshrkfe6qygk',
            },
          ],
          images: [
            {
              title: 'Image Section',
              content:
                'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus',
              image: 'https://pds_pandora.ixo.world/public/qh7dqn7uupkfe6raoz',
              imageDescription:
                'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
            },
          ],
          profiles: [
            {
              image: 'https://pds_pandora.ixo.world/public/31lkwmpda52kfe6vh22',
              name: 'John Doe',
              position: 'Developer',
              linkedInUrl: 'https://www.example.com',
              twitterUrl: 'https://www.example.com',
            },
          ],
          social: {
            linkedInUrl: 'https://www.example.com',
            facebookUrl: 'https://www.example.com',
            twitterUrl: 'https://www.example.com',
            discourseUrl: 'https://www.example.com',
            instagramUrl: 'https://www.example.com',
            telegramUrl: 'https://www.example.com',
            githubUrl: 'https://www.example.com',
            otherUrl: 'https://www.example.com',
          },
          embedded: [
            {
              title: 'Test Embedded Content',
              urls: ['https://www.youtube.com/watch?v=_4kHxtiuML0'],
            },
          ],
        },
      }) */
    })
  })
})
