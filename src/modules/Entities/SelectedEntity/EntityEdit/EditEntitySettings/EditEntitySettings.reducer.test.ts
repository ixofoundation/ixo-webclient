import * as SUT from './EditEntitySettings.reducer'
import {
  UpdateOwnerAction,
  EditEntitySettingsActions,
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
} from './types'
import { EntityStage, EntityStatus, EntityView, PageView, TermsOfUseType, EntityType } from '../../../types'
import { NewEntityAction, EditEntityActions, EditEntitySuccessAction } from '../types'

const initialState = SUT.initialState

describe('EditEntitySettings Reducer', () => {
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

        // given .. we have an action of type EditEntitySettingsActions.UpdateCreator
        const action: UpdateCreatorAction = {
          type: EditEntitySettingsActions.UpdateCreator,
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
        // given .. we have an action of type EditEntitySettingsActions.UploadCreatorImagePending
        const action: UploadCreatorImagePendingAction = {
          type: EditEntitySettingsActions.UploadCreatorImagePending,
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

        // given .. we have an action of type EditEntitySettingsActions.UploadCreatorImageSuccess
        const action: UploadCreatorImageSuccessAction = {
          type: EditEntitySettingsActions.UploadCreatorImageSuccess,
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
        // given .. we have an action of type EditEntitySettingsActions.UploadCreatorImageFailure
        const action: UploadCreatorImageFailureAction = {
          type: EditEntitySettingsActions.UploadCreatorImageFailure,
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

        // given .. we have an action of type EditEntitySettingsActions.UpdateOwner
        const action: UpdateOwnerAction = {
          type: EditEntitySettingsActions.UpdateOwner,
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
        // given .. we have an action of type EditEntitySettingsActions.UploadOwnerImagePending
        const action: UploadOwnerImagePendingAction = {
          type: EditEntitySettingsActions.UploadOwnerImagePending,
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

        // given .. we have an action of type EditEntitySettingsActions.UploadOwnerImageSuccess
        const action: UploadOwnerImageSuccessAction = {
          type: EditEntitySettingsActions.UploadOwnerImageSuccess,
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
        // given .. we have an action of type EditEntitySettingsActions.UploadOwnerImageFailure
        const action: UploadOwnerImageFailureAction = {
          type: EditEntitySettingsActions.UploadOwnerImageFailure,
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

      // given .. we have an action of type EditEntitySettingsActions.UpdateStatus
      const action: UpdateStatusAction = {
        type: EditEntitySettingsActions.UpdateStatus,
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

      // given .. we have an action of type EditEntitySettingsActions.UpdateTermsOfUse
      const action: UpdateTermsOfUseAction = {
        type: EditEntitySettingsActions.UpdateTermsOfUse,
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

      // given .. we have an action of type EditEntitySettingsActions.UpdateVersion
      const action: UpdateVersionAction = {
        type: EditEntitySettingsActions.UpdateVersion,
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

      // given .. we have an action of type EditEntitySettingsActions.UpdatePrivacy
      const action: UpdatePrivacyAction = {
        type: EditEntitySettingsActions.UpdatePrivacy,
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
      // given ... we have an action of type EditEntitySettingsActions.AddRequiredCredentialSection
      const action: AddRequiredCredentialSectionAction = {
        type: EditEntitySettingsActions.AddRequiredCredentialSection,
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
      // given ... we have an action of type EditEntitySettingsActions.RemoveRequiredCredentialSection
      const action: RemoveRequiredCredentialSectionAction = {
        type: EditEntitySettingsActions.RemoveRequiredCredentialSection,
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

      // given .. we have an action of type EditEntitySettingsActions.UpdateRequiredCredentialContent
      const action: UpdateRequiredCredentialAction = {
        type: EditEntitySettingsActions.UpdateRequiredCredential,
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
      // given ... we have an action of type EditEntitySettingsActions.AddDisplayCredentialSection
      const action: AddDisplayCredentialSectionAction = {
        type: EditEntitySettingsActions.AddDisplayCredentialSection,
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
      // given ... we have an action of type EditEntitySettingsActions.RemoveDisplayCredentialSection
      const action: RemoveDisplayCredentialSectionAction = {
        type: EditEntitySettingsActions.RemoveDisplayCredentialSection,
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

      // given .. we have an action of type EditEntitySettingsActions.UpdateDisplayCredentialContent
      const action: UpdateDisplayCredentialAction = {
        type: EditEntitySettingsActions.UpdateDisplayCredential,
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

      // given .. we have an action of type EditEntitySettingsActions.UpdateFilter
      const action: UpdateFiltersAction = {
        type: EditEntitySettingsActions.UpdateFilters,
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
      // given ... we have an action of type EditEntityPageContentActions.SetValidated
      const action: ValidatedAction = {
        type: EditEntitySettingsActions.Validated,
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
    // given ... we have an action of type EditEntityPageContentActions.SetValidated
    const action: ValidationErrorAction = {
      type: EditEntitySettingsActions.ValidationError,
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
      // given ... we have an action of type EditEntityActions.NewEntity
      const action: NewEntityAction = {
        type: EditEntityActions.NewEntity,
        payload: {
          entityType: EntityType.Dao,
        } as any,
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

  describe('EditEntitySuccess Actions', () => {
    it('should return initial state if a EditEntitySuccess type is received', () => {
      // given ... we have an action of type EditEntityActions.EditEntitySuccess
      const action: EditEntitySuccessAction = {
        type: EditEntityActions.EditEntitySuccess,
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
