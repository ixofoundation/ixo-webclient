import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './CreateEntityPageContent.actions'
import {
  CreateEntityPageContentActions,
  EmbeddedPageContentType,
} from './types'
import mockStore from '../../common/redux/mockStore'

let store

beforeEach(() => {
  store = mockStore({})
})

describe('CreateEntityPageContent Actions', () => {
  describe('header', () => {
    describe('updateHeaderContent', () => {
      it('should update the header content', () => {
        // given ... some content
        const title = 'someHeaderTitle'
        const shortDescription = 'someShortDescription'
        const imageDescription = 'someImageDescription'
        const sdgs = 'sdg1|sdg2|sdg3'
        const sdgsArr = ['sdg1', 'sdg2', 'sdg3']
        const company = 'someCompany'
        const country = 'ZA'

        const formData = {
          title,
          shortDescription,
          imageDescription,
          sdgs,
          company,
          country,
        }

        // when ... we call the updateHeader action creator
        const action = SUT.updateHeaderContent(formData)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateHeaderContent,
        )
        expect(action.payload).toEqual({
          title,
          shortDescription,
          imageDescription,
          sdgs: sdgsArr,
          country,
          company,
        })
      })
    })

    describe('uploadHeaderContentImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data
        const base64ImageData = 'someImageData'

        // when ... we call the uploadHeaderContentImage action creator
        await store.dispatch(SUT.uploadHeaderContentImage(base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntityPageContentActions.UploadHeaderContentImagePending,
        )
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadHeaderContentImageSuccess,
        )
        expect(actions[1].payload).toEqual({ did: 'somePublicDid' })
      })
    })
  })

  describe('bodyContent', () => {
    describe('addBodySection', () => {
      it('should add a new body content section', () => {
        const id = 'newBodyContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addBodySection
        const action = SUT.addBodySection()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddBodySection,
        )
        expect(action.payload).toEqual({
          id,
          title: null,
          content: null,
          imageDid: null,
        })
      })
    })

    describe('removeBodySection', () => {
      it('should remove a body content section', () => {
        const id = 'existingBodyContentId'
        // when ... we call the removeBodySection
        const action = SUT.removeBodySection(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.RemoveBodySection,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateBodyContent', () => {
      it('should update the body content', () => {
        // given ... some content
        const id = 'someId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'

        const formData = {
          title,
          content,
        }

        // when ... we call the updateBodyContent action creator
        const action = SUT.updateBodyContent(id, formData)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateBodyContent,
        )
        expect(action.payload).toEqual({
          id,
          title,
          content,
        })
      })
    })

    describe('uploadBodyContentImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data and an id
        const id = 'someBodyId'
        const base64ImageData = 'someImageData'

        // when ... we call the uploadBodyContentImage action creator
        await store.dispatch(SUT.uploadBodyContentImage(id, base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntityPageContentActions.UploadBodyContentImagePending,
        )
        expect(actions[0].meta.id).toEqual(id)
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadBodyContentImageSuccess,
        )
        expect(actions[1].payload.did).toEqual('somePublicDid')
        expect(actions[1].payload.id).toEqual('someBodyId')
      })
    })
  })

  describe('imageContent', () => {
    describe('addImageSection', () => {
      it('should add a new image content section', () => {
        const id = 'newImageContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addImageSection
        const action = SUT.addImageSection()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddImageSection,
        )
        expect(action.payload).toEqual({
          id,
          title: null,
          content: null,
          imageDid: null,
          imageDescription: null,
        })
      })
    })

    describe('removeImageSection', () => {
      it('should remove an image content section', () => {
        const id = 'existingImageContentId'
        // when ... we call the removeImageSection
        const action = SUT.removeImageSection(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.RemoveImageSection,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateImageContent', () => {
      it('should update the image content', () => {
        // given ... some content
        const id = 'someImageId'
        const title = 'someImageTitle'
        const content = 'someImageContent'
        const imageDescription = 'someImageDescription'

        const formData = {
          title,
          content,
          imageDescription,
        }

        // when ... we call the updateImageContent action creator
        const action = SUT.updateImageContent(id, formData)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateImageContent,
        )
        expect(action.payload).toEqual({
          id,
          title,
          content,
          imageDescription,
        })
      })
    })

    describe('uploadImageContentImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data and an id
        const id = 'someImageId'
        const base64ImageData = 'someImageData'

        // when ... we call the uploadImageContentImage action creator
        await store.dispatch(SUT.uploadImageContentImage(id, base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntityPageContentActions.UploadImageContentImagePending,
        )
        expect(actions[0].meta.id).toEqual(id)
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadImageContentImageSuccess,
        )
        expect(actions[1].payload.did).toEqual('somePublicDid')
        expect(actions[1].payload.id).toEqual('someImageId')
      })
    })
  })

  describe('videoContent', () => {
    describe('addVideoSection', () => {
      it('should add a new video content section', () => {
        const id = 'newVideoContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addVideoSection
        const action = SUT.addVideoSection()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddVideoSection,
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
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.RemoveVideoSection,
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

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateVideoContent,
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
          CreateEntityPageContentActions.UploadVideoContentVideoPending,
        )
        expect(actions[0].meta.id).toEqual(id)
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadVideoContentVideoSuccess,
        )
        expect(actions[1].payload.did).toEqual('somePublicDid')
        expect(actions[1].payload.id).toEqual('someVideoId')
      })
    })
  })

  describe('profileContent', () => {
    describe('addProfileSection', () => {
      it('should add a new profile content section', () => {
        const id = 'newVideoContentId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addProfileSection
        const action = SUT.addProfileSection()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddProfileSection,
        )
        expect(action.payload).toEqual({
          id,
          name: null,
          position: null,
          linkedInUrl: null,
          twitterUrl: null,
          imageDid: null,
        })
      })
    })

    describe('removeProfileSection', () => {
      it('should remove a profile content section', () => {
        const id = 'existingProfileContentId'
        // when ... we call the removeProfileSection
        const action = SUT.removeProfileSection(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.RemoveProfileSection,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateProfileContent', () => {
      it('should update the profile content', () => {
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
        const action = SUT.updateProfileContent(id, formData)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateProfileContent,
        )
        expect(action.payload).toEqual({
          id,
          name,
          position,
          linkedInUrl,
          twitterUrl,
        })
      })
    })

    describe('uploadProfileContentProfile', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data and an id
        const id = 'someProfileId'
        const base64ImageData = 'someProfileData'

        // when ... we call the uploadProfileContentImage action creator
        await store.dispatch(SUT.uploadProfileContentImage(id, base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntityPageContentActions.UploadProfileContentImagePending,
        )
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadProfileContentImageSuccess,
        )
        expect(actions[1].payload.did).toEqual('somePublicDid')
        expect(actions[1].payload.id).toEqual('someProfileId')
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

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateSocialContent,
        )
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
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddEmbeddedSection,
        )
        expect(action.payload).toEqual({
          id,
          title: null,
          type: null,
          urls: [],
        })
      })
    })

    describe('removeEmbeddedSection', () => {
      it('should remove an embedded content section', () => {
        const id = 'existingEmbeddedContentId'
        // when ... we call the removeEmbeddedSection
        const action = SUT.removeEmbeddedSection(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityPageContentActions.RemoveEmbeddedSection,
        )
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
        const type = EmbeddedPageContentType.Blog
        const urls = ['someUrl1', 'someUrl2']

        // when ... we call the updateEmbeddedContent action creator
        const action = SUT.updateEmbeddedContent(id, title, type, urls)

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateEmbeddedContent,
        )
        expect(action.payload).toEqual({
          id,
          title,
          type,
          urls,
        })
      })
    })
  })
})
