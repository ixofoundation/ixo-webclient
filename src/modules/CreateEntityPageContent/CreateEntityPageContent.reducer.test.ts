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
  AddProfileSectionAction,
  UpdateProfileContentAction,
  UploadProfileContentImagePendingAction,
  UploadProfileContentImageSuccessAction,
  UploadProfileContentImageFailureAction,
  UpdateSocialContentAction,
  AddEmbeddedSectionAction,
  UpdateEmbeddedContentAction,
  RemoveBodySectionAction,
  RemoveImageSectionAction,
  RemoveProfileSectionAction,
  RemoveEmbeddedSectionAction,
  SetValidatedAction,
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

  describe('HeaderContent Actions', () => {
    describe('headerContent', () => {
      it('should update the content', () => {
        const title = 'someHeaderTitle'
        const shortDescription = 'someHeaderShortDescription'
        const imageDescription = 'someHeaderImageDescription'
        const sdgs = ['sdg1', 'sdg2', 'sdg3']
        const company = 'someHeaderCompany'
        const country = 'ZA'
        const fileSrc = 'someExistingfileSrc'

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
            header: { ...initialState.header, fileSrc },
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
            fileSrc,
            uploading: false,
          },
        })
      })
    })

    describe('headerImage', () => {
      it('should update the header uploading flag to true when upload has started', () => {
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
            uploading: true,
          },
        })
      })

      it('should update the header uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const fileSrc = 'somefileSrc'

        // given .. we have an action of type CreateEntityPageContentActions.UploadHeaderContentImageSuccess
        const action: UploadHeaderImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadHeaderContentImageSuccess,
          payload: {
            fileSrc,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: {
              ...initialState.header,
              uploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            fileSrc,
            uploading: false,
          },
        })
      })

      it('should update the header uploading flag to false and set the fileSrc when upload has failed', () => {
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
              uploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            uploading: false,
          },
        })
      })
    })
  })

  describe('BodyContent Actions', () => {
    describe('bodyContent', () => {
      it('should add a new body content section', () => {
        const id = 'someBodySectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddBodySection
        const action: AddBodySectionAction = {
          type: CreateEntityPageContentActions.AddBodySection,
          payload: {
            id,
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
              title: undefined,
              content: undefined,
              fileSrc: undefined,
              uploading: false,
            },
          },
        })
      })

      it('should remove body content section', () => {
        const id = 'existingBodySectionId'
        // given ... we have an action of type CreateEntityPageContentActions.RemoveBodySection
        const action: RemoveBodySectionAction = {
          type: CreateEntityPageContentActions.RemoveBodySection,
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
                title: 'title1',
                content: 'content1',
                fileSrc: 'fileSrc1',
                uploading: false,
              },
              ['anotherid']: {
                id: 'anotherid',
                title: 'title2',
                content: 'content2',
                fileSrc: 'fileSrc2',
                uploading: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          body: {
            ['anotherid']: {
              id: 'anotherid',
              title: 'title2',
              content: 'content2',
              fileSrc: 'fileSrc2',
              uploading: false,
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someBodyContentId'
        const title = 'someNewBodyTitle'
        const content = 'someNewBodyContent'
        const fileSrc = 'someExistingfileSrc'

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
                fileSrc,
                uploading: false,
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
              fileSrc,
              uploading: false,
            },
          },
        })
      })
    })

    describe('bodyImage', () => {
      it('should update the specific body uploading flag to true when upload has started', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const fileSrc = 'someNewfileSrc'

        // given .. we have an action of type CreateEntityPageContentActions.UploadBodyContentImagePending
        const action: UploadBodyContentImagePendingAction = {
          type: CreateEntityPageContentActions.UploadBodyContentImagePending,
          meta: {
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
                fileSrc,
                uploading: false,
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
              fileSrc,
              uploading: true,
            },
          },
        })
      })

      it('should update the body uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const fileSrc = 'someNewfileSrc'

        // given .. we have an action of type CreateEntityPageContentActions.UploadBodyContentImageSuccessAction
        const action: UploadBodyContentImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadBodyContentImageSuccess,
          payload: {
            id,
            fileSrc,
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
                fileSrc: 'someOldfileSrc',
                uploading: true,
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
              fileSrc,
              uploading: false,
            },
          },
        })
      })

      it('should update the body uploading flag to false when upload has failed', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const fileSrc = 'somefileSrc'

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
                fileSrc,
                uploading: true,
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
              fileSrc,
              uploading: false,
            },
          },
        })
      })
    })
  })

  describe('ImageContent Actions', () => {
    describe('imageContent', () => {
      it('should add a new image content section', () => {
        const id = 'someImageSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddImageSection
        const action: AddImageSectionAction = {
          type: CreateEntityPageContentActions.AddImageSection,
          payload: {
            id,
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
              title: undefined,
              content: undefined,
              fileSrc: undefined,
              imageDescription: undefined,
              uploading: false,
            },
          },
        })
      })

      it('should remove image content section', () => {
        const id = 'existingImageSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.RemoveImageSection
        const action: RemoveImageSectionAction = {
          type: CreateEntityPageContentActions.RemoveImageSection,
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
                title: 'title1',
                content: 'content1',
                fileSrc: 'fileSrc1',
                imageDescription: 'imageDescription1',
                uploading: false,
              },
              ['anotherid']: {
                id: 'anotherid',
                title: 'title2',
                content: 'content2',
                fileSrc: 'fileSrc2',
                imageDescription: 'imageDescription2',
                uploading: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          images: {
            ['anotherid']: {
              id: 'anotherid',
              title: 'title2',
              content: 'content2',
              fileSrc: 'fileSrc2',
              imageDescription: 'imageDescription2',
              uploading: false,
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someImageContentId'
        const title = 'someNewImageTitle'
        const content = 'someNewImageContent'
        const imageDescription = 'someExistingImageDescription'
        const fileSrc = 'someExistingfileSrc'

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
                fileSrc,
                uploading: false,
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
              fileSrc,
              imageDescription,
              uploading: false,
            },
          },
        })
      })
    })

    describe('imageContentImage', () => {
      it('should update the specific image uploading flag to true when upload has started', () => {
        const id = 'someImageContentId'
        const title = 'someImageTitle'
        const content = 'someImageContent'
        const imageDescription = 'someImageDescription'
        const fileSrc = 'someNewfileSrc'

        // given .. we have an action of type CreateEntityPageContentActions.UploadImageContentImagePending
        const action: UploadImageContentImagePendingAction = {
          type: CreateEntityPageContentActions.UploadImageContentImagePending,
          meta: {
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
                fileSrc,
                uploading: false,
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
              fileSrc,
              uploading: true,
            },
          },
        })
      })

      it('should update the specific image uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const id = 'someBodyContentId'
        const title = 'someBodyTitle'
        const content = 'someBodyContent'
        const imageDescription = 'someImageDescription'
        const fileSrc = 'someNewfileSrc'

        // given .. we have an action of type CreateEntityPageContentActions.UploadImageContentImageSuccessAction
        const action: UploadImageContentImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadImageContentImageSuccess,
          payload: {
            id,
            fileSrc,
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
                fileSrc: 'someOldfileSrc',
                uploading: true,
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
              fileSrc,
              imageDescription,
              uploading: false,
            },
          },
        })
      })

      it('should update the specific image uploading flag to false and set the fileSrc when upload has failed', () => {
        const id = 'someImageContentId'
        const title = 'someImageTitle'
        const content = 'someImageContent'
        const imageDescription = 'someImageDescription'
        const fileSrc = 'somefileSrc'

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
                fileSrc,
                uploading: true,
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
              fileSrc,
              uploading: false,
            },
          },
        })
      })
    })
  })

  describe('ProfileContent Actions', () => {
    describe('profileContent', () => {
      it('should add a new profile content section', () => {
        const id = 'someProfileSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddProfileSection
        const action: AddProfileSectionAction = {
          type: CreateEntityPageContentActions.AddProfileSection,
          payload: {
            id,
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
              name: undefined,
              position: undefined,
              linkedInUrl: undefined,
              twitterUrl: undefined,
              fileSrc: undefined,
              uploading: false,
            },
          },
        })
      })

      it('should remove profile content section', () => {
        const id = 'existingProfileSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.RemoveProfileSection
        const action: RemoveProfileSectionAction = {
          type: CreateEntityPageContentActions.RemoveProfileSection,
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
                name: 'someProfileName1',
                position: 'someProfilePosition1',
                linkedInUrl: 'someProfileLinkedInUrl1',
                twitterUrl: 'someProfileTwitterUrl1',
                fileSrc: 'someProfilefileSrc1',
                uploading: false,
              },
              ['anotherid']: {
                id: 'anotherid',
                name: 'someProfileName2',
                position: 'someProfilePosition2',
                linkedInUrl: 'someProfileLinkedInUrl2',
                twitterUrl: 'someProfileTwitterUrl2',
                fileSrc: 'someProfilefileSrc2',
                uploading: false,
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          profiles: {
            ['anotherid']: {
              id: 'anotherid',
              name: 'someProfileName2',
              position: 'someProfilePosition2',
              linkedInUrl: 'someProfileLinkedInUrl2',
              twitterUrl: 'someProfileTwitterUrl2',
              fileSrc: 'someProfilefileSrc2',
              uploading: false,
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
        const fileSrc = 'someExistingfileSrc'

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
                fileSrc,
                uploading: false,
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
              fileSrc,
              uploading: false,
            },
          },
        })
      })
    })

    describe('profileImage', () => {
      it('should update the specific profile uploading flag to true when upload has started', () => {
        const id = 'someProfileContentId'
        const name = 'someProfileName'
        const position = 'someProfilePosition'
        const linkedInUrl = 'someProfileLinkedInUrl'
        const twitterUrl = 'someProfileTwitterUrl'
        const fileSrc = 'somefileSrc'

        // given .. we have an action of type CreateEntityPageContentActions.UploadProfileContentImagePending
        const action: UploadProfileContentImagePendingAction = {
          type: CreateEntityPageContentActions.UploadProfileContentImagePending,
          meta: {
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
                fileSrc,
                uploading: false,
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
              fileSrc,
              uploading: true,
            },
          },
        })
      })

      it('should update the profile uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const id = 'someProfileContentId'
        const name = 'someProfileName'
        const position = 'someProfilePosition'
        const linkedInUrl = 'someProfileLinkedInUrl'
        const twitterUrl = 'someProfileTwitterUrl'
        const fileSrc = 'someNewfileSrc'

        // given .. we have an action of type CreateEntityPageContentActions.UploadProfileContentImageSuccessAction
        const action: UploadProfileContentImageSuccessAction = {
          type: CreateEntityPageContentActions.UploadProfileContentImageSuccess,
          payload: {
            id,
            fileSrc,
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
                fileSrc: 'someOldfileSrc',
                uploading: true,
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
              fileSrc,
              uploading: false,
            },
          },
        })
      })

      it('should update the profile uploading flag to false and set the fileSrc when upload has failed', () => {
        const id = 'someProfileContentId'
        const name = 'someProfileName'
        const position = 'someProfilePosition'
        const linkedInUrl = 'someProfileLinkedInUrl'
        const twitterUrl = 'someProfileTwitterUrl'
        const fileSrc = 'somefileSrc'

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
                fileSrc,
                uploading: true,
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
              fileSrc,
              uploading: false,
            },
          },
        })
      })
    })
  })

  describe('SocialContent Actions', () => {
    it('should update the content', () => {
      const linkedInUrl = 'someNewLinkedInUrl'
      const facebookUrl = 'someNewFacebookInUrl'
      const twitterUrl = 'someNewTwitterInUrl'
      const discourseUrl = 'someNewDiscourseInUrl'
      const instagramUrl = 'someNewInstagramUrl'
      const telegramUrl = 'someNewTelegramUrl'
      const githubUrl = 'someNewGithubUrl'
      const otherUrl = 'someNewOtherUrl'

      // given .. we have an action of type CreateEntityPageContentActions.UpdateSocialContent
      const action: UpdateSocialContentAction = {
        type: CreateEntityPageContentActions.UpdateSocialContent,
        payload: {
          linkedInUrl,
          facebookUrl,
          twitterUrl,
          discourseUrl,
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
            facebookUrl: 'someOldFacebookUrl',
            twitterUrl: 'someOldTwitterUrl',
            discourseUrl: 'someOldDiscourseUrl',
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
          facebookUrl,
          twitterUrl,
          discourseUrl,
          instagramUrl,
          telegramUrl,
          githubUrl,
          otherUrl,
        },
      })
    })
  })

  describe('EmbeddedContent Actions', () => {
    describe('embeddedContent', () => {
      it('should add a new embedded content section', () => {
        const id = 'someEmbeddedSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.AddEmbeddedSection
        const action: AddEmbeddedSectionAction = {
          type: CreateEntityPageContentActions.AddEmbeddedSection,
          payload: {
            id,
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
              title: undefined,
              urls: [],
            },
          },
        })
      })

      it('should remove embedded content section', () => {
        const id = 'existingEmbeddedSectionId'
        // given ... we have an action of type CreateEntityPageContentActions.RemoveEmbeddedSection
        const action: RemoveEmbeddedSectionAction = {
          type: CreateEntityPageContentActions.RemoveEmbeddedSection,
          payload: {
            id,
          },
        }
        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            embedded: {
              [id]: {
                id,
                title: 'someTitle1',
                urls: ['url1', 'url2'],
              },
              ['anotherid']: {
                id: 'anotherid',
                title: 'someTitle2',
                urls: ['url3', 'url4'],
              },
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          embedded: {
            ['anotherid']: {
              id: 'anotherid',
              title: 'someTitle2',
              urls: ['url3', 'url4'],
            },
          },
        })
      })

      it('should update the content', () => {
        const id = 'someBodyContentId'
        const title = 'someNewBodyTitle'
        const urls = ['foo', 'bar']

        // given .. we have an action of type CreateEntityPageContentActions.UpdateEmbeddedContent
        const action: UpdateEmbeddedContentAction = {
          type: CreateEntityPageContentActions.UpdateEmbeddedContent,
          payload: {
            id,
            title,
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
              urls,
            },
          },
        })
      })
    })
  })

  describe('validation', () => {
    it('should set the validation for an identifier', () => {
      const identifier = 'someBodySectionId'
      const validated = false
      const errors = ['error1', 'error2']
      // given ... we have an action of type CreateEntityPageContentActions.SetValidated
      const action: SetValidatedAction = {
        type: CreateEntityPageContentActions.SetValidated,
        payload: {
          identifier,
          validated,
          errors,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated,
            errors,
          },
        },
      })
    })
  })
})
