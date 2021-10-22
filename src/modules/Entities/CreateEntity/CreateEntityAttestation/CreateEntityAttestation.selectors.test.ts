import * as SUT from './CreateEntityAttestation.selectors'
import { CreateEntityAttestationState } from './types'
import { Type, ControlType } from 'common/components/JsonForm/types'
// import { EntityClaimType } from 'modules/EntityClaims/types'

let state: any

beforeEach(() => {
  state = {
    createEntityAttestation: {
      claimInfo: {
        title: 'someClaimTitle',
        shortDescription: 'someClaimShortDescription',
        // type: EntityClaimType.Ownership,
        type: 'Ownership',
      },
      questions: {
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someTitle1',
          label: 'someLabel1',
          description: 'someDescription1',
          attributeType: 'someAttributeType1',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 3,
        },
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'someTitle2',
          label: 'someLabel2',
          description: 'someDescription2',
          attributeType: 'someAttributeType2',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 1,
        },
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someTitle3',
          label: 'someLabel3',
          description: 'someDescription3',
          attributeType: 'someAttributeType3',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 2,
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

describe('CreateEntityAdvanced Selectors', () => {
  describe('selectAttestation', () => {
    it('should return the selectAttestation property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectAttestation(state)

      // then ... should return result as expected
      expect(result).toEqual(state.createEntityAttestation)
    })
  })

  describe('selectClaimInfo', () => {
    it('should select the claim info', () => {
      // when ... we call the selector
      const result = SUT.selectClaimInfo(state)

      // then ... should return result as expected
      expect(result).toEqual({
        title: 'someClaimTitle',
        shortDescription: 'someClaimShortDescription',
        // type: EntityClaimType.Ownership,
        type: 'Ownership',
      })
    })
  })

  describe('selectQuestions', () => {
    it('should select the questions as an array in the correct order', () => {
      // when ... we call the selector
      const result = SUT.selectQuestions(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'someTitle2',
          label: 'someLabel2',
          description: 'someDescription2',
          attributeType: 'someAttributeType2',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 1,
        },
        {
          id: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someTitle3',
          label: 'someLabel3',
          description: 'someDescription3',
          attributeType: 'someAttributeType3',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 2,
        },
        {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someTitle1',
          label: 'someLabel1',
          description: 'someDescription1',
          attributeType: 'someAttributeType1',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 3,
        },
      ])
    })
  })

  describe('selectValidation', () => {
    it('should return the validation property', () => {
      // when ... we call the selector
      const result = SUT.selectValidation(state)

      // then ... should return result as expected
      expect(result).toEqual({
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
      })
    })
  })

  describe('selectValidationComplete', () => {
    it('should return false if not every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityAttestation: {
          ...state.createEntityAttestation,
          validation: {
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              validated: true,
              errors: ['someerror'],
            },
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67': {},
            'claiminfo': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('should return true if every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityAttestation: {
          ...state.createEntityAttestation,
          validation: {
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              validated: false,
              errors: ['someerror'],
            },
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67': {},
            '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'claiminfo': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })

    it('should return false if any section has not been validated successfully', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityAttestation: {
          ...state.createEntityAttestation,
          validation: {
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              validated: false,
              errors: ['someerror'],
            },
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67': {
              validated: true,
              errors: [],
            },
            '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              validated: true,
              errors: [],
            },
            'claiminfo': { validated: true, errors: [] },
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('should return true if every section has been validated successfully', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityAttestation: {
          ...state.createEntityAttestation,
          validation: {
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              validated: true,
              errors: [],
            },
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67': {
              validated: true,
              errors: [],
            },
            '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              validated: true,
              errors: [],
            },
            'claiminfo': { validated: true, errors: [] },
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
