import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './CreateEntitySettings.actions'
import { CreateEntitySettingsActions } from './types'
import mockStore from '../../common/redux/mockStore'
import {
  EntityStage,
  EntityStatus,
  PageView,
  EntityView,
} from '../Entities/types'

let store

beforeEach(() => {
  store = mockStore({})
})

describe('CreateEntitySettings Actions', () => {
  describe('owner', () => {
    describe('updateOwner', () => {
      it('should update the owner', () => {
        // given ... some data
        const name = 'someOwnerName'
        const country = 'someOwnerCountry'
        const email = 'someOwnerEmail'
        const website = 'someOwnerWebsite'
        const mission = 'someOwnerMission'
        const identifier = 'someOwnerIdentifier'
        const credentialTokenId = 'someOwnerTokenId'

        const formData = {
          name,
          country,
          email,
          website,
          mission,
          identifier,
          credentialTokenId,
        }

        // when ... we call the updateOwner action creator
        const action = SUT.updateOwner(formData)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(CreateEntitySettingsActions.UpdateOwner)
        expect(action.payload).toEqual({
          name,
          country,
          email,
          website,
          mission,
          identifier,
          credentialTokenId,
        })
      })
    })

    describe('uploadOwnerImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data
        const base64ImageData = 'someImageData'

        // when ... we call the uploadOwnerImage action creator
        await store.dispatch(SUT.uploadOwnerImage(base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntitySettingsActions.UploadOwnerImagePending,
        )
        expect(actions[1].type).toEqual(
          CreateEntitySettingsActions.UploadOwnerImageSuccess,
        )
        expect(actions[1].payload).toEqual({ did: 'somePublicDid' })
      })
    })
  })

  describe('creator', () => {
    describe('updateCreator', () => {
      it('should update the creator', () => {
        // given ... some data
        const name = 'someCreatorName'
        const country = 'someCreatorCountry'
        const email = 'someCreatorEmail'
        const website = 'someCreatorWebsite'
        const mission = 'someCreatorMission'
        const identifier = 'someCreatorIdentifier'
        const matrixId = 'someMatrixId'

        const formData = {
          name,
          country,
          email,
          website,
          mission,
          identifier,
          matrixId,
        }

        // when ... we call the updateCreator action creator
        const action = SUT.updateCreator(formData)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(CreateEntitySettingsActions.UpdateCreator)
        expect(action.payload).toEqual({
          name,
          country,
          email,
          website,
          mission,
          identifier,
          matrixId,
        })
      })
    })

    describe('uploadCreatorImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data
        const base64ImageData = 'someImageData'

        // when ... we call the uploadCreatorImage action creator
        await store.dispatch(SUT.uploadCreatorImage(base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntitySettingsActions.UploadCreatorImagePending,
        )
        expect(actions[1].type).toEqual(
          CreateEntitySettingsActions.UploadCreatorImageSuccess,
        )
        expect(actions[1].payload).toEqual({ did: 'somePublicDid' })
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

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(CreateEntitySettingsActions.UpdateStatus)
        expect(action.payload).toEqual({
          startDate: 'someFromData',
          endDate: 'someToDate',
          stage,
          status,
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

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(CreateEntitySettingsActions.UpdatePrivacy)
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
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntitySettingsActions.AddRequiredCredentialSection,
        )
        expect(action.payload).toEqual({
          id,
          credential: null,
          issuer: null,
        })
      })
    })

    describe('removeRequiredCredentialSection', () => {
      it('should remove a required credential section', () => {
        const id = 'existingRequiredCredentialId'
        // when ... we call the removeRequiredCredentialSection
        const action = SUT.removeRequiredCredentialSection(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntitySettingsActions.RemoveRequiredCredentialSection,
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

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntitySettingsActions.UpdateRequiredCredential,
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
    describe('addFilterSection', () => {
      it('should add a new filter section', () => {
        const id = 'newFilterId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addFilterSection
        const action = SUT.addFilterSection()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntitySettingsActions.AddFilterSection,
        )
        expect(action.payload).toEqual({
          id,
          name: null,
          tags: [],
        })
      })
    })

    describe('removeFilterSection', () => {
      it('should remove a filter section', () => {
        const id = 'existingFilterId'
        // when ... we call the removeFilterSection
        const action = SUT.removeFilterSection(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntitySettingsActions.RemoveFilterSection,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateFilter', () => {
      it('should update the required credential', () => {
        // given ... some data
        const id = 'someFilterId'
        const name = 'someFilterName'
        const tags = ['someTag1', 'someTag2']

        const formData = {
          name,
          tags,
        }

        // when ... we call the updateFilter action creator
        const action = SUT.updateFilter(id, formData)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(CreateEntitySettingsActions.UpdateFilter)
        expect(action.payload).toEqual({
          id,
          name,
          tags,
        })
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
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntitySettingsActions.AddDisplayCredentialSection,
        )
        expect(action.payload).toEqual({
          id,
          credential: null,
          badge: null,
        })
      })
    })

    describe('removeDisplayCredentialSection', () => {
      it('should remove a display credential section', () => {
        const id = 'existingDisplayCredentialId'
        // when ... we call the removeDisplayCredentialSection
        const action = SUT.removeDisplayCredentialSection(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntitySettingsActions.RemoveDisplayCredentialSection,
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

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntitySettingsActions.UpdateDisplayCredential,
        )
        expect(action.payload).toEqual({
          id,
          credential,
          badge,
        })
      })
    })
  })
})
