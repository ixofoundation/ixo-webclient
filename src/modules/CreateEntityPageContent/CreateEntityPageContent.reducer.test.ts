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

  // ******************************

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

    // *******************

    describe('imageContentImage', () => {
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
})
