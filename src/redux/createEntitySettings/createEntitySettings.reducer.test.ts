import * as SUT from './createEntitySettings.reducer'
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
  ValidatedAction,
  ValidationErrorAction,
  UpdateTermsOfUseAction,
  UpdateVersionAction,
} from './createEntitySettings.types'
import {
  EntityStage,
  EntityStatus,
  EntityView,
  PageView,
  TermsOfUseType,
  EntityType,
} from '../../modules/Entities/types'
import { NewEntityAction, CreateEntityActions, CreateEntitySuccessAction } from '../createEntityOld/createEntity.types'

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
        const displayName = 'someCreatorName'
        const location = 'someCreatorCountry'
        const email = 'someCreatorEmail'
        const website = 'someCreatorWebsite'
        const mission = 'someCreatorMission'
        const creatorId = 'someCreatorIdentifier'
        const credential = 'someCreatorCredentialTokenId'
        const fileSrc = 'someExistingfileSrc'

        // given .. we have an action of type CreateEntitySettingsActions.UpdateCreator
        const action: UpdateCreatorAction = {
          type: CreateEntitySettingsActions.UpdateCreator,
          payload: {
            displayName,
            location,
            email,
            website,
            mission,
            creatorId,
            credential,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            creator: { ...initialState.creator, fileSrc },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          creator: {
            displayName,
            location,
            email,
            website,
            mission,
            creatorId,
            credential,
            fileSrc,
            uploading: false,
          },
        })
      })
    })

    describe('creatorImage', () => {
      it('should update the creator uploading flag to true when upload has started', () => {
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
            uploading: true,
          },
        })
      })

      it('should update the creator uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const fileSrc = 'somefileSrc'

        // given .. we have an action of type CreateEntitySettingsActions.UploadCreatorImageSuccess
        const action: UploadCreatorImageSuccessAction = {
          type: CreateEntitySettingsActions.UploadCreatorImageSuccess,
          payload: {
            fileSrc,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            creator: {
              ...initialState.creator,
              uploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          creator: {
            ...initialState.creator,
            fileSrc,
            uploading: false,
          },
        })
      })

      it('should update the creator uploading flag to false and set the fileSrc when upload has failed', () => {
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
              uploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          creator: {
            ...initialState.creator,
            uploading: false,
          },
        })
      })
    })
  })

  describe('Owner Actions', () => {
    describe('owner', () => {
      it('should update the owner', () => {
        const displayName = 'someOwnerName'
        const location = 'someOwnerCountry'
        const email = 'someOwnerEmail'
        const website = 'someOwnerWebsite'
        const mission = 'someOwnerMission'
        const ownerId = 'someOwnerIdentifier'
        const fileSrc = 'someExistingfileSrc'

        // given .. we have an action of type CreateEntitySettingsActions.UpdateOwner
        const action: UpdateOwnerAction = {
          type: CreateEntitySettingsActions.UpdateOwner,
          payload: {
            displayName,
            location,
            email,
            website,
            mission,
            ownerId,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            owner: { ...initialState.owner, fileSrc },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          owner: {
            displayName,
            location,
            email,
            website,
            mission,
            ownerId,
            fileSrc,
            uploading: false,
          },
        })
      })
    })

    describe('ownerImage', () => {
      it('should update the owner uploading flag to true when upload has started', () => {
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
            uploading: true,
          },
        })
      })

      it('should update the owner uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const fileSrc = 'somefileSrc'

        // given .. we have an action of type CreateEntitySettingsActions.UploadOwnerImageSuccess
        const action: UploadOwnerImageSuccessAction = {
          type: CreateEntitySettingsActions.UploadOwnerImageSuccess,
          payload: {
            fileSrc,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            owner: {
              ...initialState.owner,
              uploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          owner: {
            ...initialState.owner,
            fileSrc,
            uploading: false,
          },
        })
      })

      it('should update the owner uploading flag to false and set the fileSrc when upload has failed', () => {
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
              uploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          owner: {
            ...initialState.owner,
            uploading: false,
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

  describe('TermsOfUse Actions', () => {
    it('should update the terms of use', () => {
      const type = TermsOfUseType.OnceOffFee
      const paymentTemplateId = 'somePaymentTemplateId'

      // given .. we have an action of type CreateEntitySettingsActions.UpdateTermsOfUse
      const action: UpdateTermsOfUseAction = {
        type: CreateEntitySettingsActions.UpdateTermsOfUse,
        payload: {
          type,
          paymentTemplateId,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        termsOfUse: {
          type,
          paymentTemplateId,
        },
      })
    })
  })

  describe('Version Actions', () => {
    it('should update the version', () => {
      const versionNumber = 'someVersionNumber'
      const effectiveDate = 'someEffectiveDate'
      const notes = 'someNotes'

      // given .. we have an action of type CreateEntitySettingsActions.UpdateVersion
      const action: UpdateVersionAction = {
        type: CreateEntitySettingsActions.UpdateVersion,
        payload: {
          versionNumber,
          effectiveDate,
          notes,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        version: {
          versionNumber,
          effectiveDate,
          notes,
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
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        requiredCredentials: {
          ...initialState.requiredCredentials,
          [id]: {
            id,
            credential: undefined,
            issuer: undefined,
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
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        displayCredentials: {
          ...initialState.displayCredentials,
          [id]: {
            id,
            credential: undefined,
            badge: undefined,
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

  describe('validation', () => {
    it('should set validated to true and clear any errors', () => {
      const identifier = 'someBodySectionId'
      const errors = ['error1', 'error2']
      // given ... we have an action of type CreateEntityPageContentActions.SetValidated
      const action: ValidatedAction = {
        type: CreateEntitySettingsActions.Validated,
        payload: {
          identifier,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          validation: {
            [identifier]: {
              identifier,
              validated: false,
              errors,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      })
    })
  })

  it('should set validated to false and add any errors', () => {
    const identifier = 'someBodySectionId'
    const errors = ['error1', 'error2']
    // given ... we have an action of type CreateEntityPageContentActions.SetValidated
    const action: ValidationErrorAction = {
      type: CreateEntitySettingsActions.ValidationError,
      payload: {
        errors,
        identifier,
      },
    }

    // when ... we run the reducer with this action
    const result = SUT.reducer(
      {
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      },
      action,
    )

    // then ... the state should be set as expected
    expect(result).toEqual({
      ...initialState,
      validation: {
        [identifier]: {
          identifier,
          validated: false,
          errors,
        },
      },
    })
  })

  describe('NewEntity Actions', () => {
    it('should return initial state if a new entity action type is received', () => {
      // given ... we have an action of type CreateEntityActions.NewEntity
      const action: NewEntityAction = {
        type: CreateEntityActions.NewEntity,
        payload: {
          entityType: EntityType.Dao,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          version: {
            effectiveDate: 'someDataThatShouldBeCleated',
            versionNumber: 'someDataThatShouldBeCleared',
            notes: 'someDataThatShouldBeCleated',
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })

  describe('CreateEntitySuccess Actions', () => {
    it('should return initial state if a CreateEntitySuccess type is received', () => {
      // given ... we have an action of type CreateEntityActions.CreateEntitySuccess
      const action: CreateEntitySuccessAction = {
        type: CreateEntityActions.CreateEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          version: {
            effectiveDate: 'someDataThatShouldBeCleated',
            versionNumber: 'someDataThatShouldBeCleared',
            notes: 'someDataThatShouldBeCleated',
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})
