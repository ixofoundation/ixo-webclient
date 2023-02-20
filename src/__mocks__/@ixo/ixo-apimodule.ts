import { ApiListedEntity } from 'api/blocksync/types/entities'
import { ApiResource } from 'api/blocksync/types/resource'

export const fakeListedProjectsData = [
  {
    txHash: '108d034d62009f681fa13db4997df971e3f09d42cd6721082823ef9f4427e928',
    projectDid: 'did:ixo:GfDZQaXJ9o2UKm4tGY2Wkh',
    senderDid: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
    pubKey: '9Y1WsJyeUqX1DYZjZPZgGPyZqdkfiQfDeHDJRdv6cnEC',
    status: 'CREATED',
    data: {
      '@context': 'https://schema.ixo.foundation/entity:2383r9riuew',
      entitySchemaVersion: '1.0.0',
      startDate: '2020-09-17T00:00:00.000Z',
      endDate: '2020-10-23T00:00:00.000Z',
      status: 'Live',
      stage: 'Planning',
      relayerNode: 'did:sov:Rmb6Rd1CU6k74FM2xzy6Do',
      version: {
        versionNumber: '1.0.5',
        effectiveDate: '2020-09-15T00:00:00.000Z',
        notes: 'Some version notes',
      },
      terms: {
        '@type': 'OnceOffFee',
        paymentTemplateId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd4',
      },
      privacy: {
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
      creator: {
        displayName: 'Creator Display Name',
        location: 'AD',
        email: 'ert@dfssdf.com',
        website: 'https://blah.com',
        mission: 'Some mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd1',
        credentialId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd2',
        logo: 'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
      },
      owner: {
        displayName: 'Owner Display Name',
        location: 'AQ',
        email: 'eeeert@dfssdf.com',
        website: 'https://eerer.com',
        mission: 'another mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd6',
        logo: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
      },
      ddoTags: [
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
      displayCredentials: {
        '@context': 'https://www.w3.org/2018/credentials/v1',
        items: [
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
      page: { cid: 'somepageid', version: '1.0.0' },
      entityClaims: {
        '@context': 'https://schema.ixo.world/claims:3r08webu2eou',
        items: [
          {
            '@id': 'template:did:2',
            visibility: 'Private',
            title: 'Some Claim Title 1',
            description: 'Some Claim Description 1',
            targetMin: 23,
            targetMax: 45,
            goal: 'Some Goal',
            startDate: '2020-09-25T00:00:00.000Z',
            endDate: '2020-10-22T00:00:00.000Z',
            agents: [
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
            claimEvaluation: [
              {
                '@context': 'somecontext1',
                '@id': 'somelinktocontext1',
                methodology: 'somemethodology1',
                attributes: ['attr1', 'attr2'],
              },
              {
                '@context': 'somecontext2',
                '@id': 'somelinktocontext2',
                methodology: 'somemethodology2',
                attributes: ['attr1', 'attr2', 'attr3'],
              },
            ],
            claimApproval: [
              {
                '@context': 'somecontext1',
                '@id': 'somelink1',
                criteria: [
                  { condition: 'condition1', attribute: 'criteria1' },
                  { condition: 'condition2', attribute: 'criteria2' },
                  { condition: 'condition3', attribute: 'criteria3' },
                  { condition: 'condition4', attribute: 'criteria4' },
                ],
              },
            ],
            claimEnrichment: [
              {
                '@context': 'somecontext1',
                '@id': 'somelink1',
                resources: [
                  { productId: 'productId1', resource: 'res1' },
                  { productId: 'productId2', resource: 'res2' },
                  { productId: 'productId3', resource: 'res3' },
                ],
              },
              {
                '@context': 'somecontext2',
                '@id': 'somelink2',
                resources: [
                  { productId: 'productId1', resource: 'res1' },
                  { productId: 'productId2', resource: 'res2' },
                ],
              },
            ],
          },
        ],
      },
      linkedEntities: [
        {
          '@type': 'Investment',
          id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
        },
        { '@type': 'Oracle', id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt' },
      ],
      fees: {
        '@context': 'https://schema.ixo.world/fees/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'RentalFee',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdff',
          },
        ],
      },
      stake: {
        '@context': 'https://schema.ixo.world/staking/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'PerformanceGuarantee',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdvv',
            denom: 'IXO',
            stakeAddress: 'abcccsdfsdfdsfdsfsdf',
            minStake: 12,
            slashCondition: 'FailedDispute',
            slashFactor: 45,
            slashAmount: 66,
            unbondPeriod: 23,
          },
        ],
      },
      nodes: {
        '@context': 'https://schema.ixo.world/nodes/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'IBCNode',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbb',
          },
          {
            '@type': 'CellNode',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzz',
          },
        ],
      },
      liquidity: {
        '@context': 'https://schema.ixo.world/liquidity/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'Alphabond',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
          },
        ],
      },
      keys: {
        '@context': 'https://www.w3.org/ns/did/v1',
        items: [
          {
            purpose: 'Encryption',
            '@type': 'JwsVerificationKey2020',
            controller: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbbb',
            keyValue: 'eEUR',
            dateCreated: '2020-09-18T00:00:00.000Z',
            dateUpdated: '2020-10-28T00:00:00.000Z',
            signature: 'somesignature',
          },
        ],
      },
      service: [
        {
          '@type': 'DIDAgent',
          id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn',
          serviceEndpoint: 'https://someurl',
          description: 'some short description',
          publicKey: 'somepubkey',
          properties: 'otherparams',
        },
      ],
      data: [
        {
          '@type': 'PersonalDataPod',
          id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd',
          serviceEndpoint: 'https://blah.com',
          properties: 'otherparams',
        },
      ],
      '@type': 'Project',
      name: 'Some Title',
      description: 'Some Short Description',
      image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
      logo: 'https://pds_pandora.ixo.world/public/v7kvrycap9kf2ofnof',
      brand: 'Some Brand',
      imageDescription: 'Some Image Description',
      location: 'AR',
      sdgs: ['5', '7'],
      createdOn: '2020-09-12T19:49:45Z',
      createdBy: 'did:sov:EA1fV7PTbWG3aveDJZpgSn',
      nodeDid: 'did:ixo:RpXidAyvNUsSEktkT3a5LY',
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
      claimStats: {
        currentSuccessful: 10,
        currentRejected: 5,
      },
      agentStats: {
        evaluators: 10,
        evaluatorsPending: 0,
        serviceProviders: 10,
        serviceProvidersPending: 2,
        investors: 12,
        investorsPending: 0,
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
      entitySchemaVersion: '1.0.0',
      startDate: '2020-09-17T00:00:00.000Z',
      endDate: '2020-10-23T00:00:00.000Z',
      status: 'Live',
      stage: 'Planning',
      relayerNode: 'did:sov:Rmb6Rd1CU6k74FM2xzy6Do',
      version: {
        versionNumber: '1.0.5',
        effectiveDate: '2020-09-15T00:00:00.000Z',
        notes: 'Some version notes',
      },
      terms: {
        '@type': 'OnceOffFee',
        paymentTemplateId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd4',
      },
      privacy: {
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
      creator: {
        displayName: 'Creator Display Name',
        location: 'AD',
        email: 'ert@dfssdf.com',
        website: 'https://blah.com',
        mission: 'Some mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd1',
        credentialId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd2',
        logo: 'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
      },
      owner: {
        displayName: 'Owner Display Name',
        location: 'AQ',
        email: 'eeeert@dfssdf.com',
        website: 'https://eerer.com',
        mission: 'another mission',
        id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd6',
        logo: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
      },
      ddoTags: [
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
      displayCredentials: {
        '@context': 'https://www.w3.org/2018/credentials/v1',
        items: [
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
      page: { cid: 'somepageid', version: '1.0.0' },
      linkedEntities: [
        {
          '@type': 'Investment',
          id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
        },
        { '@type': 'Oracle', id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt' },
      ],
      fees: {
        '@context': 'https://schema.ixo.world/fees/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'RentalFee',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdff',
          },
        ],
      },
      stake: {
        '@context': 'https://schema.ixo.world/staking/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'PerformanceGuarantee',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdvv',
            denom: 'IXO',
            stakeAddress: 'abcccsdfsdfdsfdsfsdf',
            minStake: 12,
            slashCondition: 'FailedDispute',
            slashFactor: 45,
            slashAmount: 66,
            unbondPeriod: 23,
          },
        ],
      },
      nodes: {
        '@context': 'https://schema.ixo.world/nodes/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'IBCNode',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbb',
          },
          {
            '@type': 'CellNode',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzz',
          },
        ],
      },
      liquidity: {
        '@context': 'https://schema.ixo.world/liquidity/ipfs3r08webu2eou',
        items: [
          {
            '@type': 'Alphabond',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
          },
        ],
      },
      keys: {
        '@context': 'https://www.w3.org/ns/did/v1',
        items: [
          {
            purpose: 'Encryption',
            '@type': 'JwsVerificationKey2020',
            controller: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbbb',
            keyValue: 'eEUR',
            dateCreated: '2020-09-18T00:00:00.000Z',
            dateUpdated: '2020-10-28T00:00:00.000Z',
            signature: 'somesignature',
          },
        ],
      },
      service: [
        {
          '@type': 'DIDAgent',
          id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn',
          serviceEndpoint: 'https://someurl',
          description: 'some short description',
          publicKey: 'somepubkey',
          properties: 'otherparams',
        },
      ],
      data: [
        {
          '@type': 'PersonalDataPod',
          id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd',
          serviceEndpoint: 'https://blah.com',
          properties: 'otherparams',
        },
      ],
      '@type': 'Template',
      name: 'Some Claim Title',
      description: 'Some Claim Description',
      createdOn: '2020-08-12T19:49:45Z',
      createdBy: 'did:sov:AB1fV7PTbWG3aveDJZpgSb',
      nodeDid: 'did:ixo:RpXidAyvNUsSEktkT3a5LY',
      agents: [
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
      claimStats: {
        currentSuccessful: 0,
        currentRejected: 0,
      },
      agentStats: {
        evaluators: 10,
        evaluatorsPending: 0,
        serviceProviders: 10,
        serviceProvidersPending: 2,
        investors: 12,
        investorsPending: 0,
      },
      claims: [],
    },
  },
] as ApiListedEntity[]

const fakePublicResource: ApiResource = {
  data: 'eyJoZWFkZXIiOnsiaW1hZ2UiOiJodHRwczovL3Bkc19wYW5kb3JhLml4by53b3JsZC9wdWJsaWMvNjd4Y3diNWtkYTNrZmU2cGRybyIsInRpdGxlIjoiVGVzdCBQcm9qZWN0Iiwic2hvcnREZXNjcmlwdGlvbiI6IkF0IHZlcm8gZW9zIGV0IGFjY3VzYW11cyBldCBpdXN0byBvZGlvIGRpZ25pc3NpbW9zIGR1Y2ltdXMgcXVpIGJsYW5kaXRpaXMgcHJhZXNlbnRpdW0gdm9sdXB0YXR1bSBkZWxlbml0aSBhdHF1ZSBjb3JydXB0aSBxdW9zIGRvbG9yZXMgZXQgcXVhcyBtb2xlc3RpYXMiLCJicmFuZCI6IlRlc3QiLCJsb2NhdGlvbiI6IkFTIiwic2RncyI6WyIzIiwiNyJdLCJpbWFnZURlc2NyaXB0aW9uIjoiQXQgdmVybyBlb3MgZXQgYWNjdXNhbXVzIGV0IGl1c3RvIG9kaW8gZGlnbmlzc2ltb3MgZHVjaW11cyBxdWkgYmxhbmRpdGlpcyIsImxvZ28iOiJodHRwczovL3Bkc19wYW5kb3JhLml4by53b3JsZC9wdWJsaWMveXdxaXJoZ3V1OGlrZmU2cHQ0MyJ9LCJib2R5IjpbeyJ0aXRsZSI6IlRlc3QgU2VjdGlvbiIsImNvbnRlbnQiOiJBdCB2ZXJvIGVvcyBldCBhY2N1c2FtdXMgZXQgaXVzdG8gb2RpbyBkaWduaXNzaW1vcyBkdWNpbXVzIHF1aSBibGFuZGl0aWlzIHByYWVzZW50aXVtIHZvbHVwdGF0dW0gZGVsZW5pdGkgYXRxdWUgY29ycnVwdGkgcXVvcyBkb2xvcmVzIGV0IHF1YXMgbW9sZXN0aWFzIGV4Y2VwdHVyaSBzaW50IG9jY2FlY2F0aSBjdXBpZGl0YXRlIG5vbiBwcm92aWRlbnQsIHNpbWlsaXF1ZSBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdGlhIGFuaW1pLCBpZCBlc3QgbGFib3J1bSBldCBkb2xvcnVtIGZ1Z2EuIEV0IGhhcnVtIHF1aWRlbSByZXJ1bSBmYWNpbGlzIGVzdCBldCBleHBlZGl0YSBkaXN0aW5jdGlvLiBOYW0gbGliZXJvIHRlbXBvcmUsIGN1bSBzb2x1dGEgbm9iaXMgZXN0IGVsaWdlbmRpIG9wdGlvIGN1bXF1ZSBuaWhpbCBpbXBlZGl0IHF1byBtaW51cyBpZCBxdW9kIG1heGltZSBwbGFjZWF0IGZhY2VyZSBwb3NzaW11cywgb21uaXMgdm9sdXB0YXMgYXNzdW1lbmRhIGVzdCwgb21uaXMgZG9sb3IgcmVwZWxsZW5kdXMiLCJpbWFnZSI6Imh0dHBzOi8vcGRzX3BhbmRvcmEuaXhvLndvcmxkL3B1YmxpYy90ZWwxZGdkanNocmtmZTZxeWdrIn1dLCJpbWFnZXMiOlt7InRpdGxlIjoiSW1hZ2UgU2VjdGlvbiIsImNvbnRlbnQiOiJBdCB2ZXJvIGVvcyBldCBhY2N1c2FtdXMgZXQgaXVzdG8gb2RpbyBkaWduaXNzaW1vcyBkdWNpbXVzIHF1aSBibGFuZGl0aWlzIHByYWVzZW50aXVtIHZvbHVwdGF0dW0gZGVsZW5pdGkgYXRxdWUgY29ycnVwdGkgcXVvcyBkb2xvcmVzIGV0IHF1YXMgbW9sZXN0aWFzIGV4Y2VwdHVyaSBzaW50IG9jY2FlY2F0aSBjdXBpZGl0YXRlIG5vbiBwcm92aWRlbnQsIHNpbWlsaXF1ZSBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdGlhIGFuaW1pLCBpZCBlc3QgbGFib3J1bSBldCBkb2xvcnVtIGZ1Z2EuIEV0IGhhcnVtIHF1aWRlbSByZXJ1bSBmYWNpbGlzIGVzdCBldCBleHBlZGl0YSBkaXN0aW5jdGlvLiBOYW0gbGliZXJvIHRlbXBvcmUsIGN1bSBzb2x1dGEgbm9iaXMgZXN0IGVsaWdlbmRpIG9wdGlvIGN1bXF1ZSBuaWhpbCBpbXBlZGl0IHF1byBtaW51cyBpZCBxdW9kIG1heGltZSBwbGFjZWF0IGZhY2VyZSBwb3NzaW11cywgb21uaXMgdm9sdXB0YXMgYXNzdW1lbmRhIGVzdCwgb21uaXMgZG9sb3IgcmVwZWxsZW5kdXMuIEF0IHZlcm8gZW9zIGV0IGFjY3VzYW11cyBldCBpdXN0byBvZGlvIGRpZ25pc3NpbW9zIGR1Y2ltdXMgcXVpIGJsYW5kaXRpaXMgcHJhZXNlbnRpdW0gdm9sdXB0YXR1bSBkZWxlbml0aSBhdHF1ZSBjb3JydXB0aSBxdW9zIGRvbG9yZXMgZXQgcXVhcyBtb2xlc3RpYXMgZXhjZXB0dXJpIHNpbnQgb2NjYWVjYXRpIGN1cGlkaXRhdGUgbm9uIHByb3ZpZGVudCwgc2ltaWxpcXVlIHN1bnQgaW4gY3VscGEgcXVpIG9mZmljaWEgZGVzZXJ1bnQgbW9sbGl0aWEgYW5pbWksIGlkIGVzdCBsYWJvcnVtIGV0IGRvbG9ydW0gZnVnYS4gRXQgaGFydW0gcXVpZGVtIHJlcnVtIGZhY2lsaXMgZXN0IGV0IGV4cGVkaXRhIGRpc3RpbmN0aW8uIE5hbSBsaWJlcm8gdGVtcG9yZSwgY3VtIHNvbHV0YSBub2JpcyBlc3QgZWxpZ2VuZGkgb3B0aW8gY3VtcXVlIG5paGlsIGltcGVkaXQgcXVvIG1pbnVzIGlkIHF1b2QgbWF4aW1lIHBsYWNlYXQgZmFjZXJlIHBvc3NpbXVzLCBvbW5pcyB2b2x1cHRhcyBhc3N1bWVuZGEgZXN0LCBvbW5pcyBkb2xvciByZXBlbGxlbmR1cyIsImltYWdlIjoiaHR0cHM6Ly9wZHNfcGFuZG9yYS5peG8ud29ybGQvcHVibGljL3FoN2Rxbjd1dXBrZmU2cmFveiIsImltYWdlRGVzY3JpcHRpb24iOiJBdCB2ZXJvIGVvcyBldCBhY2N1c2FtdXMgZXQgaXVzdG8gb2RpbyBkaWduaXNzaW1vcyBkdWNpbXVzIHF1aSBibGFuZGl0aWlzIHByYWVzZW50aXVtIHZvbHVwdGF0dW0gZGVsZW5pdGkgYXRxdWUgY29ycnVwdGkgcXVvcyBkb2xvcmVzIGV0IHF1YXMgbW9sZXN0aWFzIGV4Y2VwdHVyaSBzaW50IG9jY2FlY2F0aSBjdXBpZGl0YXRlIG5vbiBwcm92aWRlbnQsIHNpbWlsaXF1ZSBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdGlhIGFuaW1pLCBpZCBlc3QgbGFib3J1bSBldCBkb2xvcnVtIGZ1Z2EuIEV0IGhhcnVtIHF1aWRlbSByZXJ1bSBmYWNpbGlzIGVzdCBldCBleHBlZGl0YSBkaXN0aW5jdGlvLiJ9XSwicHJvZmlsZXMiOlt7ImltYWdlIjoiaHR0cHM6Ly9wZHNfcGFuZG9yYS5peG8ud29ybGQvcHVibGljLzMxbGt3bXBkYTUya2ZlNnZoMjIiLCJuYW1lIjoiSm9obiBEb2UiLCJwb3NpdGlvbiI6IkRldmVsb3BlciIsImxpbmtlZEluVXJsIjoiaHR0cHM6Ly93d3cuZXhhbXBsZS5jb20iLCJ0d2l0dGVyVXJsIjoiaHR0cHM6Ly93d3cuZXhhbXBsZS5jb20ifV0sInNvY2lhbCI6eyJsaW5rZWRJblVybCI6Imh0dHBzOi8vd3d3LmV4YW1wbGUuY29tIiwiZmFjZWJvb2tVcmwiOiJodHRwczovL3d3dy5leGFtcGxlLmNvbSIsInR3aXR0ZXJVcmwiOiJodHRwczovL3d3dy5leGFtcGxlLmNvbSIsImRpc2NvdXJzZVVybCI6Imh0dHBzOi8vd3d3LmV4YW1wbGUuY29tIiwiaW5zdGFncmFtVXJsIjoiaHR0cHM6Ly93d3cuZXhhbXBsZS5jb20iLCJ0ZWxlZ3JhbVVybCI6Imh0dHBzOi8vd3d3LmV4YW1wbGUuY29tIiwiZ2l0aHViVXJsIjoiaHR0cHM6Ly93d3cuZXhhbXBsZS5jb20iLCJvdGhlclVybCI6Imh0dHBzOi8vd3d3LmV4YW1wbGUuY29tIn0sImVtYmVkZGVkIjpbeyJ0aXRsZSI6IlRlc3QgRW1iZWRkZWQgQ29udGVudCIsInVybHMiOlsiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1fNGtIeHRpdU1MMCJdfV19',
  contentType: 'application/json',
}

export class Ixo {
  project

  constructor() {
    this.project = {
      createPublic: () => Promise.resolve({ result: 'somePublicDid' }),
      listProjects: () => Promise.resolve(fakeListedProjectsData),
      getProjectByProjectDid: () => Promise.resolve(fakeListedProjectsData[0]),
      fetchPublic: () => Promise.resolve(fakePublicResource),
    }
  }
}
