import * as SUT from './CreateEntity.selectors'
import { CreateEntityState } from './types'
import { EntityType } from 'modules/EntityModules/Entities/types'
import { CreateEntityPageContentState } from 'modules/EntityModules/CreateEntityPageContent/types'
import { CreateEntityAttestationState } from 'modules/EntityModules/CreateEntityAttestation/types'
import { Type, ControlType } from 'common/components/JsonForm/types'

let state: any

beforeEach(() => {
  state = {
    createEntity: {
      step: 1,
      entityType: EntityType.Investment,
    } as CreateEntityState,
    createEntityPageContent: {
      header: {
        title: 'someHeaderTitle',
        shortDescription: 'someHeaderShortDescription',
        fileSrc: 'someHeaderfileSrc',
        imageDescription: 'someHeaderImageDescription',
        sdgs: ['sdg1', 'sdg2', 'sdg3'],
        organisation: 'someHeaderCompany',
        location: 'ZA',
        uploading: false,
      },
      body: {
        '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someBody1Title',
          content: 'someBody1Content',
          fileSrc: 'someBody1fileSrc',
          uploading: false,
        },
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someBody2Title',
          content: 'someBody2Content',
          fileSrc: 'someBody2fileSrc',
          uploading: false,
        },
      },
      images: {
        'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: 'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someImage1Title',
          content: 'someImage1Content',
          fileSrc: 'someImage1fileSrc',
          imageDescription: 'someImage1ImageDescription',
          uploading: false,
        },
        'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: 'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someImage2Title',
          content: 'someImage2Content',
          fileSrc: 'someImage2fileSrc',
          imageDescription: 'someImage2ImageDescription',
          uploading: false,
        },
      },
      profiles: {
        'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: 'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          name: 'someProfileName1',
          position: 'someProfilePosition1',
          linkedInUrl: 'someProfileLinkedInUrl1',
          twitterUrl: 'someProfileTwitterUrl1',
          fileSrc: 'someProfilefileSrc1',
          uploading: false,
        },
        'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: 'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          name: 'someProfileName2',
          position: 'someProfilePosition2',
          linkedInUrl: 'someProfileLinkedInUrl2',
          twitterUrl: 'someProfileTwitterUrl2',
          fileSrc: 'someProfilefileSrc2',
          uploading: false,
        },
      },
      social: {
        linkedInUrl: 'someSocialLinkedInUrl',
        facebookUrl: 'someSocialFacebookUrl',
        twitterUrl: 'someSocialTwitterUrl',
        discourseUrl: 'someSocialDiscourseUrl',
        instagramUrl: 'someSocialInstagramUrl',
        telegramUrl: 'someSocialTelegramUrl',
        githubUrl: 'someSocialGithubUrl',
        otherUrl: 'someSocialOtherUrl',
      },
      embedded: {
        'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someEmbeddedTitle1',
          urls: ['url1', 'url2'],
        },
        'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someEmbeddedTitle2',
          urls: ['url3', 'url4'],
        },
      },
      validation: {
        'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          identifier: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          validated: false,
          errors: ['error1', 'error2'],
        },
      },
    } as CreateEntityPageContentState,
    createEntityAttestation: {
      claimInfo: {
        title: 'someClaimTitle',
        shortDescription: 'someClaimShortDescription',
      },
      questions: {
        '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Selector Rate out of 10',
          description:
            'This will be a short description or explainer text explaining the question. ',
          label:
            'Rate the below from 1 to 10 with 1 bring terrible and 10 being excellent',
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
            'This will be a short description or explainer text explaining the question. ',
          label: 'Location',
          required: true,
          type: 'string',
          control: 'locationselector',
          order: 2,
        },
        '00000003-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000003-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Date Picker',
          description:
            'This will be a short description or explainer text explaining the question. ',
          label: 'Dates',
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
            'This will be a short description or explainer text explaining the question. ',
          label: 'Select an avatar to upload',
          required: true,
          type: 'string',
          control: 'avatarupload',
          order: 4,
        },
        '00000005-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000005-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Upload an Image',
          description:
            'This will be a short description or explainer text explaining the question. ',
          label: 'Select an image to upload',
          required: true,
          type: 'string',
          control: 'imageupload',
          order: 5,
        },
        '00000006-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000006-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Upload a Video',
          description:
            'This will be a short description or explainer text explaining the question. ',
          label: 'Select a video to upload',
          required: true,
          type: 'string',
          control: 'videoupload',
          order: 6,
        },
        '00000007-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000007-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'Upload a Document',
          description:
            'This will be a short description or explainer text explaining the question. ',
          label: 'Select a document to upload',
          required: true,
          type: 'string',
          control: 'documentupload',
          order: 7,
        },
        '00000008-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '00000008-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'QR Code',
          description:
            'This will be a short description or explainer text explaining the question. ',
          label: 'QR Code',
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
            'This will be a short description or explainer text explaining the question. ',
          label: 'Short Answer',
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
            'This will be a short description or explainer text explaining the question. ',
          label: 'Long Answer',
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
            'This will be a short description or explainer text explaining the question. ',
          label: 'Select 1 to 2 options',
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
            'This will be a short description or explainer text explaining the question. ',
          label: 'Date of pickup',
          required: true,
          type: 'string',
          control: 'singledateselector',
          placeholder: 'Select Date',
          order: 12,
        },
      },
      validation: {
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          identifier: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67',
          validated: true,
          errors: [],
        },
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: false,
          errors: ['error1', 'error2'],
        },
      },
    } as CreateEntityAttestationState,
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
      expect(result).toEqual(EntityType.Investment)
    })
  })

  describe('selectPageContentApiPayload', () => {
    it('should select the page content payload', () => {
      // when we call selectPageContentApiPayload it should return the correct payload
      const pageContent = SUT.selectPageContentApiPayload(state)

      expect(pageContent).toEqual({
        header: {
          title: 'someHeaderTitle',
          shortDescription: 'someHeaderShortDescription',
          image: 'someHeaderfileSrc',
          imageDescription: 'someHeaderImageDescription',
          sdgs: ['sdg1', 'sdg2', 'sdg3'],
          organisation: 'someHeaderCompany',
          location: 'ZA',
        },
        body: [
          {
            title: 'someBody1Title',
            content: 'someBody1Content',
            image: 'someBody1fileSrc',
          },
          {
            title: 'someBody2Title',
            content: 'someBody2Content',
            image: 'someBody2fileSrc',
          },
        ],
        images: [
          {
            title: 'someImage1Title',
            content: 'someImage1Content',
            image: 'someImage1fileSrc',
            imageDescription: 'someImage1ImageDescription',
          },
          {
            title: 'someImage2Title',
            content: 'someImage2Content',
            image: 'someImage2fileSrc',
            imageDescription: 'someImage2ImageDescription',
          },
        ],
        profiles: [
          {
            name: 'someProfileName1',
            position: 'someProfilePosition1',
            linkedInUrl: 'someProfileLinkedInUrl1',
            twitterUrl: 'someProfileTwitterUrl1',
            image: 'someProfilefileSrc1',
          },
          {
            name: 'someProfileName2',
            position: 'someProfilePosition2',
            linkedInUrl: 'someProfileLinkedInUrl2',
            twitterUrl: 'someProfileTwitterUrl2',
            image: 'someProfilefileSrc2',
          },
        ],
        social: {
          linkedInUrl: 'someSocialLinkedInUrl',
          facebookUrl: 'someSocialFacebookUrl',
          twitterUrl: 'someSocialTwitterUrl',
          discourseUrl: 'someSocialDiscourseUrl',
          instagramUrl: 'someSocialInstagramUrl',
          telegramUrl: 'someSocialTelegramUrl',
          githubUrl: 'someSocialGithubUrl',
          otherUrl: 'someSocialOtherUrl',
        },
        embedded: [
          {
            title: 'someEmbeddedTitle1',
            urls: ['url1', 'url2'],
          },
          {
            title: 'someEmbeddedTitle2',
            urls: ['url3', 'url4'],
          },
        ],
      })
    })
  })

  describe('selectAttestationApiPayload', () => {
    it('should select the attestation payload', () => {
      // when we call selectAttestationApiPayload it should return the correct payload
      const attestation = SUT.selectAttestationApiPayload(state)

      expect(attestation).toEqual({
        claimInfo: {
          title: 'someClaimTitle',
          shortDescription: 'someClaimShortDescription',
        },
        forms: [
          {
            schema: {
              title: 'Selector Rate out of 10',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Enter Location',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Date Picker',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Upload an Avatar/Profile Pic',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Upload an Image',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Upload a Video',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Upload a Document',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'QR Code',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Short Text Question',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Long Text Question',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Select some of the text items below',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
            schema: {
              title: 'Date Picker',
              description:
                'This will be a short description or explainer text explaining the question. ',
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
      })
    })
  })
})
