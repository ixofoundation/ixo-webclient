// import { EntityClaimType } from '../types'
import { SubmitEntityClaimState } from './types'
import * as SUT from './SubmitEntityClaim.selectors'

let state: any

const RealDate = Date.now

beforeAll(() => {
  global.Date.now = jest.fn(() =>
    new Date('2019-04-23T13:20:30.000Z').getTime(),
  )
})

afterAll(() => {
  global.Date.now = RealDate
})

beforeEach(() => {
  state = {
    account: {
      userInfo: {
        didDoc: {
          did: 'someCreatorDid',
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
    selectedEntity: {
      did: 'someEntityDid',
    },
    submitEntityClaim: {
      templateDid: 'someTemplateDid',
      claimTitle: 'Some Claim Title',
      claimShortDescription: 'Some Claim Short Description',
      // type: EntityClaimType.Custody,
      type: 'Custody',
      questions: [
        {
          '@type': 'https://schema.org/1',
          'schema': {
            title: 'Selector Rate out of 10',
            description:
              'Provide a short explanation or instruction for the question (optional). ',
            type: 'object',
            required: ['00000001-3b7d-4bad-9bdd-2b0d7b3dcb67'],
            properties: {
              '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                type: 'string',
                title:
                  'Rate the below from 1 to 10 with 1 bring terrible and 10 being excellent',
                enum: ['1', '2', '3'],
                items: { type: 'string' },
                uniqueItems: true,
              },
            },
          },
          'uiSchema': {
            '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
              'ui:widget': 'radio',
              'ui:options': { inline: true },
            },
          },
        },
        {
          '@type': 'https://schema.org/2',
          'schema': {
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
          'uiSchema': {
            '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67': {
              'ui:widget': 'locationselector',
              'ui:options': {},
            },
          },
        },
      ],
      currentQuestionNo: 2,
      answers: {
        '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': '2',
        '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67':
          '{"address":"Highgate Views, 5 Smith St, Perth WA 6000, Australia","city":"City of Vincent","area":"","state":"Western Australia","lat":-31.94307,"lng":115.86966}',
      },
      answersComplete: true,
      savingAnswer: true,
      creating: true,
      created: true,
      error: 'some error occured',
    } as SubmitEntityClaimState,
  }
})

describe('SubmitEntityClaim Selectors', () => {
  describe('selectSubmitEntityClaim', () => {
    it('should return the submitEntityClaim state', () => {
      // when ... we call the selector
      const result = SUT.selectSubmitEntityClaim(state)
      // then ... should return result as expected
      expect(result).toEqual(state.submitEntityClaim)
    })
  })

  describe('selectQuestions', () => {
    it('should return the questions', () => {
      // when ... we call the selector
      const result = SUT.selectQuestions(state)
      // then ... should return result as expected
      expect(result).toEqual([
        {
          '@type': 'https://schema.org/1',
          'schema': {
            title: 'Selector Rate out of 10',
            description:
              'Provide a short explanation or instruction for the question (optional). ',
            type: 'object',
            required: ['00000001-3b7d-4bad-9bdd-2b0d7b3dcb67'],
            properties: {
              '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
                type: 'string',
                title:
                  'Rate the below from 1 to 10 with 1 bring terrible and 10 being excellent',
                enum: ['1', '2', '3'],
                items: { type: 'string' },
                uniqueItems: true,
              },
            },
          },
          'uiSchema': {
            '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': {
              'ui:widget': 'radio',
              'ui:options': { inline: true },
            },
          },
        },
        {
          '@type': 'https://schema.org/2',
          'schema': {
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
          'uiSchema': {
            '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67': {
              'ui:widget': 'locationselector',
              'ui:options': {},
            },
          },
        },
      ])
    })
  })

  describe('selectCurrentQuestionNo', () => {
    it('should return the current question no', () => {
      // when ... we call the selector
      const result = SUT.selectCurrentQuestionNo(state)
      // then ... it should return the result as expected
      expect(result).toEqual(2)
    })
  })

  describe('selectCurrentQuestion', () => {
    it('should return the current question', () => {
      // when ... we call the selector
      const result = SUT.selectCurrentQuestion(state)
      // then ... it should return the result as expected
      expect(result).toEqual({
        '@type': 'https://schema.org/2',
        'schema': {
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
        'uiSchema': {
          '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67': {
            'ui:widget': 'locationselector',
            'ui:options': {},
          },
        },
      })
    })
  })

  describe('selectQuestionCount', () => {
    it('should return the number of questions', () => {
      // when ... we call the selector
      const result = SUT.selectQuestionCount(state)
      // then ... it should return the result as expected
      expect(result).toEqual(2)
    })
  })

  describe('selectTemplateDid', () => {
    it('should return the claim did', () => {
      // when ... we call the selector
      const result = SUT.selectTemplateDid(state)
      // then ... it should return the result as expected
      expect(result).toEqual('someTemplateDid')
    })
  })

  describe('selectClaimTitle', () => {
    it('should return the claim title', () => {
      // when ... we call the selector
      const result = SUT.selectClaimTitle(state)
      // then ... it should return the result as expected
      expect(result).toEqual('Some Claim Title')
    })
  })

  describe('selectClaimShortDescription', () => {
    it('should return the claim short descriptoin', () => {
      // when ... we call the selector
      const result = SUT.selectClaimShortDescription(state)
      // then ... it should return the result as expected
      expect(result).toEqual('Some Claim Short Description')
    })
  })

  describe('selectClaimType', () => {
    it('should return the claim type', () => {
      // when ... we call the selector
      const result = SUT.selectClaimType(state)
      // then ... it should return the result as expected
      // expect(result).toEqual(EntityClaimType.Custody)
      expect(result).toEqual('Custody')
    })
  })

  describe('selectAnswers', () => {
    it('should return the answers', () => {
      // when ... we call the selector
      const result = SUT.selectAnswers(state)
      // then ... it should return the result as expected
      expect(result).toEqual({
        '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67': '2',
        '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67':
          '{"address":"Highgate Views, 5 Smith St, Perth WA 6000, Australia","city":"City of Vincent","area":"","state":"Western Australia","lat":-31.94307,"lng":115.86966}',
      })
    })
  })

  describe('selectCurrentAnswer', () => {
    it('should ', () => {
      // when ... we call the selector
      const result = SUT.selectCurrentAnswer(state)
      // then ... it should return the result as expected
      expect(result).toEqual({
        '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67':
          '{"address":"Highgate Views, 5 Smith St, Perth WA 6000, Australia","city":"City of Vincent","area":"","state":"Western Australia","lat":-31.94307,"lng":115.86966}',
      })
    })
  })

  describe('selectSavingAnswer', () => {
    it('should return the savingAnswer flag', () => {
      // when ... we call the selector
      const result = SUT.selectSavingAnswer(state)
      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectAnswersComplete', () => {
    it('should return the selectAnswersComplete flag', () => {
      // when ... we call the selector
      const result = SUT.selectAnswersComplete(state)
      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectAnswersComplete', () => {
    it('should return the selectAnswersComplete flag', () => {
      // when ... we call the selector
      const result = SUT.selectAnswersComplete(state)
      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectSending', () => {
    it('should return the creating flag', () => {
      // when ... we call the selector
      const result = SUT.selectCreating(state)
      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectSent', () => {
    it('should return the created flag', () => {
      // when ... we call the selector
      const result = SUT.selectCreated(state)
      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectError', () => {
    it('should return the error', () => {
      // when ... we call the selector
      const result = SUT.selectError(state)
      // then ... should return result as expected
      expect(result).toEqual('some error occured')
    })
  })

  describe('selectClaimApiPayload', () => {
    it('should return the payload for the api', () => {
      // when ... we call the selector
      const result = SUT.selectClaimApiPayload(state)
      // then ... it should return the result as expected
      expect(result).toEqual({
        ['@context']:
          'https://schema.ixo.foundation/claims/53690e7d550278dbe228ddf35e0ba72b2666cba6',
        id: 'someTemplateDid',
        type: 'Custody',
        issuerId: 'someCreatorDid',
        claimSubject: {
          id: 'someEntityDid',
        },
        items: [
          {
            id: '00000001-3b7d-4bad-9bdd-2b0d7b3dcb67',
            attribute: 'https://schema.org/1',
            value: '2',
          },
          {
            id: '00000002-3b7d-4bad-9bdd-2b0d7b3dcb67',
            attribute: 'https://schema.org/2',
            value:
              '{"address":"Highgate Views, 5 Smith St, Perth WA 6000, Australia","city":"City of Vincent","area":"","state":"Western Australia","lat":-31.94307,"lng":115.86966}',
          },
        ],
        dateTime: '2019-04-23T13:20:30.000Z',
        projectDid: 'someEntityDid',
        claimTemplateId: "someTemplateDid"
      })
    })
  })
})
