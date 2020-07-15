import * as SUT from './CreateEntityPageContent.actions'
import { CreateEntityPageContentActions } from './types'
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
        const sdgs = ['sdg1', 'sdg2', 'sdg3']
        const country = 'ZA'

        // when ... we call the updateHeader action creator
        const action = SUT.updateHeaderContent(
          title,
          shortDescription,
          imageDescription,
          sdgs,
          country,
        )

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateHeaderContent,
        )
        expect(action.payload).toEqual({
          title,
          shortDescription,
          imageDescription,
          sdgs,
          country,
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
          CreateEntityPageContentActions.UploadHeaderImageSuccess,
        )
        expect(actions[1].payload).toEqual('somePublicDid')
      })
    })
  })

  describe('bodyContent', () => {
    describe('addBodySection', () => {
      it('should add a new body content section', () => {
        // when ... we call the addBodySection
        const action = SUT.addBodySection()
        // then ...
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddBodySection,
        )
      })
    })

    describe('updateBodyContent', () => {
      it('should update the body content', () => {
        // given ... some content
        const id = 'someId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'

        // when ... we call the updateBodyContent action creator
        const action = SUT.updateBodyContent(id, title, content)

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
        // when ... we call the addImageSection
        const action = SUT.addImageSection()
        // then ...
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddImageSection,
        )
      })
    })

    describe('updateImageContent', () => {
      it('should update the image content', () => {
        // given ... some content
        const id = 'someImageId'
        const title = 'someImageitle'
        const content = 'someImageContent'
        const imageDescription = 'someImageDescription'

        // when ... we call the updateImageContent action creator
        const action = SUT.updateImageContent(
          id,
          title,
          content,
          imageDescription,
        )

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
        // when ... we call the addVideoSection
        const action = SUT.addVideoSection()
        // then ...
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddVideoSection,
        )
      })
    })

    describe('updateVideoContent', () => {
      it('should update the video content', () => {
        // given ... some content
        const id = 'someVideoId'
        const title = 'someVideoTitle'
        const content = 'someVideoContent'

        // when ... we call the updateVideoContent action creator
        const action = SUT.updateVideoContent(id, title, content)

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
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadVideoContentVideoSuccess,
        )
        expect(actions[1].payload.did).toEqual('somePublicDid')
        expect(actions[1].payload.id).toEqual('someVideoId')
      })
    })
  })

  ///

  describe('profileContent', () => {
    describe('addProfileSection', () => {
      it('should add a new profile content section', () => {
        // when ... we call the addProfileSection
        const action = SUT.addProfileSection()
        // then ...
        expect(action.type).toEqual(
          CreateEntityPageContentActions.AddProfileSection,
        )
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

        // when ... we call the updateProfileContent action creator
        const action = SUT.updateProfileContent(
          id,
          name,
          position,
          linkedInUrl,
          twitterUrl,
        )

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
        const facebookInUrl = 'someFacebookUrl'
        const twitterInUrl = 'someTwitterUrl'
        const discourseInUrl = 'someDiscourseUrl'
        const instagramUrl = 'someInstagramUrl'
        const telegramUrl = 'someTelegramUrl'
        const githubUrl = 'someGithubUrl'
        const otherUrl = 'someOtherUrl'

        // when ... we call the updateSocialContent action creator
        const action = SUT.updateSocialContent(
          linkedInUrl,
          facebookInUrl,
          twitterInUrl,
          discourseInUrl,
          instagramUrl,
          telegramUrl,
          githubUrl,
          otherUrl,
        )

        // then ... we should expect it to create the action with correct type and payload
        expect(action.type).toEqual(
          CreateEntityPageContentActions.UpdateSocialContent,
        )
        expect(action.payload).toEqual({
          linkedInUrl,
          facebookInUrl,
          twitterInUrl,
          discourseInUrl,
          instagramUrl,
          telegramUrl,
          githubUrl,
          otherUrl,
        })
      })
    })
  })
})
