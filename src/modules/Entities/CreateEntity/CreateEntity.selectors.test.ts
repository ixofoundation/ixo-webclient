import * as SUT from './CreateEntity.selectors'
import { CreateEntityState } from './types'
import { EntityType } from '../types'
import { CreateEntityPageContentState } from './CreateEntityPageContent/types'
import { CreateEntityAttestationState } from './CreateEntityAttestation/types'
import { CreateEntitySettingsState } from './CreateEntitySettings/types'
import { CreateEntityAdvancedState } from './CreateEntityAdvanced/types'
import { CreateEntityClaimsState } from './CreateEntityClaims/types'
// import { EntityClaimType } from 'modules/EntityClaims/types'

let state: any

beforeEach(() => {
  state = {
    createEntity: {
      step: 1,
      entityType: EntityType.Project,
      creating: true,
      created: false,
      error: 'some error occured',
    } as CreateEntityState,
    createEntityPageContent: {
      header: {
        title: 'Some Title',
        shortDescription: 'Some Short Description',
        imageDescription: 'Some Image Description',
        sdgs: ['5', '7'],
        brand: 'Some Brand',
        location: 'AR',
        headerFileSrc:
          'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
        logoFileSrc: 'https://pds_pandora.ixo.world/public/xxxjb0xg0dgkeljwtnc',
        headerFileUploading: false,
        logoFileUploading: false,
      },
      body: {
        '4151f7bc-a399-4f69-940a-82394db61486': {
          id: '4151f7bc-a399-4f69-940a-82394db61486',
          title: 'Some Body Content Title',
          content: 'Some Body Content',
          uploading: false,
          fileSrc: 'https://pds_pandora.ixo.world/public/n724h8vl04bkeljy6xl',
        },
        '78f42ac3-d647-4f9a-a99d-71840fb6988a': {
          id: '78f42ac3-d647-4f9a-a99d-71840fb6988a',
          title: 'Another Body Content Title',
          content: 'Another Body Content',
          uploading: false,
          fileSrc: 'https://pds_pandora.ixo.world/public/e4g7yisha77keljyz5d',
        },
      },
      images: {
        '705365a2-e294-4983-8d00-b1cdf6cc623f': {
          id: '705365a2-e294-4983-8d00-b1cdf6cc623f',
          title: 'Some Image Content Title',
          content: 'Some Image Body Content',
          imageDescription: 'Some Image Description',
          uploading: false,
          fileSrc: 'https://pds_pandora.ixo.world/public/7bfhyr0m1p9keljzr4i',
        },
      },
      profiles: {
        '5754cb96-01a5-4c7e-a3cf-f8833f147b59': {
          id: '5754cb96-01a5-4c7e-a3cf-f8833f147b59',
          name: 'Someone 1',
          position: 'Some Position 1',
          linkedInUrl: 'https://linkedin1',
          twitterUrl: 'https://twitter1',
          uploading: false,
          fileSrc: 'https://pds_pandora.ixo.world/public/64tkzqd3llrkelk01rj',
        },
        '2564cf77-fe1b-42d8-85e6-6c215707b846': {
          id: '2564cf77-fe1b-42d8-85e6-6c215707b846',
          name: 'Someone 2',
          position: 'Some Position 2',
          linkedInUrl: 'https://linkedin2',
          twitterUrl: 'https://twitter2',
          uploading: false,
          fileSrc: 'https://pds_pandora.ixo.world/public/o18hu58fj48kelk08c5',
        },
      },
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
      embedded: {
        'd3616806-219b-41f5-a77c-13ae504a6282': {
          id: 'd3616806-219b-41f5-a77c-13ae504a6282',
          title: 'Some Title 1',
          urls: [
            'https://edition.cnn.com/2020/09/02/europe/alexey-navalny-novichok-intl/index.html',
            'https://edition.cnn.com/2020/09/02/politics/melania-trump-private-email-wolkoff-cnntv/index.html',
          ],
        },
        '94e657ff-ea28-4026-ba48-74b6f9b12cbb': {
          id: '94e657ff-ea28-4026-ba48-74b6f9b12cbb',
          title: 'Another Title',
          urls: ['https://www.youtube.com/watch?v=iOWFXqT5MZ4'],
        },
      },
      validation: {},
    } as CreateEntityPageContentState,
    createEntityAttestation: {
      claimInfo: {
        title: 'someClaimTitle',
        shortDescription: 'someClaimShortDescription',
        // type: EntityClaimType.Custody,
        type: 'Custody',
      },
      questions: {
        '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Selector Rate out of 10',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label:
            'Rate the below from 1 to 10 with 1 bring terrible and 10 being excellent',
          attributeType: 'https://schema.org/1',
          required: true,
          inline: true,
          type: 'number',
          control: 'radio',
          values: ['1', '2', '3'],
          order: 1,
        },
        '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Enter Location',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Location',
          attributeType: 'https://schema.org/2',
          required: true,
          type: 'string',
          control: 'locationselector',
          order: 2,
        },
        '00000003-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000003-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Date Picker',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Dates',
          attributeType: 'https://schema.org/3',
          required: true,
          type: 'string',
          control: 'daterangeselector',
          placeholder: 'Select Date',
          order: 3,
        },
        '00000004-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000004-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Upload an Avatar/Profile Pic',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Select an avatar to upload',
          attributeType: 'https://schema.org/4',
          required: true,
          type: 'string',
          control: 'avatarupload',
          order: 4,
        },
        '00000005-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000005-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Upload an Image',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Select an image to upload',
          attributeType: 'https://schema.org/5',
          required: true,
          type: 'string',
          control: 'imageupload',
          order: 5,
        },
        '00000006-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000006-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Upload a Video',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Select a video to upload',
          attributeType: 'https://schema.org/6',
          required: true,
          type: 'string',
          control: 'videoupload',
          order: 6,
        },
        '00000007-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000007-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Upload a Document',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Select a document to upload',
          attributeType: 'https://schema.org/7',
          required: true,
          type: 'string',
          control: 'documentupload',
          order: 7,
        },
        '00000008-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000008-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'QR Code',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'QR Code',
          attributeType: 'https://schema.org/8',
          required: true,
          type: 'string',
          control: 'qrcode',
          initialValue: 'https://www.google.com/',
          order: 8,
        },
        '00000009-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000009-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Short Text Question',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Short Answer',
          attributeType: 'https://schema.org/9',
          required: true,
          type: 'string',
          control: 'text',
          placeholder: 'Start Typing here',
          order: 9,
        },
        '00000010-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000010-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Long Text Question',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Long Answer',
          attributeType: 'https://schema.org/10',
          required: true,
          type: 'string',
          control: 'textarea',
          placeholder: 'Start Typing here',
          order: 10,
        },
        '00000011-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000011-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Select some of the text items below',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Select 1 to 2 options',
          attributeType: 'https://schema.org/11',
          required: false,
          type: 'array',
          minItems: 1,
          maxItems: 2,
          control: 'checkboxes',
          itemValues: [
            'Option1',
            'Option2',
            'Option3',
            'Option4',
            'Option5',
            'Option6',
            'Option7',
          ],
          itemLabels: [
            'Option 1',
            'Option 2',
            'Option 3',
            'Option 4',
            'Option 5',
            'Option 6',
            'Option 7',
          ],
          order: 11,
        },
        '00000013-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000013-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Date Picker',
          description:
            'Provide a short explanation or instruction for the question (optional). ',
          label: 'Date of pickup',
          attributeType: 'https://schema.org/12',
          required: true,
          type: 'string',
          control: 'singledateselector',
          placeholder: 'Select Date',
          order: 12,
        },
      },
      validation: {},
    } as CreateEntityAttestationState,
    createEntitySettings: {
      creator: {
        displayName: 'Creator Display Name',
        location: 'AD',
        email: 'ert@dfssdf.com',
        website: 'https://blah.com',
        mission: 'Some mission',
        creatorId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd1',
        credential: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd2',
        fileSrc: 'https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg',
        uploading: false,
      },
      owner: {
        displayName: 'Owner Display Name',
        location: 'AQ',
        email: 'eeeert@dfssdf.com',
        website: 'https://eerer.com',
        mission: 'another mission',
        ownerId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd6',
        fileSrc: 'https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9',
        uploading: false,
      },
      status: {
        startDate: '17-Sep-2020',
        endDate: '23-Oct-2020',
        stage: 'Planning',
        status: 'Live',
      },
      version: {
        versionNumber: '1.0.5',
        effectiveDate: '15-Sep-2020',
        notes: 'Some version notes',
      },
      termsOfUse: {
        type: 'OnceOffFee',
        paymentTemplateId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd4',
      },
      privacy: {
        pageView: 'Private',
        entityView: 'Visible',
      },
      requiredCredentials: {
        'd35db9cb-cb16-484a-9b9d-5e19186a4aea': {
          id: 'd35db9cb-cb16-484a-9b9d-5e19186a4aea',
          credential: 'somecredential',
          issuer: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd99',
        },
        'ff589f3f-fc7e-4110-a384-b45a3cf6a3e8': {
          id: 'ff589f3f-fc7e-4110-a384-b45a3cf6a3e8',
          credential: 'anothercredential',
          issuer: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd66',
        },
      },
      filters: {
        'Project Type': [
          'Index',
          'Accreditation',
          'Accountability',
          'Insurance Bond',
        ],
        'SDG': [
          'SDG3 – Good Health and Well-being',
          'SDG15 – Life on Land',
          'SDG16 – Peace, Justice and Strong Institutions',
          'SDG17 – Partnerships for Goals',
        ],
        'Stage': ['Planning'],
      },
      displayCredentials: {
        'dcf317f4-5155-4df2-bcb6-dfd03127e413': {
          id: 'dcf317f4-5155-4df2-bcb6-dfd03127e413',
          credential: 'somecredential1',
          badge: 'https://somebadge.com',
        },
        'b34f3af4-b84d-4737-9341-0bc480b69338': {
          id: 'b34f3af4-b84d-4737-9341-0bc480b69338',
          credential: 'somecredential2',
          badge: 'https://anotherbadge.com',
        },
      },
      validation: {},
      headlineTemplateId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
      embeddedAnalytics: {}
    } as CreateEntitySettingsState,
    createEntityAdvanced: {
      linkedEntities: {
        '92d772b8-d1d8-4d07-9fba-11041dc22aa8': {
          id: '92d772b8-d1d8-4d07-9fba-11041dc22aa8',
          type: 'Investment',
          entityId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
        },
        'abc11083-39e1-4f40-a028-bea242d5d837': {
          id: 'abc11083-39e1-4f40-a028-bea242d5d837',
          type: 'Oracle',
          entityId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt',
        },
      },
      payments: {
        '4a1592ae-1e9e-45e3-8f57-9fd6806d0f58': {
          id: '4a1592ae-1e9e-45e3-8f57-9fd6806d0f58',
          type: 'RentalFee',
          paymentId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdff',
        },
      },
      staking: {
        '2e0a9231-4b40-489b-a757-b1f4507f4634': {
          id: '2e0a9231-4b40-489b-a757-b1f4507f4634',
          type: 'PerformanceGuarantee',
          stakeId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdvv',
          denom: 'IXO',
          stakeAddress: 'abcccsdfsdfdsfdsfsdf',
          minStake: 12,
          slashCondition: 'FailedDispute',
          slashFactor: 45,
          slashAmount: 66,
          unbondPeriod: 23,
        },
      },
      nodes: {
        '55d623bb-dd11-4c09-bb70-9f20752eb3a9': {
          id: '55d623bb-dd11-4c09-bb70-9f20752eb3a9',
          type: 'IBCNode',
          nodeId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbb',
        },
        '196c881f-6fb7-4f0f-bebb-0f970e4584fa': {
          id: '196c881f-6fb7-4f0f-bebb-0f970e4584fa',
          type: 'CellNode',
          nodeId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzz',
        },
      },
      funding: {
        'a2944f44-064a-4981-9e9d-c4f8e8eb641d': {
          id: 'a2944f44-064a-4981-9e9d-c4f8e8eb641d',
          source: 'Alphabond',
          fundId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
        },
      },
      keys: {
        '0b288a4d-8b37-44d8-8400-ddb17a9150f3': {
          id: '0b288a4d-8b37-44d8-8400-ddb17a9150f3',
          purpose: 'Encryption',
          type: 'JwsVerificationKey2020',
          keyValue: 'eEUR',
          signature: 'somesignature',
          controller: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbbb',
          dateCreated: '18-Sep-2020',
          dateUpdated: '28-Oct-2020',
        },
      },
      services: {
        'a77a6a5d-2c27-479a-974f-9ade36e58c17': {
          id: 'a77a6a5d-2c27-479a-974f-9ade36e58c17',
          type: 'DIDAgent',
          shortDescription: 'some short description',
          serviceEndpoint: 'https://someurl',
          publicKey: 'somepubkey',
          properties: 'otherparams',
          serviceId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn',
        },
      },
      dataResources: {
        'e823d12a-141e-4152-98d2-7dea6688d28b': {
          id: 'e823d12a-141e-4152-98d2-7dea6688d28b',
          type: 'PersonalDataPod',
          dataId: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd',
          serviceEndpoint: 'https://blah.com',
          properties: 'otherparams',
        },
      },
      validation: {},
    } as CreateEntityAdvancedState,
    createEntityClaims: {
      entityClaims: {
        'cddeb3df-3a04-4cc5-b6db-2507985b123d': {
          id: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
          template: {
            id: 'c7831199-14c0-4ae3-a15a-67b528868d78',
            entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
            templateId: 'template:did:2',
            title: 'Some Claim Title 1',
            description: 'Some Claim Description 1',
            isPrivate: true,
            minTargetClaims: 23,
            maxTargetClaims: 45,
            goal: 'Some Goal',
            submissionStartDate: '25-Sep-2020',
            submissionEndDate: '22-Oct-2020',
          },
          agentRoles: {
            '892cdb1e-97ce-45c2-9fa3-b9b2da0eef6b': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: '892cdb1e-97ce-45c2-9fa3-b9b2da0eef6b',
              role: 'PO',
              credential: 'Credential 1',
              autoApprove: true,
            },
            'c41b323e-8d56-4b3e-9743-e3697b7865b8': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: 'c41b323e-8d56-4b3e-9743-e3697b7865b8',
              role: 'SA',
              credential: 'Credential 2',
              autoApprove: false,
            },
            '895aff4c-edfa-4f40-af59-e992caccdcc1': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: '895aff4c-edfa-4f40-af59-e992caccdcc1',
              role: 'IA',
              credential: 'Credential 3',
              autoApprove: true,
            },
          },
          evaluations: {
            '0cd898c9-1a7d-4ce8-afbb-85d8aa36611c': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: '0cd898c9-1a7d-4ce8-afbb-85d8aa36611c',
              context: 'somecontext1',
              contextLink: 'somelinktocontext1',
              evaluationAttributes: ['attr1', 'attr2'],
              evaluationMethodology: 'somemethodology1',
            },
            'dfd49762-255a-4786-a2f3-da1ffc23be8d': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: 'dfd49762-255a-4786-a2f3-da1ffc23be8d',
              context: 'somecontext2',
              contextLink: 'somelinktocontext2',
              evaluationAttributes: ['attr1', 'attr2', 'attr3'],
              evaluationMethodology: 'somemethodology2',
            },
          },
          approvalCriteria: {
            'd46ddeeb-3292-46f4-9bd2-09c482b4bc08': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: 'd46ddeeb-3292-46f4-9bd2-09c482b4bc08',
              context: 'somecontext1',
              contextLink: 'somelink1',
              approvalAttributes: [
                { condition: 'condition1', attribute: 'criteria1' },
                { condition: 'condition2', attribute: 'criteria2' },
                { condition: 'condition3', attribute: 'criteria3' },
                { condition: 'condition4', attribute: 'criteria4' },
              ],
            },
          },
          enrichments: {
            '1a6a440d-1179-464e-8a93-25e0605b9f77': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: '1a6a440d-1179-464e-8a93-25e0605b9f77',
              context: 'somecontext1',
              contextLink: 'somelink1',
              resources: [
                { productId: 'productId1', resource: 'res1' },
                { productId: 'productId2', resource: 'res2' },
                { productId: 'productId3', resource: 'res3' },
              ],
            },
            '05c5f232-a272-4fe3-aaa7-cd33e32e1443': {
              entityClaimId: 'cddeb3df-3a04-4cc5-b6db-2507985b123d',
              id: '05c5f232-a272-4fe3-aaa7-cd33e32e1443',
              context: 'somecontext2',
              contextLink: 'somelink2',
              resources: [
                { productId: 'productId1', resource: 'res1' },
                { productId: 'productId2', resource: 'res2' },
              ],
            },
          },
        },
      },
      validation: {},
    } as CreateEntityClaimsState,
  }
})

describe('CreateEntity Selectors', () => {
  describe('selectCreateEntity', () => {
    it('should return the createEntity property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectCreateEntity(state)

      // then ... should return result as expected
      expect(result).toEqual(state.createEntity)
    })
  })

  describe('selectStep', () => {
    it('should return the selectStep property', () => {
      // when ... we call the selector
      const result = SUT.selectStep(state)

      // then ... should return result as expected
      expect(result).toEqual(1)
    })
  })

  describe('selectEntityType', () => {
    it('should return the selectEntityType property', () => {
      // when ... we call the selector
      const result = SUT.selectEntityType(state)

      // then ... should return result as expected
      expect(result).toEqual(EntityType.Project)
    })
  })

  describe('selectCreating', () => {
    it('should return the selectCreating property', () => {
      // when ... we call the selector
      const result = SUT.selectCreating(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectCreated', () => {
    it('should return the selectCreated property', () => {
      // when ... we call the selector
      const result = SUT.selectCreated(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })
  })

  describe('selectError', () => {
    it('should return the selectError property', () => {
      // when ... we call the selector
      const result = SUT.selectError(state)

      // then ... should return result as expected
      expect(result).toEqual('some error occured')
    })
  })

  describe('selectIsFinal', () => {
    it('should return true if creating, created or error is true', () => {
      // when ... we call the selector
      const result = SUT.selectIsFinal(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectPageContentApiPayload', () => {
    it('should select the page content payload', () => {
      // when we call selectPageContentApiPayload it should return the correct payload
      const pageContent = SUT.selectPageContentApiPayload(state)

      const payload = {
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
      }

      // console.log(JSON.stringify(payload))

      expect(pageContent).toEqual(payload)
    })
  })

  describe('selectAttestationApiPayload', () => {
    it('should select the attestation payload', () => {
      // when we call selectAttestationApiPayload it should return the correct payload
      const attestation = SUT.selectAttestationApiPayload(state)

      const payload = {
        claimInfo: {
          title: 'someClaimTitle',
          shortDescription: 'someClaimShortDescription',
          // type: EntityClaimType.Custody,
          type: 'Custody',
        },
        forms: [
          {
            ['@type']: 'https://schema.org/1',
            schema: {
              title: 'Selector Rate out of 10',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000001-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'number',
                  title:
                    'Rate the below from 1 to 10 with 1 bring terrible and 10 being excellent',
                  enum: ['1', '2', '3'],
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'radio',
                'ui:options': { inline: true },
              },
            },
          },
          {
            ['@type']: 'https://schema.org/2',
            schema: {
              title: 'Enter Location',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000002-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Location',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'locationselector',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/3',
            schema: {
              title: 'Date Picker',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000003-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000003-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Dates',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000003-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'daterangeselector',
                'ui:placeholder': 'Select Date',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/4',
            schema: {
              title: 'Upload an Avatar/Profile Pic',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000004-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000004-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Select an avatar to upload',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000004-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'avatarupload',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/5',
            schema: {
              title: 'Upload an Image',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000005-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000005-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Select an image to upload',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000005-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'imageupload',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/6',
            schema: {
              title: 'Upload a Video',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000006-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000006-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Select a video to upload',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000006-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'videoupload',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/7',
            schema: {
              title: 'Upload a Document',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000007-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000007-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Select a document to upload',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000007-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'documentupload',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/8',
            schema: {
              title: 'QR Code',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000008-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000008-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'QR Code',
                  default: 'https://www.google.com/',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000008-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'qrcode',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/9',
            schema: {
              title: 'Short Text Question',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000009-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000009-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Short Answer',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000009-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'text',
                'ui:placeholder': 'Start Typing here',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/10',
            schema: {
              title: 'Long Text Question',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000010-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000010-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Long Answer',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000010-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'textarea',
                'ui:placeholder': 'Start Typing here',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/11',
            schema: {
              title: 'Select some of the text items below',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: [],
              properties: {
                '00000011-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'array',
                  title: 'Select 1 to 2 options',
                  items: {
                    type: 'string',
                    enum: [
                      'Option1',
                      'Option2',
                      'Option3',
                      'Option4',
                      'Option5',
                      'Option6',
                      'Option7',
                    ],
                    enumNames: [
                      'Option 1',
                      'Option 2',
                      'Option 3',
                      'Option 4',
                      'Option 5',
                      'Option 6',
                      'Option 7',
                    ],
                  },
                  uniqueItems: true,
                  minItems: 1,
                  maxItems: 2,
                },
              },
            },
            uiSchema: {
              '00000011-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'checkboxes',
                'ui:options': {},
              },
            },
          },
          {
            ['@type']: 'https://schema.org/12',
            schema: {
              title: 'Date Picker',
              description:
                'Provide a short explanation or instruction for the question (optional). ',
              type: 'object',
              required: ['00000013-3b7d-4bad-9bdd-2b0d7b3dcb67'],
              properties: {
                '00000013-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                  type: 'string',
                  title: 'Date of pickup',
                  items: { type: 'string' },
                  uniqueItems: true,
                },
              },
            },
            uiSchema: {
              '00000013-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                'ui:widget': 'singledateselector',
                'ui:placeholder': 'Select Date',
                'ui:options': {},
              },
            },
          },
        ],
      }

      // console.log(JSON.stringify(payload))

      expect(attestation).toEqual(payload)
    })
  })

  describe('selectAttestationHeaderForEntityApiPayload', () => {
    it('should return the attestation header info for the entity schema', () => {
      const result = SUT.selectAttestationHeaderForEntityApiPayload(state)

      expect(result).toEqual({
        name: 'someClaimTitle',
        description: 'someClaimShortDescription',
      })
    })
  })

  describe('selectPageContentHeaderForEntityApiPayload', () => {
    it('should return the page content header info for the entity schema', () => {
      const result = SUT.selectPageContentHeaderForEntityApiPayload(state)

      expect(result).toEqual({
        name: 'Some Title',
        description: 'Some Short Description',
        image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
        logo: 'https://pds_pandora.ixo.world/public/xxxjb0xg0dgkeljwtnc',
        brand: 'Some Brand',
        imageDescription: 'Some Image Description',
        location: 'AR',
        sdgs: ['5', '7'],
      })
    })
  })

  describe('selectClaimsForEntityApiPayload', () => {
    it('should return the claims api payload for the entity api payload', () => {
      const result = SUT.selectClaimsForEntityApiPayload(state)

      expect(result).toEqual({
        entityClaims: {
          ['@context']: 'https://schema.ixo.world/claims:3r08webu2eou',
          items: [
            {
              ['@id']: 'template:did:2',
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
                  ['@context']: 'somecontext1',
                  ['@id']: 'somelinktocontext1',
                  methodology: 'somemethodology1',
                  attributes: ['attr1', 'attr2'],
                },
                {
                  ['@context']: 'somecontext2',
                  ['@id']: 'somelinktocontext2',
                  methodology: 'somemethodology2',
                  attributes: ['attr1', 'attr2', 'attr3'],
                },
              ],
              claimApproval: [
                {
                  ['@context']: 'somecontext1',
                  ['@id']: 'somelink1',
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
                  ['@context']: 'somecontext1',
                  ['@id']: 'somelink1',
                  resources: [
                    { productId: 'productId1', resource: 'res1' },
                    { productId: 'productId2', resource: 'res2' },
                    { productId: 'productId3', resource: 'res3' },
                  ],
                },
                {
                  ['@context']: 'somecontext2',
                  ['@id']: 'somelink2',
                  resources: [
                    { productId: 'productId1', resource: 'res1' },
                    { productId: 'productId2', resource: 'res2' },
                  ],
                },
              ],
            },
          ],
        },
      })
    })
  })

  describe('selectEntityApiPayload', () => {
    it('should return the payload for the entity', () => {
      const genericPayload = {
        ['@context']: 'https://schema.ixo.foundation/entity:2383r9riuew',
        entitySchemaVersion: process.env.REACT_APP_ENTITY_VERSION,
        startDate: '2020-09-17T00:00:00.000Z',
        endDate: '2020-10-23T00:00:00.000Z',
        status: 'Live',
        stage: 'Planning',
        relayerNode: process.env.REACT_APP_RELAYER_NODE,
        version: {
          versionNumber: '1.0.5',
          effectiveDate: '2020-09-15T00:00:00.000Z',
          notes: 'Some version notes',
        },
        terms: {
          ['@type']: 'OnceOffFee',
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
            tags: [
              'Index',
              'Accreditation',
              'Accountability',
              'Insurance Bond',
            ],
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
          {
            category: 'Stage',
            tags: ['Planning'],
          },
        ],
        displayCredentials: {
          ['@context']: 'https://www.w3.org/2018/credentials/v1',
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
        page: {
          cid: 'somepageid',
          version: process.env.REACT_APP_ENTITY_PAGE_VERSION,
        },
        entityClaims: {
          ['@context']: 'https://schema.ixo.world/claims:3r08webu2eou',
          items: [
            {
              ['@id']: 'template:did:2',
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
                  ['@context']: 'somecontext1',
                  ['@id']: 'somelinktocontext1',
                  methodology: 'somemethodology1',
                  attributes: ['attr1', 'attr2'],
                },
                {
                  ['@context']: 'somecontext2',
                  ['@id']: 'somelinktocontext2',
                  methodology: 'somemethodology2',
                  attributes: ['attr1', 'attr2', 'attr3'],
                },
              ],
              claimApproval: [
                {
                  ['@context']: 'somecontext1',
                  ['@id']: 'somelink1',
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
                  ['@context']: 'somecontext1',
                  ['@id']: 'somelink1',
                  resources: [
                    { productId: 'productId1', resource: 'res1' },
                    { productId: 'productId2', resource: 'res2' },
                    { productId: 'productId3', resource: 'res3' },
                  ],
                },
                {
                  ['@context']: 'somecontext2',
                  ['@id']: 'somelink2',
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
            ['@type']: 'Investment',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdqq',
          },
          {
            ['@type']: 'Oracle',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdtt',
          },
        ],
        fees: {
          ['@context']: 'https://schema.ixo.world/fees/ipfs3r08webu2eou',
          items: [
            {
              ['@type']: 'RentalFee',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdff',
            },
          ],
        },
        stake: {
          ['@context']: 'https://schema.ixo.world/staking/ipfs3r08webu2eou',
          items: [
            {
              ['@type']: 'PerformanceGuarantee',
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
          ['@context']: 'https://schema.ixo.world/nodes/ipfs3r08webu2eou',
          items: [
            {
              ['@type']: 'IBCNode',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbb',
            },
            {
              ['@type']: 'CellNode',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzz',
            },
          ],
        },
        funding: {
          ['@context']: 'https://schema.ixo.world/funding/ipfs3r08webu2eou',
          items: [
            {
              ['@type']: 'Alphabond',
              id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz',
            },
          ],
        },
        keys: {
          ['@context']: 'https://www.w3.org/ns/did/v1',
          items: [
            {
              purpose: 'Encryption',
              ['@type']: 'JwsVerificationKey2020',
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
            ['@type']: 'DIDAgent',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn',
            serviceEndpoint: 'https://someurl',
            description: 'some short description',
            publicKey: 'somepubkey',
            properties: 'otherparams',
          },
        ],
        data: [
          {
            ['@type']: 'PersonalDataPod',
            id: 'did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd',
            serviceEndpoint: 'https://blah.com',
            properties: 'otherparams',
          },
        ],
        headlineMetric: {
          claimTemplateId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        },
        embeddedAnalytics: []
      }

      // when ... we call the selector with project entity type
      const projectResult = SUT.selectEntityApiPayload(
        EntityType.Project,
        'somepageid',
      )(state)

      const projectPayload = {
        ...genericPayload,
        ['@type']: 'Project',
        name: 'Some Title',
        description: 'Some Short Description',
        image: 'https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc',
        logo: 'https://pds_pandora.ixo.world/public/xxxjb0xg0dgkeljwtnc',
        brand: 'Some Brand',
        imageDescription: 'Some Image Description',
        location: 'AR',
        sdgs: ['5', '7'],
      }

      // then ... should return result as expected
      expect(projectResult).toEqual(projectPayload)

      // console.log(JSON.stringify(projectPayload))

      // when ... we call the selector with template entity type
      const templateResult = SUT.selectEntityApiPayload(
        EntityType.Template,
        'somepageid',
      )(state)

      const templatePayload = {
        ...genericPayload,
        entityClaims: undefined,
        ['@type']: 'Template',
        name: 'someClaimTitle',
        description: 'someClaimShortDescription',
        sdgs: undefined,
      }

      // then ... should return result as expected
      expect(templateResult).toEqual(templatePayload)

      // console.log(JSON.stringify(templatePayload))
    })
  })
})
