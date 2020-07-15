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
        expect(action.type).toEqual(CreateEntityPageContentActions.UpdateHeader)
        expect(action.payload).toEqual({
          title,
          shortDescription,
          imageDescription,
          sdgs,
          country,
        })
      })
    })

    describe('uploadHeaderImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data
        const base64ImageData = 'someImageData'

        // when ... we call the uploadHeaderImage action creator
        await store.dispatch(SUT.uploadHeaderImage(base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntityPageContentActions.UploadHeaderImagePending,
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
        expect(action.type).toEqual(CreateEntityPageContentActions.UpdateBody)
        expect(action.payload).toEqual({
          id,
          title,
          content,
        })
      })
    })

    describe('uploadBodyImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data and an id
        const id = 'someBodyId'
        const base64ImageData = 'someImageData'

        // when ... we call the uploadBodyImage action creator
        await store.dispatch(SUT.uploadBodyImage(id, base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntityPageContentActions.UploadBodyImagePending,
        )
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadBodyImageSuccess,
        )
        expect(actions[1].payload.did).toEqual('somePublicDid')
        expect(actions[1].payload.id).toEqual('someBodyId')
      })
    })
  })

  ///

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
        expect(action.type).toEqual(CreateEntityPageContentActions.UpdateBody)
        expect(action.payload).toEqual({
          id,
          title,
          content,
        })
      })
    })

    describe('uploadBodyImage', () => {
      it('should upload the image and dispatch the correct action', async () => {
        // given ... we have base64 image data and an id
        const id = 'someBodyId'
        const base64ImageData = 'someImageData'

        // when ... we call the uploadBodyImage action creator
        await store.dispatch(SUT.uploadBodyImage(id, base64ImageData))
        const actions = store.getActions()

        // then ... it should dispatch the correct actions
        expect(actions.length).toEqual(2)
        expect(actions[0].type).toEqual(
          CreateEntityPageContentActions.UploadBodyImagePending,
        )
        expect(actions[1].type).toEqual(
          CreateEntityPageContentActions.UploadBodyImageSuccess,
        )
        expect(actions[1].payload.did).toEqual('somePublicDid')
        expect(actions[1].payload.id).toEqual('someBodyId')
      })
    })
  })
})
