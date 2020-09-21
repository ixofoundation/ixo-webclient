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

  describe.skip('getEntity', () => {
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
      expect(actions.length).toEqual(3)
      // first action should be of type clear entity
      expect(actions[0].type).toEqual(SelectedEntityActions.ClearEntity)
      // second action should be the pending action
      expect(actions[1].type).toEqual(SelectedEntityActions.GetEntityPending)
      // third action should be the success action
      expect(actions[2].type).toEqual(SelectedEntityActions.GetEntitySuccess)
      expect(actions[2].payload).toEqual({
        did: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
        type: EntityType.Project,
        creatorDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
        status: 'CREATED',
        name: 'Some Title',
        description: 'Some Short Description',
        dateCreated: moment('2020-09-12T19:49:45Z'),
        ownerName: 'Owner Display Name',
        ownerLogo: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
        ownerMission: 'another mission',
        ownerWebsite: 'https://eerer.com',
        location: 'AR',
        image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
        logo: 'https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof',
        goal: 'Some Goal',
        serviceProvidersCount: 10,
        serviceProvidersPendingCount: 2,
        evaluatorsCount: 10,
        evaluatorsPendingCount: 0,
        requiredClaimsCount: 23,
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
            title: 'Some Title',
            shortDescription: 'Some Short Description',
            imageDescription: 'Some Image Description',
            sdgs: ['5', '7'],
            brand: 'Some Brand',
            location: 'AR',
            image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
            logo: 'https://pds_pandora.ixo.world/public/xxxjb0xg0dgkeljwtnc',
          },
          body: [
            {
              title: 'Some Body Content Title',
              content: 'Some Body Content',
              image: 'https://pds_pandora.ixo.world/public/n724h8vl04bkeljy6xl',
            },
            {
              title: 'Another Body Content Title',
              content: 'Another Body Content',
              image: 'https://pds_pandora.ixo.world/public/e4g7yisha77keljyz5d',
            },
          ],
          images: [
            {
              title: 'Some Image Content Title',
              content: 'Some Image Body Content',
              imageDescription: 'Some Image Description',
              image: 'https://pds_pandora.ixo.world/public/7bfhyr0m1p9keljzr4i',
            },
          ],
          profiles: [
            {
              name: 'Someone 1',
              position: 'Some Position 1',
              linkedInUrl: 'https://linkedin1',
              twitterUrl: 'https://twitter1',
              image: 'https://pds_pandora.ixo.world/public/64tkzqd3llrkelk01rj',
            },
            {
              name: 'Someone 2',
              position: 'Some Position 2',
              linkedInUrl: 'https://linkedin2',
              twitterUrl: 'https://twitter2',
              image: 'https://pds_pandora.ixo.world/public/o18hu58fj48kelk08c5',
            },
          ],
          social: {
            linkedInUrl: 'https://linkedInUrl',
            facebookUrl: 'https://fbUrl',
            twitterUrl: 'https://twitterUrl',
            discourseUrl: 'https://discourseUrl',
            instagramUrl: 'https://instagramUrl',
            telegramUrl: 'https://telegramUrl',
            githubUrl: 'https://githubUrl',
            otherUrl: 'https://otherUrl',
          },
          embedded: [
            {
              title: 'Some Title 1',
              urls: [
                'https://edition.cnn.com/2020/09/02/europe/alexey-navalny-novichok-intl/index.html',
                'https://edition.cnn.com/2020/09/02/politics/melania-trump-private-email-wolkoff-cnntv/index.html',
              ],
            },
            {
              title: 'Another Title',
              urls: ['https://www.youtube.com/watch?v=iOWFXqT5MZ4'],
            },
          ],
        },
      })
    })
  })
})
