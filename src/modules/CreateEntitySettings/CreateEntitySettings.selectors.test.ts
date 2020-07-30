import * as SUT from './CreateEntitySettings.selectors'
import { CreateEntitySettingsState } from './types'
import {
  EntityStage,
  EntityStatus,
  EntityView,
  PageView,
} from '../Entities/types'

let state: any

beforeEach(() => {
  state = {
    createEntitySettings: {
      creator: {
        name: 'someCreatorName',
        country: 'someCreatorCountry',
        email: 'someCreatorEmail',
        website: 'someCreatorWebsite',
        mission: 'someCreatorMission',
        identifier: 'someCreatorIdentifier',
        credentialTokenId: 'someCreatorCredentialTokenId',
        imageDid: 'someImageDid',
        uploadingImage: false,
      },
      owner: {
        name: 'someOwnerName',
        country: 'someOwnerCountry',
        email: 'someOwnerEmail',
        website: 'someOwnerWebsite',
        mission: 'someOwnerMission',
        matrixId: 'someOwnerMatrixId',
        identifier: 'someOwnerIdentifier',
        imageDid: 'someImageDid',
        uploadingImage: false,
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
        '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          credential: 'someDisplayCredential1',
          badge: 'someDisplayCredential1Badge',
        },
        '8b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          credential: 'someDisplayCredential2',
          badge: 'someDisplayCredential2Badge',
        },
      },
    } as CreateEntitySettingsState,
  }
})

describe('CreateEntitySettings Selectors', () => {
  describe('selectSettings', () => {
    it('should return the createEntitySettings property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectSettings(state)

      // then ... should return result as expected
      expect(result).toEqual(state.createEntitySettings)
    })
  })

  describe('selectOwner', () => {
    it('should return the owner property', () => {
      // when ... we call the selector
      const result = SUT.selectOwner(state)

      // then ... should return result as expected
      expect(result).toEqual({
        name: 'someOwnerName',
        country: 'someOwnerCountry',
        email: 'someOwnerEmail',
        website: 'someOwnerWebsite',
        mission: 'someOwnerMission',
        identifier: 'someOwnerIdentifier',
        matrixId: 'someOwnerMatrixId',
        imageDid: 'someImageDid',
        uploadingImage: false,
      })
    })
  })

  describe('selectCreator', () => {
    it('should return the creator property', () => {
      // when ... we call the selector
      const result = SUT.selectCreator(state)

      // then ... should return result as expected
      expect(result).toEqual({
        name: 'someCreatorName',
        country: 'someCreatorCountry',
        email: 'someCreatorEmail',
        website: 'someCreatorWebsite',
        mission: 'someCreatorMission',
        identifier: 'someCreatorIdentifier',
        credentialTokenId: 'someCreatorCredentialTokenId',
        imageDid: 'someImageDid',
        uploadingImage: false,
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
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          credential: 'someDisplayCredential1',
          badge: 'someDisplayCredential1Badge',
        },
        {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          credential: 'someDisplayCredential2',
          badge: 'someDisplayCredential2Badge',
        },
      ])
    })
  })
})
