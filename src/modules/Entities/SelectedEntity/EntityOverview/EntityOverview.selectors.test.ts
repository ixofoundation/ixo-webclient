import moment from 'moment'
import { EntityType } from '../../types'
import * as SUT from './EntityOverview.selectors'
import { Entity } from '../types'

let state: any

beforeEach(() => {
  state = {
    selectedEntity: {
      did: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
      type: EntityType.Project,
      creatorDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
      status: 'CREATED',
      name: 'Some Title',
      description: 'Some Short Description',
      dateCreated: moment('2020-09-12T19:49:45Z'),
      creatorName: 'Creator Display Name',
      creatorLogo: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
      creatorMission: 'another mission',
      creatorWebsite: 'https://eerer.com',
      location: 'AR',
      image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
      logo: 'https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof',
      serviceProvidersCount: 10,
      serviceProvidersPendingCount: 2,
      evaluatorsCount: 10,
      evaluatorsPendingCount: 0,
      requiredClaimsCount: 23,
      pendingClaimsCount: 3,
      successfulClaimsCount: 10,
      rejectedClaimsCount: 5,
      agents: [],
      sdgs: [],
      bondDid: undefined,
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
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            image: 'https://pds_pandora.ixo.world/public/e4g7yisha77keljyz5d',
          },
        ],
        images: [
          {
            title: 'Some Image Content Title',
            content:
              'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem',
            imageDescription: 'Some Image Description',
            image: 'https://pds_pandora.ixo.world/public/7bfhyr0m1p9keljzr4i',
          },
          {
            title: 'Some Image Content Title',
            content:
              'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem',
            imageDescription:
              'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur',
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
    } as any,
  }
})

describe('EntityOverview Selectors', () => {
  describe('selectPageContent', () => {
    it('should return the pagecontent property of selected entity', () => {
      // when ... we call the selector
      const result = SUT.selectPageContent(state)

      // then ... should return result as expected
      expect(result).toEqual(state.selectedEntity.content)
    })
  })
})
