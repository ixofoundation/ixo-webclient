import * as SUT from './CreateEntityPageContent.reducer'
import {
  CreateEntityPageContentActions,
  UpdateHeaderContentAction,
  UploadHeaderImageFailureAction,
  UploadHeaderImagePendingAction,
  UploadHeaderImageSuccessAction,
  AddBodySectionAction,
  UpdateBodyContentAction,
  UploadBodyContentImagePendingAction,
  UploadBodyContentImageSuccessAction,
  UploadBodyContentImageFailureAction,
  AddImageSectionAction,
  UpdateImageContentAction,
  UploadImageContentImagePendingAction,
  UploadImageContentImageSuccessAction,
  UploadImageContentImageFailureAction,
  AddVideoSectionAction,
  UpdateVideoContentAction,
  UploadVideoContentVideoPendingAction,
  UploadVideoContentVideoSuccessAction,
  UploadVideoContentVideoFailureAction,
  AddProfileSectionAction,
  UpdateProfileContentAction,
  UploadProfileContentImagePendingAction,
  UploadProfileContentImageSuccessAction,
  UploadProfileContentImageFailureAction,
  UpdateSocialContentAction,
  AddEmbeddedSectionAction,
  EmbeddedPageContentType,
  UpdateEmbeddedContentAction,
} from './types'

const initialState = SUT.initialState

describe('CreateEntityPageContent Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('UpdateHeaderContent Action', () => {
    describe('headerContent', () => {
      it('should update the content', () => {
        const title = 'someHeaderTitle'
        const shortDescription = 'someHeaderShortDescription'
        const imageDescription = 'someHeaderImageDescription'
        const sdgs = ['sdg1', 'sdg2', 'sdg3']
        const company = 'someHeaderCompany'
        const country = 'ZA'
        const imageDid = 'someExistingImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UpdateHeaderContent
        const action: UpdateHeaderContentAction = {
          type: CreateEntityPageContentActions.UpdateHeaderContent,
          payload: {
            title,
            shortDescription,
            imageDescription,
            sdgs,
            company,
            country,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: { ...initialState.header, imageDid },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            title,
            shortDescription,
            imageDescription,
            sdgs,
            company,
            country,
            imageDid,
            uploadingImage: false,
          },
        })
      })
    })

    describe('headerImage', () => {
      it('should update the header uploadingImage flag to true when upload has started', () => {
        // given .. we have an action of type CreateEntityPageContentActions.UploadHeaderContentImagePending
        const action: UploadHeaderImagePendingAction = {
          type: CreateEntityPageContentActions.UploadHeaderContentImagePending,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            uploadingImage: true,
          },
        })
      })

      it('should update the header uploadingImage flag to false and set the imageDid when upload has succeeded', () => {
        const imageDid = 'someImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadHeaderContentImageSuccess
        const action: UploadHeaderImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadHeaderContentImageSuccess,
          payload: {
            did: imageDid,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: {
              ...initialState.header,
              uploadingImage: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            imageDid,
            uploadingImage: false,
          },
        })
      })

      it('should update the header uploadingImage flag to false and set the imageDid when upload has failed', () => {
        // given .. we have an action of type CreateEntityPageContentActions.UploadHeaderContentImageFailure
        const action: UploadHeaderImageFailureAction = {
          type: CreateEntityPageContentActions.UploadHeaderContentImageFailure,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: {
              ...initialState.header,
              uploadingImage: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            uploadingImage: false,
          },
        })
      })
    })
  })

  describe('UpdateBodyContent Action', () => {
    describe('bodyContent', () => {
      it('should add a new body content section', () => {
        const id = 'someBodySectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddBodySection
        const action: AddBodySectionAction = {
          type: CreateEntityPageContentActions.AddBodySection,
          payload: {
            id,
            title: null,
            content: null,
            imageDid: null,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          body: {
            [id]: {
              id,
              title: null,
              content: null,
              imageDid: null,
              uploadingImage: false,
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someBodyContentId'
        const title = 'someNewBodyTitle'
        const content = 'someNewBodyContent'
        const imageDid = 'someExistingImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UpdateBodyContent
        const action: UpdateBodyContentAction = {
          type: CreateEntityPageContentActions.UpdateBodyContent,
          payload: {
            id,
            title,
            content,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            body: {
              [id]: {
                id,
                title: 'someOldBodyTitle',
                content: 'someOldContent',
                imageDid,
                uploadingImage: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          body: {
            [id]: {
              id,
              title,
              content,
              imageDid,
              uploadingImage: false,
            },
          },
        })
      })
    })

    describe('bodyImage', () => {
      it('should update the specific body uploadingImage flag to true when upload has started', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const imageDid = 'someNewImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadBodyContentImagePending
        const action: UploadBodyContentImagePendingAction = {
          type: CreateEntityPageContentActions.UploadBodyContentImagePending,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            body: {
              [id]: {
                id,
                title,
                content,
                imageDid,
                uploadingImage: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          body: {
            [id]: {
              id,
              title,
              content,
              imageDid,
              uploadingImage: true,
            },
          },
        })
      })

      it('should update the body uploadingImage flag to false and set the imageDid when upload has succeeded', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const imageDid = 'someNewImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadBodyContentImageSuccessAction
        const action: UploadBodyContentImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadBodyContentImageSuccess,
          payload: {
            id,
            did: imageDid,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            body: {
              [id]: {
                id,
                title,
                content,
                imageDid: 'someOldImageDid',
                uploadingImage: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          body: {
            [id]: {
              id,
              title,
              content,
              imageDid,
              uploadingImage: false,
            },
          },
        })
      })

      it('should update the body uploadingImage flag to false and set the imageDid when upload has failed', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const imageDid = 'someImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadBodyContentImageFailureAction
        const action: UploadBodyContentImageFailureAction = {
          type: CreateEntityPageContentActions.UploadBodyContentImageFailure,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            body: {
              [id]: {
                id,
                title,
                content,
                imageDid,
                uploadingImage: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          body: {
            [id]: {
              id,
              title,
              content,
              imageDid,
              uploadingImage: false,
            },
          },
        })
      })
    })
  })

  describe('UpdateImageContent Action', () => {
    describe('imageContent', () => {
      it('should add a new image content section', () => {
        const id = 'someImageSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddImageSection
        const action: AddImageSectionAction = {
          type: CreateEntityPageContentActions.AddImageSection,
          payload: {
            id,
            title: null,
            content: null,
            imageDid: null,
            imageDescription: null,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          images: {
            [id]: {
              id,
              title: null,
              content: null,
              imageDid: null,
              imageDescription: null,
              uploadingImage: false,
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someImageContentId'
        const title = 'someNewImageTitle'
        const content = 'someNewImageContent'
        const imageDescription = 'someExistingImageDescription'
        const imageDid = 'someExistingImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UpdateImageContent
        const action: UpdateImageContentAction = {
          type: CreateEntityPageContentActions.UpdateImageContent,
          payload: {
            id,
            title,
            content,
            imageDescription,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            images: {
              [id]: {
                id,
                title: 'someOldImageTitle',
                content: 'someOldContent',
                imageDescription: 'someOldImageDescription',
                imageDid,
                uploadingImage: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          images: {
            [id]: {
              id,
              title,
              content,
              imageDid,
              imageDescription,
              uploadingImage: false,
            },
          },
        })
      })
    })

    describe('imageContentImage', () => {
      it('should update the specific image uploadingImage flag to true when upload has started', () => {
        const id = 'someImageContentId'
        const title = 'someImageTitle'
        const content = 'someImageContent'
        const imageDescription = 'someImageDescription'
        const imageDid = 'someNewImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadImageContentImagePending
        const action: UploadImageContentImagePendingAction = {
          type: CreateEntityPageContentActions.UploadImageContentImagePending,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            images: {
              [id]: {
                id,
                title,
                content,
                imageDescription,
                imageDid,
                uploadingImage: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          images: {
            [id]: {
              id,
              title,
              content,
              imageDescription,
              imageDid,
              uploadingImage: true,
            },
          },
        })
      })

      it('should update the specific image uploadingImage flag to false and set the imageDid when upload has succeeded', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const imageDescription = 'someImageDescription'
        const imageDid = 'someNewImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadImageContentImageSuccessAction
        const action: UploadImageContentImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadImageContentImageSuccess,
          payload: {
            id,
            did: imageDid,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            images: {
              [id]: {
                id,
                title,
                content,
                imageDescription,
                imageDid: 'someOldImageDid',
                uploadingImage: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          images: {
            [id]: {
              id,
              title,
              content,
              imageDid,
              imageDescription,
              uploadingImage: false,
            },
          },
        })
      })

      it('should update the specific image uploadingImage flag to false and set the imageDid when upload has failed', () => {
        const id = 'someImageContentId'
        const title = 'someImageTitle'
        const content = 'someImageContent'
        const imageDescription = 'someImageDescription'
        const imageDid = 'someImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadImageContentImageFailureAction
        const action: UploadImageContentImageFailureAction = {
          type: CreateEntityPageContentActions.UploadImageContentImageFailure,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            images: {
              [id]: {
                id,
                title,
                content,
                imageDescription,
                imageDid,
                uploadingImage: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          images: {
            [id]: {
              id,
              title,
              content,
              imageDescription,
              imageDid,
              uploadingImage: false,
            },
          },
        })
      })
    })
  })

  describe('UpdateVideoContent Action', () => {
    describe('videoContent', () => {
      it('should add a new video content section', () => {
        const id = 'someVideoSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddVideoSection
        const action: AddVideoSectionAction = {
          type: CreateEntityPageContentActions.AddVideoSection,
          payload: {
            id,
            title: null,
            content: null,
            videoDid: null,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          videos: {
            [id]: {
              id,
              title: null,
              content: null,
              videoDid: null,
              uploadingVideo: false,
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someVideoContentId'
        const title = 'someNewVideoTitle'
        const content = 'someNewVideoContent'
        const videoDid = 'someExistingVideoDid'

        // given .. we have an action of type CreateEntityPageContentActions.UpdateVideoContent
        const action: UpdateVideoContentAction = {
          type: CreateEntityPageContentActions.UpdateVideoContent,
          payload: {
            id,
            title,
            content,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            videos: {
              [id]: {
                id,
                title: 'someOldVideoTitle',
                content: 'someOldContent',
                videoDid,
                uploadingVideo: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          videos: {
            [id]: {
              id,
              title,
              content,
              videoDid,
              uploadingVideo: false,
            },
          },
        })
      })
    })

    describe('videoContentVideo', () => {
      it('should update the specific video uploadingVideo flag to true when upload has started', () => {
        const id = 'someVideoContentId'
        const title = 'someVideoTitle'
        const content = 'someVideoContent'
        const videoDid = 'someNewVideoDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadVideoContentVideoPending
        const action: UploadVideoContentVideoPendingAction = {
          type: CreateEntityPageContentActions.UploadVideoContentVideoPending,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            videos: {
              [id]: {
                id,
                title,
                content,
                videoDid,
                uploadingVideo: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          videos: {
            [id]: {
              id,
              title,
              content,
              videoDid,
              uploadingVideo: true,
            },
          },
        })
      })

      it('should update the specific video uploadingVideo flag to false and set the videoDid when upload has succeeded', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const videoDid = 'someNewVideoDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadVideoContentVideoSuccessAction
        const action: UploadVideoContentVideoSuccessAction = {
          type: CreateEntityPageContentActions.UploadVideoContentVideoSuccess,
          payload: {
            id,
            did: videoDid,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            videos: {
              [id]: {
                id,
                title,
                content,
                videoDid: 'someOldVideoDid',
                uploadingVideo: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          videos: {
            [id]: {
              id,
              title,
              content,
              videoDid,
              uploadingVideo: false,
            },
          },
        })
      })

      it('should update the specific video uploadingVideo flag to false and set the videoDid when upload has failed', () => {
        const id = 'someVideoContentId'
        const title = 'someVideoTitle'
        const content = 'someVideoContent'
        const videoDid = 'someVideoDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadVideoContentVideoFailureAction
        const action: UploadVideoContentVideoFailureAction = {
          type: CreateEntityPageContentActions.UploadVideoContentVideoFailure,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            videos: {
              [id]: {
                id,
                title,
                content,
                videoDid,
                uploadingVideo: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          videos: {
            [id]: {
              id,
              title,
              content,
              videoDid,
              uploadingVideo: false,
            },
          },
        })
      })
    })
  })

  describe('UpdateProfileContent Action', () => {
    describe('profileContent', () => {
      it('should add a new profile content section', () => {
        const id = 'someProfileSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddProfileSection
        const action: AddProfileSectionAction = {
          type: CreateEntityPageContentActions.AddProfileSection,
          payload: {
            id,
            name: null,
            position: null,
            linkedInUrl: null,
            twitterUrl: null,
            imageDid: null,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          profiles: {
            [id]: {
              id,
              name: null,
              position: null,
              linkedInUrl: null,
              twitterUrl: null,
              imageDid: null,
              uploadingImage: false,
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someProfileContentId'
        const name = 'someNewProfileName'
        const position = 'someNewProfilePosition'
        const linkedInUrl = 'someNewProfileLinkedInUrl'
        const twitterUrl = 'someNewProfileTwitterUrl'
        const imageDid = 'someExistingImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UpdateProfileContent
        const action: UpdateProfileContentAction = {
          type: CreateEntityPageContentActions.UpdateProfileContent,
          payload: {
            id,
            name,
            position,
            linkedInUrl,
            twitterUrl,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            profiles: {
              [id]: {
                id,
                name: 'someOldProfileName',
                position: 'someOldProfilePosition',
                linkedInUrl: 'someOldProfileLinkedInUrl',
                twitterUrl: 'someOldProfileTwitterUrl',
                imageDid,
                uploadingImage: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          profiles: {
            [id]: {
              id,
              name,
              position,
              linkedInUrl,
              twitterUrl,
              imageDid,
              uploadingImage: false,
            },
          },
        })
      })
    })

    describe('profileImage', () => {
      it('should update the specific profile uploadingImage flag to true when upload has started', () => {
        const id = 'someProfileContentId'
        const name = 'someProfileName'
        const position = 'someProfilePosition'
        const linkedInUrl = 'someProfileLinkedInUrl'
        const twitterUrl = 'someProfileTwitterUrl'
        const imageDid = 'someImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadProfileContentImagePending
        const action: UploadProfileContentImagePendingAction = {
          type: CreateEntityPageContentActions.UploadProfileContentImagePending,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            profiles: {
              [id]: {
                id,
                name,
                position,
                linkedInUrl,
                twitterUrl,
                imageDid,
                uploadingImage: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          profiles: {
            [id]: {
              id,
              name,
              position,
              linkedInUrl,
              twitterUrl,
              imageDid,
              uploadingImage: true,
            },
          },
        })
      })

      it('should update the profile uploadingImage flag to false and set the imageDid when upload has succeeded', () => {
        const id = 'someProfileContentId'
        const name = 'someProfileName'
        const position = 'someProfilePosition'
        const linkedInUrl = 'someProfileLinkedInUrl'
        const twitterUrl = 'someProfileTwitterUrl'
        const imageDid = 'someNewImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadProfileContentImageSuccessAction
        const action: UploadProfileContentImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadProfileContentImageSuccess,
          payload: {
            id,
            did: imageDid,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            profiles: {
              [id]: {
                id,
                name,
                position,
                linkedInUrl,
                twitterUrl,
                imageDid: 'someOldImageDid',
                uploadingImage: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          profiles: {
            [id]: {
              id,
              name,
              position,
              linkedInUrl,
              twitterUrl,
              imageDid,
              uploadingImage: false,
            },
          },
        })
      })

      it('should update the profile uploadingImage flag to false and set the imageDid when upload has failed', () => {
        const id = 'someProfileContentId'
        const name = 'someProfileName'
        const position = 'someProfilePosition'
        const linkedInUrl = 'someProfileLinkedInUrl'
        const twitterUrl = 'someProfileTwitterUrl'
        const imageDid = 'someImageDid'

        // given .. we have an action of type CreateEntityPageContentActions.UploadProfileContentImageFailureAction
        const action: UploadProfileContentImageFailureAction = {
          type: CreateEntityPageContentActions.UploadProfileContentImageFailure,
          payload: {
            id,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            profiles: {
              [id]: {
                id,
                name,
                position,
                linkedInUrl,
                twitterUrl,
                imageDid,
                uploadingImage: true,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          profiles: {
            [id]: {
              id,
              name,
              position,
              linkedInUrl,
              twitterUrl,
              imageDid,
              uploadingImage: false,
            },
          },
        })
      })
    })
  })

  describe('UpdateSocialContent Action', () => {
    it('should update the content', () => {
      const linkedInUrl = 'someNewLinkedInUrl'
      const facebookInUrl = 'someNewFacebookInUrl'
      const twitterInUrl = 'someNewTwitterInUrl'
      const discourseInUrl = 'someNewDiscourseInUrl'
      const instagramUrl = 'someNewInstagramUrl'
      const telegramUrl = 'someNewTelegramUrl'
      const githubUrl = 'someNewGithubUrl'
      const otherUrl = 'someNewOtherUrl'

      // given .. we have an action of type CreateEntityPageContentActions.UpdateSocialContent
      const action: UpdateSocialContentAction = {
        type: CreateEntityPageContentActions.UpdateSocialContent,
        payload: {
          linkedInUrl,
          facebookInUrl,
          twitterInUrl,
          discourseInUrl,
          instagramUrl,
          telegramUrl,
          githubUrl,
          otherUrl,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          social: {
            linkedInUrl: 'someOldLinkedInUrl',
            facebookInUrl: 'someOldFacebookUrl',
            twitterInUrl: 'someOldTwitterUrl',
            discourseInUrl: 'someOldDiscourseUrl',
            instagramUrl: 'someOldInstagramUrl',
            telegramUrl: 'someOldTelegramUrl',
            githubUrl: 'someOldGithubUrl',
            otherUrl: 'someOldOtherUrl',
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        social: {
          linkedInUrl,
          facebookInUrl,
          twitterInUrl,
          discourseInUrl,
          instagramUrl,
          telegramUrl,
          githubUrl,
          otherUrl,
        },
      })
    })
  })

  describe('UpdateEmbeddedContent Action', () => {
    describe('embeddedContent', () => {
      it('should add a new embedded content section', () => {
        const id = 'someEmbeddedSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddEmbeddedSection
        const action: AddEmbeddedSectionAction = {
          type: CreateEntityPageContentActions.AddEmbeddedSection,
          payload: {
            id,
            title: null,
            type: null,
            urls: [],
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          embedded: {
            [id]: {
              id,
              title: null,
              type: null,
              urls: [],
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someBodyContentId'
        const title = 'someNewBodyTitle'
        const type = EmbeddedPageContentType.Blog
        const urls = ['foo', 'bar']

        // given .. we have an action of type CreateEntityPageContentActions.UpdateEmbeddedContent
        const action: UpdateEmbeddedContentAction = {
          type: CreateEntityPageContentActions.UpdateEmbeddedContent,
          payload: {
            id,
            title,
            type,
            urls,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            embedded: {
              [id]: {
                id,
                title: 'someOldEmbeddedTitle',
                type: null,
                urls: ['old', 'stuff'],
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          embedded: {
            [id]: {
              id,
              title,
              type,
              urls,
            },
          },
        })
      })
    })
  })
})
