import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './EditEntitySettings.actions'
import { EditEntitySettingsActions } from './types'
import mockStore from 'common/redux/mockStore'
import {
  EntityStage,
  EntityStatus,
  PageView,
  EntityView,
  TermsOfUseType,
} from '../../../types'

let store: any

beforeEach(() => {
  store = mockStore({})
})

describe('EditEntitySettings Actions', () => {
  describe('creator', () => {
    describe('updateCreator', () => {
      it('should update the creator', async () => {
        // given ... some data
        const displayName = 'someCreatorName'
        const location = 'someCreatorCountry'
        const email = 'someCreatorEmail'
        const website = 'someCreatorWebsite'
        const mission = 'someCreatorMission'
        const creatorId = 'someCreatorIdentifier'
        const credential = 'someCreatorCredentialTokenId'

        const formData = {
          displayName,
          location,
          email,
          website,
          mission,
          creatorId,
          credential,
        }

        // when ... we call the updateCreator action creator
        await store.dispatch(SUT.updateCreator(formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(1)
        expect(actions[0].type).toEqual(
          EditEntitySettingsActions.UpdateCreator,
        )
        expect(actions[0].payload).toEqual({
          displayName,
          location,
          email,
          website,
          mission,
          creatorId,
          credential,
        })
      })

      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data
        const fileSrc = 'data:someImageData'

        const formData = {
          fileSrc,
        }

        // when ... we call the updateCreator action creator
        await store.dispatch(SUT.updateCreator(formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          EditEntitySettingsActions.UploadCreatorImagePending,
        )
        expect(actions[1].type).toEqual(
          EditEntitySettingsActions.UploadCreatorImageSuccess,
        )
        expect(actions[1].payload).toEqual({
          fileSrc: `${process.env.REACT_APP_PDS_URL}public/somePublicDid`,
        })
      })
    })
  })

  describe('owner', () => {
    describe('updateOwner', () => {
      it('should update the owner', async () => {
        // given ... some data
        const displayName = 'someOwnerName'
        const location = 'someOwnerCountry'
        const email = 'someOwnerEmail'
        const website = 'someOwnerWebsite'
        const mission = 'someOwnerMission'
        const ownerId = 'someOwnerIdentifier'

        const formData = {
          displayName,
          location,
          email,
          website,
          mission,
          ownerId,
        }

        // when ... we call the updateCreator action creator
        await store.dispatch(SUT.updateOwner(formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(1)
        expect(actions[0].type).toEqual(EditEntitySettingsActions.UpdateOwner)
        expect(actions[0].payload).toEqual({
          displayName,
          location,
          email,
          website,
          mission,
          ownerId,
        })
      })

      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data
        const fileSrc = 'data:someImageData'

        const formData = {
          fileSrc,
        }

        // when ... we call the updateOwner action creator
        await store.dispatch(SUT.updateOwner(formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          EditEntitySettingsActions.UploadOwnerImagePending,
        )
        expect(actions[1].type).toEqual(
          EditEntitySettingsActions.UploadOwnerImageSuccess,
        )
        expect(actions[1].payload).toEqual({
          fileSrc: `${process.env.REACT_APP_PDS_URL}public/somePublicDid`,
        })
      })
    })
  })

  describe('status', () => {
    describe('updateStatus', () => {
      it('should update the status', () => {
        // given ... some data
        const dates = 'someFromData|someToDate'
        const stage = EntityStage.Delivery
        const status = EntityStatus.Sealed

        const formData = {
          dates,
          stage,
          status,
        }

        // when ... we call the updateStatus action creator
        const action = SUT.updateStatus(formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(EditEntitySettingsActions.UpdateStatus)
        expect(action.payload).toEqual({
          startDate: 'someFromData',
          endDate: 'someToDate',
          stage,
          status,
        })
      })
    })
  })

  describe('version', () => {
    describe('updateVersion', () => {
      it('should update the version', () => {
        // given ... some data
        const versionNumber = 'someVersionNumber'
        const effectiveDate = 'someEffectiveDate'
        const notes = 'someNotes'

        const formData = {
          versionNumber,
          effectiveDate,
          notes,
        }

        // when ... we call the updateVersion action creator
        const action = SUT.updateVersion(formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(EditEntitySettingsActions.UpdateVersion)
        expect(action.payload).toEqual({
          versionNumber,
          effectiveDate,
          notes,
        })
      })
    })
  })

  describe('termsOfUse', () => {
    describe('updateTermsOfUse', () => {
      it('should update the terms of use', () => {
        // given ... some data
        const type = TermsOfUseType.OnceOffFee
        const paymentTemplateId = 'somePaymentTemplateId'

        const formData = {
          type,
          paymentTemplateId,
        }

        // when ... we call the updateTermsOfUse action creator
        const action = SUT.updateTermsOfUse(formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(
          EditEntitySettingsActions.UpdateTermsOfUse,
        )
        expect(action.payload).toEqual({
          type,
          paymentTemplateId,
        })
      })
    })
  })

  describe('privacy', () => {
    describe('updatePrivacy', () => {
      it('should update the privacy', () => {
        // given ... some data
        const pageView = PageView.Private
        const entityView = EntityView.Visible

        const formData = {
          pageView,
          entityView,
        }

        // when ... we call the updatePrivacy action creator
        const action = SUT.updatePrivacy(formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(EditEntitySettingsActions.UpdatePrivacy)
        expect(action.payload).toEqual({
          pageView,
          entityView,
        })
      })
    })
  })

  describe('requiredCredential', () => {
    describe('addRequiredCredentialSection', () => {
      it('should add a new required credential section', () => {
        const id = 'newRequiredCredentialId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addRequiredCredentialSection
        const action = SUT.addRequiredCredentialSection()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(
          EditEntitySettingsActions.AddRequiredCredentialSection,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeRequiredCredentialSection', () => {
      it('should remove a required credential section', () => {
        const id = 'existingRequiredCredentialId'
        // when ... we call the removeRequiredCredentialSection
        const action = SUT.removeRequiredCredentialSection(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(
          EditEntitySettingsActions.RemoveRequiredCredentialSection,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateRequiredCredential', () => {
      it('should update the required credential', () => {
        // given ... some data
        const id = 'someRequiredCredentialId'
        const credential = 'someRequiredCredential'
        const issuer = 'someRequiredIssuer'

        const formData = {
          credential,
          issuer,
        }

        // when ... we call the updateRequiredCredential action creator
        const action = SUT.updateRequiredCredential(id, formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(
          EditEntitySettingsActions.UpdateRequiredCredential,
        )
        expect(action.payload).toEqual({
          id,
          credential,
          issuer,
        })
      })
    })
  })

  describe('filter', () => {
    describe('updateFilters', () => {
      const formData = {
        newName1: ['aa', 'bb', 'cc'],
        newName2: ['11', '22', '33'],
      }

      // when ... we call the updateFilter action creator
      const action = SUT.updateFilters(formData)

      // then ... we should expect it to edit the action with correct type and payload
      expect(action.type).toEqual(EditEntitySettingsActions.UpdateFilters)
      expect(action.payload).toEqual(formData)
    })
  })
})

describe('displayCredential', () => {
  describe('addDisplayCredentialSection', () => {
    it('should add a new display credential section', () => {
      const id = 'newDisplayCredentialId'
      v4.mockImplementationOnce(() => id)
      // when ... we call the addDisplayCredentialSection
      const action = SUT.addDisplayCredentialSection()
      // then ... we should expect it to edit an action with the correct type
      expect(action.type).toEqual(
        EditEntitySettingsActions.AddDisplayCredentialSection,
      )
      expect(action.payload).toEqual({
        id,
      })
    })
  })

  describe('removeDisplayCredentialSection', () => {
    it('should remove a display credential section', () => {
      const id = 'existingDisplayCredentialId'
      // when ... we call the removeDisplayCredentialSection
      const action = SUT.removeDisplayCredentialSection(id)
      // then ... we should expect it to edit an action with the correct type
      expect(action.type).toEqual(
        EditEntitySettingsActions.RemoveDisplayCredentialSection,
      )
      expect(action.payload).toEqual({
        id,
      })
    })
  })

  describe('updateDisplayCredential', () => {
    it('should update the required credential', () => {
      // given ... some data
      const id = 'someDisplayCredentialId'
      const credential = 'someDisplayCredential'
      const badge = 'someDisplayBadge'

      const formData = {
        credential,
        badge,
      }

      // when ... we call the updateDisplayCredential action creator
      const action = SUT.updateDisplayCredential(id, formData)

      // then ... we should expect it to edit the action with correct type and payload
      expect(action.type).toEqual(
        EditEntitySettingsActions.UpdateDisplayCredential,
      )
      expect(action.payload).toEqual({
        id,
        credential,
        badge,
      })
    })
  })

  describe('validation', () => {
    it('should set validated to true', () => {
      const identifier = 'someIdentifier'
      // when ... we call the validated action creator
      const action = SUT.validated(identifier)

      // then ... we should expect it to edit an action with the correct type and payload
      expect(action.type).toEqual(EditEntitySettingsActions.Validated)
      expect(action.payload).toEqual({
        identifier,
      })
    })
  })
  describe('validationError', () => {
    it('should set validated to false with any errors', () => {
      const identifier = 'someIdentifier'
      const errors = ['error1', 'error2']
      // when ... we call the validated action creator
      const action = SUT.validationError(identifier, errors)

      // then ... we should expect it to edit an action with the correct type and payload
      expect(action.type).toEqual(EditEntitySettingsActions.ValidationError)
      expect(action.payload).toEqual({
        identifier,
        errors,
      })
    })
  })
})
