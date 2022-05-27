import * as SUT from './EditEntitySettings.selectors'
import { EditEntitySettingsState } from './types'
import {
  EntityStage,
  EntityStatus,
  EntityView,
  PageView,
  TermsOfUseType,
} from '../../../types'

let state: any

beforeEach(() => {
  state = {
    editEntitySettings: {
      creator: {
        displayName: 'someCreatorName',
        location: 'someCreatorCountry',
        email: 'someCreatorEmail',
        website: 'someCreatorWebsite',
        mission: 'someCreatorMission',
        creatorId: 'someCreatorIdentifier',
        credential: 'someCreatorCredentialTokenId',
        fileSrc: 'somefileSrc',
        uploading: false,
      },
      owner: {
        displayName: 'someOwnerName',
        location: 'someOwnerCountry',
        email: 'someOwnerEmail',
        website: 'someOwnerWebsite',
        mission: 'someOwnerMission',
        ownerId: 'someOwnerIdentifier',
        fileSrc: 'somefileSrc',
        uploading: false,
      },
      termsOfUse: {
        type: TermsOfUseType.FreeOpenSource,
        paymentTemplateId: 'somePaymentTemplateId',
      },
      version: {
        versionNumber: 'someVersionNumber',
        effectiveDate: 'someEffectiveDate',
        notes: 'someNotes',
      },
      status: {
        startDate: 'someStatusStartDate',
        endDate: 'someStatusEndDate',
        stage: EntityStage.Closing,
        status: EntityStatus.Live,
      },
      privacy: {
        entityView: EntityView.Encrypted,
        pageView: PageView.Public,
      },
      requiredCredentials: {
        '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          credential: 'someRequiredCredential1',
          issuer: 'someRequiredCredential1Issuer',
        },
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          credential: 'someRequiredCredential2',
          issuer: 'someRequiredCredential2Issuer',
        },
      },
      filters: {
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': ['tag1', 'tag2'],
        '1n9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': ['tag3', 'tag4'],
      },
      displayCredentials: {
        '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa': {
          id: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa',
          credential: 'someDisplayCredential1',
          badge: 'someDisplayCredential1Badge',
        },
        '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          credential: 'someDisplayCredential2',
          badge: 'someDisplayCredential2Badge',
        },
      },
      validation: {
        '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          identifier: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          validated: false,
          errors: ['error1', 'error2'],
        },
      },
      headlineTemplateId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    } as EditEntitySettingsState,
  }
})

describe('EditEntitySettings Selectors', () => {
  describe('selectSettings', () => {
    it('should return the editEntitySettings property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectSettings(state)

      // then ... should return result as expected
      expect(result).toEqual(state.editEntitySettings)
    })
  })

  describe('selectOwner', () => {
    it('should return the owner property', () => {
      // when ... we call the selector
      const result = SUT.selectOwner(state)

      // then ... should return result as expected
      expect(result).toEqual({
        displayName: 'someOwnerName',
        location: 'someOwnerCountry',
        email: 'someOwnerEmail',
        website: 'someOwnerWebsite',
        mission: 'someOwnerMission',
        ownerId: 'someOwnerIdentifier',
        fileSrc: 'somefileSrc',
        uploading: false,
      })
    })
  })

  describe('selectCreator', () => {
    it('should return the creator property', () => {
      // when ... we call the selector
      const result = SUT.selectCreator(state)

      // then ... should return result as expected
      expect(result).toEqual({
        displayName: 'someCreatorName',
        location: 'someCreatorCountry',
        email: 'someCreatorEmail',
        website: 'someCreatorWebsite',
        mission: 'someCreatorMission',
        creatorId: 'someCreatorIdentifier',
        credential: 'someCreatorCredentialTokenId',
        fileSrc: 'somefileSrc',
        uploading: false,
      })
    })
  })

  describe('selectStatus', () => {
    it('should return the status property', () => {
      // when ... we call the selector
      const result = SUT.selectStatus(state)

      // then ... should return result as expected
      expect(result).toEqual({
        startDate: 'someStatusStartDate',
        endDate: 'someStatusEndDate',
        stage: EntityStage.Closing,
        status: EntityStatus.Live,
      })
    })
  })

  describe('selectPrivacy', () => {
    it('should return the privacy property', () => {
      // when ... we call the selector
      const result = SUT.selectPrivacy(state)

      // then ... should return result as expected
      expect(result).toEqual({
        entityView: EntityView.Encrypted,
        pageView: PageView.Public,
      })
    })
  })

  describe('selectRequiredCredentials', () => {
    it('should return the requiredCredentials property', () => {
      // when ... we call the selector
      const result = SUT.selectRequiredCredentials(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          credential: 'someRequiredCredential1',
          issuer: 'someRequiredCredential1Issuer',
        },
        {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          credential: 'someRequiredCredential2',
          issuer: 'someRequiredCredential2Issuer',
        },
      ])
    })
  })

  describe('selectFilters', () => {
    it('should return the filters property', () => {
      // when ... we call the selector
      const result = SUT.selectFilters(state)

      // then ... should return result as expected
      expect(result).toEqual({
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': ['tag1', 'tag2'],
        '1n9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': ['tag3', 'tag4'],
      })
    })
  })

  describe('selectDisplayCredentials', () => {
    it('should return the displayCredentials property', () => {
      // when ... we call the selector
      const result = SUT.selectDisplayCredentials(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa',
          credential: 'someDisplayCredential1',
          badge: 'someDisplayCredential1Badge',
        },
        {
          id: '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          credential: 'someDisplayCredential2',
          badge: 'someDisplayCredential2Badge',
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
        '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          identifier: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
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
        editEntitySettings: {
          ...state.editEntitySettings,
          validation: {
            'privacy': {},
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
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
        editEntitySettings: {
          ...state.editEntitySettings,
          validation: {
            'creator': {},
            'owner': {},
            'status': {},
            // 'termsofuse': {},
            'version': {},
            // 'privacy': {},
            'headline': {},
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa': {},
            '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectValidated', () => {
    it('should return false if any section has not completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityPageContent: {
          ...state.editEntityPageContent,
          validation: {
            'social': {},
            'header': {},
            // 'termsofuse': {},
            'version': {},
            'headline': {},
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })
    it('should return false if any section has not been validated successfully', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntitySettings: {
          ...state.editEntitySettings,
          validation: {
            'creator': { identifier: 'creator', validated: true, errors: [] },
            'owner': { identifier: 'owner', validated: true, errors: [] },
            'status': { identifier: 'status', validated: true, errors: [] },
            'termsofuse': {
              identifier: 'termsofuse',
              validated: true,
              errors: [],
            },
            'version': { identifier: 'version', validated: true, errors: [] },
            'privacy': { identifier: 'privacy', validated: true, errors: [] },
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa': {
              identifier: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa',
              validated: false,
              errors: ['error1'],
            },
            '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
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
        editEntitySettings: {
          ...state.editEntitySettings,
          validation: {
            'creator': { identifier: 'creator', validated: true, errors: [] },
            'owner': { identifier: 'owner', validated: true, errors: [] },
            'status': { identifier: 'status', validated: true, errors: [] },
            // 'termsofuse': {
            //   identifier: 'termsofuse',
            //   validated: true,
            //   errors: [],
            // },
            'version': { identifier: 'version', validated: true, errors: [] },
            // 'privacy': { identifier: 'privacy', validated: true, errors: [] },
            'headline': { identifier: 'headline', validated: true, errors: [] },
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa': {
              identifier: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcbaa',
              validated: true,
              errors: [],
            },
            '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
