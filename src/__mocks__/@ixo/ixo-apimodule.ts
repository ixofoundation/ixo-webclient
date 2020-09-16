import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { ApiPageContent } from 'common/api/blocksync-api/types/page-content'

export const fakeListedProjectsData = [
  {
    txHash: '108d034d62009f681fa13db4997df971e3f09d42cd6721082823ef9f4427e928',
    projectDid: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
    senderDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
    pubKey: '9Y1WsJyeUqX1DYZjZPZgGPyZqdkfiQfDeHDJRdv6cnEC',
    status: 'CREATED',
    data: {
      '@context': 'https://schema.ixo.foundation/entity:2383r9riuew',
      'entitySchemaVersion': '1.0.0',
      'startDate': '2020-09-17T00:00:00.000Z',
      'endDate': '2020-10-23T00:00:00.000Z',
      'status': 'Live',
      'stage': 'Planning',
      'relayerNode': 'did:sov:Rmb6Rd1CU6k74FM2xzy6Do',
      'version': {
        versionNumber: '1.0.5',
        effectiveDate: '2020-09-15T00:00:00.000Z',
        notes: 'Some version notes',
      },
      'terms': {
        '@type': 'OnceOffFee',
        'paymentTemplateId': 'did:sov:CYCc2xaJKrp8Yt947Nc6jd4',
      },
      'privacy': {
        pageView: 'Private',
        entityView: 'Visible',
        credentials: [
          {
            credential: 'somecredential',
            issuer: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd99',
          },
          {
            credential: 'anothercredential',
            issuer: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd66',
          },
        ],
      },
      'creator': {
        displayName: 'Creator Display Name',
        location: 'AD',
        email: 'ert@dfssdf.com',
        website: 'https://blah.com',
        mission: 'Some mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd1',
        credentialId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd2',
        logo: 'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
      },
      'owner': {
        displayName: 'Owner Display Name',
        location: 'AQ',
        email: 'eeeert@dfssdf.com',
        website: 'https://eerer.com',
        mission: 'another mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd6',
        logo: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
      },
      'ddoTags': [
        {
          category: 'Project Type',
          tags: ['Index', 'Accreditation', 'Accountability', 'Insurance Bond'],
        },
        {
          category: 'SDG',
          tags: [
            'SDG3 – Good Health and Well-being',
            'SDG15 – Life on Land',
            'SDG16 – Peace, Justice and Strong Institutions',
            'SDG17 – Partnerships for Goals',
          ],
        },
        { category: 'Stage', tags: ['Planning'] },
      ],
      'displayCredentials': {
        '@context': 'https://www.w3.org/2018/credentials/v1',
        'items': [
          {
            credential: 'somecredential1',
            badge: 'https://somebadge.com',
          },
          {
            credential: 'somecredential2',
            badge: 'https://anotherbadge.com',
          },
        ],
      },
      'page': { cid: 'somepageid', version: '1.0.0' },
      'claims': {
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
      'linkedEntities': [
        {
          '@type': 'Investment',
          'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
        },
        { '@type': 'Oracle', 'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt' },
      ],
      'fees': {
        '@context': 'https://schema.ixo.world/fees/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'RentalFee',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdff',
          },
        ],
      },
      'stake': {
        '@context': 'https://schema.ixo.world/staking/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'PerformanceGuarantee',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdvv',
            'denom': 'IXO',
            'stakeAddress': 'abcccsdfsdfdsfdsfsdf',
            'minStake': 12,
            'slashCondition': 'FailedDispute',
            'slashFactor': 45,
            'slashAmount': 66,
            'unbondPeriod': 23,
          },
        ],
      },
      'nodes': {
        '@context': 'https://schema.ixo.world/nodes/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'IBCNode',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbb',
          },
          {
            '@type': 'CellNode',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzz',
          },
        ],
      },
      'funding': {
        '@context': 'https://schema.ixo.world/funding/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'Alphabond',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
          },
        ],
      },
      'keys': {
        '@context': 'https://www.w3.org/ns/did/v1',
        'items': [
          {
            'purpose': 'Encryption',
            '@type': 'JwsVerificationKey2020',
            'controller': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbbb',
            'keyValue': 'eEUR',
            'dateCreated': '2020-09-18T00:00:00.000Z',
            'dateUpdated': '2020-10-28T00:00:00.000Z',
            'signature': 'somesignature',
          },
        ],
      },
      'service': [
        {
          '@type': 'DIDAgent',
          'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn',
          'serviceEndpoint': 'https://someurl',
          'description': 'some short description',
          'publicKey': 'somepubkey',
          'properties': 'otherparams',
        },
      ],
      'data': [
        {
          '@type': 'PersonalDataPod',
          'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd',
          'serviceEndpoint': 'https://blah.com',
          'properties': 'otherparams',
        },
      ],
      '@type': 'Project',
      'name': 'Some Title',
      'description': 'Some Short Description',
      'image': 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
      'logo': 'https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof',
      'brand': 'Some Brand',
      'imageDescription': 'Some Image Description',
      'location': 'AR',
      'sdgs': ['5', '7'],
      'createdOn': '2020-09-12T19:49:45Z',
      'createdBy': 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
      'nodeDid': 'did:ixo:RpXidAyvNUsSEktkT3a5LY',
      'agents': [
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
      'claimStats': {
        currentSuccessful: 10,
        currentRejected: 5,
      },
      'agentStats': {
        evaluators: 10,
        evaluatorsPending: 0,
        serviceProviders: 10,
        serviceProvidersPending: 2,
        investors: 12,
        investorsPending: 0,
      },
    },
  },
  {
    txHash: '999d034d62009f681fa13db4997df971e3f09d42cd6721082823ef9f4427j823',
    projectDid: 'did:ixo:BuXZQaXJ9o2UKm4tGYKLW',
    senderDid: 'did:sov:AB1fV7PTbWG3aveDJZpgSb',
    pubKey: '8W3WsJyeUqX1DYZjZPZgGPyZqdkfiQfDeHDJRdv6cnCC',
    status: 'COMPLETED',
    data: {
      '@context': 'https://schema.ixo.foundation/entity:2383r9riuew',
      'entitySchemaVersion': '1.0.0',
      'startDate': '2020-09-17T00:00:00.000Z',
      'endDate': '2020-10-23T00:00:00.000Z',
      'status': 'Live',
      'stage': 'Planning',
      'relayerNode': 'did:sov:Rmb6Rd1CU6k74FM2xzy6Do',
      'version': {
        versionNumber: '1.0.5',
        effectiveDate: '2020-09-15T00:00:00.000Z',
        notes: 'Some version notes',
      },
      'terms': {
        '@type': 'OnceOffFee',
        'paymentTemplateId': 'did:sov:CYCc2xaJKrp8Yt947Nc6jd4',
      },
      'privacy': {
        pageView: 'Private',
        entityView: 'Visible',
        credentials: [
          {
            credential: 'somecredential',
            issuer: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd99',
          },
          {
            credential: 'anothercredential',
            issuer: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd66',
          },
        ],
      },
      'creator': {
        displayName: 'Creator Display Name',
        location: 'AD',
        email: 'ert@dfssdf.com',
        website: 'https://blah.com',
        mission: 'Some mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd1',
        credentialId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd2',
        logo: 'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
      },
      'owner': {
        displayName: 'Owner Display Name',
        location: 'AQ',
        email: 'eeeert@dfssdf.com',
        website: 'https://eerer.com',
        mission: 'another mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd6',
        logo: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
      },
      'ddoTags': [
        {
          category: 'Project Type',
          tags: ['Index', 'Accreditation', 'Accountability', 'Insurance Bond'],
        },
        {
          category: 'SDG',
          tags: [
            'SDG3 – Good Health and Well-being',
            'SDG15 – Life on Land',
            'SDG16 – Peace, Justice and Strong Institutions',
            'SDG17 – Partnerships for Goals',
          ],
        },
        { category: 'Stage', tags: ['Planning'] },
      ],
      'displayCredentials': {
        '@context': 'https://www.w3.org/2018/credentials/v1',
        'items': [
          {
            credential: 'somecredential1',
            badge: 'https://somebadge.com',
          },
          {
            credential: 'somecredential2',
            badge: 'https://anotherbadge.com',
          },
        ],
      },
      'page': { cid: 'somepageid', version: '1.0.0' },
      'linkedEntities': [
        {
          '@type': 'Investment',
          'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
        },
        { '@type': 'Oracle', 'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt' },
      ],
      'fees': {
        '@context': 'https://schema.ixo.world/fees/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'RentalFee',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdff',
          },
        ],
      },
      'stake': {
        '@context': 'https://schema.ixo.world/staking/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'PerformanceGuarantee',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdvv',
            'denom': 'IXO',
            'stakeAddress': 'abcccsdfsdfdsfdsfsdf',
            'minStake': 12,
            'slashCondition': 'FailedDispute',
            'slashFactor': 45,
            'slashAmount': 66,
            'unbondPeriod': 23,
          },
        ],
      },
      'nodes': {
        '@context': 'https://schema.ixo.world/nodes/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'IBCNode',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbb',
          },
          {
            '@type': 'CellNode',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzz',
          },
        ],
      },
      'funding': {
        '@context': 'https://schema.ixo.world/funding/ipfs3r08webu2eou',
        'items': [
          {
            '@type': 'Alphabond',
            'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
          },
        ],
      },
      'keys': {
        '@context': 'https://www.w3.org/ns/did/v1',
        'items': [
          {
            'purpose': 'Encryption',
            '@type': 'JwsVerificationKey2020',
            'controller': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbbb',
            'keyValue': 'eEUR',
            'dateCreated': '2020-09-18T00:00:00.000Z',
            'dateUpdated': '2020-10-28T00:00:00.000Z',
            'signature': 'somesignature',
          },
        ],
      },
      'service': [
        {
          '@type': 'DIDAgent',
          'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn',
          'serviceEndpoint': 'https://someurl',
          'description': 'some short description',
          'publicKey': 'somepubkey',
          'properties': 'otherparams',
        },
      ],
      'data': [
        {
          '@type': 'PersonalDataPod',
          'id': 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd',
          'serviceEndpoint': 'https://blah.com',
          'properties': 'otherparams',
        },
      ],
      '@type': 'Template',
      'name': 'Some Claim Title',
      'description': 'Some Claim Description',
      'createdOn': '2020-08-12T19:49:45Z',
      'createdBy': 'did:sov:AB1fV7PTbWG3aveDJZpgSb',
      'nodeDid': 'did:ixo:RpXidAyvNUsSEktkT3a5LY',
      'agents': [
        {
          did: 'did:ixo:TB1idAyvNUsSEktkT3a5LY',
          status: '0',
          role: 'SA',
          kyc: false,
        },
        {
          did: 'did:ixo:VT1idAyvNUsSEktkT3a5LY',
          status: '0',
          role: 'EA',
          kyc: false,
        },
      ],
      'claimStats': {
        currentSuccessful: 0,
        currentRejected: 0,
      },
      'agentStats': {
        evaluators: 10,
        evaluatorsPending: 0,
        serviceProviders: 10,
        serviceProvidersPending: 2,
        investors: 12,
        investorsPending: 0,
      },
    },
  },
] as ApiListedEntity[]

const fakePageContent = {
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
} as ApiPageContent

export class Ixo {
  project

  constructor() {
    this.project = {
      createPublic: jest.fn(() => Promise.resolve({ result: 'somePublicDid' })),
      listProjects: jest.fn(() => Promise.resolve(fakeListedProjectsData)),
      getProjectByProjectDid: jest.fn(() =>
        Promise.resolve(fakeListedProjectsData[0]),
      ),
      fetchPublic: jest.fn(() => Promise.resolve(fakePageContent)),
    }
  }
}
