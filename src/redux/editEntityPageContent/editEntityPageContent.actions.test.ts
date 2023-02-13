// @ts-nocheck
import { v4 } from 'uuid'
import * as SUT from './editEntityPageContent.actions'
import { EditEntityPageContentActions } from './editEntityPageContent.types'
import mockStore from 'redux/mockStore'

jest.mock('uuid')

let store

beforeEach(() => {
  store = mockStore({})
})

describe('EditEntityPageContent Actions', () => {
  describe('header', () => {
    describe('updateHeaderContent', () => {
      it('should update the content', async () => {
        // given ... some content
        const title = 'someHeaderTitle'
        const shortDescription = 'someShortDescription'
        const imageDescription = 'someImageDescription'
        const sdgs = 'sdg1|sdg2|sdg3'
        const sdgsArr = ['sdg1', 'sdg2', 'sdg3']
        const brand = 'someCompany'
        const location = 'ZA'

        const formData = {
          title,
          shortDescription,
          imageDescription,
          sdgs,
          brand,
          location,
        }

        // when ... we call the uploadHeaderContentImage action creator
        await store.dispatch(SUT.updateHeaderContent(formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(1)
        expect(actions[0].payload).toEqual({
          title,
          shortDescription,
          imageDescription,
          sdgs: sdgsArr,
          location,
          brand,
        })
      })
    })

    it('should upload the header image', async () => {
      // given ... some content
      const headerFileSrc = 'data:someImageData'

      const formData = {
        headerFileSrc,
      }

      // when ... we call the uploadHeaderContentImage action creator
      await store.dispatch(SUT.updateHeaderContent(formData))
      const actions = store.getActions()

      // then ... it should dispatch the correct actions
      expect(actions.length).toEqual(2)

      expect(actions[0].type).toEqual(EditEntityPageContentActions.UploadHeaderContentImagePending)
      expect(actions[1].type).toEqual(EditEntityPageContentActions.UploadHeaderContentImageSuccess)
    })

    it('should upload the logo image', async () => {
      // given ... some content
      const logoFileSrc = 'data:someImageData'

      const formData = {
        logoFileSrc,
      }

      // when ... we call the uploadHeaderContentImage action creator
      await store.dispatch(SUT.updateHeaderContent(formData))
      const actions = store.getActions()

      // then ... it should dispatch the correct actions
      expect(actions.length).toEqual(2)

      expect(actions[0].type).toEqual(EditEntityPageContentActions.UploadHeaderContentLogoPending)
      expect(actions[1].type).toEqual(EditEntityPageContentActions.UploadHeaderContentLogoSuccess)
    })
  })

  describe('bodyContent', () => {
    describe('addBodySection', () => {
      it('should add a new body content section', () => {
        const id = 'newBodyContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addBodySection
        const action = SUT.addBodySection()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.AddBodySection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeBodySection', () => {
      it('should remove a body content section', () => {
        const id = 'existingBodyContentId'
        // when ... we call the removeBodySection
        const action = SUT.removeBodySection(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.RemoveBodySection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateBodyContent', () => {
      it('should update the content', async () => {
        // given ... some content
        const id = 'someId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'

        const formData = {
          title,
          content,
        }

        // when ... we call the updateBodyContent action creator
        await store.dispatch(SUT.updateBodyContent(id, formData))
        const actions = store.getActions()

        // then ... we should expect it to edit the action with correct type and payload
        expect(actions.length).toEqual(1)
        expect(actions[0].type).toEqual(EditEntityPageContentActions.UpdateBodyContent)
        expect(actions[0].payload).toEqual({
          id,
          title,
          content,
        })
      })
    })

    it('should upload the image', async () => {
      // given ... we have base64 image data and an id
      const id = 'someId'
      const fileSrc = 'data:someImageData'

      const formData = {
        fileSrc,
      }

      // when ... we call the uploadHeaderContentImage action creator
      await store.dispatch(SUT.updateBodyContent(id, formData))
      const actions = store.getActions()

      // then ... it should dispatch the correct actions
      expect(actions.length).toEqual(2)

      expect(actions[0].type).toEqual(EditEntityPageContentActions.UploadBodyContentImagePending)
      expect(actions[1].type).toEqual(EditEntityPageContentActions.UploadBodyContentImageSuccess)
    })
  })

  describe('imageContent', () => {
    describe('addImageSection', () => {
      it('should add a new image content section', () => {
        const id = 'newImageContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addImageSection
        const action = SUT.addImageSection()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.AddImageSection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeImageSection', () => {
      it('should remove an image content section', () => {
        const id = 'existingImageContentId'
        // when ... we call the removeImageSection
        const action = SUT.removeImageSection(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.RemoveImageSection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateImageContent', () => {
      it('should update the image content', async () => {
        // given ... some content
        const id = 'someImageId'
        const title = 'someImageTitle'
        const content = 'someImageContent'
        const imageDescription = 'someImageDescription'

        const formData = {
          id,
          title,
          content,
          imageDescription,
        }

        // when ... we call the updateImageContent action creator
        await store.dispatch(SUT.updateImageContent(id, formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(1)

        expect(actions[0].type).toEqual(EditEntityPageContentActions.UpdateImageContent)
        expect(actions[0].payload).toEqual({
          id,
          title,
          content,
          imageDescription,
        })
      })

      it('should upload the image content image', async () => {
        // given ... some content
        const fileSrc = 'data:someImageData'
        const id = 'someImageId'

        const formData = {
          fileSrc,
        }

        // when ... we call the updateImageContent action creator
        await store.dispatch(SUT.updateImageContent(id, formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)

        expect(actions[0].type).toEqual(EditEntityPageContentActions.UploadImageContentImagePending)
        expect(actions[1].type).toEqual(EditEntityPageContentActions.UploadImageContentImageSuccess)
      })
    })
  })

  /* describe('videoContent', () => {
    describe('addVideoSection', () => {
      it('should add a new video content section', () => {
        const id = 'newVideoContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addVideoSection
        const action = SUT.addVideoSection()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(
          EditEntityPageContentActions.AddVideoSection,
        )
        expect(action.payload).toEqual({
          id,
          title: null,
          content: null,
          videoDid: null,
        })
      })
    })

    describe('removeVideoSection', () => {
      it('should remove a video content section', () => {
        const id = 'existingVideoContentId'
        // when ... we call the removeVideoSection
        const action = SUT.removeVideoSection(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(
          EditEntityPageContentActions.RemoveVideoSection,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateVideoContent', () => {
      it('should update the video content', () => {
        // given ... some content
        const id = 'someVideoId'
        const title = 'someVideoTitle'
        const content = 'someVideoContent'

        const formData = {
          title,
          content,
        }

        // when ... we call the updateVideoContent action creator
        const action = SUT.updateVideoContent(id, formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(
          EditEntityPageContentActions.UpdateVideoContent,
        )
        expect(action.payload).toEqual({
          id,
          title,
          content,
        })
      })
    })

    describe('uploadVideoContentVideo', () => {
      it('should upload the video and dispatch the correct action', async () => {
        // given ... we have base64 video data and an id
        const id = 'someVideoId'
        const base64VideoData = 'someVideoData'

        // when ... we call the uploadVideoContentVideo action creator
        await store.dispatch(SUT.uploadVideoContentVideo(id, base64VideoData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          EditEntityPageContentActions.UploadVideoContentVideoPending,
        )
        expect(actions[0].meta.id).toEqual(id)
        expect(actions[1].type).toEqual(
          EditEntityPageContentActions.UploadVideoContentVideoSuccess,
        )
        expect(actions[1].payload.id).toEqual('someVideoId')
      })
    })
  }) */

  describe('profileContent', () => {
    describe('addProfileSection', () => {
      it('should add a new profile content section', () => {
        const id = 'newProfileContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addProfileSection
        const action = SUT.addProfileSection()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.AddProfileSection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeProfileSection', () => {
      it('should remove a profile content section', () => {
        const id = 'existingProfileContentId'
        // when ... we call the removeProfileSection
        const action = SUT.removeProfileSection(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.RemoveProfileSection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateProfileContent', () => {
      it('should update the profile content', async () => {
        // given ... some content
        const id = 'someProfileId'
        const name = 'someProfileName'
        const position = 'someProfilePosition'
        const linkedInUrl = 'someLinkedInUrl'
        const twitterUrl = 'someTwitterUrl'

        const formData = {
          name,
          position,
          linkedInUrl,
          twitterUrl,
        }

        // when ... we call the updateProfileContent action creator
        await store.dispatch(SUT.updateProfileContent(id, formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(1)

        expect(actions[0].type).toEqual(EditEntityPageContentActions.UpdateProfileContent)
        expect(actions[0].payload).toEqual({
          id,
          name,
          position,
          linkedInUrl,
          twitterUrl,
        })
      })

      it('should upload the profile image', async () => {
        // given ... we have base64 image data and an id
        const id = 'someProfileId'
        const fileSrc = 'data:someImageData'

        const formData = { fileSrc }

        // when ... we call the updateProfileContent action creator
        await store.dispatch(SUT.updateProfileContent(id, formData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(EditEntityPageContentActions.UploadProfileContentImagePending)
        expect(actions[1].type).toEqual(EditEntityPageContentActions.UploadProfileContentImageSuccess)
      })
    })
  })

  describe('socialContent', () => {
    describe('updateSocialContent', () => {
      it('should update the video content', () => {
        // given ... some content
        const linkedInUrl = 'someLinkedInUrl'
        const facebookUrl = 'someFacebookUrl'
        const twitterUrl = 'someTwitterUrl'
        const discourseUrl = 'someDiscourseUrl'
        const instagramUrl = 'someInstagramUrl'
        const telegramUrl = 'someTelegramUrl'
        const githubUrl = 'someGithubUrl'
        const otherUrl = 'someOtherUrl'

        const formData = {
          linkedInUrl,
          facebookUrl,
          twitterUrl,
          discourseUrl,
          instagramUrl,
          telegramUrl,
          githubUrl,
          otherUrl,
        }

        // when ... we call the updateSocialContent action creator
        const action = SUT.updateSocialContent(formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(EditEntityPageContentActions.UpdateSocialContent)
        expect(action.payload).toEqual({
          linkedInUrl,
          facebookUrl,
          twitterUrl,
          discourseUrl,
          instagramUrl,
          telegramUrl,
          githubUrl,
          otherUrl,
        })
      })
    })
  })

  describe('embeddedContent', () => {
    describe('addEmbeddedSection', () => {
      it('should add a new embedded content section', () => {
        const id = 'newVideoContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addEmbeddedSection action creator
        const action = SUT.addEmbeddedSection()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.AddEmbeddedSection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeEmbeddedSection', () => {
      it('should remove an embedded content section', () => {
        const id = 'existingEmbeddedContentId'
        // when ... we call the removeEmbeddedSection
        const action = SUT.removeEmbeddedSection(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityPageContentActions.RemoveEmbeddedSection)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateEmbeddedContent', () => {
      it('should update the embedded content', () => {
        // given ... some content
        const id = 'someEmbeddedId'
        const title = 'someEmbeddedTitle'
        const urls = 'someUrl1|someUrl2'
        const urlsArr = ['someUrl1', 'someUrl2']

        const formData = {
          title,
          urls,
        }

        // when ... we call the updateEmbeddedContent action creator
        const action = SUT.updateEmbeddedContent(id, formData)

        // then ... we should expect it to edit the action with correct type and payload
        expect(action.type).toEqual(EditEntityPageContentActions.UpdateEmbeddedContent)
        expect(action.payload).toEqual({
          id,
          title,
          urls: urlsArr,
        })
      })
    })
  })
  describe('validation', () => {
    it('should set validated to true', () => {
      const identifier = 'someIdentifier'
      // when ... we call the validated action creator
      const action = SUT.validated(identifier)

      // then ... we should expect it to edit an action with the correct type and payload
      expect(action.type).toEqual(EditEntityPageContentActions.Validated)
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
      expect(action.type).toEqual(EditEntityPageContentActions.ValidationError)
      expect(action.payload).toEqual({
        identifier,
        errors,
      })
    })
  })
})
