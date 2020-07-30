import * as SUT from './CreateEntitySettings.reducer'
import {
  UpdateOwnerAction,
  CreateEntitySettingsActions,
  UploadOwnerImagePendingAction,
  UploadOwnerImageSuccessAction,
  UploadOwnerImageFailureAction,
  UpdateCreatorAction,
  UploadCreatorImagePendingAction,
  UploadCreatorImageSuccessAction,
  UploadCreatorImageFailureAction,
  UpdateStatusAction,
  UpdatePrivacyAction,
  AddRequiredCredentialSectionAction,
  RemoveRequiredCredentialSectionAction,
  UpdateRequiredCredentialAction,
  AddDisplayCredentialSectionAction,
  RemoveDisplayCredentialSectionAction,
  UpdateDisplayCredentialAction,
  UpdateFiltersAction,
} from './types'
import {
  EntityStage,
  EntityStatus,
  EntityView,
  PageView,
} from '../Entities/types'

const initialState = SUT.initialState

describe('CreateEntitySettings Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('Creator Actions', () => {
    describe('creator', () => {
      it('should update the creator', () => {
        const name = 'someCreatorName'
        const country = 'someCreatorCountry'
        const email = 'someCreatorEmail'
        const website = 'someCreatorWebsite'
        const mission = 'someCreatorMission'
        const identifier = 'someCreatorIdentifier'
        const credentialTokenId = 'someCreatorCredentialTokenId'
        const imageDid = 'someExistingImageDid'

        // given .. we have an action of type CreateEntitySettingsActions.UpdateCreator
        const action: UpdateCreatorAction = {
          type: CreateEntitySettingsActions.UpdateCreator,
          payload: {
            name,
            country,
            email,
            website,
            mission,
            identifier,
            credentialTokenId,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            creator: { ...initialState.creator, imageDid },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          creator: {
            name,
            country,
            email,
            website,
            mission,
            identifier,
            credentialTokenId,
            imageDid,
            uploadingImage: false,
          },
        })
      })
    })

    describe('creatorImage', () => {
      it('should update the creator uploadingImage flag to true when upload has started', () => {
        // given .. we have an action of type CreateEntitySettingsActions.UploadCreatorImagePending
        const action: UploadCreatorImagePendingAction = {
          type: CreateEntitySettingsActions.UploadCreatorImagePending,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          creator: {
            ...initialState.creator,
            uploadingImage: true,
          },
        })
      })

      it('should update the creator uploadingImage flag to false and set the imageDid when upload has succeeded', () => {
        const imageDid = 'someImageDid'

        // given .. we have an action of type CreateEntitySettingsActions.UploadCreatorImageSuccess
        const action: UploadCreatorImageSuccessAction = {
          type: CreateEntitySettingsActions.UploadCreatorImageSuccess,
          payload: {
            did: imageDid,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            creator: {
              ...initialState.creator,
              uploadingImage: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          creator: {
            ...initialState.creator,
            imageDid,
            uploadingImage: false,
          },
        })
      })

      it('should update the creator uploadingImage flag to false and set the imageDid when upload has failed', () => {
        // given .. we have an action of type CreateEntitySettingsActions.UploadCreatorImageFailure
        const action: UploadCreatorImageFailureAction = {
          type: CreateEntitySettingsActions.UploadCreatorImageFailure,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            creator: {
              ...initialState.creator,
              uploadingImage: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          creator: {
            ...initialState.creator,
            uploadingImage: false,
          },
        })
      })
    })
  })

  describe('Owner Actions', () => {
    describe('owner', () => {
      it('should update the owner', () => {
        const name = 'someOwnerName'
        const country = 'someOwnerCountry'
        const email = 'someOwnerEmail'
        const website = 'someOwnerWebsite'
        const mission = 'someOwnerMission'
        const identifier = 'someOwnerIdentifier'
        const matrixId = 'someOwneMatrixId'
        const imageDid = 'someExistingImageDid'

        // given .. we have an action of type CreateEntitySettingsActions.UpdateOwner
        const action: UpdateOwnerAction = {
          type: CreateEntitySettingsActions.UpdateOwner,
          payload: {
            name,
            country,
            email,
            website,
            mission,
            identifier,
            matrixId,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            owner: { ...initialState.owner, imageDid },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          owner: {
            name,
            country,
            email,
            website,
            mission,
            identifier,
            matrixId,
            imageDid,
            uploadingImage: false,
          },
        })
      })
    })

    describe('ownerImage', () => {
      it('should update the owner uploadingImage flag to true when upload has started', () => {
        // given .. we have an action of type CreateEntitySettingsActions.UploadOwnerImagePending
        const action: UploadOwnerImagePendingAction = {
          type: CreateEntitySettingsActions.UploadOwnerImagePending,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          owner: {
            ...initialState.owner,
            uploadingImage: true,
          },
        })
      })

      it('should update the owner uploadingImage flag to false and set the imageDid when upload has succeeded', () => {
        const imageDid = 'someImageDid'

        // given .. we have an action of type CreateEntitySettingsActions.UploadOwnerImageSuccess
        const action: UploadOwnerImageSuccessAction = {
          type: CreateEntitySettingsActions.UploadOwnerImageSuccess,
          payload: {
            did: imageDid,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            owner: {
              ...initialState.owner,
              uploadingImage: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          owner: {
            ...initialState.owner,
            imageDid,
            uploadingImage: false,
          },
        })
      })

      it('should update the owner uploadingImage flag to false and set the imageDid when upload has failed', () => {
        // given .. we have an action of type CreateEntitySettingsActions.UploadOwnerImageFailure
        const action: UploadOwnerImageFailureAction = {
          type: CreateEntitySettingsActions.UploadOwnerImageFailure,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            owner: {
              ...initialState.owner,
              uploadingImage: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          owner: {
            ...initialState.owner,
            uploadingImage: false,
          },
        })
      })
    })
  })

  describe('Status Actions', () => {
    it('should update the status', () => {
      const startDate = 'someStartDate'
      const endDate = 'someEndDate'
      const stage = EntityStage.Paused
      const status = EntityStatus.Stopped

      // given .. we have an action of type CreateEntitySettingsActions.UpdateStatus
      const action: UpdateStatusAction = {
        type: CreateEntitySettingsActions.UpdateStatus,
        payload: {
          startDate,
          endDate,
          stage,
          status,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        status: {
          startDate,
          endDate,
          stage,
          status,
        },
      })
    })
  })
  describe('Privacy Actions', () => {
    it('should update the privacy', () => {
      const pageView = PageView.Public
      const entityView = EntityView.Encrypted

      // given .. we have an action of type CreateEntitySettingsActions.UpdatePrivacy
      const action: UpdatePrivacyAction = {
        type: CreateEntitySettingsActions.UpdatePrivacy,
        payload: {
          pageView,
          entityView,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        privacy: {
          pageView,
          entityView,
        },
      })
    })
  })

  describe('RequiredCredential Actions', () => {
    it('should add a new required credential section', () => {
      const id = 'someRequiredCredentialSectionId'
      // given ... we have an action of type CreateEntitySettingsActions.AddRequiredCredentialSection
      const action: AddRequiredCredentialSectionAction = {
        type: CreateEntitySettingsActions.AddRequiredCredentialSection,
        payload: {
          id,
          credential: null,
          issuer: null,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        requiredCredentials: {
          [id]: {
            id,
            credential: null,
            issuer: null,
          },
        },
      })
    })

    it('should remove required credential section', () => {
      const id = 'existingRequiredCredentialSectionId'
      // given ... we have an action of type CreateEntitySettingsActions.RemoveRequiredCredentialSection
      const action: RemoveRequiredCredentialSectionAction = {
        type: CreateEntitySettingsActions.RemoveRequiredCredentialSection,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          requiredCredentials: {
            [id]: {
              id,
              credential: 'someRequiredCredential1',
              issuer: 'someIssuer1',
            },
            ['anotherid']: {
              id: 'anotherid',
              credential: 'someRequiredCredential2',
              issuer: 'someIssuer2',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        requiredCredentials: {
          ['anotherid']: {
            id: 'anotherid',
            credential: 'someRequiredCredential2',
            issuer: 'someIssuer2',
          },
        },
      })
    })

    it('should update required credential', () => {
      const id = 'someId'
      const credential = 'someRequiredCredential'
      const issuer = 'someIssuer'

      // given .. we have an action of type CreateEntitySettingsActions.UpdateRequiredCredentialContent
      const action: UpdateRequiredCredentialAction = {
        type: CreateEntitySettingsActions.UpdateRequiredCredential,
        payload: {
          id,
          credential,
          issuer,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          requiredCredentials: {
            [id]: {
              id,
              credential: 'someOldRequiredCredential',
              issuer: 'someOldIssuer',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        requiredCredentials: {
          [id]: {
            id,
            credential,
            issuer,
          },
        },
      })
    })
  })

  describe('DisplayCredential Actions', () => {
    it('should add a new display credential section', () => {
      const id = 'someDisplayCredentialSectionId'
      // given ... we have an action of type CreateEntitySettingsActions.AddDisplayCredentialSection
      const action: AddDisplayCredentialSectionAction = {
        type: CreateEntitySettingsActions.AddDisplayCredentialSection,
        payload: {
          id,
          credential: null,
          badge: null,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        displayCredentials: {
          [id]: {
            id,
            credential: null,
            badge: null,
          },
        },
      })
    })

    it('should remove display credential section', () => {
      const id = 'existingDisplayCredentialSectionId'
      // given ... we have an action of type CreateEntitySettingsActions.RemoveDisplayCredentialSection
      const action: RemoveDisplayCredentialSectionAction = {
        type: CreateEntitySettingsActions.RemoveDisplayCredentialSection,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          displayCredentials: {
            [id]: {
              id,
              credential: 'someDisplayCredential1',
              badge: 'someBadge1',
            },
            ['anotherid']: {
              id: 'anotherid',
              credential: 'someDisplayCredential2',
              badge: 'someBadge2',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        displayCredentials: {
          ['anotherid']: {
            id: 'anotherid',
            credential: 'someDisplayCredential2',
            badge: 'someBadge2',
          },
        },
      })
    })

    it('should update the display credential', () => {
      const id = 'someId'
      const credential = 'someDisplayCredential'
      const badge = 'someBadge'

      // given .. we have an action of type CreateEntitySettingsActions.UpdateDisplayCredentialContent
      const action: UpdateDisplayCredentialAction = {
        type: CreateEntitySettingsActions.UpdateDisplayCredential,
        payload: {
          id,
          credential,
          badge,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          displayCredentials: {
            [id]: {
              id,
              credential: 'someOldDisplayCredential',
              badge: 'someOldBadge',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        displayCredentials: {
          [id]: {
            id,
            credential,
            badge,
          },
        },
      })
    })
  })

  describe('Filter Actions', () => {
    it('should update the filters', () => {
      const filters = {
        newName1: ['aa', 'bb', 'cc'],
        newName2: ['11', '22', '33'],
      }

      // given .. we have an action of type CreateEntitySettingsActions.UpdateFilter
      const action: UpdateFiltersAction = {
        type: CreateEntitySettingsActions.UpdateFilters,
        payload: filters,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          filters: {
            oldName1: ['a', 'b', 'c'],
            oldName2: ['1', '2', '3'],
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        filters,
      })
    })
  })
})
