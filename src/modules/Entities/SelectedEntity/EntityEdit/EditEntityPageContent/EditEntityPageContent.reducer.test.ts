import * as SUT from './EditEntityPageContent.reducer'
import {
  EditEntityPageContentActions,
  UpdateHeaderContentAction,
  UploadHeaderImageFailureAction,
  UploadHeaderImagePendingAction,
  UploadHeaderImageSuccessAction,
  UploadHeaderLogoFailureAction,
  UploadHeaderLogoPendingAction,
  UploadHeaderLogoSuccessAction,
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
  ValidatedAction,
  ValidationErrorAction,
} from './types'
import {
  NewEntityAction,
  EditEntityActions,
  EditEntitySuccessAction,
} from '../types'
import { EntityType } from '../../../types'

const initialState = SUT.initialState

describe('EditEntityPageContent Reducer', () => {
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
        const brand = 'someHeaderCompany'
        const location = 'ZA'
        const headerFileSrc = 'someExistingHeaderFileSrc'
        const logoFileSrc = 'someExistingLogoFileSrc'

        // given .. we have an action of type EditEntityPageContentActions.UpdateHeaderContent
        const action: UpdateHeaderContentAction = {
          type: EditEntityPageContentActions.UpdateHeaderContent,
          payload: {
            title,
            shortDescription,
            imageDescription,
            sdgs,
            brand,
            location,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: { ...initialState.header, headerFileSrc, logoFileSrc },
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
            brand,
            location,
            headerFileSrc,
            headerFileUploading: false,
            logoFileSrc,
            logoFileUploading: false,
          },
        })
      })
    })

    describe('headerImage', () => {
      it('should update the header uploading flag to true when upload has started', () => {
        // given .. we have an action of type EditEntityPageContentActions.UploadHeaderContentImagePending
        const action: UploadHeaderImagePendingAction = {
          type: EditEntityPageContentActions.UploadHeaderContentImagePending,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            headerFileUploading: true,
          },
        })
      })

      it('should update the header uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const headerFileSrc = 'somefileSrc'

        // given .. we have an action of type EditEntityPageContentActions.UploadHeaderContentImageSuccess
        const action: UploadHeaderImageSuccessAction = {
          type: EditEntityPageContentActions.UploadHeaderContentImageSuccess,
          payload: {
            headerFileSrc,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: {
              ...initialState.header,
              headerFileUploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            headerFileSrc,
            headerFileUploading: false,
          },
        })
      })

      it('should update the header uploading flag to false and set the fileSrc when upload has failed', () => {
        // given .. we have an action of type EditEntityPageContentActions.UploadHeaderContentImageFailure
        const action: UploadHeaderImageFailureAction = {
          type: EditEntityPageContentActions.UploadHeaderContentImageFailure,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: {
              ...initialState.header,
              headerFileUploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            headerFileUploading: false,
          },
        })
      })
    })

    describe('logoImage', () => {
      it('should update the logo uploading flag to true when upload has started', () => {
        // given .. we have an action of type EditEntityPageContentActions.UploadHeaderContentLogoPending
        const action: UploadHeaderLogoPendingAction = {
          type: EditEntityPageContentActions.UploadHeaderContentLogoPending,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(initialState, action)

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            logoFileUploading: true,
          },
        })
      })

      it('should update the logo uploading flag to false and set the fileSrc when upload has succeeded', () => {
        const logoFileSrc = 'somefileSrc'

        // given .. we have an action of type EditEntityPageContentActions.UploadHeaderContentLogoSuccess
        const action: UploadHeaderLogoSuccessAction = {
          type: EditEntityPageContentActions.UploadHeaderContentLogoSuccess,
          payload: {
            logoFileSrc,
          },
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: {
              ...initialState.header,
              logoFileUploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            logoFileSrc,
            logoFileUploading: false,
          },
        })
      })

      it('should update the logo uploading flag to false and set the fileSrc when upload has failed', () => {
        // given .. we have an action of type EditEntityPageContentActions.UploadHeaderContentLogoFailure
        const action: UploadHeaderLogoFailureAction = {
          type: EditEntityPageContentActions.UploadHeaderContentLogoFailure,
        }

        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            header: {
              ...initialState.header,
              logoFileUploading: true,
            },
          },
          action,
        )

        // then ... the state should be set as expected
        expect(result).toEqual({
          ...initialState,
          header: {
            ...initialState.header,
            logoFileUploading: false,
          },
        })
      })
    })
  })

  describe('BodyContent Actions', () => {
    describe('bodyContent', () => {
      it('should add a new body content section', () => {
        const id = 'someBodySectionId'
        // given ... we have an action of type EditEntityPageContentActions.AddBodySection
        const action: AddBodySectionAction = {
          type: EditEntityPageContentActions.AddBodySection,
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
            ...initialState.body,
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
        // given ... we have an action of type EditEntityPageContentActions.RemoveBodySection
        const action: RemoveBodySectionAction = {
          type: EditEntityPageContentActions.RemoveBodySection,
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

        // given .. we have an action of type EditEntityPageContentActions.UpdateBodyContent
        const action: UpdateBodyContentAction = {
          type: EditEntityPageContentActions.UpdateBodyContent,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadBodyContentImagePending
        const action: UploadBodyContentImagePendingAction = {
          type: EditEntityPageContentActions.UploadBodyContentImagePending,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadBodyContentImageSuccessAction
        const action: UploadBodyContentImageSuccessAction = {
          type: EditEntityPageContentActions.UploadBodyContentImageSuccess,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadBodyContentImageFailureAction
        const action: UploadBodyContentImageFailureAction = {
          type: EditEntityPageContentActions.UploadBodyContentImageFailure,
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
        // given ... we have an action of type EditEntityPageContentActions.AddImageSection
        const action: AddImageSectionAction = {
          type: EditEntityPageContentActions.AddImageSection,
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
            ...initialState.images,
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
        // given ... we have an action of type EditEntityPageContentActions.RemoveImageSection
        const action: RemoveImageSectionAction = {
          type: EditEntityPageContentActions.RemoveImageSection,
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

        // given .. we have an action of type EditEntityPageContentActions.UpdateImageContent
        const action: UpdateImageContentAction = {
          type: EditEntityPageContentActions.UpdateImageContent,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadImageContentImagePending
        const action: UploadImageContentImagePendingAction = {
          type: EditEntityPageContentActions.UploadImageContentImagePending,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadImageContentImageSuccessAction
        const action: UploadImageContentImageSuccessAction = {
          type: EditEntityPageContentActions.UploadImageContentImageSuccess,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadImageContentImageFailureAction
        const action: UploadImageContentImageFailureAction = {
          type: EditEntityPageContentActions.UploadImageContentImageFailure,
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
        // given ... we have an action of type EditEntityPageContentActions.AddProfileSection
        const action: AddProfileSectionAction = {
          type: EditEntityPageContentActions.AddProfileSection,
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
            ...initialState.profiles,
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
        // given ... we have an action of type EditEntityPageContentActions.RemoveProfileSection
        const action: RemoveProfileSectionAction = {
          type: EditEntityPageContentActions.RemoveProfileSection,
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

        // given .. we have an action of type EditEntityPageContentActions.UpdateProfileContent
        const action: UpdateProfileContentAction = {
          type: EditEntityPageContentActions.UpdateProfileContent,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadProfileContentImagePending
        const action: UploadProfileContentImagePendingAction = {
          type: EditEntityPageContentActions.UploadProfileContentImagePending,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadProfileContentImageSuccessAction
        const action: UploadProfileContentImageSuccessAction = {
          type: EditEntityPageContentActions.UploadProfileContentImageSuccess,
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

        // given .. we have an action of type EditEntityPageContentActions.UploadProfileContentImageFailureAction
        const action: UploadProfileContentImageFailureAction = {
          type: EditEntityPageContentActions.UploadProfileContentImageFailure,
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

      // given .. we have an action of type EditEntityPageContentActions.UpdateSocialContent
      const action: UpdateSocialContentAction = {
        type: EditEntityPageContentActions.UpdateSocialContent,
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
        // given ... we have an action of type EditEntityPageContentActions.AddEmbeddedSection
        const action: AddEmbeddedSectionAction = {
          type: EditEntityPageContentActions.AddEmbeddedSection,
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
            ...initialState.embedded,
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
        // given ... we have an action of type EditEntityPageContentActions.RemoveEmbeddedSection
        const action: RemoveEmbeddedSectionAction = {
          type: EditEntityPageContentActions.RemoveEmbeddedSection,
          payload: {
            id,
          },
        }
        // when ... we run the reducer with this action
        const result = SUT.reducer(
          {
            ...initialState,
            embedded: {
              ...initialState.embedded,
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
            ...initialState.embedded,
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

        // given .. we have an action of type EditEntityPageContentActions.UpdateEmbeddedContent
        const action: UpdateEmbeddedContentAction = {
          type: EditEntityPageContentActions.UpdateEmbeddedContent,
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
    it('should set validated to true and clear any errors', () => {
      const identifier = 'someBodySectionId'
      const errors = ['error1', 'error2']
      // given ... we have an action of type EditEntityPageContentActions.SetValidated
      const action: ValidatedAction = {
        type: EditEntityPageContentActions.Validated,
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
      type: EditEntityPageContentActions.ValidationError,
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
          entityType: EntityType.Cell,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          header: {
            shortDescription: 'someDataThatShouldBeCleared',
            headerFileUploading: true,
            logoFileUploading: true,
            title: 'someDataThatShouldBeCleared',
            headerFileSrc: 'someDataThatShouldBeCleared',
            logoFileSrc: 'someDataThatShouldBeCleared',
            imageDescription: 'someDataThatShouldBeCleared',
            location: 'someDataThatShouldBeCleared',
            brand: 'someDataThatShouldBeCleared',
            sdgs: ['someDataThatShouldBeCleared'],
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
          header: {
            shortDescription: 'someDataThatShouldBeCleared',
            headerFileUploading: true,
            logoFileUploading: true,
            title: 'someDataThatShouldBeCleared',
            headerFileSrc: 'someDataThatShouldBeCleared',
            logoFileSrc: 'someDataThatShouldBeCleared',
            imageDescription: 'someDataThatShouldBeCleared',
            location: 'someDataThatShouldBeCleared',
            brand: 'someDataThatShouldBeCleared',
            sdgs: ['someDataThatShouldBeCleared'],
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})
